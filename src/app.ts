import express, { json } from "express";
import helmet from "helmet";
import cors from "cors";
import "reflect-metadata";
import "express-async-errors";
import "dotenv/config";
import { HandleErrors } from "./middlewares/handleErrors.middleware";
import { userRouter } from "./routes/user.routes";

export const app = express();

app.use(helmet());

app.use(cors())

app.use(json());

app.use("/users", userRouter);

app.use(HandleErrors.execute);