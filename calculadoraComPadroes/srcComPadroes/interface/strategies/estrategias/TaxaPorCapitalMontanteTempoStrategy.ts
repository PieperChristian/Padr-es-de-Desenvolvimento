import inquirer from 'inquirer';
import { CalculoStrategy } from '../CalculoStrategy';
import { CalculadoraFinanceiraFacade } from '../../../core/CalculadoraFinanceiraFacade';
import { criarPromptNumero } from '../../auxiliaresPrompts';

/**
 * Estratégia concreta para calcular Taxa a partir de Capital, Montante e Tempo.
 * 
 * Fórmula: i = (M / C - 1) / t
 * 
 * Padrão Strategy - Componente: Estratégia Concreta
 */
export class TaxaPorCapitalMontanteTempoStrategy implements CalculoStrategy {
    
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
            }),
            criarPromptNumero('tempo', 'Qual o Tempo (na mesma unidade da taxa)?', { 
                min: 0, 
                invalidMessage: 'Tempo não pode ser negativo.' 
            })
        ]);
    }
    
    calcular(inputs: any): number {
        return this.facade.calcularTaxa('capitalMontanteTempo', inputs);
    }
    
    formatarResultado(resultado: number): string {
        return `Taxa: ${resultado.toFixed(2)}%\n`;
    }
    
    getNomeCalculo(): string {
        return "Taxa";
    }
}
