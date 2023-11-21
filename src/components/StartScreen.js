export default function StartScreen({ numOfQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Hello to The React Quiz App!</h2>
      <h3>{numOfQuestions} Questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        let's Start
      </button>
    </div>
  );
}
