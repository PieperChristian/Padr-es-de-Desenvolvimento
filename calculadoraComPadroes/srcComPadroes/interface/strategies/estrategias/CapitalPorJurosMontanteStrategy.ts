import inquirer from 'inquirer';
import { CalculoStrategy } from '../CalculoStrategy';
import { CalculadoraFinanceiraFacade } from '../../../core/CalculadoraFinanceiraFacade';
import { criarPromptNumero } from '../../auxiliaresPrompts';

/**
 * Estratégia concreta para calcular Capital a partir de Juros e Montante.
 * 
 * Fórmula: C = M - J
 * 
 * Padrão Strategy - Componente: Estratégia Concreta
 */
export class CapitalPorJurosMontanteStrategy implements CalculoStrategy {
    
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
            })
        ]);
    }
    
    calcular(inputs: any): number {
        return this.facade.calcularCapital('jurosMontante', inputs);
    }
    
    formatarResultado(resultado: number): string {
        return `Capital: R$ ${resultado.toFixed(2)}\n`;
    }
    
    getNomeCalculo(): string {
        return "Capital";
    }
}
