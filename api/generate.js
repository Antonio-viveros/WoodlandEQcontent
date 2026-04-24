export default async function handler(req, res) {
  const { product } = req.body;

  const prompt = `
You are a marketing expert for Woodland commercial equipment.

Product: ${product}

Return ONLY valid JSON:
{
  "idea": "short reel idea",
  "caption": "professional marketing caption",
  "hashtags": "instagram hashtags",
  "script": "short reel script with hook, value, CTA"
}
`;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8
      })
    });

    const data = await response.json();

    const text = data.choices[0].message.content;

    res.status(200).json(JSON.parse(text));

  } catch (err) {
    res.status(500).json({ error: "AI request failed" });
  }
}
