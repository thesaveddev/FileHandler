// category.model.ts
import { Schema, model } from 'mongoose';
import ICategory from './category.interface';

const CategorySchema = new Schema({
  name: { type: String, required: true, unique: true, default: "Uncategorized" },
  color: { type: String, required: true, default: '#f9f0fd' },
});

export default model<ICategory>('Category', CategorySchema);