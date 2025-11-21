import inquirer from 'inquirer';
import { CalculoStrategy } from '../CalculoStrategy';
import { CalculadoraFinanceiraFacade } from '../../../core/CalculadoraFinanceiraFacade';
import { criarPromptNumero } from '../../auxiliaresPrompts';

/**
 * Estratégia concreta para calcular Tempo a partir de Capital, Juros e Taxa.
 * 
 * Fórmula: t = J / (C × i)
 * 
 * Padrão Strategy - Componente: Estratégia Concreta
 */
export class TempoPorCapitalJurosTaxaStrategy implements CalculoStrategy {
    
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
            }),
            criarPromptNumero('taxa', 'Qual a Taxa (ex: 0.1 para 10%)?')
        ]);
    }
    
    calcular(inputs: any): number {
        return this.facade.calcularTempo('capitalJurosTaxa', inputs);
    }
    
    formatarResultado(resultado: number): string {
        return `Tempo: ${resultado.toFixed(1)}\n`;
    }
    
    getNomeCalculo(): string {
        return "Tempo";
    }
}
