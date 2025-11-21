import { JurosSimples } from './JurosSimples';
import { 
    EntradasJuros, 
    EntradasCapital, 
    EntradasMontante, 
    EntradasTaxa, 
    EntradasTempo 
} from './Util/InterfacesCalculadoraJuros';

/**
 * Facade (Fachada) que fornece uma interface simplificada para acessar
 * todas as operações de cálculo financeiro do core.
 * 
 * Benefícios:
 * - Desacopla a camada de interface da complexidade do core
 * - Ponto único de acesso para todos os cálculos
 * - Facilita testes (mock da facade)
 * - Prepara para futuras funcionalidades (cache, logs, persistência)
 */
export class CalculadoraFinanceiraFacade {

    // ========== CÁLCULOS DE JUROS ==========
    
    calcularJuros(
        tipo: 'capitalTaxaTempo' | 'capitalMontante' | 'taxaTempoMontante',
        inputs: any
    ): number {
        switch(tipo) {
            case 'capitalTaxaTempo':
                return JurosSimples.jurosPorCapitalTaxaTempo(inputs as EntradasJuros['CapitalTaxaTempo']);
            case 'capitalMontante':
                return JurosSimples.jurosPorCapitalMontante(inputs as EntradasJuros['CapitalMontante']);
            case 'taxaTempoMontante':
                return JurosSimples.jurosPorTaxaTempoMontante(inputs as EntradasJuros['TaxaTempoMontante']);
        }
    }

    // ========== CÁLCULOS DE CAPITAL ==========
    
    calcularCapital(
        tipo: 'jurosTaxaTempo' | 'jurosMontante' | 'taxaTempoMontante',
        inputs: any
    ): number {
        switch(tipo) {
            case 'jurosTaxaTempo':
                return JurosSimples.capitalPorJurosTaxaTempo(inputs as EntradasCapital['JurosTaxaTempo']);
            case 'jurosMontante':
                return JurosSimples.capitalPorJurosMontante(inputs as EntradasCapital['JurosMontante']);
            case 'taxaTempoMontante':
                return JurosSimples.capitalPorTaxaTempoMontante(inputs as EntradasCapital['TaxaTempoMontante']);
        }
    }

    // ========== CÁLCULOS DE MONTANTE ==========
    
    calcularMontante(
        tipo: 'capitalTaxaTempo' | 'capitalJuros' | 'jurosTaxaTempo',
        inputs: any
    ): number {
        switch(tipo) {
            case 'capitalTaxaTempo':
                return JurosSimples.montantePorCapitalTaxaTempo(inputs as EntradasMontante['CapitalTaxaTempo']);
            case 'capitalJuros':
                return JurosSimples.montantePorCapitalJuros(inputs as EntradasMontante['CapitalJuros']);
            case 'jurosTaxaTempo':
                return JurosSimples.montantePorJurosTaxaTempo(inputs as EntradasMontante['JurosTaxaTempo']);
        }
    }

    // ========== CÁLCULOS DE TAXA ==========
    
    calcularTaxa(
        tipo: 'capitalJurosTempo' | 'capitalMontanteTempo' | 'jurosMontanteTempo',
        inputs: any
    ): number {
        switch(tipo) {
            case 'capitalJurosTempo':
                return JurosSimples.taxaPorCapitalJurosTempo(inputs as EntradasTaxa['CapitalJurosTempo']);
            case 'capitalMontanteTempo':
                return JurosSimples.taxaPorCapitalMontanteTempo(inputs as EntradasTaxa['CapitalMontanteTempo']);
            case 'jurosMontanteTempo':
                return JurosSimples.taxaPorJurosMontanteTempo(inputs as EntradasTaxa['JurosMontanteTempo']);
        }
    }

    // ========== CÁLCULOS DE TEMPO ==========
    
    calcularTempo(
        tipo: 'capitalJurosTaxa' | 'capitalMontanteTaxa' | 'jurosMontanteTaxa',
        inputs: any
    ): number {
        switch(tipo) {
            case 'capitalJurosTaxa':
                return JurosSimples.tempoPorCapitalJurosTaxa(inputs as EntradasTempo['CapitalJurosTaxa']);
            case 'capitalMontanteTaxa':
                return JurosSimples.tempoPorCapitalMontanteTaxa(inputs as EntradasTempo['CapitalMontanteTaxa']);
            case 'jurosMontanteTaxa':
                return JurosSimples.tempoPorJurosMontanteTaxa(inputs as EntradasTempo['JurosMontanteTaxa']);
        }
    }
}
