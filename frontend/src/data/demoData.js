export const demoCase = {
  id: "CASE-2026-001",
  patient: {
    name: "Amit Sharma",
    age: 35,
    gender: "Male",
    phone: "+91 98XXXXXX21",
    bloodGroup: "B+"
  },

  status: "Awaiting Doctor Review",

  symptoms: [
    {
      name: "Abdominal Pain",
      severity: "Moderate",
      duration: "5 days"
    },
    {
      name: "Nausea",
      severity: "Mild",
      duration: "2 days"
    }
  ],

  extractedInformation: [
    "Upper abdominal discomfort",
    "Pain increases after meals",
    "Symptoms started 5 days ago",
    "Occasional nausea"
  ],

  redFlags: [
    {
      title: "Persistent abdominal pain",
      severity: "High",
      message:
        "Persistent pain has been detected. Doctor review is recommended."
    }
  ],

  completeness: 84,

  currentQuestion:
    "Have you experienced vomiting, fever, or unusual weakness?",

  summary: `35-year-old male presenting with abdominal pain for approximately five days. Patient reports that discomfort increases after meals and is associated with occasional nausea. Further clinical evaluation is recommended.`,

  timeline: [
    {
      date: "02 Sep 2026",
      title: "Case Created",
      description: "Patient registration completed.",
      type: "registration"
    },
    {
      date: "02 Sep 2026",
      title: "AI Case Taking",
      description: "Initial symptoms captured using conversational history taking.",
      type: "ai"
    },
    {
      date: "02 Sep 2026",
      title: "Red Flag Detected",
      description: "Persistent abdominal pain requires doctor review.",
      type: "warning"
    }
  ],

  documents: [
    {
      id: 1,
      name: "Previous_Test_Report.pdf",
      type: "PDF",
      status: "Processed"
    }
  ]
};

export const demoPatients = [
  {
    id: "CASE-2026-001",
    name: "Amit Sharma",
    age: 35,
    gender: "Male",
    complaint: "Abdominal Pain",
    status: "Awaiting Review",
    priority: "High",
    completeness: 84,
    time: "10 min ago"
  },
  {
    id: "CASE-2026-002",
    name: "Priya Verma",
    age: 28,
    gender: "Female",
    complaint: "Migraine",
    status: "AI Processing",
    priority: "Medium",
    completeness: 67,
    time: "24 min ago"
  },
  {
    id: "CASE-2026-003",
    name: "Rahul Singh",
    age: 42,
    gender: "Male",
    complaint: "Joint Pain",
    status: "Verified",
    priority: "Low",
    completeness: 96,
    time: "1 hr ago"
  }
];