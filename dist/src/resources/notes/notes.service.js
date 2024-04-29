"use strict";
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
const notes_model_1 = __importDefault(require("./notes.model"));
class NoteService {
    constructor() {
        this.note = notes_model_1.default;
    }
    create(note) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newNote = (yield this.note.create(note)).populate('category');
                return newNote;
            }
            catch (error) {
                console.log(error);
                throw new Error('Unable to create note.');
            }
        });
    }
    getAllNotes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const notes = yield this.note.find().populate('category');
                return notes;
            }
            catch (error) {
                throw new Error('Unable to find notes.');
            }
        });
    }
    updateNote(noteId, updatedData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedNote = yield this.note.findByIdAndUpdate(noteId, { $set: Object.assign({}, updatedData) }, { new: true }).populate('category');
                return updatedNote;
            }
            catch (error) {
                console.error(error);
                throw new Error('Unable to update Note.');
            }
        });
    }
    getNoteById(noteId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const note = yield this.note.findById(noteId).populate('category');
                return note;
            }
            catch (error) {
                throw new Error('Unable to find Note by id.');
            }
        });
    }
    deleteNote(noteId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.note.findByIdAndDelete(noteId);
                return !!result;
            }
            catch (error) {
                console.error(error);
                throw new Error('Unable to delete note.');
            }
        });
    }
}
exports.default = NoteService;
