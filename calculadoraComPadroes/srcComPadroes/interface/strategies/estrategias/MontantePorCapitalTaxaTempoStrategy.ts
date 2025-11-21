import inquirer from 'inquirer';
import { CalculoStrategy } from '../CalculoStrategy';
import { CalculadoraFinanceiraFacade } from '../../../core/CalculadoraFinanceiraFacade';
import { criarPromptNumero } from '../../auxiliaresPrompts';

/**
 * Estratégia concreta para calcular Montante a partir de Capital, Taxa e Tempo.
 * 
 * Fórmula: M = C × (1 + i × t)
 * 
 * Padrão Strategy - Componente: Estratégia Concreta
 */
export class MontantePorCapitalTaxaTempoStrategy implements CalculoStrategy {
    
    constructor(private facade: CalculadoraFinanceiraFacade) {}
    
    async obterInputs(): Promise<any> {
        return await inquirer.prompt([
            criarPromptNumero('capital', 'Qual o Capital (R$)?', { 
                min: 0, 
                invalidMessage: 'Capital não pode ser negativo.' 
            }),
            criarPromptNumero('taxa', 'Qual a Taxa (ex: 0.1 para 10%)?'),
            criarPromptNumero('tempo', 'Qual o Tempo (na mesma unidade da taxa)?', { 
                min: 0, 
                invalidMessage: 'Tempo não pode ser negativo.' 
            })
        ]);
    }
    
    calcular(inputs: any): number {
        return this.facade.calcularMontante('capitalTaxaTempo', inputs);
    }
    
    formatarResultado(resultado: number): string {
        return `Montante: R$ ${resultado.toFixed(2)}\n`;
    }
    
    getNomeCalculo(): string {
        return "Montante";
    }
}
