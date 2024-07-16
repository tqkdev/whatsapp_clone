import { cookies } from 'next/headers';

export default async function tesst() {
    const cookieStore = cookies();
    const accessToken = cookieStore.get('accessToken');
    console.log(accessToken);

    const result = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/conversations`, {
        headers: {
            'Content-Type': 'application/json',
            Cookie: `accessToken=${accessToken?.value}`,
        },
    }).then(async (res) => {
        const payload = await res.json();
        const data = {
            status: res.status,
            payload,
        };
        if (!res.ok) {
            throw data;
        }
        return data;
    });

    return (
        <div className="flex relative">
            <div className="hidden pt-36 px-20 flex-grow h-screen md:block">
                <div>
                    <h1 className="text-center text-3xl">Chào mừng đến với Whatsapp sever!!!</h1>
                    {result.payload.data.map((res: any) => (
                        <div key={res.id}>{res.id}</div>
                    ))}
                </div>
                <div className="flex justify-center py-10"></div>
            </div>
        </div>
    );
}
