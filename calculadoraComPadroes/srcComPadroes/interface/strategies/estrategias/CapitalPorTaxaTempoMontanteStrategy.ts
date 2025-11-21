import inquirer from 'inquirer';
import { CalculoStrategy } from '../CalculoStrategy';
import { CalculadoraFinanceiraFacade } from '../../../core/CalculadoraFinanceiraFacade';
import { criarPromptNumero } from '../../auxiliaresPrompts';

/**
 * Estratégia concreta para calcular Capital a partir de Taxa, Tempo e Montante.
 * 
 * Fórmula: C = M / (1 + i × t)
 * 
 * Padrão Strategy - Componente: Estratégia Concreta
 */
export class CapitalPorTaxaTempoMontanteStrategy implements CalculoStrategy {
    
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
        return this.facade.calcularCapital('taxaTempoMontante', inputs);
    }
    
    formatarResultado(resultado: number): string {
        return `Capital: R$ ${resultado.toFixed(2)}\n`;
    }
    
    getNomeCalculo(): string {
        return "Capital";
    }
}
