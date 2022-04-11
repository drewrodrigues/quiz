// first one should always be the answer

type Title = string;

type Question = string;
type Subtitle = string;
type Answer = string;
type AnswerOption = string;

type ParsedQuiz = [
  Title,
  ...Array<
    [
      Question,
      Subtitle,
      Answer,
      AnswerOption,
      AnswerOption,
      AnswerOption?,
      AnswerOption?
    ]
  >
];

let quiz: ParsedQuiz = [
  "Margin Collapsing",
  [
    "When is a block formatting context created?",
    "Some subtitle goes here",
    "overflow: hidden",
    "position: absolute",
    "display: inline-block",
    "float: left",
  ],
  [
    "When is a block formatting context created?",
    "Some subtitle goes here",
    "overflow: hidden",
    "position: absolute",
    "display: inline-block",
    "float: left",
  ],
  [
    "When is a block formatting context created?",
    "Some subtitle goes here",
    "overflow: hidden",
    "position: absolute",
    "display: inline-block",
    "float: left",
  ],
  [
    "When is a block formatting context created?",
    "Some subtitle goes here",
    "overflow: hidden",
    "position: absolute",
    "display: inline-block",
    "float: left",
  ],
  [
    "When is a block formatting context created?",
    "Some subtitle goes here",
    "overflow: hidden",
    "position: absolute",
    "display: inline-block",
    "float: left",
  ],
  [
    "When is a block formatting context created?",
    "Some subtitle goes here",
    "overflow: hidden",
    "position: absolute",
    "display: inline-block",
    "float: left",
  ],
  [
    "When is a block formatting context created?",
    "Some subtitle goes here",
    "overflow: hidden",
    "position: absolute",
    "display: inline-block",
    "float: left",
  ],
  [
    "When is a block formatting context created?",
    "Some subtitle goes here",
    "overflow: hidden",
    "position: absolute",
    "display: inline-block",
    "float: left",
  ],
  [
    "When is a block formatting context created?",
    "Some subtitle goes here",
    "overflow: hidden",
    "position: absolute",
    "display: inline-block",
    "float: left",
  ],
];
