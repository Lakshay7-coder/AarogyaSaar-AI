import re


SYMPTOM_KEYWORDS = {
    "pain": [
        "pain",
        "ache",
        "hurts",
        "dard",
        "दर्द"
    ],

    "fever": [
        "fever",
        "temperature",
        "bukhar",
        "बुखार"
    ],

    "vomiting": [
        "vomiting",
        "vomit",
        "ulti",
        "उल्टी"
    ],

    "nausea": [
        "nausea",
        "nauseous",
        "जी मिचलाना"
    ],

    "cough": [
        "cough",
        "khansi",
        "खांसी"
    ],

    "breathing difficulty": [
        "difficulty breathing",
        "breathlessness",
        "shortness of breath",
        "saans lene mein dikkat"
    ],

    "headache": [
        "headache",
        "sir dard",
        "सिर दर्द"
    ],

    "diarrhea": [
        "diarrhea",
        "loose motion",
        " दस्त"
    ]
}


def extract_symptoms(text: str):

    text_lower = text.lower()

    symptoms = []

    for symptom, keywords in SYMPTOM_KEYWORDS.items():

        matched = False

        for keyword in keywords:

            if keyword.lower() in text_lower:
                matched = True
                break

        if matched:

            body_part = detect_body_part(
                text_lower
            )

            duration = detect_duration(
                text_lower
            )

            severity = detect_severity(
                text_lower
            )

            symptoms.append({
                "name": symptom,
                "bodyPart": body_part,
                "duration": duration,
                "severity": severity,
                "confidence": 0.92
            })

    return symptoms


def detect_body_part(text):

    locations = {
        "abdomen": [
            "stomach",
            "abdomen",
            "pet",
            "पेट"
        ],

        "chest": [
            "chest",
            "सीने"
        ],

        "head": [
            "head",
            "sir",
            "सिर"
        ],

        "throat": [
            "throat",
            "gala",
            "गला"
        ]
    }

    for location, words in locations.items():

        for word in words:

            if word in text:
                return location

    return "unspecified"


def detect_duration(text):

    match = re.search(
        r"(\d+)\s*(day|days|din|दिन|week|weeks|hafta|हफ्ते)",
        text
    )

    if match:
        return match.group(0)

    if "today" in text or "aaj" in text:
        return "today"

    return "unspecified"


def detect_severity(text):

    high = [
        "severe",
        "very painful",
        "unbearable",
        "bahut zyada",
        "बहुत ज्यादा"
    ]

    medium = [
        "moderate",
        "medium",
        "thoda zyada"
    ]

    for word in high:
        if word in text:
            return "high"

    for word in medium:
        if word in text:
            return "medium"

    return "mild"