import { useEffect, useState } from 'react';
import { Container } from './style';
import { api } from '../../services/api';


interface TransactionProps {
    id: number;
    title: string;
    amount: number;
    type: string;
    category: string;
    createdAt: string;
}

export function TransactionTables () {
    const [transactions, setTransactions] = useState<TransactionProps[]>([]);
    
    useEffect(() => {
        api.get('transactions')
            .then(response => response.data as { transactions: TransactionProps[] })
            .then(data => setTransactions(data.transactions));
    }, []);

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    {transactions.length && transactions.map((transaction: TransactionProps) => {
                        return (
                            <tr key={transaction.id}>
                                <td className="title">{transaction.title}</td>
                                <td className={transaction.type}>{
                                    new Intl.NumberFormat('pt-BR', {
                                        style: 'currency',
                                        currency: 'BRL'
                                    }).format(transaction.amount)
                                }</td>
                                <td>{transaction.category}</td>
                                <td>
                                {
                                    new Intl.DateTimeFormat('pt-BR').format(new Date(transaction.createdAt))
                                }
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </Container>
    );
}