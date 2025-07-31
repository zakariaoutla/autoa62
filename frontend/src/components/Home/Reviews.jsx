import StarRating from "./StarRating";

export default function Reviews({ rating, reviewsCount }) {
  

  const safeRating = typeof rating === "number" && !isNaN(rating) ? rating.toFixed(1) : "0.0";
  const safeCount = typeof reviewsCount === "number" ? reviewsCount : 0;

  return (
    <div className="d-flex align-items-center mt-2">
      <StarRating rating={rating ?? 0} />
      <strong className="ms-2">{safeRating}</strong>
      <span className="text-muted ms-1">
        ({safeCount > 0 ? `${safeCount} reviews` : "No reviews"})
      </span>
    </div>
  );
}
