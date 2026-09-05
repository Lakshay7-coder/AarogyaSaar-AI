const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },

    status: {
      type: String,
      enum: [
        "draft",
        "in_progress",
        "awaiting_review",
        "verified"
      ],
      default: "draft"
    },

    consent: {
      granted: {
        type: Boolean,
        default: false
      },

      timestamp: {
        type: Date,
        default: null
      }
    },

    patientInfo: {
      age: Number,
      gender: String,
      phone: String,
      address: String
    },

    conversation: [
      {
        speaker: {
          type: String,
          enum: ["ai", "patient"]
        },

        text: String,

        language: String,

        timestamp: {
          type: Date,
          default: Date.now
        }
      }
    ],

    extractedSymptoms: [
      {
        name: String,
        bodyPart: String,
        duration: String,
        severity: String,
        confidence: Number
      }
    ],

    redFlags: [
      {
        title: String,
        description: String,
        severity: {
          type: String,
          enum: ["LOW", "MEDIUM", "HIGH"]
        },
        detectedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

    adaptiveQuestions: [String],

    documents: [
      {
        name: String,
        fileUrl: String,
        extractedText: String,
        uploadedAt: {
          type: Date,
          default: Date.now
        }
      }
    ],

    timeline: [
      {
        title: String,
        description: String,
        date: Date,
        source: String
      }
    ],

    aiSummary: {
      chiefComplaint: String,
      history: String,
      symptoms: [String],
      redFlags: [String],
      documents: [String],
      suggestedQuestions: [String]
    },

    doctorSummary: {
      type: String,
      default: ""
    },

    completeness: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Case", caseSchema);