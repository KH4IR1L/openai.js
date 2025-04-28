// openai.js
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

export async function sendChatMessage(apiKey, message, model = 'gpt-3.5-turbo') {
  if (!apiKey) throw new Error('API key tidak boleh kosong');
  const res = await fetch(OPENAI_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'user', content: message }]
    })
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI API error: ${err}`);
  }
  const { choices } = await res.json();
  return choices[0].message.content;
}
