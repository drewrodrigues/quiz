export interface IQuiz {
  title: string;
  questions: IQuestion[];

  subtitle?: string;
  author?: string; // Drew Rodrigues | thesimpledev.dev
  backLink?: string; // back to blog that linked over or something
}

export interface IAnswerOption {
  label: string;

  // TODO: for later
  // imageUrl?: string;
}

export interface IQuestion {
  question: string;
  answerOptions: IAnswerOption[];
  answerIndex: number;

  subtitle?: string;
  codeExample?: string; // link to a codepen or something?
  image?: string; // only support it through a shortened uri
}

export interface IHTMLElement extends Element {
  checked: boolean;
  dataset: Record<string, any>;
}

export interface IFormEvent {
  preventDefault: () => void;
  target: {
    elements: IHTMLElement[];
  };
}
export type QuizSchema = (string | string[])[];
