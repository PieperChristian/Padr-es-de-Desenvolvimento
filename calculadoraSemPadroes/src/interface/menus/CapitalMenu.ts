import inquirer from "inquirer";
import { criarPromptConfirmacao, criarPromptMenu } from "../auxiliaresPrompts";
import { CalcularCapital } from "../fluxos/CalcularCapital";



export class MenuCapital {
    private menuPrincipal: any;
    private calculosCapital: any;

    constructor(menuPrincipal: any) {
        this.menuPrincipal = menuPrincipal;
        this.calculosCapital = new CalcularCapital(menuPrincipal);
    }

    public async menuCapital(): Promise<void> {

        const resposta = await inquirer.prompt([
            criarPromptMenu(
                'opcao',
                'O que você possui?',
                [
                    'Juros, taxa e tempo',
                    'Juros e montante',
                    'Taxa, tempo e montante',

                    new inquirer.Separator(),
                    'Voltar ao menu principal'
                ],
                { raw: true }
            )
        ]);

        switch (resposta.opcao) {
            case 'Juros, taxa e tempo':
                await this.calculosCapital.CalcularCapitalPorJurosTaxaTempo();
                break;
            case 'Juros e montante':
                await this.calculosCapital.CalcularCapitalPorJurosMontante();
                break;
            case 'Taxa, tempo e montante':
                await this.calculosCapital.CalcularCapitalPorTaxaTempoMontante();
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