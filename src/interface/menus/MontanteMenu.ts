import inquirer from "inquirer";
import { criarPromptConfirmacao, criarPromptMenu } from "../auxiliaresPrompts";
import { CalcularMontante } from "../fluxos/CalcularMontante";



export class MenuMontante {
    private menuPrincipal: any;
    private calculosMontante: any;

    constructor(menuPrincipal: any) {
        this.menuPrincipal = menuPrincipal;
        this.calculosMontante = new CalcularMontante(menuPrincipal);
    }

    public async menuMontante(): Promise<void> {

        const resposta = await inquirer.prompt([
            criarPromptMenu(
                'opcao',
                'O que você possui?',
                [
                    'Capital, taxa e tempo',
                    'Capital e juros',
                    'Juros, taxa e tempo',

                    new inquirer.Separator(),
                    'Voltar ao menu principal'
                ],
                { raw: true }
            )
        ]);

        switch (resposta.opcao) {
            case 'Capital, taxa e tempo':
                await this.calculosMontante.CalcularMontantePorCapitalTaxaTempo();
                break;
            case 'Capital e juros':
                await this.calculosMontante.CalcularMontantePorCapitalJuros();
                break;
            case 'Juros, taxa e tempo':
                await this.calculosMontante.CalcularMontantePorJurosTaxaTempo();
                break;
            case 'Voltar ao menu principal':
                console.log("Até logo! 👋");
                await this.confirmarVoltaMenu();
                break;
            default:
                console.log("Opção inválida! Tente novamente.");
                break;
        };
    };

        private async confirmarVoltaMenu(): Promise<void> {
            const { voltar } = await inquirer.prompt([
                criarPromptConfirmacao('voltar', 'Voltar ao menu principal?', true)
            ]);
    
            if (voltar) {
                console.clear();
                await this.menuPrincipal.menuPrincipal();
            } else {
                console.log("Até logo!");
            }
        }
}