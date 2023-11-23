export default function FinishScreen({
  points,
  fullPoints,
  highscore,
  dispatch,
}) {
  const percentage = (points / fullPoints) * 100;

  let emoji;
  if (percentage === 0) emoji = "👎 Fail";
  if (percentage > 0 && percentage <= 50) emoji = "✋ Below Avg";
  if (percentage > 50 && percentage <= 80) emoji = "✅ Pass";
  if (percentage > 80 && percentage <= 100) emoji = "💥 Good";
  if (percentage === 100) emoji = "💯 Great";

  return (
    <>
      <p className="result">
        <span>{emoji}</span>: You scored
        <strong>
          {points} out of {fullPoints}
        </strong>
        <strong> ({Math.ceil(percentage)}%)</strong>
      </p>
      <p className="highscore">(Highscore: {highscore} Points)</p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </>
  );
}
