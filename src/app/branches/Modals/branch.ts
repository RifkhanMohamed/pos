import { Unit } from "../../units/Modals/unit";
export interface Branch{
    
        address: string,
        archived: boolean,
        branchId: number,
        createdBy: string,
        createdDate: string,
        email: string,
        faxNo: string,
        lastModifiedBy: string,
        lastModifiedDate: string,
        name: string,
        phoneNo: string,
        unit: Unit[]   
}