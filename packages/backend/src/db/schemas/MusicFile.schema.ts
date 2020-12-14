import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MusicFileDocument = MusicFile & Document;

@Schema({
  collection: 'files',
  timestamps: true,
})
export class MusicFile {
  @Prop()
  album_image: Buffer;

  @Prop()
  album_image_mime_type: string;

  @Prop({ trim: true })
  album_title: string;

  @Prop({ trim: true })
  artist: string;

  @Prop()
  bitrate: number;

  @Prop({ enum: ['VARIABLE', 'CONSTANT'] })
  bitrate_type: string;

  @Prop()
  duration: number;

  @Prop({ required: true, unique: true })
  filename: string;

  @Prop()
  has_album_image: boolean;

  @Prop()
  has_custom_tag: boolean;

  @Prop()
  has_id3v1_tag: boolean;

  @Prop()
  has_id3v2_tag: boolean;

  @Prop()
  size: number;

  @Prop({ trim: true })
  title: string;
}

export const MusicFileSchema = SchemaFactory.createForClass(MusicFile);
