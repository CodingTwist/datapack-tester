import { PREFIX } from ".";
import { dataPack } from "./datapack";
import { buildCorrectMessage, buildIncorrectMessage } from "./messages";
import { meta } from "./questions";

export const correct = dataPack.createFunction("correct");
correct.build((ctx) => {
  ctx.tellraw("@a", buildCorrectMessage(PREFIX));
});

export const incorrect = dataPack.createFunction("incorrect");
incorrect.build((ctx) => {
  ctx.tellraw("@a", buildIncorrectMessage(PREFIX));
});