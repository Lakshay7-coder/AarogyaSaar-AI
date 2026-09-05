RED_FLAG_RULES = [
    {
        "keywords": [
            "severe chest pain",
            "chest pain with sweating",
            "chest pain and breathlessness"
        ],

        "title":
            "Potential cardiac warning signs",

        "description":
            "Chest pain associated with concerning symptoms requires prompt medical review.",

        "severity":
            "HIGH"
    },

    {
        "keywords": [
            "difficulty breathing",
            "cannot breathe",
            "severe breathlessness",
            "saans lene mein bahut dikkat"
        ],

        "title":
            "Breathing difficulty detected",

        "description":
            "Significant breathing difficulty may require urgent clinical assessment.",

        "severity":
            "HIGH"
    },

    {
        "keywords": [
            "blood in vomit",
            "vomiting blood",
            "blood vomit"
        ],

        "title":
            "Blood in vomit detected",

        "description":
            "Reported bleeding requires prompt medical evaluation.",

        "severity":
            "HIGH"
    },

    {
        "keywords": [
            "unconscious",
            "fainted",
            "behosh",
            "बेहोश"
        ],

        "title":
            "Loss of consciousness reported",

        "description":
            "A reported episode of unconsciousness requires medical review.",

        "severity":
            "HIGH"
    }
]


def detect_red_flags(text):

    text_lower = text.lower()

    detected = []

    for rule in RED_FLAG_RULES:

        for keyword in rule["keywords"]:

            if keyword.lower() in text_lower:

                detected.append({
                    "title":
                        rule["title"],

                    "description":
                        rule["description"],

                    "severity":
                        rule["severity"]
                })

                break

    return detected