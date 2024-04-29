"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NoteSchema = new mongoose_1.Schema({
    note: { type: String },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category', default: "66253f4f4063333a04169c3e" },
    bg_color: { type: String, default: "fef112" },
    images: [{
            type: String
        }]
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Note', NoteSchema);
