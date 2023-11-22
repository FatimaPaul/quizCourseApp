export default function Progress({
  index,
  numOfQuestions,
  points,
  fullPoints,
  yourAnswer,
}) {
  return (
    <header className="progress">
      <progress
        max={numOfQuestions}
        value={index + Number(yourAnswer !== null)}
      />
      <p>
        Questions {index + 1}/{numOfQuestions}
      </p>

      <p>
        Points {points}/{fullPoints}
      </p>
    </header>
  );
}
