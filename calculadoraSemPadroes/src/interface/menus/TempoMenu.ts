import inquirer from 'inquirer';
import { criarPromptConfirmacao, criarPromptMenu } from '../auxiliaresPrompts';
import { CalcularTempo } from '../fluxos/CalcularTempo';

export class MenuTempo {
    private menuPrincipal: any;
    private calculosTempo: CalcularTempo;

    constructor(menuPrincipal: any) {
        this.menuPrincipal = menuPrincipal;
        this.calculosTempo = new CalcularTempo(menuPrincipal);
    }

    public async menuTempo(): Promise<void> {

        const resposta = await inquirer.prompt([
            criarPromptMenu(
                'opcao',
                'O que você possui?',
                [
                    'Capital, juros e taxa',
                    'Capital, montante e taxa',
                    'Juros, montante e taxa',

                    new inquirer.Separator(),
                    'Voltar ao menu principal'
                ],
                { raw: true }
            )
        ]);

        switch (resposta.opcao) {
            case 'Capital, juros e taxa':
                await this.calculosTempo.CalcularTempoPorCapitalJurosTaxa();
                break;
            case 'Capital, montante e taxa':
                await this.calculosTempo.CalcularTempoPorCapitalMontanteTaxa();
                break;
            case 'Juros, montante e taxa':
                await this.calculosTempo.CalcularTempoPorJurosMontanteTaxa();
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