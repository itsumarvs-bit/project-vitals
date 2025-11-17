export async function analyzeSentiment(text) {
  const res = await fetch("http://127.0.0.1:5000/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    throw new Error("Sentiment analysis failed");
  }

  return await res.json();
}
