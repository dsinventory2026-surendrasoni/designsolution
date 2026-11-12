// scripts/seed_inventories.mjs
import mongoose from "mongoose";
import { inventoriesData } from "../src/data/inventoriesData.js";

const uri = process.env.MONGODB_URI || "mongodb+srv://anishbyme_db_user:P%405SVV0RD@dsgroup.1oysjn6.mongodb.net/DSGROUP?appName=DSGROUP";

async function seed() {
  console.log("Connecting to MongoDB Atlas...");
  await mongoose.connect(uri);
  console.log("Connected successfully.");

  const collection = mongoose.connection.collection("inventories");

  console.log(`Seeding ${inventoriesData.length} inventory listings...`);

  let inserted = 0;
  let updated = 0;

  for (const item of inventoriesData) {
    const { id, ...doc } = item;
    const res = await collection.updateOne(
      { slug: doc.slug },
      {
        $set: {
          ...doc,
          updatedAt: new Date(doc.updatedAt || Date.now()),
          createdAt: new Date(doc.createdAt || Date.now()),
        },
      },
      { upsert: true }
    );

    if (res.upsertedCount > 0) {
      inserted++;
    } else {
      updated++;
    }
  }

  console.log(`Finished seeding! Inserted: ${inserted}, Updated: ${updated}`);
  const total = await collection.countDocuments();
  console.log(`Total documents in 'inventories' collection: ${total}`);

  await mongoose.disconnect();
  console.log("Disconnected from MongoDB.");
}

seed().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});

