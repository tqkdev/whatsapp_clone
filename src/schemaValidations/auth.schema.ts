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
        }),
    }),
    message: z.string(),
});

export type LoginBodyType = z.TypeOf<typeof LoginBody>;
export type LoginResType = z.TypeOf<typeof LoginRes>;
