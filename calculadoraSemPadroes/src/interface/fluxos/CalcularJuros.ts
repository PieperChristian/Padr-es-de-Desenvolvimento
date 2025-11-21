import inquirer from "inquirer";

import type { EntradasJuros } from "../../core/Util/InterfacesCalculadoraJuros";
import { JurosSimples } from "../../core/JurosSimples";
import type { CalculadoraMenu } from "../menus/MenuCalculadora";
import { criarPromptNumero, criarPromptConfirmacao } from '../auxiliaresPrompts';

export class CalcularJuros {

    private menuPrincipal: CalculadoraMenu;
    // menuJuros não é usado aqui; mantido somente se for necessário no futuro

    constructor(menuPrincipal: CalculadoraMenu) {
        this.menuPrincipal = menuPrincipal;
    }

    public async CalcularJurosPorCapitalTaxaTempo(): Promise<void> {
        console.log("\n--- Calculando Juros ---");

        try {
            // Pedimos os dados usando o helper reutilizável para reduzir repetição
            const inputs = await inquirer.prompt([
                criarPromptNumero('capital', 'Qual o Capital (R$)?', { min: 0, invalidMessage: 'Capital não pode ser negativo.' }),
                criarPromptNumero('taxa', 'Qual a Taxa (ex: 0.1 para 10%)?'),
                criarPromptNumero('tempo', 'Qual o Tempo (na mesma unidade da taxa)?', { min: 0, invalidMessage: 'Tempo não pode ser negativo.' })
            ]);

            // 4. A Integração (Chamando seu "Motor")
            // Montamos o objeto que sua interface exige
            const dadosParaCalculo: EntradasJuros['CapitalTaxaTempo'] = {
                capital: inputs.capital,
                taxa: inputs.taxa,
                tempo: inputs.tempo
            };

            // Chamamos a classe estática
            const resultado = JurosSimples.jurosPorCapitalTaxaTempo(dadosParaCalculo);

            // 5. Exibição do Resultado
            console.log("\n✅ RESULTADO:");
            console.log(`Juros: R$ ${resultado.toFixed(2)}\n`);

        } catch (error: any) {
            // Tratamento de Erro Centralizado na Interface
            console.log("\n❌ ERRO:");
            console.log(error.message); 
        }

        // Pergunta se quer continuar
        await this.confirmarVoltaMenu();
    }

    public async CalcularJurosPorCapitalMontante(): Promise<void> {
        console.log("\n--- Calculando Juros ---");

        try {
            const inputs = await inquirer.prompt([
                criarPromptNumero('capital', 'Qual o Capital (R$)?', { min: 0, invalidMessage: 'Capital não pode ser negativo.' }),
                criarPromptNumero('montante', 'Qual o Montante (R$)?', { min: 0, invalidMessage: 'Montante não pode ser negativo.' })
            ]);

            const dadosParaCalculo: EntradasJuros['CapitalMontante'] = {
                capital: inputs.capital,
                montante: inputs.montante
            };

            const resultado = JurosSimples.jurosPorCapitalMontante(dadosParaCalculo);

            console.log("\n✅ RESULTADO:");
            console.log(`Juros: R$ ${resultado.toFixed(2)}\n`);

        } catch (error: any) {
            console.log("\n❌ ERRO:");
            console.log(error.message);
        }

        await this.confirmarVoltaMenu();
    }

    public async CalcularJurosPorTaxaTempoMontante(): Promise<void> {
        console.log("\n--- Calculando Juros ---");

        try {
            const inputs = await inquirer.prompt([
                criarPromptNumero('taxa', 'Qual a Taxa (ex: 0.1 para 10%)?'),
                criarPromptNumero('montante', 'Qual o Montante (R$)?', { min: 0, invalidMessage: 'Montante não pode ser negativo.' }),
                criarPromptNumero('tempo', 'Qual o Tempo (na mesma unidade da taxa)?', { min: 0, invalidMessage: 'Tempo não pode ser negativo.' })
            ]);

            const dadosParaCalculo: EntradasJuros['TaxaTempoMontante'] = {
                taxa: inputs.taxa,
                montante: inputs.montante,
                tempo: inputs.tempo
            };

            const resultado = JurosSimples.jurosPorTaxaTempoMontante(dadosParaCalculo);

            console.log("\n✅ RESULTADO:");
            console.log(`Juros: R$ ${resultado.toFixed(2)}\n`);

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