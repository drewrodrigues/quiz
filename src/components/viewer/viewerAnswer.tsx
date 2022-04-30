import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React from "react";
import { IAnswerStatus } from "./viewerQuestions";

type Props = {
  answerStatus: IAnswerStatus;
  groupName: string;
  label: string;

  onClick?: () => void;
};

const baseClass =
  "h-[20px] mb-[10px] rounded border flex items-center text-[16px] px-[15px] py-[20px]";
const baseIconClass = "w-[10px] mr-[10px]";

export function ViewerAnswer({
  answerStatus,
  groupName,
  label,
  onClick,
}: Props): React.ReactElement {
  const variants: Record<IAnswerStatus, React.ReactElement> = {
    unanswered: (
      <label className={clsx(baseClass, "bg-white")} onClick={onClick}>
        <input
          type="radio"
          className={clsx(baseIconClass)}
          name={groupName}
          value={label}
        />
        {label}
      </label>
    ),
    correct: (
      <p className={clsx(baseClass, "border-green-200 bg-green-100 font-bold")}>
        <FontAwesomeIcon icon={faCheck} className={clsx(baseIconClass)} />
        {label}
      </p>
    ),
    incorrect: (
      <p className={clsx(baseClass, "border-red-200 bg-red-100")}>
        <FontAwesomeIcon icon={faTimes} className={clsx(baseIconClass)} />
        {label}
      </p>
    ),
    actual: (
      <p className={clsx(baseClass, "font-bold")}>
        <FontAwesomeIcon icon={faCheck} className={clsx(baseIconClass)} />
        {label}
      </p>
    ),
    answered: <p className={clsx(baseClass, "text-gray-400")}>{label}</p>,
  };

  return variants[answerStatus];
}
