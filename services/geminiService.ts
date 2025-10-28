// Fix: Use GenerateContentParameters instead of deprecated GenerateContentRequest.
import { GoogleGenAI, GenerateContentParameters } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = 'gemini-2.5-flash';

const systemInstruction = `You are a world-class expert AI assistant specializing in California prevailing wage regulations for solar and energy storage contractors. Your knowledge is current to 2025-2026 and focuses on AB 2143 (for projects >15kW) and AB 1104 (for small businesses). Provide clear, accurate, and concise answers. When presenting information, use markdown for formatting, including lists, bold text, and tables where appropriate to enhance readability. Always include a disclaimer that your advice is for informational purposes and not a substitute for legal counsel or direct consultation with the California Department of Industrial Relations (DIR).`;

interface GenerateContentOptions {
    model?: string;
    config?: GenerateContentParameters['config'];
}

export const generateContent = async (prompt: string, options: GenerateContentOptions = {}): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: options.model || model,
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        ...options.config,
      },
    });
    
    const text = response.text;
    
    // Ensure that the function always returns a string to prevent crashes.
    if (typeof text === 'string') {
      return text;
    }

    // Handle cases where the API call succeeds but returns no text (e.g., due to safety filters).
    const errorMessage = "An error occurred: The AI assistant did not provide a text response. This may be due to safety filters. Please try rephrasing your request.";
    console.error("Gemini API returned no text.", response);
    return errorMessage;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        return `An error occurred while communicating with the AI assistant: ${error.message}. Please try again.`;
    }
    return "An unknown error occurred while communicating with the AI assistant.";
  }
};