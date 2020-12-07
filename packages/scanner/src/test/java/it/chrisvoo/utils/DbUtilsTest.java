package it.chrisvoo.utils;

import com.typesafe.config.Config;
import com.typesafe.config.ConfigFactory;
import org.junit.jupiter.api.Test;

import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class DbUtilsTest {
    @Test
    public void connStringWithCredentials() {
        String confPath = System.getProperty("user.dir") + "/src/test/java/it/chrisvoo/utils/application.test1.conf";
        Config appConf = ConfigFactory.parseFile(Paths.get(confPath).toFile());
        assertEquals("my-music", appConf.getString("scanner.db.dbname"));

        String connectionString = DbUtils.buildConnectionString(appConf);
        assertEquals(
           "mongodb://hello:p%40ssW0rd@localhost:27017/admin?connectTimeoutMS=5000&appName=my-music",
            connectionString
        );
    }

    @Test
    public void connStringWithoutCredentials() {
        String confPath = System.getProperty("user.dir") + "/src/test/java/it/chrisvoo/utils/application.test2.conf";
        Config appConf = ConfigFactory.parseFile(Paths.get(confPath).toFile());
        assertEquals("my-music", appConf.getString("scanner.db.dbname"));

        String connectionString = DbUtils.buildConnectionString(appConf);
        assertEquals(
            "mongodb://localhost:27017/admin?connectTimeoutMS=5000&appName=my-music",
            connectionString
        );
    }
}
