import React from "react";
import { ResultsFromQuiz } from "../../utils/resultsFromQuiz";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

type Props = ResultsFromQuiz;

// TODO: we also need to make a variant of the quiz question to show red/green
export function QuizResults({ correct, incorrect, percentage }: Props) {
  return (
    <div className="border p-[40px] rounded">
      <header>
        <h4 className="font-bold mb-[10px]">Results</h4>
      </header>

      <footer className="bg-red-200 rounded overflow-hidden flex justify-between items-center relative h-[30px]">
        <div className="text-[14px] flex ml-[10px] relative z-10">
          <FontAwesomeIcon icon={faCheck} className="mr-[7px]" />
          <p className="">{correct} correct</p>
        </div>

        <div className="text-[14px] text-center flex items-center mr-[10px] relative z-10">
          <FontAwesomeIcon icon={faTimes} className="mr-[7px] relative z-10" />
          <p className="">{incorrect} incorrect</p>
        </div>

        <div
          style={{ width: percentage }}
          className="bg-green-300 h-[30px] flex items-center absolute left-0 top-0 bottom-0"
        />
      </footer>
    </div>
  );
}
