const database = require("../connection/database");

async function Bootstrap() {
    const isConnected = await database.BootstrapDatabase();
    if (!isConnected) throw new Error('Database connection issue');
    console.log("Database Connected");
    return true;
};

module.exports = {
    Bootstrap
}