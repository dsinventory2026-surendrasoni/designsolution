// Script to update MongoDB contact number via local API
// Run this AFTER the dev server is running: node scripts/update_contact.mjs

import jwt from "jsonwebtoken";

const JWT_SECRET = "dsgroup_admin_jwt_secret_2026_ultra_secure_key";
const BASE_URL = "http://localhost:3000";

// Create a valid admin token
const token = jwt.sign({ role: "admin", email: "dsinventory2026@gmail.com" }, JWT_SECRET, { expiresIn: "1h" });

console.log("Generated token:", token.substring(0, 30) + "...");

try {
    const res = await fetch(`${BASE_URL}/api/admin/footer`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            contact: {
                whatsappNumber: "7743000070",
                whatsappFormatted: "+91 77430 00070",
                whatsappLink: "https://wa.me/917743000070",
                phonePrimary: "+91 77430 00070"
            },
            socialLinks: {
                whatsapp: "https://wa.me/917743000070"
            }
        })
    });

    const data = await res.json();
    if (data.success) {
        console.log("✅ MongoDB updated successfully!");
        console.log("New whatsappNumber:", data.data.contact.whatsappNumber);
        console.log("New phonePrimary:", data.data.contact.phonePrimary);
    } else {
        console.error("❌ Failed:", data.message);
    }
} catch (err) {
    console.error("❌ Error:", err.message);
}
