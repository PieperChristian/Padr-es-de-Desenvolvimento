import inquirer from 'inquirer';
import { CalculoStrategy } from '../CalculoStrategy';
import { CalculadoraFinanceiraFacade } from '../../../core/CalculadoraFinanceiraFacade';
import { criarPromptNumero } from '../../auxiliaresPrompts';

/**
 * Estratégia concreta para calcular Juros a partir de Capital e Montante.
 * 
 * Fórmula: J = M - C
 * 
 * Padrão Strategy - Componente: Estratégia Concreta
 */
export class JurosPorCapitalMontanteStrategy implements CalculoStrategy {
    
    constructor(private facade: CalculadoraFinanceiraFacade) {}
    
    async obterInputs(): Promise<any> {
        return await inquirer.prompt([
            criarPromptNumero('capital', 'Qual o Capital (R$)?', { 
                min: 0, 
                invalidMessage: 'Capital não pode ser negativo.' 
            }),
            criarPromptNumero('montante', 'Qual o Montante (R$)?', { 
                min: 0, 
                invalidMessage: 'Montante não pode ser negativo.' 
            })
        ]);
    }
    
    calcular(inputs: any): number {
        return this.facade.calcularJuros('capitalMontante', inputs);
    }
    
    formatarResultado(resultado: number): string {
        return `Juros: R$ ${resultado.toFixed(2)}\n`;
    }
    
    getNomeCalculo(): string {
        return "Juros";
    }
}
