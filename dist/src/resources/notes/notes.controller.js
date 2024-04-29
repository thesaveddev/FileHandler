"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const http_exception_1 = __importDefault(require("../../utils/exceptions/http.exception"));
const validation_middleware_1 = __importDefault(require("../../middleware/validation.middleware"));
const validate = __importStar(require("./notes.validation"));
const notes_service_1 = __importDefault(require("./notes.service"));
class NoteController {
    constructor() {
        this.path = '/';
        this.router = (0, express_1.Router)();
        this.note = new notes_service_1.default();
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newNote = yield this.note.create(req.body);
                res.status(201).json({
                    message: 'Note created successfully.',
                    newNote,
                });
            }
            catch (error) {
                console.log(error);
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.getNotes = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const notes = yield this.note.getAllNotes();
                res.status(200).json({ notes });
            }
            catch (error) {
                console.error(error);
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.updateNote = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedNote = yield this.note.updateNote(req.params.noteId, req.body);
                if (!updatedNote) {
                    throw new http_exception_1.default(404, 'Note not found.');
                }
                res.status(200).json({
                    message: 'Note updated successfully.',
                    updatedNote,
                });
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.getNoteById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const note = yield this.note.getNoteById(req.params.noteId);
                if (!note) {
                    throw new http_exception_1.default(404, 'Note not found.');
                }
                res.status(200).json({ note });
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.deleteNote = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const isDeleted = yield this.note.deleteNote(req.params.noteId);
                if (!isDeleted) {
                    throw new http_exception_1.default(404, 'Note not found.');
                }
                res.status(200).json({
                    message: 'Note deleted successfully.',
                });
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(`${this.path}`, (0, validation_middleware_1.default)(validate.create), this.create);
        this.router.get(`${this.path}`, this.getNotes);
        this.router.get(`${this.path}:noteId`, this.getNoteById);
        this.router.patch(`${this.path}:noteId`, (0, validation_middleware_1.default)(validate.update), this.updateNote);
        this.router.delete(`${this.path}:noteId`, this.deleteNote);
    }
}
exports.default = NoteController;
