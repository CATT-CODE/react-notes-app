import axios from 'axios';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

const API_URL = 'https://api.openai.com/v1/chat/completions'

export const summarizeText = async (text) => {
  try {
    const response = await axios.post(
      API_URL,
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

export const generateNote = async (prompt) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `Create a detailed note on the following topic: \n\n${prompt}`}],
        max_tokens: 150,
        temperature: 0.6,
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
    console.error('Error generating note:', error.message);
    if (error.response) {
      console.error('Error details:', error.response.data);
    }
    throw new Error('Error generating note');
  }
};
