import { RandomValueNode, TellrawText, Text } from "mc-datapack-compiler";
import { dataPack } from "./datapack";
import { question } from "./randomQuestion";

const DEFAULT_TIME = 500;

export const load = dataPack.createFunction("load");
load.build((ctx) => {
  ctx.tellraw("@a", new TellrawText([
    new Text("[TSTrivia] ").setColor("gold"),
    new Text("Successfully loaded!").setColor("green"),
  ]));

  const trivia = dataPack.objective("trivia");
  const rng    = trivia.score("rng").set(0, ctx);
  const timer  = trivia.score("timer").set(0, ctx);
  const time   = trivia.score("time").set(DEFAULT_TIME, ctx);

  rng.storeResult(ctx, new RandomValueNode(1, 18));
  timer.copy(ctx, time);

  ctx.call(question);
});