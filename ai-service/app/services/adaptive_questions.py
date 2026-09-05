def generate_next_question(
    symptoms,
    conversation,
    red_flags
):

    if red_flags:

        return (
            "How severe is this problem right now, "
            "and when did it start?"
        )

    if not symptoms:

        return (
            "Could you describe where you "
            "feel the problem?"
        )

    symptom_names = [
        item["name"]
        for item in symptoms
    ]

    if "pain" in symptom_names:

        has_severity = any(
            item.get("severity")
            not in [None, "unspecified"]
            for item in symptoms
        )

        if not has_severity:

            return (
                "On a scale of 1 to 10, "
                "how severe is the pain?"
            )

        return (
            "Does anything make the pain "
            "better or worse, such as food, "
            "movement or rest?"
        )

    if "fever" in symptom_names:

        return (
            "Have you measured your temperature? "
            "If yes, what was the highest reading?"
        )

    if "vomiting" in symptom_names:

        return (
            "How many times have you vomited "
            "in the last 24 hours?"
        )

    return (
        "Have you experienced any other "
        "symptoms along with this?"
    )