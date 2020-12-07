# Scanner

This is a command-line app which scans a list of paths and does bulk upserts into MongoDB of all paths and metadata
relative to the MP3 files found. This means that if you change the metadata of a file, its data will be updated, but since the matching key is the file path, if you change its location, it will be duplicated. A future todo is a watchdog
on music directories to updated the db once such events occur.  
The app uses the Java high-level concurrency API, more specifically with the [ForkJoin framework](https://docs.oracle.com/javase/tutorial/essential/concurrency/forkjoin.html).
  
**NOTE**: be sure to put your music files on an SSD, otherwise your HDD will defeat the forkjoin strategy, worsening the
overall performance compared to a sequential scan. If you don't have any SSD, just set a threshold higher than the total
number of files you want to scan to use a sequential scan strategy. [Read more in my blog](https://codepuzzling.tumblr.com/post/190842496592/parsing-music-files-in-parallel) about performance.  

The tests on my Windows machine with 8GB RAM and AMD Ryzen 2400G (4 cores, 8 logical processors) are the following:

|  |Files   |      multithreaded      |  single-threaded |
|--|--------|:-------------:|------:|
| SSD | ~13K |  2' 39'' | 5' 6'' |
| HHD | ~12K |    23' 41''  | 17' 38''  |

## Options

* `-c, --configuration`: the path to the configuration file.

## Configuration file

This configuration file follows the [HOCON format](https://github.com/lightbend/config/blob/master/HOCON.md).

* `threshold`: if it's `-1` or absent from the config file, it will be dynamically calculated dividing the total number of files by the available
processors. If this value is less than the total number of files, the app will split the task into subtasks, otherwise it will act as a single-threaded app.
* `music_paths`: list of paths to scan. For Windows users, escape the backslashes.
* `db`: Mongo connection's details (host, port, username, ...). Default connection string: `mongodb://localhost:27017/my-music`

## Resources

The music files are freely downloadable from [Open Music Archive](http://www.openmusicarchive.org/) (Creative Commons
licences and public domain).
