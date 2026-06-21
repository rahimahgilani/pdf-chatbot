from langchain_chroma import Chroma
from embeddings import get_embeddings

def create_vector_store(chunks):
    embeddings = get_embeddings()
    
    vector_store = Chroma(
        collection_name="pdf-embeddings",
        embedding_function=embeddings,
        persist_directory="../data/chroma_db",
    )
    
    vector_store.add_texts(chunks)
    
    return vector_store
