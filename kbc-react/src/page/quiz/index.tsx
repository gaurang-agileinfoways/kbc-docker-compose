import { SetStateAction, useEffect, useRef, useState } from "react";
import { quizAPI } from "../../service/api/quiz";
import toast from "react-hot-toast";
import { socketInstance } from "../../service/socket";
import { TextExistModel } from "./models/testExist";
import { getCurrentClass } from "../../utils/functions";
import { QuizWin } from "./models/quizWin";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/constants/routes";
import { Lifeline } from "./lifeline";

export const TestComponent = () => {
  const [open, setOpen] = useState(false);
  const [win, setWin] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const clientIo = useRef<any>();
  const [answer, setAnswer] = useState("");
  const [lifeline, setLifeline] = useState<{
    lifeline: string;
    answer: string[];
  }>({ lifeline: "", answer: [] });
  const [error, setError] = useState("");
  const [time, setTime] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [valid, setValid] = useState<{
    answer: string;
    isCorrect: boolean;
    currentLevel: number;
    winAmount: number;
  } | null>(null);
  const [question, setQuestion] = useState<{
    question: string;
    options: [string];
    time: number;
    _id: string;
  }>();

  useEffect(() => {
    clientIo.current = socketInstance();
    clientIo.current.on("connnection", () => {
      console.log("connected to server");
    });
  }, []);

  useEffect(() => {
    clientIo.current.on("win", () => {
      setWin(true);
    });

    clientIo.current.on(
      "question",
      (data: {
        question: string;
        options: [string];
        time: number;
        _id: string;
      }) => {
        setTime(data?.time);
        setQuestion(data);
      }
    );

    clientIo.current.on("answer", (data: object) => {
      setTime(0);
      setValid(JSON.parse(data as unknown as never));
      setIsSubmitted(true);
      setAnswer("");
      if (lifeline.lifeline) setLifeline({ lifeline: "", answer: [] });
      if (!valid?.isCorrect) setOpen(true);
    });

    clientIo.current.on("error", (data: SetStateAction<string>) => {
      setTime(0);
      setError(data);
      setIsSubmitted(true);
      setOpen(true);
    });
  }, [lifeline.lifeline, valid?.isCorrect]);

  useEffect(() => {
    clientIo.current.on("lifeline", (data: string) => {
      setLifeline(JSON.parse(data));
    });
  }, [lifeline]);

  function getQuestion() {
    clientIo.current.emit("get-question");
    setIsSubmitted(false);
  }

  function submitQuestion() {
    clientIo.current.emit("submit-answer", { question: question?._id, answer });
  }

  function quitGame() {
    clientIo.current.emit("quit-quiz", {});
  }

  useEffect(() => {
    const interval =
      question &&
      setInterval(() => {
        setTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    return () => clearInterval(interval);
  }, [question]);

  function startQuiz() {
    quizAPI
      .generateQuiz()
      .then((data) => {
        clientIo.current.connect();
        toast.success(data.message ?? "Quiz started.");
        getQuestion();
        setValid(null);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  return (
    <div className="w-full flex justify-center">
      <div className="container pt-10">
        <div className="mt-10 grid grid-cols-3 gap-3">
          <div className="block p-6 h-full w-full rounded-xl bg-gradient-to-tr from-blue-400/30 to-fuchsia-400/30">
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-600">
              Current Level
            </h3>
            <p className="text-4xl text-gray-700">{valid?.currentLevel ?? 0}</p>
          </div>
          <div className="block p-6 h-full w-full rounded-xl bg-gradient-to-tr from-blue-400/30 to-fuchsia-400/30">
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-600">
              Win amount
            </h3>
            <p className="text-4xl text-gray-700">{valid?.winAmount ?? 0}</p>
          </div>
          <div className="block p-6 h-full w-full rounded-xl bg-gradient-to-tr from-blue-400/30 to-fuchsia-400/30">
            <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-600">
              Remaining time
            </h3>
            <p className="text-4xl text-gray-700">{time}</p>
          </div>
        </div>

        {question ? (
          <>
            <div className="mt-10">
              <div className="block p-5 mb-6">
                <p className="font-medium text-sm text-gray-700 my-1">
                  Question
                </p>
                <p className="font-medium text-xl">{question.question}</p>
              </div>
            </div>
            <div className="mt-5">
              <div className="mt-8 grid grid-cols-2 gap-3">
                {question?.options?.map((data, key) => (
                  <button
                    key={key.toString() + "key"}
                    onClick={() => setAnswer(data)}
                    disabled={isSubmitted}
                    className={`block p-6 mb-1 border border-indigo-400 rounded-lg shadow-md cursor-pointer text-left disabled:cursor-not-allowed
                      ${getCurrentClass(
                        isSubmitted,
                        data,
                        answer,
                        valid?.answer
                      )}`}
                  >
                    <p className="font-normal">
                      {String.fromCharCode(key + 65)}. {data}
                    </p>
                    {lifeline?.lifeline &&
                      (lifeline.lifeline === "askToAi"
                        ? lifeline.answer.includes(data) && "Ai recomended"
                        : lifeline.answer.includes(data) && "50-50 recomended")}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="w-full mt-10 flex items-center flex-col">
            <div className="w-full h-40 flex justify-center items-center text-4xl mt-5 rounded-xl drop-shadow-md">
              <p>To suru kiya jaaye?</p>
            </div>
            <button
              className="px-6 py-3.5 text-base font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center"
              onClick={startQuiz}
            >
              Bilkul ji!!
            </button>
          </div>
        )}
        <div className="w-full flex justify-between mt-10">
          {question && (
            <button
              onClick={() => quitGame()}
              type="button"
              disabled={!(isSubmitted && valid && valid?.winAmount > 1000)}
              className="px-6 py-3.5 text-base font-medium text-white inline-flex items-center bg-red-700 hover:bg-red-800 disabled:cursor-not-allowed disabled:bg-red-800/50 rounded-lg"
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 mr-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                />
              </svg>
              Quit the Game
            </button>
          )}
          {question && (
            <Lifeline
              clientIo={clientIo}
              questionId={question._id}
              disable={isSubmitted}
            />
          )}
          {question && !isSubmitted && (
            <button
              type="button"
              disabled={answer.length === 0}
              onClick={submitQuestion}
              className="px-6 py-3.5 text-base font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center disabled:cursor-not-allowed"
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 mr-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
              Lock kiya jaaye?
            </button>
          )}
          {isSubmitted && valid?.isCorrect ? (
            <button
              onClick={getQuestion}
              type="button"
              className="px-6 py-3.5 text-base font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center"
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 mr-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                />
              </svg>
              Agla question bataiye computer ji.
            </button>
          ) : (
            valid &&
            valid?.isCorrect === false && (
              <Link
                to={ROUTES.myQuiz}
                type="button"
                className="px-6 py-3.5 text-base font-medium text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center"
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 mr-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
                  />
                </svg>
                View Result
              </Link>
            )
          )}
          {valid && !valid?.isCorrect && (
            <TextExistModel
              open={open}
              setOpen={setOpen}
              message={`Your answer is not valid brother!! the valid answer is: ${valid.answer}`}
            />
          )}
          {error && (
            <TextExistModel open={open} setOpen={setOpen} message={error} />
          )}
          {win && <QuizWin />}
        </div>
      </div>
    </div>
  );
};
