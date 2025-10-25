import type { Category } from "../categories/Category"
import type { SeoData } from "../SeoData"

export interface Product {
   id: number
   creationDate: string
   title: string
   imageName: string
   description: string
   category: Category;
   subCategory: Category
   secondarySubCategory: Category | null
   slug: string
   seoData: SeoData
   images: ProductImage[]
   specifications: ProductSpecification[]
}
export interface ProductSpecification {
   key: string;
   value: string
}
export interface ProductImage {
   id: number
   creationDate: string
   productId: number
   imageName: string
   sequence: number
}