import { config } from '../config/config.js';

export class GoogleAPI {
  async generateResponse(text, history) {
    try {
      const response = await fetch(`${config.GOOGLE_API_URL}?key=${config.GOOGLE_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: history,
          generationConfig: {
            temperature: 0.9,
            topP: 1,
            topK: 1,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const { text } = data.candidates?.[0]?.content?.parts?.[0]

      if (!text) {
        throw new Error('Invalid response format');
      }

      return text;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async apiStatus() {
    const response = await fetch(`${config.GOOGLE_API_URL}?key=${config.GOOGLE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts:[
              {
                text: "Explain how AI works"
              }
            ]
          }
        ]
      })
    });

    return response.status ;
  }
}