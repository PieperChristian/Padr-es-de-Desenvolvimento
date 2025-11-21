import inquirer from 'inquirer';
import { criarPromptConfirmacao, criarPromptMenu } from '../auxiliaresPrompts';
import { CalculadoraContext } from '../strategies/CalculadoraContext';
import { CalculoStrategy } from '../strategies/CalculoStrategy';
import { CalculadoraFinanceiraFacade } from '../../core/CalculadoraFinanceiraFacade';
import { TempoPorCapitalJurosTaxaStrategy } from '../strategies/estrategias/TempoPorCapitalJurosTaxaStrategy';
import { TempoPorCapitalMontanteTaxaStrategy } from '../strategies/estrategias/TempoPorCapitalMontanteTaxaStrategy';
import { TempoPorJurosMontanteTaxaStrategy } from '../strategies/estrategias/TempoPorJurosMontanteTaxaStrategy';

/**
 * Menu de Tempo refatorado para usar o padrão Strategy.
 * Cada opção instancia uma estratégia diferente e a executa via Context.
 */
export class MenuTempo {
    private menuPrincipal: any;
    private facade: CalculadoraFinanceiraFacade;

    constructor(menuPrincipal: any) {
        this.menuPrincipal = menuPrincipal;
        this.facade = new CalculadoraFinanceiraFacade();
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

        let strategy: CalculoStrategy | null = null;

        switch (resposta.opcao) {
            case 'Capital, juros e taxa':
                strategy = new TempoPorCapitalJurosTaxaStrategy(this.facade);
                break;
            case 'Capital, montante e taxa':
                strategy = new TempoPorCapitalMontanteTaxaStrategy(this.facade);
                break;
            case 'Juros, montante e taxa':
                strategy = new TempoPorJurosMontanteTaxaStrategy(this.facade);
                break;
            case 'Voltar ao menu principal':
                await this.confirmarVoltaMenu();
                return;
            default:
                console.log("Opção inválida! Tente novamente.");
                await this.menuTempo();
                return;
        }

        // Executa a estratégia selecionada via Context
        if (strategy) {
            const context = new CalculadoraContext(strategy, this.menuPrincipal);
            await context.executar();
        }
    }

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