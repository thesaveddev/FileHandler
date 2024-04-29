import ICategory from '../category/category.interface';

interface ICreateNote {
  note: string;
  category?: string | ICategory;
  bg_color?: string;
  images?: string[];
}

interface IUpdateNote {
  note?: string;
  category?: string | ICategory;
  bg_color?: string;
  images?: string[];
}

export { ICreateNote, IUpdateNote };