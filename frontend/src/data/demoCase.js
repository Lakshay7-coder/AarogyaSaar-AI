export const demoCase = {
  _id: "demo-case",

  patient: {
    name: "Amit Sharma",
    email: "amit@example.com"
  },

  status: "awaiting_review",

  patientInfo: {
    age: 35,
    gender: "Male"
  },

  conversation: [
    {
      speaker: "patient",
      text:
        "I have been having severe stomach pain for five days."
    },

    {
      speaker: "ai",
      text:
        "Does anything make the pain worse?"
    },

    {
      speaker: "patient",
      text:
        "It becomes worse after meals."
    }
  ],

  extractedSymptoms: [
    {
      name: "pain",
      bodyPart: "abdomen",
      duration: "5 days",
      severity: "high",
      confidence: 0.92
    }
  ],

  redFlags: [
    {
      title:
        "Persistent severe abdominal pain",

      description:
        "Reported severe pain requires clinical review.",

      severity: "HIGH"
    }
  ],

  completeness: 84,

  documents: [
    {
      name:
        "Previous_Blood_Report.pdf",

      extractedText:
        "Previous laboratory report uploaded."
    }
  ],

  timeline: [
    {
      title:
        "Patient registered",

      description:
        "Patient case created."
    },

    {
      title:
        "History recorded",

      description:
        "AI-assisted history taking completed."
    },

    {
      title:
        "Medical report uploaded",

      description:
        "Previous blood report processed."
    }
  ],

  aiSummary: {
    chiefComplaint:
      "Severe abdominal pain for five days.",

    history:
      "Pain reportedly worsens after meals.",

    symptoms: [
      "Abdominal pain"
    ],

    redFlags: [
      "Persistent severe abdominal pain"
    ],

    suggestedQuestions: [
      "Confirm pain severity",
      "Ask about nausea or vomiting",
      "Review previous medical history"
    ]
  }
};