import wixClient from "./wixClient";

// Unified check for Wix credentials to prevent SDK from throwing noisy "System errors"
export const isWixConfigured = !!(
  process.env.NEXT_PUBLIC_WIX_APP_ID && 
  process.env.NEXT_PUBLIC_SITE_ID
);

/**
 * Safe wrapper for querying products.
 * Falls back to high-quality mock data if Wix is not configured or fails.
 */
export async function getProducts(limit = 15) {
  if (!isWixConfigured) return getMockProducts();
  
  try {
    const response = await wixClient.products.queryProducts().limit(limit).find();
    return response.items || getMockProducts();
  } catch (err) {
    // Silent fail in production
    return getMockProducts();
  }
}

/**
 * Safe wrapper for querying collections.
 */
export async function getCollections() {
  if (!isWixConfigured) return getMockCollections();
  
  try {
    const response = await wixClient.collections.queryCollections().find();
    return response.items || getMockCollections();
  } catch (err) {
    return getMockCollections();
  }
}

/**
 * Safe wrapper for querying portfolio items (Wix Data/CMS).
 */
export async function getPortfolioItems() {
  if (!isWixConfigured) return getMockPortfolio();
  
  try {
    const response = await wixClient.items.query("Portfolio").find();
    return response.items || getMockPortfolio();
  } catch (err) {
    return getMockPortfolio();
  }
}

/**
 * Safe wrapper for querying services (Wix Bookings).
 */
export async function getServices() {
  if (!isWixConfigured) return getMockServices();
  
  try {
    const response = await wixClient.services.queryServices().find();
    return response.items || getMockServices();
  } catch (err) {
    return getMockServices();
  }
}

/**
 * Safe wrapper for fetching data for a specific category page.
 */
export async function getCategoryData(categorySlug: string) {
  let collection: any = null;
  let products: any[] = [];

  try {
    if (isWixConfigured) {
      const colResp = await wixClient.collections.queryCollections().limit(50).find();
      collection = colResp.items.find(c => c.slug === categorySlug || c.name?.toLowerCase() === categorySlug);
      
      if (collection) {
        const prodResp = await wixClient.products.queryProducts().hasSome("collectionIds", [collection._id]).find();
        products = prodResp.items || [];
      }
    }
  } catch (err) {
    // Silent fail
  }

  // Fallback to mock data if Wix fails or is unconfigured
  if (!collection) {
    const mockData = getMockCategoryData(categorySlug);
    collection = mockData.collection;
    products = mockData.products;
  }

  return { collection, products };
}

/**
 * Safe wrapper for fetching a single product by its slug.
 */
export async function getProductBySlug(slug: string) {
  let product: any = null;
  let recommended: any[] = [];

  try {
    if (isWixConfigured) {
      const prodResp = await wixClient.products.queryProducts().eq("slug", slug).limit(1).find();
      if (prodResp.items && prodResp.items.length > 0) {
        product = prodResp.items[0];
        const recResp = await wixClient.products.queryProducts().limit(8).find();
        if (recResp.items && Array.isArray(recResp.items)) {
          recommended = recResp.items.filter((p: any) => p._id !== product?._id).slice(0, 5);
        }
      }
    }
  } catch (err) {
    // Silent fail
  }

  if (!product) {
    product = getMockProducts().find(p => p.slug === slug);
    recommended = getMockProducts().filter(p => p.slug !== slug).sort(() => 0.5 - Math.random()).slice(0, 5);
  }

  return { product, recommended };
}

// --- MOCK DATA GENERATORS ---

