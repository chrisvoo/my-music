# my-music

[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

A web app to manage and listen to your music collection (currently supporting only mp3).

## Project structure

This project consists of three main parts:

* **scanner**: a Java 8 CLI app which scans the specified folders to collect and inserts music filepaths and their metadata into a Mongo database. See the [README](./packages/scanner/README.md) for further details.
* **frontend**: a React app which provides the user interface to manage and listen to your music collection.
* **backend**: it's composed of a streming server and a GraphQL server to query and update the Mongo collections and the files' metadata.

## Requirements

* **Node ^10**: this project was created with Node 14 LTS.
* **Mongo DB ^3.4**
* The following Node modules globally installed: [shx](https://github.com/shelljs/shx), [lerna](https://github.com/lerna/lerna) and [PM2](https://pm2.keymetrics.io/0): `npm i lerna pm2 shx -g`
* You must create an `.env` file in the root of the project, following the `env.example` file.

