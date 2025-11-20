import inquirer from 'inquirer';

// Use a loose type here to avoid circular/duplicate class-type issues
// between different `CalculadoraMenu` declarations in this codebase.
// The menu only needs to call `menuPrincipal()` so `any` is sufficient.
import { CalcularJuros } from '../fluxos/CalcularJuros';
import { criarPromptConfirmacao, criarPromptMenu } from '../auxiliaresPrompts';
    
export class MenuJuros {

    private menuPrincipal: any;
    private calculosJuros: CalcularJuros;

    constructor(menuPrincipal: any) {
        this.menuPrincipal = menuPrincipal;
        this.calculosJuros = new CalcularJuros(menuPrincipal);
    }

    public async menuJuros(): Promise<void> {

        const resposta = await inquirer.prompt([
            criarPromptMenu(
                'opcao',
                'O que você possui?',
                [
                    'Capital, taxa e tempo',
                    'Capital e montante',
                    'Taxa, tempo e montante',

                    new inquirer.Separator(),
                    'Voltar ao menu principal'
                ],
                { raw: true }
            )
        ]);

        switch (resposta.opcao) {
            case 'Capital, taxa e tempo':
                await this.calculosJuros.CalcularJurosPorCapitalTaxaTempo();
                break;
            case 'Capital e montante':
                await this.calculosJuros.CalcularJurosPorCapitalMontante();
                break;
            case 'Taxa, tempo e montante':
                await this.calculosJuros.CalcularJurosPorTaxaTempoMontante();
                break;
            case 'Voltar ao menu principal':
                console.log("Até logo! 👋");
                await this.confirmarVoltaMenu();
            default:
                console.log("Opção inválida! Tente novamente.");
                await this.menuJuros(); // Volta pro menu
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