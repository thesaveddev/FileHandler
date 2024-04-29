"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// category.model.ts
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true, default: "Uncategorized" },
    color: { type: String, required: true, default: '#f9f0fd' },
});
exports.default = (0, mongoose_1.model)('Category', CategorySchema);
