export interface IQuiz {
  title: string;
  questions: IQuestion[];
}
export interface IAnswerOption {
  label?: string;
  image?: string;
}

export interface IQuestion {
  question: string;
  answerOptions: IAnswerOption[];
  answerIndex: number;

  subtitle?: string;
  codeExample?: string;
  image?: string;
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
