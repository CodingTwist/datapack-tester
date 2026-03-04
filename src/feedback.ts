import { Selector } from "mc-datapack-compiler/dist/core/frontend/nodes/selector";
import { PREFIX } from ".";
import { dataPack } from "./datapack";
import { buildCorrectMessage, buildIncorrectMessage } from "./messages";
import { meta } from "./questions";
import { Player } from "mc-datapack-compiler";




export const correct = dataPack.createFunction("correct");
correct.build((ctx) => {
  ctx.tellraw(Selector.allPlayers(), buildCorrectMessage(PREFIX));
  const player = ctx.player("GamingTwist");


  // ctx.playerGive(player, "diamond", 1);

  ctx.playerGive(Selector.self(), "diamond", 1);
});

export const incorrect = dataPack.createFunction("incorrect");
incorrect.build((ctx) => {
  ctx.tellraw(Selector.allPlayers(), buildIncorrectMessage(PREFIX));
});