function getMockProducts() {
  return [
    { _id: "m1", name: "Premium Oak Sign", slug: "premium-oak-sign", priceData: { formatted: { price: "$49.99" } }, media: { mainMedia: { image: { url: "/images/wood/carribian islands wood.png" } } } },
    { _id: "m2", name: "Custom Metal Plaque", slug: "custom-metal-plaque", priceData: { formatted: { price: "$79.99" } }, media: { mainMedia: { image: { url: "/images/metal/dog metal.png" } } } },
    { _id: "m3", name: "Marble Memorial Stone", slug: "marble-memorial", priceData: { formatted: { price: "$129.99" } }, media: { mainMedia: { image: { url: "/images/marble/Greek marbel.png" } } } },
    { _id: "m4", name: "Walnut Desk Nameplate", slug: "walnut-nameplate", priceData: { formatted: { price: "$34.99" } }, media: { mainMedia: { image: { url: "/images/wood/sea board wood.png" } } } },
    { _id: "m5", name: "Granite Address Sign", slug: "granite-address", priceData: { formatted: { price: "$89.99" } }, media: { mainMedia: { image: { url: "/images/marble/Roman pillars.png" } } } },
    { _id: "m6", name: "Executive Pen Box", slug: "executive-pen-box", priceData: { formatted: { price: "$59.99" } }, media: { mainMedia: { image: { url: "/images/corporate/pen gift.png" } } } },
    { _id: "m7", name: "Deer Corporate Award", slug: "deer-statue-award", priceData: { formatted: { price: "$149.99" } }, media: { mainMedia: { image: { url: "/images/corporate/deer gift.png" } } } },
    { _id: "m8", name: "Jesus Wedding Carving", slug: "jesus-wedding-carving", priceData: { formatted: { price: "$89.99" } }, media: { mainMedia: { image: { url: "/images/wedding/Jesus wedding.png" } } } },
    { _id: "m9", name: "Metal Lizard Sculpture", slug: "metal-lizzard", priceData: { formatted: { price: "$64.99" } }, media: { mainMedia: { image: { url: "/images/metal/Lizzard.png" } } } },
    { _id: "m10", name: "Stone Violin Plaque", slug: "stone-violin", priceData: { formatted: { price: "$179.99" } }, media: { mainMedia: { image: { url: "/images/marble/כינור אבן.png" } } } },
    { _id: "m11", name: "Modern Office Sign", slug: "modern-office-sign", priceData: { formatted: { price: "$129.99" } }, media: { mainMedia: { image: { url: "/images/custom/Gemini_Generated_Image_13kg8l13kg8l13kg.png" } } } },
    { _id: "m12", name: "Boutique Wood Sign", slug: "boutique-wood-sign", priceData: { formatted: { price: "$119.99" } }, media: { mainMedia: { image: { url: "/images/custom/Gemini_Generated_Image_7ms8v97ms8v97ms8.png" } } } },
    { _id: "m13", name: "Premium Acrylic Sign", slug: "premium-acrylic-sign", priceData: { formatted: { price: "$159.99" } }, media: { mainMedia: { image: { url: "/images/custom/Gemini_Generated_Image_a3uliwa3uliwa3ul.png" } } } },
    { _id: "m14", name: "Glass Effect Sign", slug: "glass-effect-sign", priceData: { formatted: { price: "$199.99" } }, media: { mainMedia: { image: { url: "/images/custom/Gemini_Generated_Image_u5l3alu5l3alu5l3.png" } } } },
    { _id: "m15", name: "Roman Pillars Plaque", slug: "roman-pillars-plaque", priceData: { formatted: { price: "$159.99" } }, media: { mainMedia: { image: { url: "/images/marble/Roman pillars.png" } } } },
  ];
}

function getMockCollections() {
  return [
    { _id: "col1", name: "Wood Carvings", slug: "wood-carvings", media: { mainMedia: { image: { url: "/images/wood_carvings.png" } } } },
    { _id: "col2", name: "Metal Engravings", slug: "metal-engravings", media: { mainMedia: { image: { url: "/images/metal_engraving.png" } } } },
    { _id: "col3", name: "Stone & Marble", slug: "stone-carvings", media: { mainMedia: { image: { url: "/images/stone_marble_carving.png" } } } },
    { _id: "col4", name: "Corporate Gifts", slug: "corporate-gifts", media: { mainMedia: { image: { url: "/images/corporate/pen gift.png" } } } },
    { _id: "col5", name: "Wedding Decor", slug: "wedding-decor", media: { mainMedia: { image: { url: "/images/wedding/Jesus wedding.png" } } } },
    { _id: "col6", name: "Custom Signage", slug: "custom-signage", media: { mainMedia: { image: { url: "/images/custom/Gemini_Generated_Image_13kg8l13kg8l13kg.png" } } } },
  ];
}

