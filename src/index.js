"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mc_datapack_compiler_1 = require("mc-datapack-compiler");
var objective_1 = require("mc-datapack-compiler/dist/frontend/objective");
var score_1 = require("mc-datapack-compiler/dist/frontend/score");
var tellraw_1 = require("mc-datapack-compiler/dist/frontend/tellraw");
var text_1 = require("mc-datapack-compiler/dist/frontend/text");
var dp = new mc_datapack_compiler_1.Datapack("example");
var main = dp.createFunction("main");
main(function (ctx) {
    // Compile-time variable
    var test = 1;
    ctx.say("Hello World");
    ctx.say("test is " + test);
    // Runtime scoreboard
    var var1 = new objective_1.Objective("var1");
    ctx.scoreInit(var1);
    var score = new score_1.Score(var1, "temp1", 42);
    // ctx.scoreSet(score);
    var text = new tellraw_1.TellrawText(new text_1.Text("Text Hello World, the scoreboard ".concat(var1.getName(), " is, "))
        .setBold(true)
        .setColor("blue"))
        .append(score)
        .append(new text_1.Text("!, "));
    // .append(score)
    ctx.tellraw("@a", text);
    var text3 = new text_1.Text("hello ben").setBold(false).setColor("red");
    ctx.tellraw("@a", new tellraw_1.TellrawText(text3));
    // ctx.scoreSet(score.set(100));
    // const text2 = new TellrawText(
    //     new Text(`nvm its now, `)
    //         .setBold(true)
    //         .setColor("gold")
    // )
    //     .append(score)
    // ctx.tellraw("@a", text2);
    for (var i = 0; i < 5; i++) {
        ctx.say("Loop " + i);
    }
    var player = ctx.player("GamingTwist");
    ctx.if(score.greaterThan(20), function (ctx) {
        ctx.if(score.equal(30), function (ctx) {
            newFunction_1(ctx);
        });
        ctx.say("High");
    }).elif(score.equal(4), function (ctx) {
        ctx.say("Medium");
        ctx.playerGive(player, "minecraft:diamond", 3);
    }).else(function (ctx) {
        ctx.say("Low");
    });
    ctx.say("End of main function");
});
var test2 = dp.createFunction("test2");
test2(function (ctx) {
    ctx.say("This is test2 function");
});
// visualizeDatapack(dp);
(0, mc_datapack_compiler_1.writeDatapack)(dp, "./out/example_datapack");
function newFunction_1(ctx) {
    newFunction();
    function newFunction() {
        ctx.say("Very High");
    }
}
