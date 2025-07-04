import React from "react";
import "./NewsModal.css";
import './Modal.css'

const NewsModal = ({ show, article, onClose }) => {
  if (!show) {
    return null;
  }
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </span>
        {article && (
            <>
             <img className="modal-image" src={article.image} alt={article.title} />
        <h2 className="modal-title">
          {article.title}
        </h2>
        <p className="modal-source">Source: {article.source.name}</p>
        <p className="modal-date">{new Date(article.publishedAt).toLocaleString('en-US', {month: 'short', 
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
            })}
            </p>
        <p className="modal-content-text">
         {article.content}
        </p>
        <a href={article.url} 
        className="read-more-link"
        target="_blank"
        rel="noopener noreferrer"
        >
          Read More...
        </a>
        </>
    )}
            
       
      </div>
    </div>
  );
};

export default NewsModal;
