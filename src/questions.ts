import * as fs from "fs";
import * as path from "path";
import { TriviaFile } from "./types";

const trivia: TriviaFile = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../questions.json"), "utf-8"),
);

export const meta = trivia.meta;
export const questions = trivia.questions;

