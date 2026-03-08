"use server";

import { getWixClient } from "@/lib/wixClient";

const GOOGLE_API_KEY = process.env.GEMINI_API_KEY;

type GenerationInput = {
    name: string;
    role: string;
    tech: string;
    vibe: string;
};

export async function generatePortfolio(data: GenerationInput) {
    if (!GOOGLE_API_KEY) {
        return {
            success: false,
            error: "Environment variable GEMINI_API_KEY is missing. Please add it to your .env.local to enable AI generation."
        };
    }

    try {
        const prompt = `
            You are an expert copywriter and developer. A user wants to generate content for their professional portfolio.
            They provided the following details:
            Name: ${data.name}
            Job Role: ${data.role}
            Tech Stack: ${data.tech}
            Vibe/Tone: ${data.vibe}

            Please generate a JSON object with the following exact structure, filling it with realistic, creative, and professional content that matches their vibe:
            {
                "bio": {
                    "tagline": "A short punchy tagline (e.g., Building scalable architectures).",
                    "aboutMe": "A 2-3 paragraph professional bio using html tags like <p> and <strong> tailored to their context."
                },
                "projects": [
                    {
                        "title": "A realistic project name based on their tech stack",
                        "shortSummary": "1 sentence description",
                        "fullDescription": "1 paragraph description of the problem and solution",
                        "techStack": ["Tech1", "Tech2", "Tech3"]
                    },
                    // exactly 3 projects
                ],
                "testimonials": [
                    {
                        "title": "A random name (e.g., Sarah Jenkins)",
                        "company": "A random fictional tech company",
                        "review": "A 2 sentence glowing review.",
                        "rating": 5
                    },
                    // exactly 2 testimonials
                ]
            }
            Respond with ONLY the raw JSON object, no markdown blocks, no \`\`\`json, just the raw text.
        `;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GOOGLE_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    responseMimeType: "application/json",
                }
            })
        });

        if (!response.ok) {
            const errBody = await response.text();
            throw new Error(`Gemini API Error: ${errBody}`);
        }

        const aiData = await response.json();

        let rawJson = aiData.candidates[0].content.parts[0].text;

        // Clean up markdown markers if Gemini ignores prompt instructions
        rawJson = rawJson.replace(/```json/g, "").replace(/```/g, "").trim();

        const payload = JSON.parse(rawJson);

        // --- Now insert into Wix Headless CMS ---

        const wixClient = getWixClient();

        // Ensure "Create Content" is set to "Anyone" for these collections in Wix Dashboard
        // 1. Insert Bio
        await (wixClient.items as any).insert("FreelancerBio", {
            title: data.name,
            jobRole: data.role,
            tagline: payload.bio.tagline,
            aboutMe: payload.bio.aboutMe,
            techStack: data.tech.split(",").map((s: string) => s.trim()),
            hourlyRate: 150 // default fallback
        });

        // // 2. Insert Projects
        for (const proj of payload.projects) {
            const slug = proj.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
            await (wixClient.items as any).insert("PortfolioProjects", {
                title: proj.title,
                slug: slug,
                shortSummary: proj.shortSummary,
                fullDescription: proj.fullDescription,
                techStack: proj.techStack,
                isFeatured: true
            });
        }

        // // 3. Insert Testimonials
        for (const test of payload.testimonials) {
            await (wixClient.items as any).insert("Testimonials", {
                title: test.title,
                company: test.company,
                review: test.review,
                rating: test.rating
            });
        }

        return { success: true };

    } catch (error: any) {
        console.error("AI Generation Failed:", error);
        return { success: false, error: error.message };
    }
}
