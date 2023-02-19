import { User, UserModel } from '../model/user';

export async function createUser(user: Omit<User, 'id'>): Promise<string> {
    const newUser = new UserModel({
        id: new Date(),
        ...user,
    });
    const result = await newUser.save();

    return result.id;
}

export async function findByUsername(username: string): Promise<User | undefined> {
    const user = await UserModel.findOne({ username });
    return user ?? undefined;
}

export async function findById(id: string): Promise<User | undefined> {
    const user = await UserModel.findOne({ id });
    return user ?? undefined;
}
