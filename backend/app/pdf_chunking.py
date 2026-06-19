import pymupdf

# Step 1: Open a document
doc = pymupdf.open("pdf-chatbot\backend\test.pdf")

# Step 2: Extract text from a PDF
out = open("output.txt", "wb")

# Step 3: Iterate the document pages
for page in doc:
    # gets plain text
    text = page.get_text().encode("utf8")
    # write the text of the page 
    out.write(text)
    # write page delimiter
    out.write(bytes((12,))) 
out.close()