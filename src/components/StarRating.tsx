import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

interface StarRatingProps {
  rating: number;
  onChange: (value: number) => void;
}


const StarRating: React.FC<StarRatingProps> = ({ rating, onChange }) => {
  const [starCount, setStarCount] = useState(0);
  const [isGreyed, setIsGreyed] = useState(true);

  useEffect(() => {
    setStarCount(rating);
  }, [rating]);

  const handleStarClick = (value: number) => {
    if (value === starCount && isGreyed) {
      onChange(0);
      setStarCount(0);
      setIsGreyed(true);
    } else {
      onChange(value);
      setStarCount(value);
      setIsGreyed(true);
    }
  
  };


  return (
    <div>
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          onClick={() => handleStarClick(value)}
          style={{ cursor: 'pointer', color: value <= starCount ? 'gold' : (isGreyed ? 'gray' : 'gold') }}
        >
          <FaStar />
        </span>
      ))}
    </div>
  );
};

export default StarRating;
