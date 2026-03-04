import { RandomValueNode, TellrawText, Text } from "mc-datapack-compiler";
import { dataPack } from "./datapack";
import { question } from "./randomQuestion";
import { Selector } from "mc-datapack-compiler/dist/core/frontend/nodes/selector";
import { correctObj } from ".";

const DEFAULT_TIME = 500;


export const load = dataPack.createFunction("load");
load.build((ctx) => {
  ctx.tellraw(
    Selector.allPlayers(),
    new TellrawText([
      new Text("[TSTrivia] ").setColor("gold"),
      new Text("Successfully loaded!").setColor("green"),
      new Text("\n").setColor("white")
    ]),
  );

  const trivia = dataPack.objective("trivia");
  const rng = trivia.score("rng").set(0, ctx);
  const timer = trivia.score("timer").set(0, ctx);
  const time = trivia.score("time").set(DEFAULT_TIME, ctx);

  timer.copy(ctx, time);

  ctx.scoreEnable(Selector.allPlayers(), correctObj);

  ctx.call(question);
});
