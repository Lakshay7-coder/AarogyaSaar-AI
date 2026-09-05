# AarogyaSaar AI — repaired prototype

A full-stack prototype for AI-assisted patient history taking, symptom extraction, red-flag support, document OCR, timelines and doctor verification.

## Requirements
- Node.js 18+
- MongoDB running locally (or a MongoDB URI)
- Python 3.10+
- A modern browser with Web Speech API support for voice input

## 1. Start MongoDB
Use a local MongoDB instance or set `backend/.env` `MONGO_URI` to your MongoDB connection string.

## 2. Start the AI service
```bash
cd ai-service
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

The AI service exposes `/`, `/analyze-response`, `/generate-summary`, `/ocr` and `/translate`.

## 3. Start the backend
```bash
cd backend
npm install
npm run dev
```

Backend: `http://localhost:5000`
Health check: `http://localhost:5000/api/health`

## 4. Start the frontend
```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`

## Main working flow
1. Register a patient account.
2. Confirm informed consent.
3. A real MongoDB case is created and patient details are saved.
4. Answer AI-assisted questions by text or voice.
5. Symptoms, red flags, completeness and timeline update from the backend.
6. Upload PDF/image reports for OCR processing.
7. Generate an AI clinical summary.
8. Register/login as a doctor and review submitted cases.
9. Edit the doctor summary and verify the case.

## Notes
- The AI layer is intentionally deterministic/local for prototype reliability; it does not claim to diagnose patients.
- OCR requires the Tesseract executable to be installed on the machine if actual image/PDF OCR is required. If Tesseract is unavailable, the API fails gracefully instead of crashing the application.
- Never use real patient data in a demonstration environment.
