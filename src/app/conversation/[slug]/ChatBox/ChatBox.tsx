function ChatBox() {
    const currentUserId = 1;
    const messages = [
        {
            ConversationID: 1,
            senderId: 1,
            recipientId: 2,
            message:
                'Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?Hello, how are you?',
            timestamp: '2024-01-01T10:00:00Z',
        },
        {
            ConversationID: 2,
            senderId: 2,
            recipientId: 1,
            message: 'oke',
            timestamp: '2024-01-01T10:05:00Z',
        },
        {
            ConversationID: 3,
            senderId: 1,
            recipientId: 2,
            message: 'What are you doing today?',
            timestamp: '2024-01-01T10:10:00Z',
        },
        {
            ConversationID: 4,
            senderId: 2,
            recipientId: 1,
            message: 'I am going to the park.',
            timestamp: '2024-01-01T10:15:00Z',
        },
        {
            ConversationID: 5,
            senderId: 1,
            recipientId: 2,
            message: 'That sounds fun!',
            timestamp: '2024-01-01T10:20:00Z',
        },
        {
            ConversationID: 6,
            senderId: 2,
            recipientId: 1,
            message: 'Do you want to join?',
            timestamp: '2024-01-01T10:25:00Z',
        },
        {
            ConversationID: 7,
            senderId: 1,
            recipientId: 2,
            message: 'Sure, I would love to.',
            timestamp: '2024-01-01T10:30:00Z',
        },
        {
            ConversationID: 8,
            senderId: 2,
            recipientId: 1,
            message: 'Great! See you at 3 PM.',
            timestamp: '2024-01-01T10:35:00Z',
        },
        { ConversationID: 9, senderId: 1, recipientId: 2, message: 'See you then!', timestamp: '2024-01-01T10:40:00Z' },
        { ConversationID: 10, senderId: 2, recipientId: 1, message: 'Bye for now.', timestamp: '2024-01-01T10:45:00Z' },
    ];
    return (
        <div className="bg-slate-200 w-full flex-grow z-[1] overflow-y-auto">
            <div className="flex flex-col py-5">
                {messages.map((message) => (
                    <div
                        key={message.ConversationID}
                        className={`min-h-10 max-w-[70%] min-w-28 mx-5 my-1 p-3 rounded-2xl ${
                            message.senderId === currentUserId
                                ? 'bg-blue-500 text-white ml-auto'
                                : 'bg-gray-300 mr-auto'
                        }`}
                    >
                        <h3 className="leading-5">{message.message}</h3>
                        <p className="text-xs mt-1">{new Date(message.timestamp).toLocaleTimeString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChatBox;
