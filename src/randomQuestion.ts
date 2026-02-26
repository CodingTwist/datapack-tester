import { RandomValueNode } from "mc-datapack-compiler";
import { dataPack } from "./datapack";
import { questions, questionFunctions } from "./questions";

export const question = dataPack.createFunction("question");

question.build((ctx) => {
  const rng = dataPack.objective("trivia").score("rng");
  rng.storeResult(ctx, new RandomValueNode(1, questions.length));

  const [first, ...rest] = questionFunctions;

  let chain = ctx.if(rng.equal(1), (ctx) => {
    ctx.call(first);
  });

  rest.forEach((fn, i) => {
    chain = chain.elif(rng.equal(i + 2), (ctx) => {
      ctx.call(fn);
    });
  });
});
