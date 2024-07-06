import React, { useEffect, useRef } from 'react';

interface AutoResizeTextareaProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder?: string;
}

const AutoResizeTextarea: React.FC<AutoResizeTextareaProps> = ({ value, onChange, placeholder }) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]);

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange(event);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

            // Ensure textarea does not exceed the maximum height
            const maxHeight = 160; // 3 rows, 32px per row
            if (textareaRef.current.scrollHeight > maxHeight) {
                textareaRef.current.style.overflowY = 'auto';
                textareaRef.current.style.height = `${maxHeight}px`;
            } else {
                textareaRef.current.style.overflowY = 'hidden';
            }
        }
    };

    return (
        <textarea
            ref={textareaRef}
            className="p-2 w-full max-h-40 overflow-hidden border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-blue-400"
            rows={1}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
        ></textarea>
    );
};

export default AutoResizeTextarea;
