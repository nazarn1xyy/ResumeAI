
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
    try {
        const { text } = await req.json();

        if (!process.env.AI_API_KEY) {
            return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
        }

        const prompt = `Enhance this resume bullet point to be more professional, action-oriented, and impactful. Keep it concise (1 sentence). Do not add quotes. Input: "${text}"`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const enhancedText = response.text().trim();

        return NextResponse.json({ result: enhancedText });
    } catch (error) {
        console.error("AI Error:", error);
        return NextResponse.json({ error: "Failed to process AI request" }, { status: 500 });
    }
}
