import React from "react";

type Props = {
  title?: string;
  subtitle?: string;
};

export function Error({
  title = "Something Went Wrong",
  subtitle = "Unknown error. Don't worry, I'm on it!",
}: Props) {
  return (
    <>
      <h1 className="mb-[20px] font-bold absolute w-full text-center mt-[20px]">
        <a href="/">Quiz</a>
      </h1>
      <main className="flex justify-center items-center flex-col h-[100vh]">
        <div className="h-[300px] w-[300px] bg-blue-200 rounded-[50%] absolute -z-10 -translate-y-4 opacity-20" />
        <div className="h-[300px] w-[300px] bg-blue-200 rounded-[50%] absolute -z-10 -translate-y-4 translate-x-24 opacity-20" />
        <div className="h-[300px] w-[300px] bg-blue-200 rounded-[50%] absolute -z-10 -translate-y-4 -translate-x-24 opacity-20" />

        <div className="flex flex-col rounded items-center">
          <h2 className="text-[32px] font-bold mb-[10px]">{title}</h2>
          <h3 className="mb-[40px] text-[14px]">{subtitle}</h3>

          <div className="flex justify-center">
            <a
              href="/"
              className="px-[15px] py-[7px] bg-white text-gray-500 rounded text-[14px] mr-[5px]"
            >
              Go Home
            </a>
            <a
              href="/builder"
              className="px-[15px] py-[7px] bg-blue-400 text-white rounded text-[14px]"
            >
              Build a Quiz
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
