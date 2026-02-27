import { config } from "./config";
import { dataPack } from "./datapack";

export const PREFIX = "[Trivia]";


export * from "./questions";

export * from "./load";
export * from "./types";
export * from "./feedback";
export * from "./randomQuestion";


const OUTPUT_PATH = config.output;

dataPack.writeDatapack(OUTPUT_PATH);

export { dataPack };