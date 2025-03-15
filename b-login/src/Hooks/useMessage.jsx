import { useContext } from 'react';
import { MessageContext } from '../Contexts/Message';

export const useMessage = () => {

    return useContext(MessageContext);
};