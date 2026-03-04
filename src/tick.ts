import { Selector } from "mc-datapack-compiler/dist/core/frontend/nodes/selector";
import { Range } from "mc-datapack-compiler/dist/core/frontend/";
import { dataPack } from "./datapack";

export const tick = dataPack.createFunction("tick");
tick.build((ctx) => {
  const correct = dataPack.objective("correct");

  const sel = Selector.allPlayers().score(correct, new Range(1, undefined));
  sel.run((ctx) => {
    ctx.say("Hi");
    ctx.scoreEnable(Selector.allPlayers(), correct);
    correct.score("@a").set(0, ctx);
  })(ctx);
});
//Convert score set to a selector