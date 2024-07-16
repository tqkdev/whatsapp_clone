// 'use client';

// import React, { useEffect, useState } from 'react';

// export default function Test() {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//         async function fetchDataAsync() {
//             try {
//                 const result = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/conversations`, {
//                     headers: {
//                         'Content-Type': 'application/json',
//                     },
//                     credentials: 'include', // Gửi kèm cookie
//                 }).then(async (res) => {
//                     const payload = await res.json();
//                     const data = {
//                         status: res.status,
//                         payload,
//                     };
//                     if (!res.ok) {
//                         throw data;
//                     }
//                     return data;
//                 });
//                 setData(result.payload);
//             } catch (err) {
//                 console.log(err);
//             }
//         }
//         fetchDataAsync();
//     }, []);

//     return (
//         <div className="flex relative">
//             <div className="hidden pt-36 px-20 flex-grow h-screen md:block">
//                 <div>
//                     <h1 className="text-center text-3xl">Chào mừng đến với Whatsapp client!!!</h1>
//                     {data?.map((res: any) => (
//                         <div key={res.id}>{res.id}</div>
//                     ))}
//                 </div>
//                 <div className="flex justify-center py-10"></div>
//             </div>
//         </div>
//     );
// }
'use client';

import React, { useEffect, useState } from 'react';

export default function Test() {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchDataAsync() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/conversations`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include', // Gửi kèm cookie
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Đã xảy ra lỗi');
                }

                setData(result.payload);
            } catch (err) {
                console.log(err);
            }
        }

        fetchDataAsync();
    }, []);

    return (
        <div className="flex relative">
            <div className="hidden pt-36 px-20 flex-grow h-screen md:block">
                <div>
                    <h1 className="text-center text-3xl">Chào mừng đến với Whatsapp client!!!</h1>
                    {data?.map((res: any) => (
                        <div key={res.id}>{res.id}</div>
                    ))}
                </div>
                <div className="flex justify-center py-10"></div>
            </div>
        </div>
    );
}
