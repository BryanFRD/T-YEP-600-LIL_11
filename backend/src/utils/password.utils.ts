import * as bcrypt from 'bcrypt-ts'

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
}