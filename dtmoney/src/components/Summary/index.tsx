import icomeImage from '../../assets/income.svg';
import outcomeImage from '../../assets/outcome.svg';
import totalImage from '../../assets/total.svg';
import { numberToCurrencyBR } from '../../shared/helpers';
import { useTransactions } from '../../hooks/useTransaction';

import { Container } from "./style";



export function Summary () {

    const { transactions } = useTransactions();
    const summary = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'deposit') {
            acc.deposits += transaction.amount;
            acc.total += transaction.amount;
        } else {
            acc.withdraws += transaction.amount;
            acc.total -= transaction.amount;
        }

        return acc;

    }, {
        deposits: 0,
        withdraws: 0,
        total: 0  
    });
    
    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={icomeImage} alt="Entradas" />
                </header>
                <strong>{numberToCurrencyBR(summary.deposits)}</strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImage} alt="Saídas" />
                </header>
                <strong> - {numberToCurrencyBR(summary.withdraws)}</strong>
            </div>
            <div className="hightlight-background">
                <header>
                    <p>Entradas</p>
                    <img src={totalImage} alt="Total" />
                </header>
                <strong>{numberToCurrencyBR(summary.total)}</strong>
            </div>
        </Container>
    );
}