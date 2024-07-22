import { useEffect, useState } from 'react';

function useDebounce(value: string, delay: number) {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        const hanlder = setTimeout(() => setDebounceValue(value), delay);
        return () => clearTimeout(hanlder);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return debounceValue;
}

export default useDebounce;
