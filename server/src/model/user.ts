import mongoose from 'mongoose';

export interface User {
    id: string;
    username: string; // 사용자 닉네임 (아이디)
    password: string; // 사용자 비밀번호
    name: string; // 사용자 이름
    email: string; // 사용자 이메일
    avatarUrl?: string; // (optional) // 사용자 프로파일 사진 URL
}

const userSchema = new mongoose.Schema(
    {
        id: { type: String, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        avatarUrl: { type: String },
    },
    {
        timestamps: true,
    }
);

export const UserModel = mongoose.model('User', userSchema);
