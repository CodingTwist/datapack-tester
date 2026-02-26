import "dotenv/config";

export const config = {
  output: process.env.OUTPUT ?? "./out",
};