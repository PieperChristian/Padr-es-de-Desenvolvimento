import inquirer from 'inquirer';
import { CalculoStrategy } from '../CalculoStrategy';
import { CalculadoraFinanceiraFacade } from '../../../core/CalculadoraFinanceiraFacade';
import { criarPromptNumero } from '../../auxiliaresPrompts';

/**
 * Estratégia concreta para calcular Tempo a partir de Juros, Montante e Taxa.
 * 
 * Fórmula: t = 1 / ((M / J - 1) × i)
 * 
 * Padrão Strategy - Componente: Estratégia Concreta
 */
export class TempoPorJurosMontanteTaxaStrategy implements CalculoStrategy {
    
    constructor(private facade: CalculadoraFinanceiraFacade) {}
    
    async obterInputs(): Promise<any> {
        return await inquirer.prompt([
            criarPromptNumero('juros', 'Qual o Juros (R$)?', { 
                min: 0, 
                invalidMessage: 'Juros não pode ser negativo.' 
            }),
            criarPromptNumero('montante', 'Qual o Montante (R$)?', { 
                min: 0, 
                invalidMessage: 'Montante não pode ser negativo.' 
            }),
            criarPromptNumero('taxa', 'Qual a Taxa (ex: 0.1 para 10%)?')
        ]);
    }
    
    calcular(inputs: any): number {
        return this.facade.calcularTempo('jurosMontanteTaxa', inputs);
    }
    
    formatarResultado(resultado: number): string {
        return `Tempo: ${resultado.toFixed(1)}\n`;
    }
    
    getNomeCalculo(): string {
        return "Tempo";
    }
}
