from PyPDF2 import PdfReader
from pathlib import Path

pdf_path = list(Path('.').glob('*STI.pdf'))[0]
reader = PdfReader(pdf_path)

print(f"Total de páginas: {len(reader.pages)}\n")

for i, page in enumerate(reader.pages):
    text = page.extract_text()
    print(f'--- PÁGINA {i+1} ---')
    print(text)
    print("\n" + "="*80 + "\n")
