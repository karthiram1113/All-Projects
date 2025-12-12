import { useEffect } from 'react';
import { Modal } from 'react-bootstrap';

const ModalWrapper = ({ show, onHide, children, ...rest }) => {
    useEffect(() => {
        if (show) {
            document.body.style.position = 'fixed';
            document.body.style.top = `-${window.scrollY}px`;
            document.body.style.left = '0';
            document.body.style.right = '0';
        } else {
            const scrollY = document.body.style.top;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.left = '';
            document.body.style.right = '';
            window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
    }, [show]);

    return (
        <Modal
            show={show}
            onHide={onHide}
            backdrop="static"
            keyboard={false}
            centered
            {...rest}
        >
            {children}
        </Modal>
    );
};

export default ModalWrapper;
