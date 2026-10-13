import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

async function startServer() {
  const app = express();
  app.use(express.json());

  // API endpoint for AI Change Story script generation
  app.post('/api/generate-script', async (req, res) => {
    try {
      const { topic, goal, audience, tone } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        // Fallback mock script generation if no API key is provided
        return res.json({
          title: `Transformation Story: ${topic}`,
          logline: `A journey from ${topic} toward ${goal} for ${audience}.`,
          scenes: [
            {
              sceneNumber: 1,
              title: "The Status Quo & Frustration",
              duration: "5s",
              visualPrompt: "Cinematic shot of dark stormy clouds over a cluttered office desk, dramatic lighting",
              narration: `Before change, we faced constant bottlenecks with ${topic}. Every day felt like an uphill battle.`,
              transition: "Fade In"
            },
            {
              sceneNumber: 2,
              title: "The Catalyst for Change",
              duration: "6s",
              visualPrompt: "Bright ray of golden sunlight breaking through clouds, illuminating a glowing blueprint",
              narration: `Then the turning point arrived. We realized we needed to shift toward ${goal}.`,
              transition: "Slide Left"
            },
            {
              sceneNumber: 3,
              title: "The New Vision & Triumph",
              duration: "7s",
              visualPrompt: "Diverse team smiling together in a sleek, modern, well-lit workspace reviewing soaring analytics charts",
              narration: `Today, for ${audience}, we have unlocked unprecedented clarity, speed, and success. The future is bright.`,
              transition: "Zoom In"
            }
          ]
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `Create a structured change story video script and storyboard about "${topic}" with the goal "${goal}" targeted at "${audience}" in a "${tone}" tone.
      Return valid JSON with the following schema:
      {
        "title": "string",
        "logline": "string",
        "scenes": [
          {
            "sceneNumber": number,
            "title": "string",
            "duration": "string (e.g. 5s)",
            "visualPrompt": "string (vivid image prompt)",
            "narration": "string (voiceover script)",
            "transition": "string"
          }
        ]
      }`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const text = response.text();
      if (!text) {
        throw new Error("Empty response from Gemini");
      }

      const data = JSON.parse(text);
      res.json(data);
    } catch (err: any) {
      console.error("Gemini script generation error:", err);
      res.status(500).json({ error: err.message || "Failed to generate script" });
    }
  });

  // Vite dev server integration
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  const port = 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
  });
}

startServer();
