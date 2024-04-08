import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../css/style.css";
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../Services/firebase';

export const HomePage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedArea, setSelectedArea] = useState('');
    const [showAreaSelect, setShowAreaSelect] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setShowAreaSelect(true);
            setSuccess(true);
        }
    };

    const handleAreaChange = (event) => {
        setSelectedArea(event.target.value);
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
        setShowAreaSelect(false);
        setSuccess(false);
    };

    const handleSubmit = async () => {
        if (selectedFile && selectedArea) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const curriculoConteudo = reader.result;
                try {
                    const docRef = await addDoc(collection(db, 'docs'), {
                        doc: curriculoConteudo,
                        area: selectedArea
                    });
                    console.log('Currículo enviado com sucesso! Document ID:', docRef.id);
                } catch (error) {
                    console.error('Erro ao enviar currículo:', error);
                }
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    return (
        <div className="container-fluid">
            <div className='main'>
                <h1 className={`fw-bold ${success ? 'text-success' : ''}`}>
                    {selectedFile ? "Currículo selecionado com sucesso" : "Coloque seu currículo aqui"}
                </h1>
                {selectedFile ? (
                    <div>
                        <p>Arquivo selecionado: {selectedFile.name}</p>
                        <button className="btn btn-danger" onClick={handleRemoveFile}>Remover</button>
                    </div>
                ) : (
                    <input
                        type="file"
                        placeholder={"Currículo aqui"}
                        accept=".pdf"
                        className="input form-control"
                        onChange={handleFileChange}
                    />
                )}
                {showAreaSelect && (
                    <div>
                        <label htmlFor="areaSelect">Selecione sua área de interesse:</label>
                        <select id="areaSelect" className="form-select" onChange={handleAreaChange} value={selectedArea}>
                            <option value="">Selecione...</option>
                            <option value="TI">Tecnologia da Informação</option>
                            <option value="Engenharia">Engenharia</option>
                            <option value="Saúde">Saúde</option>
                        </select>
                        <br/>
                        <button className="btn btn-primary" onClick={handleSubmit}>Enviar</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage;
