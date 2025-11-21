import inquirer from 'inquirer';

import { criarPromptConfirmacao, criarPromptMenu } from './auxiliaresPrompts';
import { MenuJuros } from './menus/JurosMenu';

export class CalculadoraMenu {

    private juros: MenuJuros;

    constructor() {
        this.juros = new MenuJuros(this);
    }

    public async iniciar(): Promise<void> {
        console.clear();
        console.log("========================================");
        console.log("    💰  CALCULADORA FINANCEIRA  💰");
        console.log("========================================\n");

        await this.menuPrincipal();
    }


    public async menuPrincipal(): Promise<void> {

        const resposta = await inquirer.prompt([
            // menu padrão via helper
            criarPromptMenu(
                'opcao',
                'O que você deseja calcular?',
                [
                    'Juros',
                    'Montante',
                    'Capital',
                    'Taxa',
                    'Tempo',
                    new inquirer.Separator(),
                    'Sair'
                ],
                { raw: true }
            )
        ]);

        switch (resposta.opcao) {
            case 'Juros':
                await this.juros.menuJuros();
                break;
            case 'Montante':
                console.log("Opção em desenvolvimento...");
                break;
            case 'Capital':
                console.log("Opção em desenvolvimento...");
                break;
            case 'Taxa':
                console.log("Opção em desenvolvimento...");
                break;
            case 'Tempo':
                console.log("Opção em desenvolvimento...");
                break;
            case 'Sair':
                console.log("Até logo! 👋");
                process.exit(0);
            default:
                console.log("Opção em desenvolvimento...");
                await this.menuPrincipal();
        }
    };

    public async confirmarVoltaMenu(): Promise<void> {
        const { voltar } = await inquirer.prompt([
            criarPromptConfirmacao('voltar', 'Voltar ao menu principal?', true)
        ]);

        if (voltar) {
            console.clear();
            await this.menuPrincipal();
        } else {
            console.log("Até logo!");
        }
    };
}