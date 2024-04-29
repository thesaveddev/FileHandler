/* eslint-disable @typescript-eslint/no-var-requires */
import 'dotenv/config';
import validateEnv from './utils/validateEnv';
import App from './app';
import NotesController from './resources/images/notes.controller';
import CategoryController from './resources/category/category.controller';

validateEnv();

const app = new App([new NotesController()], Number(process.env.PORT));

app.listen();
