// import { io } from 'socket.io-client';

// const socket = io('http://localhost:3001', {
//     withCredentials: true,
//     extraHeaders: {
//         'my-custom-header': 'abcd',
//     },
// });

// export { socket };

import { io } from 'socket.io-client';

const socket = io('http://localhost:3001', {
    withCredentials: true,
    extraHeaders: {
        'my-custom-header': 'abcd',
    },
});

export { socket };
