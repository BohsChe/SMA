export interface FarmerTableRowData {
    farmer_id: string;
    user_id: string;
    farmer_no: string;
    farmer_name: string;
    village_id: string;
    gender: string;
    address: string;
    mobile_no: string;
    milk_type: string;
    status: string;
}

// Model for Add/Edit Farmer form
export interface AddFarmerFormData {
    farmerName: string;
    gender: string;
    address: string;
    fMobileNo: string;
    milkType: string;
}

// Model for the whole Add/Edit Farmer dialog
export interface AddFarmerDialogData {
    milkType: string;
    villageName: string;
    farmerNo: string;
    farmerFormData: AddFarmerFormData;
}

export interface FarmerFilterQuery {
    milkType: string;
    villageName: string;
    villageId: string;
    farmerNo: string;
}

export interface UpdateFarmerApiData {
    mobileNo: string;
    farmerNo:string;
    newVillageName:string;
    newFarmerName:string;
    newMilkType:string;
    newGender:string;
    newAddress:string;
    newMobileNo:string;
}
