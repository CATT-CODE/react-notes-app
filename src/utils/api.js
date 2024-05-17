import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const summarizeText = async (text) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Summarize the following text into a note body: \n\n${text}`}],
        max_tokens: 50,
        temperature: 0.5,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating summary:', error.message);
    if (error.response) {
      console.error('Error details:', error.response.data);
    }
    throw new Error('Error generating summary');
  }
};
