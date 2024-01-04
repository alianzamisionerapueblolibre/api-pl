
export interface UserPersonRequestInterface {
    person: {
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
        },
        userCreated?: string;
        dateCreated?: Date;
    },
    user: {
        userName: string;
        password: string;
        userCreated?: string;
        dateCreated?: Date;
        person?: {
            id?: number;
        }
    },
    profile: {
        id: number;
    }
}