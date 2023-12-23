
export interface DecodedJwtToken {
    id: string;
    userName: string;
    [x: string]: any;
}