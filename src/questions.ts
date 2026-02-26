import { SayNode, TellrawText, Text } from "mc-datapack-compiler";
import { dataPack } from "./datapack";
import { click } from "mc-datapack-compiler/dist/core/frontend/nodes/click";

export interface TriviaAnswer {
  text: string;
  color?: string;
}

export interface TriviaQuestion {
  prefix?: string;
  question: string;
  answers: TriviaAnswer[];
}

export const question = dataPack.createFunction("question");

function buildQuestionMessage(q: TriviaQuestion): TellrawText {
  const parts: Text[] = [];
  parts.push(new Text(""));

  if (q.prefix) {
    parts.push(new Text(`${q.prefix} `).setColor("gold"));
  }

  parts.push(new Text(`${q.question}\n`));

  for (const ans of q.answers) {
    parts.push(
      new Text(`${ans.text}\n`)
      .setColor(ans.color ?? "white")
      .setClick(click.command(
        new SayNode("hi")
      ))
    );
  }

  return new TellrawText(parts);
}

const PREFIX = "[Trivia]";
question.build((ctx) => {
  ctx.say("QUESTION");

  const q1: TriviaQuestion = {
    prefix: PREFIX,
    question: "What is 2 + 2?",
    answers: [
      { text: "1", color: "red" },
      { text: "2", color: "blue" },
      { text: "4", color: "green" },
      { text: "5", color: "yellow" },
    ],
  };

  const q2: TriviaQuestion = {
    prefix: PREFIX,
    question: "What is 2 + 3?",
    answers: [
      { text: "1", color: "red" },
      { text: "2", color: "blue" },
      { text: "4", color: "green" },
      { text: "5", color: "yellow" },
    ],
  };

  ctx.tellraw("@a", buildQuestionMessage(q1));
  ctx.tellraw("@a", buildQuestionMessage(q2));
});
