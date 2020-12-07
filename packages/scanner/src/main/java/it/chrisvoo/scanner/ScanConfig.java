package it.chrisvoo.scanner;

import com.mongodb.reactivestreams.client.MongoDatabase;

import java.nio.file.Path;
import java.util.List;

/**
 * Configuration to be passed to {@link Scanner} class
 */
public class ScanConfig {
    /**
     * Paths passed via command line
     */
    private List<Path> chosenPaths;

    /**
     * Threshold over which tasks will be split
     */
    private int threshold;

    private boolean multithreaded;

    /**
     * Music manager database name
     */
    private MongoDatabase database;

    public List<Path> getChosenPaths() {
        return chosenPaths;
    }

    public ScanConfig setChosenPaths(List<Path> chosenPaths) {
        this.chosenPaths = chosenPaths;
        return this;
    }

    public int getThreshold() {
        return threshold;
    }

    public ScanConfig setThreshold(int threshold) {
        this.threshold = threshold;
        return this;
    }

    public MongoDatabase getDatabase() {
        return database;
    }

    public ScanConfig setDatabase(MongoDatabase database) {
        this.database = database;
        return this;
    }

    public ScanConfig setMultithreaded(boolean multi) {
        this.multithreaded = multi;
        return this;
    }

    public boolean isMultithreaded() { return this.multithreaded; }
}
