const DEFAULT_HOST = "localhost";
const DEFAULT_PORT = 27017;
const DEFAULT_DB = "storeDb";
const DEFAULT_PROTOCOL = "mongodb";

class ConnectionStringBuilder {
    static getConnectionString() {
        let connectionString = process.env.CONNECTION_STRING;

        if(!connectionString) {
            let hostName = process.env.MONGO_HOST || DEFAULT_HOST;
            let portNumber = process.env.MONGO_PORT || DEFAULT_PORT;
            let databaseName = process.env.MONGO_DB || DEFAULT_DB;
            
            connectionString = `${DEFAULT_PROTOCOL}://${hostName}:${portNumber}/${databaseName}`;
        }

        return connectionString;
    }
}

export {
    ConnectionStringBuilder
};
