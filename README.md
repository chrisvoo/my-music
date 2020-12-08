# my-music

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

A web app to manage and listen to your music collection (currently supporting only mp3).

## Project structure

This project consists of three main parts:

* **scanner**: a Java 8 CLI app which scans the specified folders to collect and inserts music filepaths and their metadata into a Mongo database. See the [README](./packages/scanner/README.md) for further details.
* **frontend**: a React app which provides the user interface to manage and listen to your music collection.
* **backend**: it's composed of a streming server and a GraphQL server to query and update the Mongo collections and the files' metadata.

## Credits

* Social preview image by [Eric Nopanen](https://unsplash.com/@rexcuando)
