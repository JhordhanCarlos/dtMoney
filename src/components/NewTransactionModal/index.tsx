import Modal from 'react-modal';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';

import { Container, TransactionTypeContainer, RadioBox } from './styles';
import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';


interface NewTransactionModalPropos {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalPropos) {
    const { createTransaction } = useTransactions();

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');
    const [messageError, setMessageError] = useState('')
    let style = messageError == '' ? {display:'none'} : {display: 'block', color: '#E52E4D'}

    async function handleCreateNewTransaction(event: FormEvent) {
        event.preventDefault();


        if(title.trim() !== '' || amount !== 0 || category.trim() !== '') {
            await createTransaction({
                title,
                amount,
                category,
                type
            })

            setTitle('');
            setAmount(0);
            setCategory('');
            setType('deposit');
            onRequestClose();
            setMessageError('')
        } else {
            setMessageError('Preencha os campos obrigatórios')
            setTimeout(() => {
                setMessageError('')
            }, 5000)
        }
    }
    
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button type="button" className="react-modal-close" onClick={onRequestClose}>
                <img src={closeImg} alt="Fechar modal" />
            </button>
            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar Transação</h2>
                <p style={style}>
                    {messageError}
                </p>
                <input 
                    placeholder="Título" 
                    value={title} 
                    onChange={event => setTitle(event.target.value) } 
                />
                <input 
                    type="number" 
                    placeholder="Valor" 
                    value={amount} 
                    onChange={event => setAmount(Number(event.target.value)) }
                />

                <TransactionTypeContainer>
                    <RadioBox 
                        type="button"
                        onClick={() => { setType('deposit'); }}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>
                    <RadioBox 
                        type="button"
                        onClick={() => { setType('withdraw'); }}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saída" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input 
                    placeholder="Categoria" 
                    value={category} 
                    onChange={event => setCategory(event.target.value) }
                />

                <button type="submit">
                    Cadastrar
                </button>
            </Container>
      </Modal>
    )
}