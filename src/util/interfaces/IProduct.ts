import ICategory from "@/util/interfaces/ICategory";

interface IProduct {
    id: number;
    name: string;
    price: number;
    status: string;
    category: ICategory;
}

export default IProduct