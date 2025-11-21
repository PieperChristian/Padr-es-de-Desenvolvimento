import inquirer from "inquirer";

import { EntradasMontante } from "../../core/Util/InterfacesCalculadoraJuros";
import { JurosSimples } from "../../core/JurosSimples";
import { CalculadoraMenu } from "../CalculadoraMenu";
import { criarPromptConfirmacao, criarPromptNumero } from "../auxiliaresPrompts";

export class CalcularMontante {
    private menuPrincipal: CalculadoraMenu

    constructor(menuPrincipal: CalculadoraMenu) {
        this.menuPrincipal = menuPrincipal;
    }

    public async CalcularMontantePorCapitalTaxaTempo(): Promise<void> {
        console.log("\n--- Calculando Montante ---");

        try {
            const inputs = await inquirer.prompt([
                criarPromptNumero('capital', 'Qual o Capital (R$)?', { min: 0, invalidMessage: 'Capital não pode ser negativo.' }),
                criarPromptNumero('taxa', 'Qual a Taxa (ex: 0.1 para 10%)?'),
                criarPromptNumero('tempo', 'Qual o Tempo (na mesma unidade da taxa)?', { min: 0, invalidMessage: 'Tempo não pode ser negativo.' })
            ]);

            const dadosParaCalculo: EntradasMontante['CapitalTaxaTempo'] = {
                capital: inputs.capital,
                taxa: inputs.taxa,
                tempo: inputs.tempo
            };

            const resultado = JurosSimples.montantePorCapitalTaxaTempo(dadosParaCalculo);

            console.log("\n✅ RESULTADO:");
            console.log(`Montante: R$ ${resultado.toFixed(2)}\n`);

        } catch (error: any) {
            console.log("\n❌ ERRO:");
            console.log(error.message);
        }

        await this.confirmarVoltaMenu();
    }

    public async CalcularMontantePorCapitalJuros(): Promise<void> {
        console.log("\n--- Calculando Montante ---");

        try {
            const inputs = await inquirer.prompt([
                criarPromptNumero('capital', 'Qual o Capital (R$)?', { min: 0, invalidMessage: 'Capital não pode ser negativo.' }),
                criarPromptNumero('juros', 'Qual o Juros (R$)?', { min: 0, invalidMessage: 'Juros não pode ser negativo.' }),
            ]);

            const dadosParaCalculo: EntradasMontante['CapitalJuros'] = {
                capital: inputs.capital,
                juros: inputs.juros
            };

            const resultado = JurosSimples.montantePorCapitalJuros(dadosParaCalculo);

            console.log("\n✅ RESULTADO:");
            console.log(`Montante: R$ ${resultado.toFixed(2)}\n`);

        } catch (error: any) {
            console.log("\n❌ ERRO:");
            console.log(error.message);
        }

        await this.menuPrincipal.confirmarVoltaMenu();
    }

    public async CalcularMontantePorJurosTaxaTempo(): Promise<void> {
        console.log("\n--- Calculando Montante ---");

        try {
            const inputs = await inquirer.prompt([
                criarPromptNumero('juros', 'Qual o Juros (R$)?', { min: 0, invalidMessage: 'Juros não pode ser negativo.' }),
                criarPromptNumero('taxa', 'Qual a Taxa (ex: 0.1 para 10%)?'),
                criarPromptNumero('tempo', 'Qual o Tempo (na mesma unidade da taxa)?', { min: 0, invalidMessage: 'Tempo não pode ser negativo.' })
            ]);

            const dadosParaCalculo: EntradasMontante['JurosTaxaTempo'] = {
                juros: inputs.juros,
                taxa: inputs.taxa,
                tempo: inputs.tempo
            };

            const resultado = JurosSimples.montantePorJurosTaxaTempo(dadosParaCalculo);

            console.log("\n✅ RESULTADO:");
            console.log(`Montante: R$ ${resultado.toFixed(2)}\n`);

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