import React, { useState } from "react";
import "./App.css"; // Importăm fișierul CSS

const App = () => {
  const [books, setBooks] = useState([
    { id: 1, camp1: "Cartea 1", camp2: "Autor 1", camp3: "Descriere 1" },
    { id: 2, camp1: "Cartea 2", camp2: "Autor 2", camp3: "Descriere 2" },
  ]);

  const [formData, setFormData] = useState({ camp1: "", camp2: "", camp3: "" });
  const [selectedBook, setSelectedBook] = useState(null);
  const [error, setError] = useState("");

  const handleAddBook = () => {
    if (!formData.camp1 || !formData.camp2) {
      setError("Camp1 și Camp2 sunt obligatorii!");
      return;
    }

    const newBook = {
      id: books.length + 1,
      ...formData,
    };

    setBooks([...books, newBook]);
    setFormData({ camp1: "", camp2: "", camp3: "" });
    setError("");
  };

  const handleDeleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
  };

  return (
    <div className="container">
      <h1>Gestionarea Cărților</h1>

      <div className="form-container">
        <h2>Adaugă Carte</h2>
        <input
          type="text"
          placeholder="Camp1 (Titlu)"
          value={formData.camp1}
          onChange={(e) => setFormData({ ...formData, camp1: e.target.value })}
        />
        <input
          type="text"
          placeholder="Camp2 (Autor)"
          value={formData.camp2}
          onChange={(e) => setFormData({ ...formData, camp2: e.target.value })}
        />
        <input
          type="text"
          placeholder="Camp3 (Descriere)"
          value={formData.camp3}
          onChange={(e) => setFormData({ ...formData, camp3: e.target.value })}
        />
        <button onClick={handleAddBook}>Adaugă</button>
        {error && <p className="error">{error}</p>}
      </div>

      <div className="book-list">
        <h2>Lista Cărților</h2>
        {books.map((book) => (
          <div key={book.id} className="card">
            <h3>{book.camp1}</h3>
            <p>Autor: {book.camp2}</p>
            <button onClick={() => handleSelectBook(book)}>Detalii</button>
            <button onClick={() => handleDeleteBook(book.id)}>Șterge</button>
          </div>
        ))}
      </div>

      {selectedBook && (
        <div className="details">
          <h2>Detalii Carte</h2>
          <p><strong>Camp1:</strong> {selectedBook.camp1}</p>
          <p><strong>Camp2:</strong> {selectedBook.camp2}</p>
          <p><strong>Camp3:</strong> {selectedBook.camp3 || "N/A"}</p>
          <button onClick={() => setSelectedBook(null)}>Închide</button>
        </div>
      )}
    </div>
  );
};

export default App;
