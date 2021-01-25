import { MongoDataSource } from 'apollo-datasource-mongodb';
import mongoose from 'mongoose';
import fs from 'fs';
import checkvar from 'checkvar';
import metadata from 'node-id3';
import { IMusicFile } from './MusicFileSchema';
import { File, QueryParams, FilesConnection } from '../graphql/MyMusic';
import logger from '../../utils/logger';

/**
 * Datasource available from the context of the resolvers.
 */
export default class MusicFileDataSource extends MongoDataSource<IMusicFile> {
  /**
   * Deletes a file from the database and from the file system.
   * @param {string} cursor A cursor represented by the track's ObjectId
   * @returns {Promise<Boolean>}
   */
  async deleteFile(cursor: string): Promise<boolean> {
    const file = await this.getFile(cursor);
    const { filename } = file;
    try {
      await Promise.all([
        fs.promises.unlink(filename),
        this.model.findByIdAndDelete(file.id),
      ]);
      return true;
    } catch (e) {
      logger.error('deleteFile failure', {
        metadata: {
          filename,
        },
      });
      return false;
    }
  }

  /**
     * Updates the info about a file in the database and also some basic metatags
     * @param {Object} a MusicFile instance
     * @returns {Promise<IMusicFile>} The updated MusicFile
     */
  async updateFile(file: File): Promise<IMusicFile> {
    const id = file.id ?? new mongoose.Types.ObjectId();
    const newFile: IMusicFile = await this.model.findByIdAndUpdate({ id }, file, {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    });

    const {
      filename, album_title, bitrate, artist, title, year,
    } = newFile;
    const tags: metadata.Tags = {};

    if (checkvar(album_title)) {
      tags.album = album_title;
    }

    if (checkvar(artist)) {
      tags.artist = artist;
    }

    if (checkvar(bitrate)) {
      tags.bpm = `${bitrate}`;
    }

    if (checkvar(title)) {
      tags.title = title;
    }

    if (checkvar(year)) {
      tags.year = `${year}`;
    }

    metadata.update(tags, filename, (err: Error) => { throw new Error(err.message); });
    return newFile;
  }

  /**
     * Returns a file by its ID converted in base64
     * @param {string} cursor ObjectId used for pagination
     * @returns {Promise<IMusicFile>} A File object
     */
  getFile(cursor: string): Promise<IMusicFile> {
    return this.model.findById(cursor);
  }

  /**
     *
     * @param {QueryParams} params It may contain the following fields:
     * - first: it's the limit for the query
     * - after: it's a cursor
     * - sort: an object which specified which fields to use for sorting
     * - fileSearch: a string, which could also be a RegExp pattern without '/' as delimiters
     * @returns {Promise<FilesConnection>} A pagination object
     */
  async getFiles(params: QueryParams): Promise<FilesConnection> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const conditions: Record<string, any> = {};
    const {
      first, after, sort, fileSearch,
    } = params;

    logger.info('getFiles request', {
      metadata: params,
    });

    if (checkvar(fileSearch)) {
      conditions.filename = new RegExp(`/${fileSearch}/`, 'gi');
    }

    if (checkvar(after)) {
      conditions._id = { $gt: after };
    }

    const sortBy = {};
    if (checkvar(sort)) {
      sort.forEach((i) => {
        sortBy[i.field] = i.direction;
      });
    }

    logger.info('getFiles conditions', {
      metadata: {
        conditions,
      },
    });

    const files = await this.model
      .find(conditions)
      .sort(sortBy)
      .limit(first + 1)
      .exec();

    logger.info('getFiles files found', {
      metadata: {
        found: files.length,
      },
    });

    const hasNextPage = files.length > first;
    const nodes = hasNextPage ? files.slice(0, -1) : files;

    const edges = nodes.map((node) => ({
      cursor: node._id.toString(),
      node,
    }));

    return {
      edges,
      pageInfo: {
        hasNextPage,
        lastCursor: files.length
          ? files[files.length - 2]._id.toString()
          : null,
      },
    };
  }
}
