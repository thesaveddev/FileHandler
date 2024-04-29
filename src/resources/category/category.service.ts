import ICategory from './category.interface';
import Category from './category.model';

class CategoryService {
    private category = Category;

    public async create(newcategory: ICategory): Promise<ICategory> {
        try {
            const Category = await this.category.create(newcategory);
            return Category;
        } catch (error) {
            console.log(error);
            throw new Error('Unable to create Category.');
        }
    }

    public async allCategories(): Promise<ICategory[]> {
        try {
            const categories = await this.category.find();
            return categories;
        } catch (error) {
            throw new Error('Unable to find categories.');
        }
    }

    public async getCategoryById(categoryId: String): Promise<ICategory | null> {
    try {
        const category = await this.category.findOne({ _id: categoryId });
        return category;
    } catch (error) {
        throw new Error('Unable to find categories');
    }
    }

    public async updateCategory(categoryId: String, update: ICategory) {
        try {
            const updatedCategory = await this.category.findByIdAndUpdate(
                categoryId,
                { $set: { ...update } },
                { new: true }
            );
            return updatedCategory;
        } catch (error) {
            console.error(error);
            throw new Error('Unable to update category');
        }
    }

    public async deleteCategory(categoryId: String): Promise<boolean> {
        try {
            const result = await this.category.findByIdAndDelete(categoryId);
            return !!result;
        } catch (error) {
            console.error(error);
            throw new Error('Unable to delete nategory');
        }
    }
}

export default CategoryService;
