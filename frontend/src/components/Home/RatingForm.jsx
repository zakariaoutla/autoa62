import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function RatingForm({ rating, setRating }) {
  return (
    <div style={{ display: "flex", gap: "5px", cursor: "pointer" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={24}
          color={star <= rating ? "#ffc107" : "#e4e5e9"}
          onClick={() => setRating(star)}
          onMouseEnter={() => setRating(star)}  
          onMouseLeave={() => setRating(rating)}
        />
      ))}
    </div>
  );
}
