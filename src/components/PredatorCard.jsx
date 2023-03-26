// src/components/PredatorCard.js

import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './PredatorCard.css';

const PredatorCard = ({ id, name, location, imageData }) => {
    const navigate = useNavigate();
    const imageUrl = `data:image/jpeg;base64,${imageData}`;

  const handleChatlogClick = () => {
    navigate(`/chatlog/${id}`);
};
return (
  <div className="predator-card" onClick={handleChatlogClick}>
    <div className="predator-info">
      <img className="predator-image" src={imageUrl} alt="Predator" />
      <div>
        <div><strong>{name}</strong></div>
        <div>{location}</div>
      </div>
    </div>
    <div>
     
      <span className="arrow">&gt;</span>
    </div>
  </div>
);
};

export default PredatorCard;

