execute as @a[scores={correct=1..1}] run function tstrivia:correct
execute as @a[scores={correct=1..1}] run scoreboard players set @a correct 0
execute as @a[scores={correct=2..2}] run function tstrivia:incorrect
execute as @a[scores={correct=2..2}] run scoreboard players set @a correct 0