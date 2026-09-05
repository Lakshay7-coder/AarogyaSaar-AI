def generate_summary(
    patient_info,
    conversation,
    symptoms,
    red_flags,
    timeline
):

    chief_complaint = (
        conversation[0]["text"]
        if conversation
        else "Not available"
    )

    symptom_names = [
        item["name"]
        for item in symptoms
    ]

    red_flag_names = [
        item["title"]
        for item in red_flags
    ]

    history_parts = []

    for message in conversation:

        if message.get("speaker") == "patient":

            history_parts.append(
                message.get("text", "")
            )

    history = " ".join(history_parts)

    return {

        "chiefComplaint":
            chief_complaint,

        "history":
            history,

        "symptoms":
            symptom_names,

        "redFlags":
            red_flag_names,

        "documents": [],

        "suggestedQuestions": [
            "Confirm symptom duration",
            "Confirm severity",
            "Ask about associated symptoms",
            "Review previous medical history",
            "Review uploaded documents"
        ]
    }