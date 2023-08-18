import dotenv from "dotenv";
dotenv.config();

if (!process.env.PORT) {
  throw new Error("missing PORT in .env file");
}

export const PORT = process.env.PORT;
