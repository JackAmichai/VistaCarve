require("dotenv").config({ path: ".env.local" });
const { createClient, OAuthStrategy } = require("@wix/sdk");
const { products } = require("@wix/stores");

const clientId = process.env.NEXT_PUBLIC_WIX_APP_ID || process.env.NEXT_PUBLIC_WIX_CLIENT_ID;
const wixClient = createClient({
    modules: { products },
    auth: OAuthStrategy({
        clientId,
    }),
});

async function main() {
    try {
        const list = await wixClient.products.queryProducts().limit(10).find();
        console.log(`Found ${list.items.length} products to update`);

        for (const prod of list.items) {
            if (!prod._id) continue;
            const newPrice = Math.floor(Math.random() * (150 - 50 + 1) + 50); // random price between 50 and 150
            console.log(`Attempting to update ${prod.name} down to $${newPrice}`);
            try {
                await wixClient.products.updateProduct(prod._id, {
                    product: { priceData: { price: newPrice } }
                });
                console.log(`  -> Success!`);
            } catch (err) {
                console.log(`  -> Failed: ${err.message || err.code}`);
            }
        }
    } catch (err) {
        console.error("Critical error:", err);
    }
}

main();
