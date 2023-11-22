export default function Options({ questions, yourAnswer, dispatch }) {
  console.log(yourAnswer);
  // if you already gave the answer and it is now not null but a number
  const hasYourAnswer = yourAnswer !== null;

  return (
    <div className="options">
      {questions.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === yourAnswer ? "answer" : ""} ${
            (yourAnswer || yourAnswer === 0) &&
            (index === questions.correctOption ? "correct" : "wrong")
          }`}
          key={option}
          disabled={hasYourAnswer}
          onClick={() => dispatch({ type: "Answered", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
