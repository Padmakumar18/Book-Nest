const { MongoClient } = require("mongodb");
require("dotenv").config({ path: "./config.env" });

async function main() {
  const uri = process.env.ATLAS_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db("libraryManagement");
    const collections = await db.collections();

    collections.forEach((collection) =>
      console.log("Collection:", collection.collectionName)
    );
  } catch (e) {
    console.error("❌ Connection error:", e);
  } finally {
    await client.close();
    console.log("📌 Connection closed");
  }
}

main();