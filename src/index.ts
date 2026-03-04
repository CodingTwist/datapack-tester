import { config } from "./config";
import { dataPack } from "./datapack";

export const PREFIX = "[Trivia]";


export const correctObj = dataPack.objective("correct", "trigger");


export * from "./questions";

export * from "./load";
export * from "./types";
export * from "./randomQuestion";

export * from "./tick"


const OUTPUT_PATH = config.output;


// const viewer = new DatapackViewer();
// viewer.write(dataPack, "ast.html");

dataPack.writeDatapack(OUTPUT_PATH);

export { dataPack };