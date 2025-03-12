import { useState} from 'react';

import { Children, createContext } from 'react';


export const MessageContext = createContext()

export const MessageProvider = ({ children}) => {
    const [message, setMessage] = useState(null);

    const showMessage = (msg, type = "info") => {
        setMessage({ msg, type });
        setTimeout(() => setMessage(null), 3000);
    };

    return (
        <MessageContext.Provider value={{ message, showMessage }}>
            {children}
        </MessageContext.Provider>
    );
}