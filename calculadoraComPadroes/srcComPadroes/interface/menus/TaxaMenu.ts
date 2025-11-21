import inquirer from 'inquirer';
import { criarPromptConfirmacao, criarPromptMenu } from '../auxiliaresPrompts';
import { CalculadoraContext } from '../strategies/CalculadoraContext';
import { CalculoStrategy } from '../strategies/CalculoStrategy';
import { CalculadoraFinanceiraFacade } from '../../core/CalculadoraFinanceiraFacade';
import { TaxaPorCapitalJurosTempoStrategy } from '../strategies/estrategias/TaxaPorCapitalJurosTempoStrategy';
import { TaxaPorCapitalMontanteTempoStrategy } from '../strategies/estrategias/TaxaPorCapitalMontanteTempoStrategy';
import { TaxaPorJurosMontanteTempoStrategy } from '../strategies/estrategias/TaxaPorJurosMontanteTempoStrategy';

/**
 * Menu de Taxa refatorado para usar o padrão Strategy.
 * Cada opção instancia uma estratégia diferente e a executa via Context.
 */
export class MenuTaxa {
    private menuPrincipal: any;
    private facade: CalculadoraFinanceiraFacade;

    constructor(menuPrincipal: any) {
        this.menuPrincipal = menuPrincipal;
        this.facade = new CalculadoraFinanceiraFacade();
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

        let strategy: CalculoStrategy | null = null;

        switch (resposta.opcao) {
            case 'Capital, juros e tempo':
                strategy = new TaxaPorCapitalJurosTempoStrategy(this.facade);
                break;
            case 'Capital, montante e tempo':
                strategy = new TaxaPorCapitalMontanteTempoStrategy(this.facade);
                break;
            case 'Juros, montante e tempo':
                strategy = new TaxaPorJurosMontanteTempoStrategy(this.facade);
                break;
            case 'Voltar ao menu principal':
                await this.confirmarVoltaMenu();
                return;
            default:
                console.log("Opção inválida! Tente novamente.");
                await this.menuTaxa();
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