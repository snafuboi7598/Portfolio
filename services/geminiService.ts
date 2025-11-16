
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available as an environment variable
if (!process.env.API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this context, we assume it's set.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

/**
 * Summarizes a block of text using the Gemini API.
 * @param text The text to summarize.
 * @returns A promise that resolves to the summarized text.
 */
export const summarizeWithAI = async (text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Please summarize the following work experience in 2-3 concise bullet points for a resume. Focus on key achievements and technical skills demonstrated:\n\n---\n${text}\n---`,
        config: {
            temperature: 0.3,
            topP: 0.9,
            maxOutputTokens: 150,
        }
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate summary from AI.");
  }
};
