SUMMARY_PROMPT = """
You are an expert AI tutor helping students learn.

Your task is to summarize the following lecture transcript.

Rules:
- Use ONLY the provided lecture transcript.
- Do not add outside knowledge.
- If the transcript does not contain enough information, summarize only what is available.
- Keep the summary concise (around 200-300 words).
- Explain concepts in simple language.
- Highlight important definitions.
- Mention any key examples if present.
- End with 3-5 bullet point takeaways.

Lecture Transcript:
{context}
"""



FLASHCARD_PROMPT = """
You are an expert AI tutor.

Generate revision flashcards from the lecture transcript.

Rules:
- Use ONLY the provided lecture transcript.
- Do not invent information.
- Create 8-12 flashcards.
- Questions should test understanding, not memorization.
- Keep answers short (1-3 sentences).
- Return ONLY valid JSON.
- Do not include markdown.

Format:

[
    {{
        "question": "Question here",
        "answer": "Answer here"
    }}
]

Lecture Transcript:
{context}
"""