import express from "express";

import "express-async-errors";
import "reflect-metadata";
import "dotenv/config";
import { routes } from "./routes";
import "../container";

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333, () => console.log("Server is running at port 3333"));
