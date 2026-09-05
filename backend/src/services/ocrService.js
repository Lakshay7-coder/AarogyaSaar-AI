const axios = require("axios");

const AI_URL =
  process.env.AI_SERVICE_URL ||
  "http://127.0.0.1:8000";

exports.extractText = async (filePath) => {
  try {
    const response = await axios.post(
      `${AI_URL}/ocr`,
      {
        filePath
      },
      {
        timeout: 60000
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "OCR service unavailable:",
      error.message
    );

    return {
      text: "OCR processing unavailable",
      entities: []
    };
  }
};