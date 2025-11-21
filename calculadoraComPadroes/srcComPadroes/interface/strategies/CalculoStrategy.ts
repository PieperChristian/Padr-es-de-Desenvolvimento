/**
 * Interface Strategy (Estratégia) que define o contrato comum para
 * todos os algoritmos de cálculo financeiro.
 * 
 * Cada estratégia concreta implementa essa interface, permitindo que
 * sejam intercambiáveis no contexto executor.
 * 
 * Padrão Strategy - Componente: Interface da Estratégia
 */
export interface CalculoStrategy {
    
    /**
     * Obtém os inputs necessários do usuário através de prompts interativos.
     * Cada estratégia define quais campos são necessários.
     * 
     * @returns Promise com objeto contendo os inputs coletados
     */
    obterInputs(): Promise<any>;
    
    /**
     * Executa o cálculo financeiro com os inputs fornecidos.
     * Delega para o core através da Facade.
     * 
     * @param inputs - Dados necessários para o cálculo
     * @returns Resultado numérico do cálculo
     */
    calcular(inputs: any): number;
    
    /**
     * Formata o resultado do cálculo para exibição ao usuário.
     * Cada estratégia define seu próprio formato de saída.
     * 
     * @param resultado - Valor numérico calculado
     * @returns String formatada para exibição
     */
    formatarResultado(resultado: number): string;
    
    /**
     * Retorna o nome do tipo de cálculo para exibição nos logs.
     * 
     * @returns Nome do cálculo (ex: "Juros", "Capital", "Montante")
     */
    getNomeCalculo(): string;
}
