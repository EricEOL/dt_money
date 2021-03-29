//Criação de um Contexto com ContextAPI
import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { api } from './services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: Date;
}

interface TransactionsProviderProps {
    children: ReactNode;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt' >

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
}

//Detro do create Context se passa o valor que deve iniciar
export const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

//Provider serve para que os outros elementos da aplicação tenham acesso ao Contexto.
//No arquivo App.tsx, colocaremos nosso provider, para que todos os componentes tenham acesso ao contexto.
//Lá no arquivo App.tsx, nós passamos para o Provider a propriedade value (TransactionsContext.Provider value={}), que será o estado atual do nosso componente
//Por exemplo: Se passarmos o array de transactions, ele assumirá esse valor e passará para o restante
//Posso jogar o provider para dentro de componentes específicos, se quiser que a informação só seja acessada por eles

/* 
    No Componente que queremos usar o contexto, temos que ir nele e chamar o hook useContext
    Exemplo: const data = useContext(TransactionsContext);
    *Lembrando que tenho que importar o arquivo do Contexto antes*
*/

/*
    A criação do componente TransactionsProvider, é para que a lógica de carregamento de dados
    não fique em um componente externno, tipo o App.tsx, lá somente estará o provider repassando
    as informações, e não realizando chamada a Api.
*/

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransactions(response.data.transactions));
    }, [])

    async function createTransaction(transactionInput: TransactionInput) {
        try {
            const response = await api.post('transactions', {
                ...transactionInput,
                createdAt: new Date(),                
            });
            const { transaction } = response.data;
            
            setTransactions([...transactions, transaction])
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <TransactionsContext.Provider value={{transactions, createTransaction}}>
            {children}
        </TransactionsContext.Provider>
    )
}