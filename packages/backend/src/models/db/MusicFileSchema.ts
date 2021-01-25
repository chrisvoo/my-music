import mongoose, { Schema, Document } from 'mongoose';

const modelName = 'files';

export enum Bitrate {
    VARIABLE,
    CONSTANT
}

export interface IMusicFile extends Document {
    album_image?: Buffer
    album_image_mime_type?: string
    album_title?: string
    artist?: string
    bitrate?: number
    bitrate_type?: Bitrate
    duration?: number
    filename: string
    has_album_image: boolean
    has_custom_tag: boolean
    has_id3v1_tag: boolean
    has_id3v2_tag: boolean
    size: number
    year?: number
    title?: string
}

const MusicFileSchema: Schema = new Schema({
  album_image: Buffer,
  album_image_mime_type: String,
  album_title: { type: String, trim: true },
  artist: { type: String, trim: true },
  bitrate: Number,
  bitrate_type: { type: String, enum: ['VARIABLE', 'CONSTANT'] },
  duration: Number,
  filename: { type: String, required: true, unique: true },
  has_album_image: Boolean,
  has_custom_tag: Boolean,
  has_id3v1_tag: Boolean,
  has_id3v2_tag: Boolean,
  size: Number,
  year: Number,
  title: { type: String, trim: true },
});

export default mongoose.model<IMusicFile>(modelName, MusicFileSchema, modelName);
