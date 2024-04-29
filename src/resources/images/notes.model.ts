
import { Schema, model } from 'mongoose';
import {ICreateNote} from './notes.interface';

const NoteSchema = new Schema(
  {
    note: { type: String },
    category: { type: Schema.Types.ObjectId, ref: 'Category', default: "6625687cce142c8fae470a81"},
    bg_color: { type: String, default: "fef112"},
    images: [{
      type: String
    }]
  },
  { timestamps: true }
);

export default model<ICreateNote>('Note', NoteSchema);