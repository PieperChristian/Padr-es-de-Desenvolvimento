import inquirer from 'inquirer';
import { CalculoStrategy } from './CalculoStrategy';
import { criarPromptConfirmacao } from '../auxiliaresPrompts';

/**
 * Context (Contexto) do padrão Strategy que executa o algoritmo comum
 * de cálculo, delegando as etapas específicas para a estratégia injetada.
 * 
 * Responsabilidades:
 * - Define o fluxo de execução padrão (template do algoritmo)
 * - Trata erros de forma centralizada
 * - Gerencia navegação de volta ao menu
 * - Mantém referência para a estratégia e menu principal
 * 
 * Padrão Strategy - Componente: Contexto
 */
export class CalculadoraContext {
    
    constructor(
        private strategy: CalculoStrategy,
        private menuPrincipal: any
    ) {}
    
    /**
     * Método principal que executa o fluxo completo de cálculo.
     * 
     * Fluxo:
     * 1. Exibe cabeçalho com nome do cálculo
     * 2. Obtém inputs via estratégia
     * 3. Executa cálculo via estratégia
     * 4. Formata e exibe resultado via estratégia
     * 5. Trata erros (se houver)
     * 6. Confirma volta ao menu
     */
    async executar(): Promise<void> {
        console.log(`\n--- Calculando ${this.strategy.getNomeCalculo()} ---`);
        
        try {
            // Delega para estratégia: obter inputs
            const inputs = await this.strategy.obterInputs();
            
            // Delega para estratégia: executar cálculo
            const resultado = this.strategy.calcular(inputs);
            
            // Exibe resultado formatado pela estratégia
            console.log("\n✅ RESULTADO:");
            console.log(this.strategy.formatarResultado(resultado));
            
        } catch (error: any) {
            // Tratamento centralizado de erros
            console.log("\n❌ ERRO:");
            console.log(error.message);
        }
        
        // Navegação de volta ao menu
        await this.confirmarVoltaMenu();
    }
    
    /**
     * Pergunta ao usuário se deseja voltar ao menu principal.
     * Método privado reutilizado após cada cálculo.
     */
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
