import {FaStar, FaRegStar, FaStarHalfAlt} from 'react-icons/fa'

const Rating = ({value, text}) => {
  const stars = [];
  const maxStars = 5;
  const roundedRating = Math.round(value * 2) / 2; // Round to the nearest half star

  for (let i = 0; i < maxStars; i++) {
    if (i < roundedRating) {
      if (i + 0.5 === roundedRating) {
        stars.push(<FaStarHalfAlt key={i} className="star half-star" />);
      } else {
        stars.push(<FaStar key={i} className="star full-star" />);
      }
    } else {
      stars.push(<FaRegStar key={i} className="star empty-star" />);
    }
  }

  return (
    <div className="rating">
        <span style={{fill:'red'}}>{stars}</span>
        <span>{text &&text}</span>
    </div>
  )
};

export default Rating;