function getMockPortfolio() {
  return [
    { _id: "mock1", data: { title: "Modern Minimalist Signage", description: "A sleek, black-on-wood carved sign created for a boutique coffee shop in Brooklyn.", image: "/images/wood_bg.jpg", category: "Commercial" } },
    { _id: "mock2", data: { title: "Anniversary Metal Engraving", description: "Detailed commemorative metal plate with custom flourishing and typography.", image: "/images/metal1.jpg", category: "Personal" } },
    { _id: "mock3", data: { title: "Architectural Wood Panel", description: "Large scale CNC routed wood paneling for a hotel lobby.", image: "/images/wood_bg.jpg", category: "Architectural" } },
    { _id: "mock4", data: { title: "Industrial Maker Plate", description: "Heavy-duty etched stainless steel branding plate for machinery.", image: "/images/metal1.jpg", category: "Industrial" } }
  ];
}

function getMockServices() {
  return [
    {
        _id: "mock1",
        name: "Custom Design Consultation",
        description: "Book a 30-minute video call with our master carvers to discuss your unique project idea, material selection, and get a preliminary quote.",
        schedule: { durationInMinutes: 30 },
        media: { mainMedia: { image: "/images/wood_bg.jpg" } },
        paymentOptions: { wixPayOnline: { price: 0 } }
    },
    {
        _id: "mock2",
        name: "Corporate Gifting Strategy",
        description: "Need 50+ custom engraved items? Let's discuss timelines, bulk pricing discounts, and logistics for your upcoming corporate event.",
        schedule: { durationInMinutes: 45 },
        media: { mainMedia: { image: "/images/metal1.jpg" } },
        paymentOptions: { wixPayOnline: { price: 0 } }
    }
  ];
}

function getMockCategoryData(slug: string) {
  const categories: Record<string, any> = {
    "corporate-gifts": {
      collection: { _id: "mock-corporate", name: "Corporate Gifts", description: "Impress your clients and team with custom-engraved premium pieces." },
      products: [
        { _id: "c1", name: "Executive Pen Box", priceData: { formatted: { price: "$49.99" } }, media: { mainMedia: { image: { url: "/images/corporate/pen gift.png" } } }, ribbon: "Bestseller", slug: "executive-pen-box" },
        { _id: "c2", name: "Deer Statue Corporate Award", priceData: { formatted: { price: "$129.99" } }, media: { mainMedia: { image: { url: "/images/corporate/deer gift.png" } } }, slug: "deer-statue-award" },
        { _id: "c3", name: "Premium Metal Statue", priceData: { formatted: { price: "$199.99" } }, media: { mainMedia: { image: { url: "/images/corporate/statue metal.png" } } }, ribbon: "Sale", slug: "premium-metal-statue" },
      ]
    },
    "wedding-decor": {
      collection: { _id: "mock-wedding", name: "Wedding Decor", description: "Immortalize your special day with our masterfully carved stone and marble pieces." },
      products: [
        { _id: "w1", name: "Jesus Wedding Carving", priceData: { formatted: { price: "$89.99" } }, media: { mainMedia: { image: { url: "/images/wedding/Jesus wedding.png" } } }, ribbon: "New", slug: "jesus-wedding-carving" },
        { _id: "w2", name: "Stone and Marble Maria", priceData: { formatted: { price: "$159.99" } }, media: { mainMedia: { image: { url: "/images/wedding/Stone and marbel maria.png" } } }, slug: "stone-marble-maria" },
      ]
    },
    "wood": {
        collection: { _id: "mock-wood", name: "Wood Carvings", description: "Warm, natural, and timeless wood carvings for your home." },
        products: [
          { _id: "wd1", name: "Caribbean Islands Wood", priceData: { formatted: { price: "$69.99" } }, media: { mainMedia: { image: { url: "/images/wood/carribian islands wood.png" } } }, ribbon: "New", slug: "caribbean-islands-wood" },
        ]
    }
  };

  return categories[slug] || {
    collection: { _id: "mock-" + slug, name: slug.charAt(0).toUpperCase() + slug.slice(1), description: "Premium " + slug + " pieces." },
    products: getMockProducts().slice(0, 5)
  };
}
