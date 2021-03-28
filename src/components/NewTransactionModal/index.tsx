import React from 'react';
import Modal from 'react-modal';
import { Container } from './styles';
import closeImg from '../../assets/close.svg';

interface NewTransactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button
                className="react-modal-close"
                type="button"
                onClick={onRequestClose}
            >
                <img src={closeImg} alt="Fechar janela" />
            </button>

            <Container>
                <h2>Cadastrar Transação</h2>

                <input
                    type="text"
                    placeholder="Título"
                />
                <input
                    type="number"
                    placeholder="Valor"
                />
                <input
                    type="number"
                    placeholder="Categoria"
                />
                <button type="submit">Cadastrar</button>
            </Container>
        </Modal>
    )
}

