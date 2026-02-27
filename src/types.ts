export type TriviaMeta = {
  title: string;
  defaultPrefix: string;
  version: number;
};

export type TriviaQuestion = {
  id: string;
  category: string;
  difficulty: string;
  question: string;
  options: string[];
  correctIndex: number;
};

export type TriviaFile = {
  meta: TriviaMeta;
  questions: TriviaQuestion[];
};