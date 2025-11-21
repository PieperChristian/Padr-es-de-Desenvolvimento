import inquirer from "inquirer";
import { criarPromptConfirmacao, criarPromptMenu } from "../auxiliaresPrompts";
import { CalculadoraContext } from '../strategies/CalculadoraContext';
import { CalculoStrategy } from '../strategies/CalculoStrategy';
import { CalculadoraFinanceiraFacade } from '../../core/CalculadoraFinanceiraFacade';
import { CapitalPorJurosTaxaTempoStrategy } from '../strategies/estrategias/CapitalPorJurosTaxaTempoStrategy';
import { CapitalPorJurosMontanteStrategy } from '../strategies/estrategias/CapitalPorJurosMontanteStrategy';
import { CapitalPorTaxaTempoMontanteStrategy } from '../strategies/estrategias/CapitalPorTaxaTempoMontanteStrategy';

/**
 * Menu de Capital refatorado para usar o padrão Strategy.
 * Cada opção instancia uma estratégia diferente e a executa via Context.
 */
export class MenuCapital {
    private menuPrincipal: any;
    private facade: CalculadoraFinanceiraFacade;

    constructor(menuPrincipal: any) {
        this.menuPrincipal = menuPrincipal;
        this.facade = new CalculadoraFinanceiraFacade();
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

        let strategy: CalculoStrategy | null = null;

        switch (resposta.opcao) {
            case 'Juros, taxa e tempo':
                strategy = new CapitalPorJurosTaxaTempoStrategy(this.facade);
                break;
            case 'Juros e montante':
                strategy = new CapitalPorJurosMontanteStrategy(this.facade);
                break;
            case 'Taxa, tempo e montante':
                strategy = new CapitalPorTaxaTempoMontanteStrategy(this.facade);
                break;
            case 'Voltar ao menu principal':
                await this.confirmarVoltaMenu();
                return;
            default:
                console.log("Opção inválida! Tente novamente.");
                await this.menuCapital();
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