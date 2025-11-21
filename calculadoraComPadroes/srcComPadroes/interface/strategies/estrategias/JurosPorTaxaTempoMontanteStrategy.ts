import inquirer from 'inquirer';
import { CalculoStrategy } from '../CalculoStrategy';
import { CalculadoraFinanceiraFacade } from '../../../core/CalculadoraFinanceiraFacade';
import { criarPromptNumero } from '../../auxiliaresPrompts';

/**
 * Estratégia concreta para calcular Juros a partir de Taxa, Tempo e Montante.
 * 
 * Fórmula: J = M / (1 + 1 / (i × t))
 * 
 * Padrão Strategy - Componente: Estratégia Concreta
 */
export class JurosPorTaxaTempoMontanteStrategy implements CalculoStrategy {
    
    constructor(private facade: CalculadoraFinanceiraFacade) {}
    
    async obterInputs(): Promise<any> {
        return await inquirer.prompt([
            criarPromptNumero('taxa', 'Qual a Taxa (ex: 0.1 para 10%)?'),
            criarPromptNumero('tempo', 'Qual o Tempo (na mesma unidade da taxa)?', { 
                min: 0, 
                invalidMessage: 'Tempo não pode ser negativo.' 
            }),
            criarPromptNumero('montante', 'Qual o Montante (R$)?', { 
                min: 0, 
                invalidMessage: 'Montante não pode ser negativo.' 
            })
        ]);
    }
    
    calcular(inputs: any): number {
        return this.facade.calcularJuros('taxaTempoMontante', inputs);
    }
    
    formatarResultado(resultado: number): string {
        return `Juros: R$ ${resultado.toFixed(2)}\n`;
    }
    
    getNomeCalculo(): string {
        return "Juros";
    }
}
