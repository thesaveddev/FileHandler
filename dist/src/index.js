"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
require("dotenv/config");
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
const app_1 = __importDefault(require("./app"));
const notes_controller_1 = __importDefault(require("./resources/notes/notes.controller"));
const category_controller_1 = __importDefault(require("./resources/category/category.controller"));
(0, validateEnv_1.default)();
const app = new app_1.default([new notes_controller_1.default(), new category_controller_1.default()], Number(process.env.PORT));
app.listen();
