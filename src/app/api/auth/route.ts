import { cookies } from 'next/headers';
export async function POST(request: Request) {
    const res = await request.json();

    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken');
    const refreshToken = cookieStore.get('refreshToken');

    if (!accessToken || !refreshToken) {
        return Response.json(
            { message: 'Không nhận được token' },
            {
                status: 400,
            },
        );
    }
    return Response.json(res.payload, {
        status: 200,
        headers: {
            'Set-Cookie': `accessToken=${accessToken.value}; Path=/; HttpOnly, refreshToken=${refreshToken.value}; Path=/; HttpOnly`,
        },
    });
}
