"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connect = () => {
    console.log("Connecting to DB: ", process.env.DB_NAME);
    mongoose_1.default.connect(`${process.env.MONGO_URI}${process.env.DB_NAME}`);
    const db = mongoose_1.default.connection;
    db.on('error', (error) => {
        console.error('Connection Error:', error);
    });
    db.once('open', () => {
        console.log('DB Connected');
    });
};
exports.default = connect;
