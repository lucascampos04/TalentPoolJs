import React, {useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/style.css";
import { Modal, Button, ProgressBar } from 'react-bootstrap';

export const HomePage = () => {
    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('Coloque seu currículo aqui');
    const [inputKey, setInputKey] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [progress, setProgress] = useState(0);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type === 'application/pdf') {
            setFile(selectedFile);
            setSuccess(true);
            setMessage('Currículo selecionado');
            setProgress(60);
        }
    }

    const handleSubmit = (e) => {
        if (file){
            setModalMessage("Currículo enviado com sucesso");
            setShowModal(true);

            setTimeout(() => {
                setProgress(100);
            }, 1000);

            setTimeout(() => {
                window.location.reload();
            }, 5000);
        } else {
            setModalMessage("Por favor, selecione um PDF");
            setShowModal(true);
        }
    }

    const handleRemove = () => {
        setFile(null);
        setSuccess(false);
        setMessage('Coloque seu currículo aqui');
        setInputKey(prevKey => prevKey + 1);
        setProgress();
    }

    const closeModal = () => {
        setShowModal(false);
    }

    return (
        <div className="container-fluid">
            <div className='main gap-4'>
                <h1 className={`fw-bold ${success ? 'text-success' : 'text-primary-emphasis'} ${success ? 'success-animation' : ''}`}>
                    {message}
                </h1>
                <input
                    key={inputKey}
                    className={`input form-control custom-input`}
                    placeholder={"Currículo aqui"}
                    accept=".pdf"
                    type={"file"}
                    onChange={handleFileChange}
                />
                <ProgressBar
                    now={progress}
                    label={`${progress}%`}
                    style={{ width: `${progress}%` }}
                />

                <div className="d-flex flex-right  gap-3">
                    <button
                        className={`btn btn-outline-success fw-bold`}
                        onClick={handleSubmit}
                    >
                        Salvar
                    </button>

                    <button
                        className={`btn btn-outline-danger fw-bold`}
                        onClick={handleRemove}
                    >
                        Remover
                    </button>

                </div>
            </div>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Status</Modal.Title>
                </Modal.Header>
                <Modal.Body>{modalMessage}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default HomePage;
