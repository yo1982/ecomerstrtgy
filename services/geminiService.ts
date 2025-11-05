
import { GoogleGenAI } from "@google/genai";
import { Product, Platform } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const getPricingStrategy = async (
  product: Product,
  platform: Platform,
  question: string
): Promise<string> => {
  const prompt = `
    You are an expert E-Commerce Strategy Consultant. Analyze the following product data and provide actionable advice.

    **Context:**
    - **Platform:** ${platform.name}
    - **Platform Commission Rate:** ${(platform.commissionRate * 100).toFixed(1)}%
    - **Sales Tax Rate:** ${(platform.taxRate * 100).toFixed(1)}%

    **Product Data:**
    - **Product Name:** ${product.name}
    - **Cost of Goods (Capital):** $${product.capital.toFixed(2)}
    - **Current Selling Price:** $${product.price.toFixed(2)}
    - **Units Sold:** ${product.unitsSold}
    - **Competitor Prices:** ${product.competitorPrices.map(p => `$${p.toFixed(2)}`).join(', ')}
    - **Monthly Advertising Budget:** $${product.adsBudget.toFixed(2)}
    - **SEO Score (0-100):** ${product.seoScore}
    - **Customer Rating (0-5):** ${product.rating}

    **User's Strategic Goal:**
    "${question}"

    **Your Task:**
    Based on all the provided data, generate a concise, actionable strategy. Structure your response with clear headings (e.g., **Pricing Adjustment**, **Marketing Focus**, **Risk Analysis**). Be specific and justify your recommendations with the data. For example, if you suggest a price change, calculate the potential impact on the profit margin.
    `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-pro',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
};
