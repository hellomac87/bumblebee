export interface User {
    id: string; // 사용자의 고유한 아이디
    username: string; // 사용자 닉네임 (아이디)
    password: string; // 사용자 비밀번호
    name: string; // 사용자 이름
    email: string; // 사용자 이메일
    url?: string; // (optional) // 사용자 프로파일 사진 URL
}

let users: User[] = [];

export async function createUser(user: Omit<User, 'id'>): Promise<string> {
    const userId = Date.now().toString();
    const newUser = { ...user, id: userId };
    users.push(newUser);

    return userId;
}

export async function findByUsername(username: string): Promise<User | undefined> {
    return users.find((user) => user.username === username);
}

export async function findById(id: string): Promise<User | undefined> {
    return users.find((user) => user.id === id);
}
