import icomeImage from '../../assets/income.svg';
import outcomeImage from '../../assets/outcome.svg';
import totalImage from '../../assets/total.svg';

import { Container } from "./style";

export function Summary () {
    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={icomeImage} alt="Entradas" />
                </header>
                <strong>R$1000,00</strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImage} alt="Saídas" />
                </header>
                <strong> - R$500,00</strong>
            </div>
            <div className="hightlight-background">
                <header>
                    <p>Entradas</p>
                    <img src={totalImage} alt="Total" />
                </header>
                <strong>R$500,00</strong>
            </div>
        </Container>
    );
}