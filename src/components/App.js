import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_QUES = 20;

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
  // highscore
  highscore: 0,
  // timer
  seconds: null,
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
        seconds: state.questions.length * SECS_PER_QUES,
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
    case "finished":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...state,
        index: 0,
        yourAnswer: null,
        points: 0,
        highscore: 0,
        status: "ready",
        seconds: initialState.seconds,
      };

    case "timer":
      return {
        ...state,
        seconds: state.seconds - 1,
        status: state.seconds === 0 ? "finished" : "active",
      };
    default:
      throw new Error("Unknown Action by the User");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status, index, yourAnswer, points, highscore, seconds } =
    state;
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
              <Footer>
                <Timer dispatch={dispatch} seconds={seconds} />
                <NextButton
                  dispatch={dispatch}
                  yourAnswer={yourAnswer}
                  index={index}
                  numOfQuestions={numOfQuestions}
                />
              </Footer>
            </>
          )}
          {status === "finished" && (
            <FinishScreen
              points={points}
              fullPoints={fullPoints}
              highscore={highscore}
              dispatch={dispatch}
            />
          )}
        </Main>
      </div>
    </>
  );
}
