import z from 'zod';

export const RegisterBody = z
    .object({
        username: z.string().trim().min(2).max(256),
        email: z.string().email(),
        password: z.string().min(6).max(100),
        // confirmPassword: z.string().min(6).max(100),
    })
    .strict();
// .superRefine(({ confirmPassword, password }, ctx) => {
//     if (confirmPassword !== password) {
//         ctx.addIssue({
//             code: 'custom',
//             message: 'Mật khẩu không khớp',
//             path: ['confirmPassword'],
//         });
//     }
// });

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;

export const RegisterRes = z.object({
    data: z.object({
        id: z.number(),
        username: z.string(),
        email: z.string(),
    }),
    message: z.string(),
});

export type RegisterResType = z.TypeOf<typeof RegisterRes>;

export const LoginBody = z
    .object({
        email: z.string().email(),
        password: z.string().min(6).max(100),
    })
    .strict();

export const LoginRes = z.object({
    data: z.object({
        id: z.string(),
        user: z.object({
            username: z.string(),
            email: z.string(),
            created_at: z.object({
                seconds: z.number(),
                nanoseconds: z.number(),
            }),
            avatarUrl: z.string(),
            gender: z.string(),
        }),
    }),
    message: z.string(),
});

export type LoginBodyType = z.TypeOf<typeof LoginBody>;
export type LoginResType = z.TypeOf<typeof LoginRes>;

export interface UserRequest {
    requestId: string;
    senderId: string;
    senderInfo: {
        id: string;
        userInfo: {
            gender: string;
            username: string;
            avatarUrl: string;
            dateOfBirth: string;
        };
    };
}

export interface User {
    userId: string;
    username: string;
    gender: string;
    created_at: {
        seconds: number;
        nanoseconds: number;
    };
    dateOfBirth: string;
    avatarUrl: string;
    email: string;
}

export interface ListFriend {
    id: string;
    userInfo: {
        username: string;
        avatarUrl: string;
        gender: string;
        dateOfBirth: string;
    };
}
export interface Message {
    content: string;
    imageUrl: string;
    ChatId: string;
    senderId: string;
    id: string;
    created_at: {
        seconds: number;
        nanoseconds: number;
    };
    senderInfo: {
        id: string;
        userInfo: {
            username: string;
            avatarUrl: string;
            gender: string;
            dateOfBirth: string;
        };
    };
}

// export interface Message {
//     messageId: string;
//     messageData: {
//         ChatId: string;
//         imageUrl: string;
//         senderId: string;
//         created_at: {
//             seconds: number;
//             nanoseconds: number;
//         };
//         content: string;
//     };
//     senderInfo: SenderInfo;
// }

// export interface SenderInfo {
//     id: string;
//     userInfo: {
//         avatarUrl: string;
//         dateOfBirth: string;
//         username: string;
//         gender: string;
//     };
// }

export interface Member {
    id: string;
    username: string;
    userInfo: {
        username: string;
        dateOfBirth: string;
        gender: string;
        avatarUrl: string;
    };
}
export interface Chat {
    name?: string; // Đặt là optional
    createdBy: string;
    created_at: {
        seconds: number;
        nanoseconds: number;
    };
    participants: Member[];
    avatarUrl?: string; // Đặt là optional
}

export interface infoUser {
    email: string;
    avatarUrl: string;
    dateOfBirth: string;
    username: string;
    gender: string;
}
export interface Participant {
    id: string;
    username: string;
}

export interface Conversation {
    id: string;
    participants: Participant[];
    messages: any[];
}
