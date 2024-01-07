
export interface PersonRequestInterface {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    phoneNumber: string;
    gender: {
        id: number;
    },
    district: {
        id: number;
    },
    marital_status: {
        id: number;
    }
}