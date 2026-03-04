import { TellrawText, Text, TriggerNode, click, hover } from "mc-datapack-compiler";
import { TriviaQuestion } from "./types";
import { correct, incorrect } from "./feedback";
import { meta } from "./questions";
import { correctObj, PREFIX } from ".";

export function buildQuestionMessage(q: TriviaQuestion): TellrawText {
  const parts: Text[] = [];

  parts.push(new Text(`${PREFIX} `).setColor("gold"));
  parts.push(new Text(`${q.question}\n`).setColor("white"));

  q.options.forEach((opt, i) => {
    parts.push(buildAnswerText(opt, i, q.correctIndex));
  });

  return new TellrawText(parts);
}

function buildAnswerText(
  option: string,
  index: number,
  correctIndex: number,
): Text {
  const isCorrect = index === correctIndex;
  const feedbackCommand = isCorrect ? new TriggerNode(correctObj, 1) : new TriggerNode(correctObj, 2);

  const colorMap = ["red", "green", "blue", "yellow"];
  const color = colorMap[index] ?? "white";

  return new Text(`[${option}] \n`)
    .setColor(color)
    .setClick(click.command(feedbackCommand))
    .setHover(hover.text(new Text("Click to answer!").setColor("gray")));
}

export function buildCorrectMessage(prefix: string): TellrawText {
  return new TellrawText([
    new Text(`${prefix} `).setColor("gold"),
    new Text("✔ Correct! Well done!").setColor("green"),
  ]);
}

export function buildIncorrectMessage(prefix: string): TellrawText {
  return new TellrawText([
    new Text(`${prefix} `).setColor("gold"),
    new Text("✘ Wrong answer. Better luck next time!").setColor("red"),
  ]);
}
