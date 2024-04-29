import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exceptions/http.exception';
import validationMiddleware from '../../middleware/validation.middleware';
import  * as validate from './notes.validation';
import Note from './notes.service';

class NoteController implements Controller {
    public path = '/';
    public router = Router();
    private note = new Note();
    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        );
        this.router.get(`${this.path}`, this.getNotes);
        this.router.get(`${this.path}:noteId`, this.getNoteById);
        this.router.patch(
            `${this.path}:noteId`,
            validationMiddleware(validate.update),
            this.updateNote
        );
        this.router.delete(`${this.path}:noteId`, this.deleteNote);
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const newNote = await this.note.create(req.body);
            res.status(201).json({
                message: 'Note created successfully.',
                newNote,
            });
        } catch (error: any) {
            console.log(error);
            next(new HttpException(400, error.message));
        }
    };

    private getNotes = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const notes = await this.note.getAllNotes();
            res.status(200).json({ notes });
        } catch (error: any) {
            console.error(error);
            next(new HttpException(400, error.message));
        }
    };

    private updateNote = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const updatedNote = await this.note.updateNote(
                req.params.noteId,
                req.body
            );

            if (!updatedNote) {
                throw new HttpException(404, 'Note not found.');
            }

            res.status(200).json({
                message: 'Note updated successfully.',
                updatedNote,
            });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getNoteById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const note = await this.note.getNoteById(req.params.noteId);

            if (!note) {
                throw new HttpException(404, 'Note not found.');
            }

            res.status(200).json({ note });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteNote = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const isDeleted = await this.note.deleteNote(
                req.params.noteId
            );

            if (!isDeleted) {
                throw new HttpException(404, 'Note not found.');
            }

            res.status(200).json({
                message: 'Note deleted successfully.',
            });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default NoteController;
