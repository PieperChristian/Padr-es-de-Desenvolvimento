import inquirer from 'inquirer';
import { criarPromptConfirmacao, criarPromptMenu } from '../auxiliaresPrompts';
import { CalcularTaxa } from '../fluxos/CalcularTaxa';

export class MenuTaxa {
    private menuPrincipal: any;
    private calculosTaxa: CalcularTaxa;

    constructor(menuPrincipal: any) {
        this.menuPrincipal = menuPrincipal;
        this.calculosTaxa = new CalcularTaxa(menuPrincipal);
    }

    public async menuTaxa(): Promise<void> {

        const resposta = await inquirer.prompt([
            criarPromptMenu(
                'opcao',
                'O que você possui?',
                [
                    'Capital, juros e tempo',
                    'Capital, montante e tempo',
                    'Juros, montante e tempo',

                    new inquirer.Separator(),
                    'Voltar ao menu principal'
                ],
                { raw: true }
            )
        ]);

        switch (resposta.opcao) {
            case 'Capital, juros e tempo':
                await this.calculosTaxa.CalcularTaxaPorCapitalJurosTempo();
                break;
            case 'Capital, montante e tempo':
                await this.calculosTaxa.CalcularTaxaPorCapitalMontanteTempo();
                break;
            case 'Juros, montante e tempo':
                await this.calculosTaxa.CalcularTaxaPorJurosMontanteTempo();
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