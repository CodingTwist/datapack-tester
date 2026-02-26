export interface TriviaAnswer {
  text: string;
  color?: string;
  correct: boolean;
}

export interface TriviaQuestion {
  prefix?: string;
  question: string;
  answers: TriviaAnswer[];
}
