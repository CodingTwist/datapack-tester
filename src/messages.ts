import { TellrawText, Text, click, hover } from "mc-datapack-compiler";
import { TriviaQuestion, TriviaAnswer } from "./types";
import { correct, incorrect } from "./feedback";

export function buildQuestionMessage(q: TriviaQuestion): TellrawText {
  const parts: Text[] = [];

  if (q.prefix) {
    parts.push(new Text(`${q.prefix} `).setColor("gold"));
  }

  parts.push(new Text(`${q.question}\n`).setColor("white"));

  for (const ans of q.answers) {
    parts.push(buildAnswerText(ans));
  }

  return new TellrawText(parts);
}

function buildAnswerText(ans: TriviaAnswer): Text {
  const feedbackCommand = ans.correct ? correct : incorrect;

  return new Text(`[${ans.text}] \n`)
    .setColor(ans.color ?? "white")
    .setClick(click.command(feedbackCommand.node))
    .setHover(hover.text(new Text("Click to answer!").setColor("gray")));
}

export function buildCorrectMessage(): TellrawText {
  return new TellrawText([
    new Text("[Trivia] ").setColor("gold"),
    new Text("✔ Correct! Well done!").setColor("green"),
  ]);
}

export function buildIncorrectMessage(): TellrawText {
  return new TellrawText([
    new Text("[Trivia] ").setColor("gold"),
    new Text("✘ Wrong answer. Better luck next time!").setColor("red"),
  ]);
}
