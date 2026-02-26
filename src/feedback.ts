import { dataPack } from "./datapack";
import { buildCorrectMessage, buildIncorrectMessage } from "./messages";

export const correct = dataPack.createFunction("correct");
correct.build((ctx) => {
  ctx.tellraw("@a", buildCorrectMessage());
});

export const incorrect = dataPack.createFunction("incorrect");
incorrect.build((ctx) => {
  ctx.tellraw("@a", buildIncorrectMessage());
});
