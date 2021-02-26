import { Customer } from "./customer";
import { Supplier } from "./supplier";
import { Transaction } from "./transaction";
export interface Accounts{
    accountsId: number,
    createdBy: string,
    createdDate: string,
    credit: number,
    customer: Customer,
    debit: number,
    lastModifiedBy: string,
    lastModifiedDate: string,
    purchaseAmount: number,
    salesAmount: number,
    supplier: Supplier,
    transectionType: Transaction,
    date: string,
    description:string
}