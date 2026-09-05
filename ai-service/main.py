from fastapi import FastAPI
from pydantic import BaseModel

from app.services.nlp import extract_symptoms
from app.services.red_flags import detect_red_flags
from app.services.adaptive_questions import generate_next_question
from app.services.summarizer import generate_summary
from app.services.ocr import extract_text_from_file
from app.utils.medical_rules import calculate_completeness


app = FastAPI(
    title="AarogyaSaar AI Service",
    version="1.0.0"
)


class AnalyzeRequest(BaseModel):
    text: str
    language: str = "en"
    conversation: list = []


class SummaryRequest(BaseModel):
    patientInfo: dict = {}
    conversation: list = []
    symptoms: list = []
    redFlags: list = []
    timeline: list = []


class OCRRequest(BaseModel):
    filePath: str


class TranslationRequest(BaseModel):
    text: str
    sourceLanguage: str
    targetLanguage: str


@app.get("/")
def root():
    return {
        "service": "AarogyaSaar AI Service",
        "status": "running"
    }


@app.post("/analyze-response")
def analyze_response(request: AnalyzeRequest):

    symptoms = extract_symptoms(request.text)

    red_flags = detect_red_flags(request.text)

    question = generate_next_question(
        symptoms,
        request.conversation,
        red_flags
    )

    completeness = calculate_completeness(
        symptoms,
        request.conversation,
        red_flags
    )

    return {
        "symptoms": symptoms,
        "redFlags": red_flags,
        "nextQuestion": question,
        "completeness": completeness,
        "language": request.language
    }


@app.post("/generate-summary")
def summary(request: SummaryRequest):

    return generate_summary(
        request.patientInfo,
        request.conversation,
        request.symptoms,
        request.redFlags,
        request.timeline
    )


@app.post("/ocr")
def ocr(request: OCRRequest):

    return extract_text_from_file(
        request.filePath
    )


@app.post("/translate")
def translate(request: TranslationRequest):

    return {
        "translatedText": request.text,
        "sourceLanguage": request.sourceLanguage,
        "targetLanguage": request.targetLanguage,
        "provider": "prototype"
    }