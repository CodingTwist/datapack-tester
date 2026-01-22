import { Datapack, writeDatapack } from "mc-datapack-compiler"
import { FunctionContext } from "mc-datapack-compiler/dist/frontend/context";
import { Objective } from "mc-datapack-compiler/dist/frontend/objective";
import { Score } from "mc-datapack-compiler/dist/frontend/score";
import { TellrawText } from "mc-datapack-compiler/dist/frontend/tellraw";
import { Text } from "mc-datapack-compiler/dist/frontend/text";

const dp = new Datapack("example");

const main = dp.createFunction("main");

main((ctx) => {
    // Compile-time variable
    const test = 1;

    ctx.say("Hello World");
    ctx.say("test is " + test);

    // Runtime scoreboard
    const var1 = new Objective("var1");
    ctx.scoreInit(var1);
    let score = new Score(var1, "temp1", 42);
    // ctx.scoreSet(score);

    const text = new TellrawText(
        new Text(`Text Hello World, the scoreboard ${var1.getName()} is, `)
            .setBold(true)
            .setColor("blue")
    )
        .append(score)
        .append(new Text("!, "))
    // .append(score)

    ctx.tellraw("@a", text);


    for (let i = 0; i < 5; i++) {
        ctx.say("Loop " + i);
    }

    const player = ctx.player("GamingTwist");

    ctx.if(score.greaterThan(20), ctx => {
        ctx.if(score.equal(30), ctx => {
            newFunction_1(ctx);
        });
        ctx.say("High");
    }).elif(score.equal(4), ctx => {
        ctx.say("Medium");
        ctx.playerGive(player, "minecraft:diamond", 3);
    }).else(ctx => {
        ctx.say("Low");
    });

    ctx.say("End of main function");


});

const test2 = dp.createFunction("test2");

test2((ctx) => {
    ctx.say("This is test2 function");
});

// visualizeDatapack(dp);
writeDatapack(dp, "./out/example_datapack");

function newFunction_1(ctx: FunctionContext) {
    newFunction();

    function newFunction() {
        ctx.say("Very High");
    }
}
