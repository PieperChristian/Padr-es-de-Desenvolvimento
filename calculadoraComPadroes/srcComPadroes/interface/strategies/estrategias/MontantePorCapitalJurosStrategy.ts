import inquirer from 'inquirer';
import { CalculoStrategy } from '../CalculoStrategy';
import { CalculadoraFinanceiraFacade } from '../../../core/CalculadoraFinanceiraFacade';
import { criarPromptNumero } from '../../auxiliaresPrompts';

/**
 * Estratégia concreta para calcular Montante a partir de Capital e Juros.
 * 
 * Fórmula: M = C + J
 * 
 * Padrão Strategy - Componente: Estratégia Concreta
 */
export class MontantePorCapitalJurosStrategy implements CalculoStrategy {
    
    constructor(private facade: CalculadoraFinanceiraFacade) {}
    
    async obterInputs(): Promise<any> {
        return await inquirer.prompt([
            criarPromptNumero('capital', 'Qual o Capital (R$)?', { 
                min: 0, 
                invalidMessage: 'Capital não pode ser negativo.' 
            }),
            criarPromptNumero('juros', 'Qual o Juros (R$)?', { 
                min: 0, 
                invalidMessage: 'Juros não pode ser negativo.' 
            })
        ]);
    }
    
    calcular(inputs: any): number {
        return this.facade.calcularMontante('capitalJuros', inputs);
    }
    
    formatarResultado(resultado: number): string {
        return `Montante: R$ ${resultado.toFixed(2)}\n`;
    }
    
    getNomeCalculo(): string {
        return "Montante";
    }
}
