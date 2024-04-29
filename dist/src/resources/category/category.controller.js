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
const express_1 = require("express");
const http_exception_1 = __importDefault(require("../../utils/exceptions/http.exception"));
const validation_middleware_1 = __importDefault(require("../../middleware/validation.middleware"));
const category_validation_1 = __importDefault(require("./category.validation"));
const category_service_1 = __importDefault(require("./category.service"));
class CategoryController {
    constructor() {
        this.path = '/category/';
        this.router = (0, express_1.Router)();
        this.category = new category_service_1.default();
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newCategory = yield this.category.create(req.body);
                res.status(201).json({
                    message: 'Category created successfully.',
                    newCategory,
                });
            }
            catch (error) {
                console.log(error);
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.getCategories = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const categories = yield this.category.allCategories();
                res.status(200).json({ categories });
            }
            catch (error) {
                console.error(error);
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.updateCategory = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedCategory = yield this.category.updateCategory(req.params.categoryId, req.body);
                if (!updatedCategory) {
                    throw new http_exception_1.default(404, 'Category not found');
                }
                res.status(200).json({
                    message: 'Category updated successfully.',
                    updatedCategory,
                });
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.getCategoryById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const Category = yield this.category.getCategoryById(req.params.categoryId);
                if (!Category) {
                    throw new http_exception_1.default(404, 'Category not found.');
                }
                res.status(200).json({ Category });
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.deleteCategory = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const isDeleted = yield this.category.deleteCategory(req.params.categoryId);
                if (!isDeleted) {
                    throw new http_exception_1.default(404, 'Category not found.');
                }
                res.status(200).json({
                    message: 'Category deleted successfully.',
                });
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.initialiseRoutes();
    }
    initialiseRoutes() {
        this.router.post(`${this.path}`, (0, validation_middleware_1.default)(category_validation_1.default.create), this.create);
        this.router.get(`${this.path}all`, this.getCategories);
        this.router.get(`${this.path}:categoryId`, this.getCategoryById);
        this.router.patch(`${this.path}:categoryId`, (0, validation_middleware_1.default)(category_validation_1.default.update), this.updateCategory);
        this.router.delete(`${this.path}:categoryId`, this.deleteCategory);
    }
}
exports.default = CategoryController;
