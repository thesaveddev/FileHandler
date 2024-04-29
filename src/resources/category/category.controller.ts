import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exceptions/http.exception';
import validationMiddleware from '../../middleware/validation.middleware';
import validate from './category.validation';
import Category from './category.service';
import ICategory from './category.interface';

class CategoryController implements Controller {
    public path = '/category/';
    public router = Router();
    private category = new Category();
    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(validate.create),
            this.create
        );
        this.router.get(`${this.path}all`, this.getCategories);
        this.router.get(`${this.path}:categoryId`, this.getCategoryById);
        this.router.patch(
            `${this.path}:categoryId`,
            validationMiddleware(validate.update),
            this.updateCategory
        );
        this.router.delete(`${this.path}:categoryId`, this.deleteCategory);
    }

    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const newCategory = await this.category.create(req.body);
            res.status(201).json({
                message: 'Category created successfully.',
                newCategory,
            });
        } catch (error: any) {
            console.log(error);
            next(new HttpException(400, error.message));
        }
    };

    private getCategories = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<ICategory[] | void> => {
        try {
            const categories = await this.category.allCategories();
            res.status(200).json({ categories });
        } catch (error: any) {
            console.error(error);
            next(new HttpException(400, error.message));
        }
    };

    private updateCategory = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const updatedCategory = await this.category.updateCategory(req.params.categoryId, req.body);

            if (!updatedCategory) {
                throw new HttpException(404, 'Category not found');
            }

            res.status(200).json({
                message: 'Category updated successfully.',
                updatedCategory,
            });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private getCategoryById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<ICategory | void> => {
        try {
            const Category = await this.category.getCategoryById(req.params.categoryId);

            if (!Category) {
                throw new HttpException(404, 'Category not found.');
            }

            res.status(200).json({ Category });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    private deleteCategory = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const isDeleted = await this.category.deleteCategory(
                req.params.categoryId
            );

            if (!isDeleted) {
                throw new HttpException(404, 'Category not found.');
            }

            res.status(200).json({
                message: 'Category deleted successfully.',
            });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };
}

export default CategoryController;
