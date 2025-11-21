import inquirer from "inquirer";
import { criarPromptConfirmacao, criarPromptMenu } from "../auxiliaresPrompts";
import { CalculadoraContext } from '../strategies/CalculadoraContext';
import { CalculoStrategy } from '../strategies/CalculoStrategy';
import { CalculadoraFinanceiraFacade } from '../../core/CalculadoraFinanceiraFacade';
import { MontantePorCapitalTaxaTempoStrategy } from '../strategies/estrategias/MontantePorCapitalTaxaTempoStrategy';
import { MontantePorCapitalJurosStrategy } from '../strategies/estrategias/MontantePorCapitalJurosStrategy';
import { MontantePorJurosTaxaTempoStrategy } from '../strategies/estrategias/MontantePorJurosTaxaTempoStrategy';

/**
 * Menu de Montante refatorado para usar o padrão Strategy.
 * Cada opção instancia uma estratégia diferente e a executa via Context.
 */
export class MenuMontante {
    private menuPrincipal: any;
    private facade: CalculadoraFinanceiraFacade;

    constructor(menuPrincipal: any) {
        this.menuPrincipal = menuPrincipal;
        this.facade = new CalculadoraFinanceiraFacade();
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

        let strategy: CalculoStrategy | null = null;

        switch (resposta.opcao) {
            case 'Capital, taxa e tempo':
                strategy = new MontantePorCapitalTaxaTempoStrategy(this.facade);
                break;
            case 'Capital e juros':
                strategy = new MontantePorCapitalJurosStrategy(this.facade);
                break;
            case 'Juros, taxa e tempo':
                strategy = new MontantePorJurosTaxaTempoStrategy(this.facade);
                break;
            case 'Voltar ao menu principal':
                await this.confirmarVoltaMenu();
                return;
            default:
                console.log("Opção inválida! Tente novamente.");
                await this.menuMontante();
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