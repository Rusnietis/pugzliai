import { useMessage } from '../Hooks/useMessage';
//import { Alert } from 'react-bootstrap'



const MessageAlert = () => {
    const { message } = useMessage();
    if (!message) return null;

    return (
        <div className={`alert ${message.type}`}>
            {message.msg}
        </div>
    );
};

export default MessageAlert;


