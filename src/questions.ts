import * as fs from "fs";
import * as path from "path";
import { RandomValueNode, TellrawText, Text, click, hover } from "mc-datapack-compiler";
import { dataPack } from "./datapack";

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

const correct = dataPack.createFunction("correct");
correct.build((ctx) => {
  ctx.tellraw("@a", buildCorrectMessage());
});

const incorrect = dataPack.createFunction("incorrect");
incorrect.build((ctx) => {
  ctx.tellraw("@a", buildIncorrectMessage());
});

const questions: TriviaQuestion[] = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../questions.json"), "utf-8"),
);

function buildQuestionMessage(q: TriviaQuestion): TellrawText {
  const parts: Text[] = [];

  if (q.prefix) {
    parts.push(new Text(`${q.prefix} `).setColor("gold"));
  }

  parts.push(new Text(`${q.question}\n`).setColor("white"));

  for (const ans of q.answers) {
    const feedbackCommand = ans.correct
      ? correct
      : incorrect;

    parts.push(
      new Text(`[${ans.text}] \n`)
        .setColor(ans.color ?? "white")
        .setClick(click.command(feedbackCommand.node))
        .setHover(hover.text(new Text("Click to answer!").setColor("gray"))),
    );
  }

  return new TellrawText(parts);
}

function buildCorrectMessage(): TellrawText {
  return new TellrawText([
    new Text("[Trivia] ").setColor("gold"),
    new Text("✔ Correct! Well done!").setColor("green"),
  ]);
}

function buildIncorrectMessage(): TellrawText {
  return new TellrawText([
    new Text("[Trivia] ").setColor("gold"),
    new Text("✘ Wrong answer. Better luck next time!").setColor("red"),
  ]);
}


const questionRefs = questions.map((q, i) => {
  const fn = dataPack.createFunction(`question_${i}`);
  fn.build((ctx) => {
    ctx.tellraw("@a", buildQuestionMessage(q));
  });
  return fn;
});




export const question = dataPack.createFunction("question");
question.build((ctx) => {
  const trivia = dataPack.objective("trivia");
  const rng = trivia.score("rng");

  rng.storeResult(ctx, new RandomValueNode(1, questions.length));

  const [first, ...rest] = questionRefs;

  let chain = ctx.if(rng.equal(1), (ctx) => {
    ctx.call(first);
  });

  rest.forEach((ref, i) => {
    chain = chain.elif(rng.equal(i + 2), (ctx) => {
      ctx.call(ref);
    });
  });
});