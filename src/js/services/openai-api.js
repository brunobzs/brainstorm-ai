import { config } from '../config/config.js';
import OpenAI from "openai";

// export class OpenAiAPI {
//   async generateResponse(text) {
//     const apiKey = config.OPENAI_API_KEY;
//     const response = await fetch('https://api.openai.com/v1/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${apiKey}`
//       },
//       body: JSON.stringify({
//         model: 'text-davinci-003',
//         prompt: `${text}`,
//         temperature: 0.8,
//         max_tokens: 2048,
//         n: 1
//       })
//     });
//
//     const data = await response.json();
//     return data.choices[0].text;
//   }
// }

const client = new OpenAI({ apiKey: config.OPENAI_API_KEY });

const response = await client.responses.create({
  model: 'gpt-3.5-turbo',
  input: 'Write a one-sentence bedtime story about a unicorn.'
});

console.log(response.output_text);