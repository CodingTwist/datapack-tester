import { RandomValueNode } from "mc-datapack-compiler";
import { dataPack } from "./datapack";
import { questions } from "./questions";
import { buildQuestionMessage } from "./messages";
import { Selector } from "mc-datapack-compiler/dist/core/frontend/nodes/selector";

export const question = dataPack.createFunction("question");

question.build((ctx) => {
  const rng = dataPack.objective("trivia").score("rng");
  rng.storeResult(ctx, new RandomValueNode(1, questions.length));

  let chain = ctx.if(rng.equal(1), (ctx) => {
    ctx.tellraw(Selector.allPlayers(), buildQuestionMessage(questions[0]));
  });

  questions.slice(1).forEach((q, i) => {
    chain = chain.elif(rng.equal(i + 2), (ctx) => {
      ctx.tellraw(Selector.allPlayers(), buildQuestionMessage(q));
    });
  });
});