import * as fs from "fs";
import * as path from "path";
import { dataPack } from "./datapack";
import { buildQuestionMessage } from "./messages";
import { TriviaFile } from "./types";
import { Selector } from "mc-datapack-compiler/dist/core/frontend/nodes/selector";

const trivia: TriviaFile = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../questions.json"), "utf-8"),
);

export const meta = trivia.meta;
export const questions = trivia.questions;

export const questionFunctions = questions.map((q, i) => {
  const fn = dataPack.createFunction(`question_${i}`);
  fn.build((ctx) => {
    ctx.tellraw(Selector.allPlayers(), buildQuestionMessage(q));
  });
  return fn;
});
