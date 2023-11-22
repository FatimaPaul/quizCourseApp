import Options from "./Options";

export default function Question({ questions, yourAnswer, dispatch }) {
  console.log(questions);
  return (
    <div>
      <h4>{questions.question}</h4>
      <Options
        questions={questions}
        yourAnswer={yourAnswer}
        dispatch={dispatch}
      />
    </div>
  );
}
