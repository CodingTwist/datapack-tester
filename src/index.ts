import { config } from "./config";
import { dataPack } from "./datapack";

export * from "./load";
export * from "./types";
export * from "./feedback";
export * from "./questions";
export * from "./randomQuestion";


const OUTPUT_PATH = config.output;

dataPack.writeDatapack(OUTPUT_PATH);

export { dataPack };