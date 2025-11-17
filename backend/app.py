import json
from flask import Flask, request, jsonify
from flask_cors import CORS
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

app = Flask(__name__)
CORS(app)

# Load custom lexicon
with open("custom_lexicon.json", "r") as f:
    custom_words = json.load(f)

analyzer = SentimentIntensityAnalyzer()
analyzer.lexicon.update(custom_words)

# Threshold-based label function
def get_sentiment_label(score):
    if score >= 0.2:       # adjust threshold here
        return "positive"
    elif score <= -0.2:
        return "negative"
    else:
        return "neutral"

# 👉 Put your /analyze route here
@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.get_json()
    text = data.get("text", "")
    scores = analyzer.polarity_scores(text)
    label = get_sentiment_label(scores["compound"])
    return jsonify({
        "compound": scores["compound"],
        "label": label,
        "scores": scores
    })

if __name__ == "__main__":
    app.run(debug=True)