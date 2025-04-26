import React from 'react';

function QuoteCard({ quote }) {
  return (
    <div className="card h-100 shadow-lg border-0 hover-shadow rounded-4 p-3">
      <div className="card-body d-flex flex-column justify-content-between">
        <p className="card-text fs-5 text-secondary">"{quote.text}"</p>
        <h5 className="card-title text-end text-primary fw-bold mt-4">- {quote.author}</h5>
        <div className="d-flex flex-wrap gap-2 mt-3">
          {quote.tags.map((tag, idx) => (
            <span key={idx} className="badge bg-gradient bg-info text-dark rounded-pill px-3 py-2">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default QuoteCard;
