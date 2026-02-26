import { RandomValueNode, TellrawText, Text } from "mc-datapack-compiler";
import { dataPack } from "./datapack";
import { question } from "./questions";

const load = dataPack.createFunction("load");
const DEFAULT_TIME = 500;

load.build((ctx) => {
  const message = new TellrawText([
    new Text("Successfully loaded TSTrivia").setColor("gold"),
  ]);
  ctx.tellraw("@a", message);

  const trivia = dataPack.objective("trivia");
  const rng = trivia.score("rng");
  const timer = trivia.score("timer");
  const time = trivia.score("time").set(DEFAULT_TIME, ctx);

  rng.storeResult(ctx, new RandomValueNode(1, 18));
  timer.copy(ctx, time);
  ctx.call(question);
});
