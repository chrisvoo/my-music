import { ObjectId } from 'mongoose';
import { IMusicFile } from '../db/MusicFileSchema';
import mainTypes from './schema.graphql';

export type PageInfo = {
    hasNextPage: boolean
    lastCursor: string
}

export type File = IMusicFile & {
    id: ObjectId
}

export type Edge = {
    cursor: string
    node: File
}

export type FilesConnection = {
    edges: Edge[]
    pageInfo: PageInfo
}

export type InputFile = IMusicFile

export enum SortDirection {
    ASC = 1,
    DESC = -1
}

export enum SortField {
    album_title,
    artist,
    bitrate,
    duration,
    filename,
    size,
    title,
}

export type InputFileSort = {
    field: SortField
    direction: SortDirection
}

export type QueryParams = {
    first?: number,
    after?: string,
    sort?: InputFileSort[],
    fileSearch?: string
}

export const typeDefs = mainTypes;

export const resolvers = {
  Query: {
    getFiles: (
      o,
      params: QueryParams,
      { dataSources },
    ): Promise<FilesConnection> => dataSources.files.getFiles(params),
    getFile: (
      o,
      { cursor },
      { dataSources },
    ): Promise<IMusicFile> => dataSources.files.getFile(cursor),
  },
  Mutation: {
    updateFile: (
      o,
      { file },
      { dataSources },
    ): Promise<IMusicFile> => dataSources.files.updateFile(file),
    deleteFile: (
      o,
      { id },
      { dataSources },
    ): Promise<boolean> => dataSources.files.deleteFile(id),
  },
};
