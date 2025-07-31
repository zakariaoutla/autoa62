import { useEffect, useState } from 'react';
import axios from 'axios';
import ReviewCard from './ReviewCard';

export default function ReviewCarousel() {
    const [reviews, setReviews] = useState([]);
    const [current, setCurrent] = useState(0);
    const cardsPerView = 3;

    useEffect(() => {
        axios.get('http://localhost:8080/review/reviews')
            .then(res => setReviews(res.data))
            .catch(err => console.error(err));
    }, []);

    const totalSlides = Math.ceil(reviews.length / cardsPerView);

    const handleNext = () => {
        setCurrent((prev) => (prev + 1) % totalSlides);
    };

    const handlePrev = () => {
        setCurrent((prev) => (prev - 1 + totalSlides) % totalSlides);
    };

    
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 4000);

        return () => clearInterval(interval);
    }, [reviews]);

    const startIndex = current * cardsPerView;
    const visibleCards = reviews.slice(startIndex, startIndex + cardsPerView);

    return (
        <div className="container mt-4 text-center">
            <div className="row justify-content-center">
                {visibleCards.map((review, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                        <ReviewCard review={review} />
                    </div>
                ))}
            </div>

            <div className="d-flex justify-content-between align-items-center mt-3">
                <button className="btn btn-outline-warning px-4 rounded-pill" onClick={handlePrev}>
                    ← Previous
                </button>

                <div className="dots d-flex gap-2">
                    {[...Array(totalSlides)].map((_, index) => (
                        <span key={index} className={`dot ${index === current ? 'active' : ''}`}></span>
                    ))}
                </div>

                <button className="btn btn-outline-warning px-4 rounded-pill" onClick={handleNext}>
                    Next →
                </button>
            </div>
        </div>
    );
}
