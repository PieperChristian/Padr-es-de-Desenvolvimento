import inquirer from "inquirer";

import type { EntradasCapital } from "../../core/Util/InterfacesCalculadoraJuros";
import { JurosSimples } from "../../core/JurosSimples";
import type { CalculadoraMenu } from "../CalculadoraMenu";
import { criarPromptConfirmacao, criarPromptNumero } from "../auxiliaresPrompts";

export class CalcularCapital {
    private menuPrincipal: CalculadoraMenu

    constructor(menuPrincipal: CalculadoraMenu) {
        this.menuPrincipal = menuPrincipal;
    }

    public async CalcularCapitalPorJurosTaxaTempo(): Promise<void> {
        console.log("\n--- Calculando Capital ---");

        try {
            const inputs = await inquirer.prompt([
                criarPromptNumero('juros', 'Qual o Juros?', { min: 0, invalidMessage: 'Juros não pode ser negativo.' }),
                criarPromptNumero('taxa', 'Qual a Taxa (ex: 0.1 para 10%)?'),
                criarPromptNumero('tempo', 'Qual o Tempo (na mesma unidade da taxa)?', { min: 0, invalidMessage: 'Tempo não pode ser negativo.' })
            ]);

            const dadosParaCalculo: EntradasCapital['JurosTaxaTempo'] = {
                juros: inputs.juros,
                taxa: inputs.taxa,
                tempo: inputs.tempo
            };

            const resultado = JurosSimples.capitalPorJurosTaxaTempo(dadosParaCalculo);

            console.log("\n✅ RESULTADO:");
            console.log(`Capital: R$ ${resultado.toFixed(2)}\n`);

        } catch (error: any) {
            console.log("\n❌ ERRO:");
            console.log(error.message);
        }

        await this.confirmarVoltaMenu();
    }

    public async CalcularCapitalPorJurosMontante(): Promise<void> {
        console.log("\n--- Calculando Capital ---");

        try {
            const inputs = await inquirer.prompt([
                criarPromptNumero('juros', 'Qual o Juros?', { min: 0, invalidMessage: 'Juros não pode ser negativo.' }),
                criarPromptNumero('montante', 'Qual o Montante?', { min: 0, invalidMessage: 'Montante não pode ser negativo.' }),
            ]);

            const dadosParaCalculo: EntradasCapital['JurosMontante'] = {
                juros: inputs.juros,
                montante: inputs.montante
            };

            const resultado = JurosSimples.capitalPorJurosMontante(dadosParaCalculo);

            console.log("\n✅ RESULTADO:");
            console.log(`Capital: R$ ${resultado.toFixed(2)}\n`);

        } catch (error: any) {
            console.log("\n❌ ERRO:");
            console.log(error.message);
        }

        await this.menuPrincipal.confirmarVoltaMenu();
    }

    public async CalcularCapitalPorTaxaTempoMontante(): Promise<void> {
        console.log("\n--- Calculando Capital ---");

        try {
            const inputs = await inquirer.prompt([
                criarPromptNumero('taxa', 'Qual a Taxa (ex: 0.1 para 10%)?'),
                criarPromptNumero('tempo', 'Qual o Tempo (na mesma unidade da taxa)?', { min: 0, invalidMessage: 'Tempo não pode ser negativo.' }),
                criarPromptNumero('montante', 'Qual o Montante?', { min: 0, invalidMessage: 'Montante não pode ser negativo.' })
            ]);

            const dadosParaCalculo: EntradasCapital['TaxaTempoMontante'] = {
                taxa: inputs.taxa,
                tempo: inputs.tempo,
                montante: inputs.montante
            };

            const resultado = JurosSimples.capitalPorTaxaTempoMontante(dadosParaCalculo);

            console.log("\n✅ RESULTADO:");
            console.log(`Capital: R$ ${resultado.toFixed(2)}\n`);

        } catch (error: any) {
            console.log("\n❌ ERRO:");
            console.log(error.message);
        }
        await this.menuPrincipal.confirmarVoltaMenu();
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