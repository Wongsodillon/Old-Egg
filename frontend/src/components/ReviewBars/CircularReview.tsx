import "./BarStyles.scss"

const CircularReview = ({ percentage, type }: { percentage: number, type: string}) => {

  const gradientAngle = (percentage / 100) * 360;

  const circularReviewStyle = {
    background: `conic-gradient(var(--orange) 0deg ${gradientAngle}deg, var(--light-gray) ${gradientAngle}deg 360deg)`,
  };

  return ( 
    <div className="circular-review flex flex-col items-center justify-center" style={circularReviewStyle}>
      <p className="percentage">{percentage}%</p>
      <p className="review-type">{type.toLocaleUpperCase()}</p>
    </div>
  );
}
 
export default CircularReview;