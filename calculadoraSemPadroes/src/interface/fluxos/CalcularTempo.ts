import inquirer from "inquirer";

import type { CalculadoraMenu } from '../menus/MenuCalculadora';
import { criarPromptNumero, criarPromptConfirmacao } from '../auxiliaresPrompts';
import { JurosSimples } from '../../core/JurosSimples';
import type { EntradasTempo } from '../../core/Util/InterfacesCalculadoraJuros';

export class CalcularTempo {
    private menuPrincipal: CalculadoraMenu;

    constructor(menuPrincipal: CalculadoraMenu) {
        this.menuPrincipal = menuPrincipal;
    }

    public async CalcularTempoPorCapitalJurosTaxa(): Promise<void> {
        console.log("\n--- Calculando Tempo ---");

        try {
            const inputs = await inquirer.prompt([
                criarPromptNumero('capital', 'Qual o Capital (R$)?', { min: 0, invalidMessage: 'Capital não pode ser negativo.' }),
                criarPromptNumero('juros', 'Qual o Juros (R$)?', { min: 0, invalidMessage: 'Juros não pode ser negativo.' }),
                criarPromptNumero('taxa', 'Qual a Taxa (ex: 0.1 para 10%)?')
            ]);

            const dadosParaCalculo: EntradasTempo['CapitalJurosTaxa'] = {
                capital: inputs.capital,
                juros: inputs.juros,
                taxa: inputs.taxa
            };

            const resultado = JurosSimples.tempoPorCapitalJurosTaxa(dadosParaCalculo);

            console.log("\n✅ RESULTADO:");
            console.log(`Tempo: ${resultado.toFixed(1)}\n`);

        } catch (error: any) {
            console.log("\n❌ ERRO:");
            console.log(error.message);
        }

        await this.confirmarVoltaMenu();
    }

    public async CalcularTempoPorCapitalMontanteTaxa(): Promise<void> {
        console.log("\n--- Calculando Tempo ---");

        try {
            const inputs = await inquirer.prompt([
                criarPromptNumero('capital', 'Qual o Capital (R$)?', { min: 0, invalidMessage: 'Capital não pode ser negativo.' }),
                criarPromptNumero('montante', 'Qual o Montante (R$)?', { min: 0, invalidMessage: 'Montante não pode ser negativo.' }),
                criarPromptNumero('taxa', 'Qual a Taxa (ex: 0.1 para 10%)?')
            ]);

            const dadosParaCalculo: EntradasTempo['CapitalMontanteTaxa'] = {
                capital: inputs.capital,
                montante: inputs.montante,
                taxa: inputs.taxa
            };

            const resultado = JurosSimples.tempoPorCapitalMontanteTaxa(dadosParaCalculo);

            console.log("\n✅ RESULTADO:");
            console.log(`Tempo: ${resultado.toFixed(1)}\n`);

        } catch (error: any) {
            console.log("\n❌ ERRO:");
            console.log(error.message);
        }

        await this.confirmarVoltaMenu();
    }

    public async CalcularTempoPorJurosMontanteTaxa(): Promise<void> {
        console.log("\n--- Calculando Tempo ---");

        try {
            const inputs = await inquirer.prompt([
                criarPromptNumero('juros', 'Qual o Juros (R$)?', { min: 0, invalidMessage: 'Juros não pode ser negativo.' }),
                criarPromptNumero('montante', 'Qual o Montante (R$)?', { min: 0, invalidMessage: 'Montante não pode ser negativo.' }),
                criarPromptNumero('taxa', 'Qual a Taxa (ex: 0.1 para 10%)?')
            ]);

            const dadosParaCalculo: EntradasTempo['JurosMontanteTaxa'] = {
                juros: inputs.juros,
                montante: inputs.montante,
                taxa: inputs.taxa
            };

            const resultado = JurosSimples.tempoPorJurosMontanteTaxa(dadosParaCalculo);

            console.log("\n✅ RESULTADO:");
            console.log(`Tempo: ${resultado.toFixed(1)}\n`);

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