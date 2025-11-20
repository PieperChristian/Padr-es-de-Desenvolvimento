import inquirer from "inquirer";

import type { CalculadoraMenu } from '../menus/MenuCalculadora';
import { criarPromptNumero, criarPromptConfirmacao } from '../auxiliaresPrompts';
import { JurosSimples } from '../../core/JurosSimples';
import type { EntradasTaxa } from '../../core/Util/InterfacesCalculadoraJuros';

export class CalcularTaxa {
    private menuPrincipal: CalculadoraMenu;

    constructor(menuPrincipal: CalculadoraMenu) {
        this.menuPrincipal = menuPrincipal;
    }

    public async CalcularTaxaPorCapitalJurosTempo(): Promise<void> {
        console.log("\n--- Calculando Taxa ---");

        try {
            const inputs = await inquirer.prompt([
                criarPromptNumero('capital', 'Qual o Capital (R$)?', { min: 0, invalidMessage: 'Capital não pode ser negativo.' }),
                criarPromptNumero('juros', 'Qual o Juros (R$)?', { min: 0, invalidMessage: 'Juros não pode ser negativo.' }),
                criarPromptNumero('tempo', 'Qual o Tempo (na mesma unidade da taxa)?', { min: 0, invalidMessage: 'Tempo não pode ser negativo.' })
            ]);

            const dadosParaCalculo: EntradasTaxa['CapitalJurosTempo'] = {
                capital: inputs.capital,
                juros: inputs.juros,
                tempo: inputs.tempo
            };

            const resultado = JurosSimples.taxaPorCapitalJurosTempo(dadosParaCalculo);

            console.log("\n✅ RESULTADO:");
            console.log(`Taxa: ${resultado.toFixed(2)}%\n`);

        } catch (error: any) {
            console.log("\n❌ ERRO:");
            console.log(error.message);
        }

        await this.confirmarVoltaMenu();
    }

    public async CalcularTaxaPorCapitalMontanteTempo(): Promise<void> {
        console.log("\n--- Calculando Taxa ---");

        try {
            const inputs = await inquirer.prompt([
                criarPromptNumero('capital', 'Qual o Capital (R$)?', { min: 0, invalidMessage: 'Capital não pode ser negativo.' }),
                criarPromptNumero('montante', 'Qual o Montante (R$)?', { min: 0, invalidMessage: 'Montante não pode ser negativo.' }),
                criarPromptNumero('tempo', 'Qual o Tempo (na mesma unidade da taxa)?', { min: 0, invalidMessage: 'Tempo não pode ser negativo.' })
            ]);

            const dadosParaCalculo: EntradasTaxa['CapitalMontanteTempo'] = {
                capital: inputs.capital,
                montante: inputs.montante,
                tempo: inputs.tempo
            };

            const resultado = JurosSimples.taxaPorCapitalMontanteTempo(dadosParaCalculo);

            console.log("\n✅ RESULTADO:");
            console.log(`Taxa: ${resultado.toFixed(2)}%\n`);

        } catch (error: any) {
            console.log("\n❌ ERRO:");
            console.log(error.message);
        }

        await this.confirmarVoltaMenu();
    }

    public async CalcularTaxaPorJurosMontanteTempo(): Promise<void> {
        console.log("\n--- Calculando Taxa ---");

        try {
            const inputs = await inquirer.prompt([
                criarPromptNumero('juros', 'Qual o Juros (R$)?', { min: 0, invalidMessage: 'Juros não pode ser negativo.' }),
                criarPromptNumero('montante', 'Qual o Montante (R$)?', { min: 0, invalidMessage: 'Montante não pode ser negativo.' }),
                criarPromptNumero('tempo', 'Qual o Tempo (na mesma unidade da taxa)?', { min: 0, invalidMessage: 'Tempo não pode ser negativo.' })
            ]);

            const dadosParaCalculo: EntradasTaxa['JurosMontanteTempo'] = {
                juros: inputs.juros,
                montante: inputs.montante,
                tempo: inputs.tempo
            };

            const resultado = JurosSimples.taxaPorJurosMontanteTempo(dadosParaCalculo);

            console.log("\n✅ RESULTADO:");
            console.log(`Taxa: ${resultado.toFixed(2)}%\n`);

        } catch (error: any) {
            console.log("\n❌ ERRO:");
            console.log(error.message);
        }

        await this.confirmarVoltaMenu();
    }

    private async confirmarVoltaMenu(): Promise<void> {
        const { voltar } = await inquirer.prompt([
            criarPromptConfirmacao('voltar', 'Voltar ao menu principal?', true)
        ]);

        if (voltar) {
            console.clear();
            await this.menuPrincipal.menuPrincipal();
        } else {
            console.log('Até logo!');
        }
    }
}