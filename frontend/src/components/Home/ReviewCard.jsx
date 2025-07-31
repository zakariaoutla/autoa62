import { FaStar, FaCalendarAlt } from 'react-icons/fa';
import { RiVerifiedBadgeFill } from "react-icons/ri";

export default function ReviewCard({ review }) {
    return (
        <div className="review-card shadow rounded-4 p-4 my-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <div className='d-flex'>
                    <div
                        className="avatar bg-secondary text-white rounded-circle me-3 d-flex justify-content-center align-items-center"
                        style={{ width: 50, height: 50 }}
                    >
                        {review.user_fullname ? review.user_fullname.charAt(0) : '?'}
                    </div>
                    <div>
                        <h6 className="fw-bold mb-0">{review.user_fullname}</h6>
                        <div className="d-flex align-items-center mb-2">
                            <FaCalendarAlt className="me-2 text-muted" />
                            <small className="text-muted">{review.created_at?.slice(0, 10) || ''}</small>
                        </div>

                    </div>

                </div>
                <span><RiVerifiedBadgeFill className="text-success me-1" /> Verified Review</span>
            </div>

            <div className="d-flex align-items-center mb-2">
                {[...Array(Math.floor(review.rating))].map((_, i) => (
                    <FaStar key={i} className="text-warning me-1" />
                ))}
                <span className="text-dark ms-2">{review.rating.toFixed(1)}</span>
            </div>

            <div className="d-flex mb-2">
                <div className="me-4">
                    <small className="text-muted">🚗 <b>Vehicle:</b></small><br />
                    <span>{review.car_brand} {review.car_model}</span>
                </div>

            </div>

            <blockquote className="fst-italic text-secondary mt-5">"{review.comment || ''}"</blockquote>
        </div>
    );
}
