import os
from pathlib import Path
import pytesseract
from PIL import Image


def extract_text_from_file(file_path):
    if not file_path or not os.path.exists(file_path):
        return {"text": "", "entities": [], "error": "File not found"}
    try:
        suffix = Path(file_path).suffix.lower()
        if suffix == ".pdf":
            try:
                import fitz
                doc = fitz.open(file_path)
                text = "\n".join(page.get_text("text") for page in doc).strip()
                doc.close()
                return {"text": text, "entities": extract_entities(text), "method": "pdf-text"}
            except Exception as pdf_error:
                return {"text": "", "entities": [], "error": f"PDF extraction failed: {pdf_error}"}

        image = Image.open(file_path)
        text = pytesseract.image_to_string(image).strip()
        return {"text": text, "entities": extract_entities(text), "method": "tesseract"}
    except Exception as error:
        return {"text": "", "entities": [], "error": str(error)}


def extract_entities(text):
    entities = []
    keywords = ["hemoglobin", "blood pressure", "glucose", "cholesterol", "temperature"]
    lower_text = (text or "").lower()
    for keyword in keywords:
        if keyword in lower_text:
            entities.append({"type": "medical_measurement", "value": keyword})
    return entities
