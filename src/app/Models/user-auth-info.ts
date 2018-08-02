export class UserAuthInfo {
    mobileNo: string;
    password: string;
    deviceId: string;
    deviceModel: string;
    deviceType: string;
    isLogin: string; // 1 - login, 3 - register
}

export interface VillageModel {
    village_id: string;
    user_id: number;
    village_name: string;
}
