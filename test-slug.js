import { createClient, OAuthStrategy } from "@wix/sdk";
import { products } from "@wix/stores";

const clientId = "1c5c13cd-d1e1-4d8d-a950-b9b600033564";

const wixClient = createClient({
  modules: {
    products,
  },
  auth: OAuthStrategy({
    clientId: clientId,
  }),
});

async function main() {
  try {
    const slug = "metal-cat-sculpture";
    console.log(`Fetching product by slug: ${slug}...`);
    const prodResp = await wixClient.products
        .queryProducts()
        .eq("slug", slug)
        .find();
    
    console.log("Items found:", prodResp.items.length);
    if (prodResp.items.length > 0) {
      console.log("Product name:", prodResp.items[0].name);
    } else {
      // Fetch all products and see what slugs exist
      console.log("Fetching all products instead to check slugs...");
      const allResp = await wixClient.products.queryProducts().find();
      allResp.items.slice(0, 5).forEach(p => console.log(`- ${p.name}: ${p.slug}`));
    }
  } catch (err) {
    console.error(err);
  }
}

main();
