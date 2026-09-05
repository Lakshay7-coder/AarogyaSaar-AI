def calculate_completeness(
    symptoms,
    conversation,
    red_flags
):

    score = 0

    if conversation:
        score += 20

    if symptoms:
        score += 25

    if any(
        item.get("duration")
        not in [None, "unspecified"]
        for item in symptoms
    ):
        score += 15

    if any(
        item.get("severity")
        not in [None, "unspecified"]
        for item in symptoms
    ):
        score += 15

    if len(conversation) >= 3:
        score += 15

    if red_flags:
        score += 10

    return min(score, 100)