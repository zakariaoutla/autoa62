import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

export default function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  const stars = [];

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<FaStar key={i} className="text-warning me-1" />);
    } else if (i === fullStars && halfStar) {
      stars.push(<FaStarHalfAlt key={i} className="text-warning me-1" />);
    } else {
      stars.push(<FaRegStar key={i} className="text-warning me-1" />);
    }
  }

  return <>{stars}</>;
}
