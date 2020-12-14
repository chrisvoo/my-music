import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MusicFileDocument } from '../../db/schemas/MusicFile.schema';

@Injectable()
export class StreamingService {
  constructor(
    @InjectModel('files') private musicFilesModel: Model<MusicFileDocument>,
  ) {}

  /**
   * Returns a music file document from the db.
   *
   * @param id The music file's id.
   *
   * @returns {Promise<MusicFileDocument>|null} The music file or null if there's no match
   */
  getTrack(id: string): Promise<MusicFileDocument> {
    return this.musicFilesModel.findById(id).exec();
  }
}
