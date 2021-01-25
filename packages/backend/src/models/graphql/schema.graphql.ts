import { gql } from 'apollo-server-express';

export default gql`
enum BitRate {
  VARIABLE
  CONSTANT
}

"""
Returns details about the current page of results
"""
type PageInfo {
  hasNextPage: Boolean! # Whether there are more results after this page
  lastCursor: String # Pointer to the last element
}

"""
Edge level, every edge has a cursor (it's not base64)
"""
type Edge {
  cursor: String! # A marker for an edge's position in the connection (trackId)
  node: File!
}

"""
Cursor-based pagination
"""
type FilesConnection {
  edges: [Edge]!
  pageInfo: PageInfo!
}

type File {
  id: ID
  album_image: String #  Base64 coversion from/to backend
  album_image_mime_type: String
  album_title: String
  artist: String
  bitrate: Int
  bitrate_type: BitRate
  duration: Int
  filename: String!
  has_album_image: Boolean
  has_custom_tag: Boolean
  has_id3v1_tag: Boolean
  has_id3v2_tag: Boolean
  size: Int
  year: Int
  title: String
}

input InputFile {
  album_image: String #  Base64 coversion from/to backend
  album_image_mime_type: String
  album_title: String
  artist: String
  bitrate: Int
  bitrate_type: BitRate
  duration: Int
  filename: String!
  has_album_image: Boolean
  has_custom_tag: Boolean
  has_id3v1_tag: Boolean
  has_id3v2_tag: Boolean
  size: Int
  year: Int
  title: String
}

enum SortDirection {
  ASC
  DESC
}

enum SortField {
  album_title
  artist
  bitrate
  duration
  filename
  size
  title
}

"""
Used to form a list of fields to be sorted
"""
input InputFileSort {
  field: SortField
  direction: SortDirection
}

type Query {
  """
  Returns the first X results after an optional track Id, that matches a particular string
  """
  getFiles(
    first: Int = 10
    after: String # trackId
    sort: [InputFileSort]
    fileSearch: String
  ): FilesConnection

  """
  Returns the file whose ID matches the one specified as argument
  """
  getFile(trackId: ID): File
}

type Mutation {
  updateFile(file: InputFile!): File
  deleteFile(trackId: ID!): Boolean
}

schema {
  query: Query
  mutation: Mutation
}`;
