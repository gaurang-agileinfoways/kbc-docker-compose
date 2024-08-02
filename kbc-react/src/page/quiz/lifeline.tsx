import { useState } from "react";

export const Lifeline = ({
  clientIo,
  questionId,
  disable,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  clientIo: React.MutableRefObject<any>;
  questionId: string;
  disable: boolean;
}) => {
  const [open, setOpen] = useState(false);
  const [usedLifeLine, setUsedLifeLine] = useState({
    "50-50": false,
    askToAi: false,
  });

  function lifeline(lifeline: string) {
    clientIo.current.emit("lifeline", { lifeline, questionId });
    setUsedLifeLine({ ...usedLifeLine, [lifeline]: true });
  }
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        disabled={disable}
        className="px-6 py-3.5 text-base font-medium text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg disabled:bg-blue-700/50 disabled:cursor-not-allowed"
        type="button"
      >
        Lifeline
        <svg
          className="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      {/* Dropdown menu */}
      <div
        className={`z-10 absolute bg-white shadow-md divide-y divide-gray-100 rounded-lg w-44 ${
          (disable || !open) && "hidden"
        }`}
      >
        <ul
          className="py-2 text-sm text-gray-700"
          aria-labelledby="multiLevelDropdownButton"
        >
          <li>
            <button
              onClick={() => lifeline("askToAi")}
              disabled={usedLifeLine.askToAi}
              className="block px-4 py-2 w-full font-medium text-left hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
            >
              Ask to AI
            </button>
          </li>
          <li>
            <button
              onClick={() => lifeline("50-50")}
              disabled={usedLifeLine["50-50"]}
              className="block px-4 py-2 w-full text-left font-medium hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500"
            >
              50-50
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
