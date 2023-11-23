import { useEffect } from "react";

export default function Timer({ dispatch, seconds }) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  useEffect(
    function () {
      // set interval returns a unique id
      const id = setInterval(function () {
        dispatch({ type: "timer" });
      }, 1000);

      //  when we restatr the timer so one more timer starts so there are many timers so we have to clean th timer
      return () => clearInterval(id);
    },
    [dispatch]
  );
  return (
    <div className="timer">
      {mins < 10 ? `0${mins}` : mins}:{secs < 10 ? `0${secs}` : secs}
    </div>
  );
}
