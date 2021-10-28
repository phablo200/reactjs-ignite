import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Transaction {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
};

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
    children: ReactNode
};

interface TransacionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => Promise<void>;
};

export const TransactionsContext = createContext<TransacionsContextData>({} as TransacionsContextData);

export const TransactionsProvider = ({ children }: TransactionsProviderProps) => {
    
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    
    useEffect(() => {
        api.get('transactions')
            .then(response => response.data as { transactions: Transaction[] })
            .then(data => setTransactions(data.transactions));
    }, []);


    const createTransaction = async (transactionInput: TransactionInput) => {
        const response = await api.post('/transactions', {
            ...transactionInput,
            createdAt: new Date()
        });
        
        const { transaction }: any = response.data;
    
        setTransactions([...transactions, transaction ]);
    };

    return (
        <TransactionsContext.Provider value={{ transactions, createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    );
};

export function useTransactions() {
    const context = useContext(TransactionsContext);

    return context;
};