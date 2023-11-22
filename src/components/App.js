import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";

const initialState = {
  questions: [],
  // "loading", "error", "ready", "active",  "finished"
  status: "loading",
  // question index
  index: 0,
  // your question
  yourAnswer: null,
  // question points
  points: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "Answered":
      // making a variable from the current state which is (state.questions)
      const question = state.questions.at(state.index);
      return {
        ...state,
        yourAnswer: action.payload,
        // setting state from the payload of yourAnswer state
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        yourAnswer: null,
      };
    default:
      throw new Error("Unknown Action by the User");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, yourAnswer, points } = state;
  const numOfQuestions = questions.length;
  const fullPoints = questions.reduce((acc, curr) => acc + curr.points, 0);
  // console.log(numOfQuestions);

  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <>
      <div className="app">
        <Header />
        <Main>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && (
            // Pass the dispatch function as an Event Handler in the prop
            <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />
          )}
          {status === "active" && (
            <>
              <Progress
                numOfQuestions={numOfQuestions}
                index={index}
                points={points}
                fullPoints={fullPoints}
                yourAnswer={yourAnswer}
              />
              <Question
                questions={questions[index]}
                yourAnswer={yourAnswer}
                dispatch={dispatch}
              />
              <NextButton dispatch={dispatch} yourAnswer={yourAnswer} />
            </>
          )}
        </Main>
      </div>
    </>
  );
}
