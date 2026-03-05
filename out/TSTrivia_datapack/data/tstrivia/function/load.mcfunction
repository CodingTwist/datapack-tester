function tstrivia:__init_objectives
tellraw @a [{"text":"[TSTrivia] ","color":"gold"},{"text":"Successfully loaded!","color":"green"},{"text":"\n","color":"white"}]
scoreboard players set rng trivia 0
scoreboard players set timer trivia 0
scoreboard players set time trivia 500
scoreboard players operation timer trivia = time trivia
scoreboard players enable @a correct
function tstrivia:question