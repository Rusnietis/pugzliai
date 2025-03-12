import { useMessage } from '../Hooks/useMessage';
import { Alert } from 'react-bootstrap';

const MessageAlert = () => {
    const { message } = useMessage();
    return message ? (
        <Alert variant={message.type} className="position-fixed top-0 start-50 translate-middle-x">
            {message.msg}
        </Alert>
    ) : null;
};

export default MessageAlert;


