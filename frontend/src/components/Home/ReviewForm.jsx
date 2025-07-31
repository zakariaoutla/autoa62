import { useState } from "react";
import axios from "axios";
import RatingForm from "./RatingForm";

export default function ReviewForm({ userId, carId, onClose, onReviewAdded }) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (rating < 1 || rating > 5) {
            setError("Please choose a rating between 1 and 5");
            setLoading(false);
            return;
        }

        try {
            await axios.post("http://localhost:8080/review/reviews", {
                user_id: userId,
                car_id: carId,
                rating,
                comment,
            });
            onReviewAdded();
            onClose();
        } catch (err) {
            setError("An error occurred while submitting the evaluation");
            console.error(err);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="review-form">
            <div>
                <RatingForm rating={rating} setRating={setRating} />
            </div>
            <div className="mt-3">
                <label>
                    Comment:
                </label>
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your feedback here..."
                    rows={4}
                    className="form-control"
                />

            </div>
            <div className="mt-3">
                {error && <p className="text-danger">{error}</p>}
            <button type="submit" className="btn btn-warning text-light" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
            </button>
            <button type="button" className="btn btn-secondary ms-2" onClick={onClose} disabled={loading}>
                Cancel
            </button>

            </div>

            
        </form>
    );
}
