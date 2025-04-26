import React, { useState } from 'react';
import axios from 'axios';
import QuoteCard from './QuoteCard';

const categories = [
  'books', 'life', 'love', 'humor', 'inspirational', 'music', 'truth', 'friendship', 'reading'
];

function CategorySelector() {
  const [quotes, setQuotes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const fetchQuotes = async (category) => {
    try {
      const response = await axios.get(`/quotes_by_category/${category}_quotes.json`);
      setQuotes(response.data);
      setSelectedCategory(category);
    } catch (error) {
      console.error('Error fetching quotes:', error);
      setQuotes([]);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 fw-bold display-4 text-primary">
        ✨ Quote Quest ✨
      </h1>

      <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => fetchQuotes(cat)}
            className="btn btn-outline-primary rounded-pill px-4 py-2 fw-bold fs-6"
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <h2 className="text-center text-secondary mb-5 fs-3">
        {selectedCategory ? `Quotes about "${selectedCategory}"` : 'Select a Category'}
      </h2>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {quotes.length > 0 ? (
          quotes.map((quote, idx) => (
            <div key={idx} className="col d-flex">
              <QuoteCard quote={quote} />
            </div>
          ))
        ) : (
          selectedCategory && (
            <p className="text-center text-muted fs-5">No quotes found for this category.</p>
          )
        )}
      </div>
    </div>
  );
}

export default CategorySelector;
