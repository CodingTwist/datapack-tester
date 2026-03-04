import { Selector } from "mc-datapack-compiler/dist/core/frontend/nodes/selector";
import { Range } from "mc-datapack-compiler/dist/core/frontend/";
import { dataPack } from "./datapack";
import { correct, incorrect } from "./feedback";
import { correctObj } from ".";

export const tick = dataPack.createFunction("tick");
tick.build((ctx) => {

  const correctSelector = Selector.allPlayers().score(correctObj, new Range(1,1));
  const incorrectSelector = Selector.allPlayers().score(correctObj, new Range(2,2));

  correctSelector.run((ctx) => {
    ctx.call(correct);
    
    // ctx.scoreEnable(Selector.allPlayers(), correctObj);
    correctObj.score("@a").set(0, ctx);
  })(ctx);

    incorrectSelector.run((ctx) => {
    ctx.call(incorrect);
    // ctx.scoreEnable(Selector.allPlayers(), correctObj);
    correctObj.score("@a").set(0, ctx);
  })(ctx);
});
//Convert score set to a selector