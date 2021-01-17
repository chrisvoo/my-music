
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum BitRate {
    VARIABLE = "VARIABLE",
    CONSTANT = "CONSTANT"
}

export enum SortDirection {
    ASC = "ASC",
    DESC = "DESC"
}

export enum SortField {
    album_title = "album_title",
    artist = "artist",
    bitrate = "bitrate",
    duration = "duration",
    filename = "filename",
    size = "size",
    title = "title"
}

export interface InputFile {
    album_image?: string;
    album_image_mime_type?: string;
    album_title?: string;
    artist?: string;
    bitrate?: number;
    bitrate_type?: BitRate;
    duration?: number;
    filename: string;
    has_album_image?: boolean;
    has_custom_tag?: boolean;
    has_id3v1_tag?: boolean;
    has_id3v2_tag?: boolean;
    size?: number;
    year?: number;
    title?: string;
}

export interface InputFileSort {
    field?: SortField;
    direction?: SortDirection;
}

export interface PageInfo {
    hasNextPage: boolean;
    lastCursor?: string;
}

export interface Edge {
    cursor: string;
    node: File;
}

export interface FilesConnection {
    edges: Edge[];
    pageInfo: PageInfo;
}

export interface File {
    id: string;
    album_image?: string;
    album_image_mime_type?: string;
    album_title?: string;
    artist?: string;
    bitrate?: number;
    bitrate_type?: BitRate;
    duration?: number;
    filename: string;
    has_album_image?: boolean;
    has_custom_tag?: boolean;
    has_id3v1_tag?: boolean;
    has_id3v2_tag?: boolean;
    size?: number;
    year?: number;
    title?: string;
}

export interface IQuery {
    getFiles(first?: number, after?: string, sort?: InputFileSort[], fileSearch?: string): FilesConnection | Promise<FilesConnection>;
    getFile(cursor?: string): File | Promise<File>;
}

export interface IMutation {
    updateFile(file: InputFile): File | Promise<File>;
    deleteFile(id: string): boolean | Promise<boolean>;
}
