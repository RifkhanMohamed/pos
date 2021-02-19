import { Brands } from "../../brands/Modals/brands";
import { Category } from "../../categories/Modals/category";
import { Supplier } from "../../suppliers/Modals/supplier";
import { Branch } from "../../branches/Modals/branch";

export interface Products{
    
          archived: boolean,
          brands: Brands,
          category: Category,
          costPrice: number,
          createdBy: string,
          createdDate: string,
          lastModifiedBy: string,
          lastModifiedDate: string,
          price: number,
          productDesc: string,
          productGuar: string,
          productId: number,
          productName: string,
          productCode: string,
          suppliers: Supplier,
          stockInUnit:number,
          branch:Branch
}
