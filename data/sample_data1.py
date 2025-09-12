# This file holds our sample data (query and documents/corpus).
# We define it here to keep our main script clean.

# A single query string we want to find an answer for.
QUERY = "Which planet is known as the Red Planet?"

# A list of document strings that form our knowledge corpus.
# We will convert these to embeddings and compare them to the query.
DOCUMENTS = [
    "Venus is the second planet from the Sun and is often called Earth's twin because of its similar size and proximity.",
    "Mars is the fourth planet from the Sun and is frequently referred to as the Red Planet due to its reddish appearance caused by iron oxide on its surface.",
    "Jupiter is the fifth and largest planet in our solar system, a gas giant known for its prominent Great Red Spot, a giant storm.",
    "Saturn is the sixth planet from the Sun, famous for its extensive and visible ring system made of ice particles and dust.",
]

# Optional: A more complex example using a list of dictionaries.
# This is useful if you have metadata like titles, which work well with EmbeddingGemma's prompts.
DOCUMENTS_WITH_META = [
    {
        "title": "Venus",
        "text": "Venus is often called Earth's twin because of its similar size and proximity.",
    },
    {
        "title": "Mars",
        "text": "Mars, known for its reddish appearance, is often referred to as the Red Planet.",
    },
    {
        "title": "Jupiter",
        "text": "Jupiter, the largest planet in our solar system, has a prominent red spot.",
    },
    {
        "title": "Saturn",
        "text": "Saturn, famous for its rings, is sometimes mistaken for the Red Planet.",
    },
]
