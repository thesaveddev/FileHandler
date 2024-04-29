import * as INote from './notes.interface';
import Note from './notes.model';

class NoteService {
    private note = Note;

    public async create(note: INote.ICreateNote): Promise<INote.ICreateNote> {
        try {
            const newNote = (await this.note.create(note)).populate('category');
            return newNote;
        } catch (error) {
            console.log(error);
            throw new Error('Unable to create note.');
        }
    }

    public async getAllNotes(): Promise<INote.ICreateNote[]> {
        try {
            const notes = await this.note.find().populate('category');
            return notes;
        } catch (error) {
            throw new Error('Unable to find notes.');
        }
    }

    public async updateNote(noteId: string, updatedData: INote.IUpdateNote) {
        try {
            const updatedNote = await this.note.findByIdAndUpdate(
                noteId,
                { $set: { ...updatedData } },
                { new: true }
            ).populate('category');
            return updatedNote;
        } catch (error) {
            console.error(error);
            throw new Error('Unable to update Note.');
        }
    }

    public async getNoteById(noteId: string): Promise<INote.ICreateNote | null> {
        try {
            const note = await this.note.findById(noteId).populate('category');
            return note;
        } catch (error) {
            throw new Error('Unable to find Note by id.');
        }
    }

       public async deleteNote(noteId: String): Promise<boolean> {
        try {
            const result = await this.note.findByIdAndDelete(noteId);
            return !!result;
        } catch (error) {
            console.error(error);
            throw new Error('Unable to delete note.');
        }
    }
}

export default NoteService;
