import mongoose from "mongoose";

const uri = "mongodb+srv://anishbyme_db_user:P%405SVV0RD@dsgroup.1oysjn6.mongodb.net/DSGROUP?appName=DSGROUP";

async function updateDB() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB.");
        
        const SiteConfigSchema = new mongoose.Schema({}, { strict: false });
        const SiteConfig = mongoose.models.SiteConfig || mongoose.model("SiteConfig", SiteConfigSchema);
        
        const result = await SiteConfig.updateMany({}, {
            $set: {
                "contact.whatsappNumber": "7743000070",
                "contact.whatsappFormatted": "+91 77430 00070",
                "contact.whatsappLink": "https://wa.me/917743000070",
                "contact.phonePrimary": "+91 77430 00070",
                "socialLinks.whatsapp": "https://wa.me/917743000070"
            }
        });
        console.log("Update result:", result);
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await mongoose.disconnect();
    }
}

updateDB();
