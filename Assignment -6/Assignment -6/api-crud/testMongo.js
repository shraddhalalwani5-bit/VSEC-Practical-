
const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

async function main() {
    try {
        await client.connect();
        console.log("MongoDB connected successfully!");

        const db = client.db("student_practical");
        console.log("Database:", db.databaseName);
    } catch (error) {
        console.log(error);
    } finally {
        await client.close();
    }
}

main();
