import * as express from "express";
import { RegisterRoutes } from "./routes/routes";

export const app = express();

RegisterRoutes(app);
