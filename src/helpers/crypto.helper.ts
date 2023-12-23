import { compare, hash } from 'bcrypt';

export const bcryptCompareAsync = async (unencryptedString: string, hashedString: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        compare(unencryptedString, hashedString, (error, res) => {
            if (error) reject(error);

            resolve(res);
        });
    });
}

export const bcryptHashAsync = async (string: string, salt: number | string): Promise<string> => await hash(string, salt);