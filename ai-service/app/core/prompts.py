SUMMARY_PROMPT = """
You are an expert AI tutor helping students learn.

Your task is to create a clear study summary from the lecture transcript.

Rules:
- Use ONLY the provided lecture transcript.
- Do not add outside knowledge.
- If information is missing, do not guess.
- Write the summary as structured study notes.
- Use bullet points instead of long paragraphs.
- Keep each bullet short and easy to understand.
- Highlight important definitions, concepts, and examples.
- Keep the summary around 150-200 words.
- Start directly with the notes. Do not write "Here is the summary".

Format:

• Main concept or topic
• Important definition
• Explanation of the concept
• Example mentioned in the lecture
• Key points to remember
• Important takeaway

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

QUIZ_PROMPT = """
You are an expert AI tutor.

Generate a quiz from the lecture transcript.

Rules:
- Use ONLY the provided lecture transcript.
- Do not add outside knowledge.
- Create 5 multiple choice questions.
- Each question must have exactly 4 options.
- Only one option should be correct.
- Questions should test understanding.
- Return ONLY valid JSON.
- Do not include markdown.

Format:

[
    {{
        "question_text": "Question here",
        "options": [
            {{
                "option_text": "Option A",
                "is_correct": false
            }},
            {{
                "option_text": "Option B",
                "is_correct": true
            }},
            {{
                "option_text": "Option C",
                "is_correct": false
            }},
            {{
                "option_text": "Option D",
                "is_correct": false
            }}
        ]
    }}
]

Lecture Transcript:

{context}
"""