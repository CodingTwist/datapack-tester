import { RandomValueNode, TellrawText, Text } from "mc-datapack-compiler";
import { dataPack } from "./datapack";
import { question } from "./randomQuestion";
import { Selector } from "mc-datapack-compiler/dist/core/frontend/nodes/selector";

const DEFAULT_TIME = 500;

export const load = dataPack.createFunction("load");
load.build((ctx) => {
  ctx.tellraw(
    Selector.allPlayers(),
    new TellrawText([
      new Text("[TSTrivia] ").setColor("gold"),
      new Text("Successfully loaded!").setColor("green"),
    ]),
  );

  const trivia = dataPack.objective("trivia");
  const rng = trivia.score("rng").set(0, ctx);
  const timer = trivia.score("timer").set(0, ctx);
  const time = trivia.score("time").set(DEFAULT_TIME, ctx);

  timer.copy(ctx, time);

  const correct = dataPack.objective("correct");
  ctx.scoreEnable(Selector.allPlayers(), correct);

  ctx.call(question);
});
