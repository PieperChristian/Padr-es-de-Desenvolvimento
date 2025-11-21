
import { MENSAGENS_ERRO } from "./constants/MensagensErro";

export class ValidadoresJuros {

    private static ehIndefinido(valor: any): boolean {
        return valor === undefined || valor === null || isNaN(valor);
    }

    public static validarJuros(juros: number): void {
        if (this.ehIndefinido(juros)) {
            throw new Error(MENSAGENS_ERRO.JUROS_NECESSARIOS);
        };
        
        if (juros < 0) {
            throw new Error(MENSAGENS_ERRO.JUROS_NEGATIVO);
        };

        if (juros === 0) {
            throw new Error(MENSAGENS_ERRO.JUROS_ZERO);
        };
    }

    public static validarCapital(capital: number): void {
        if (this.ehIndefinido(capital)) {
            throw new Error(MENSAGENS_ERRO.CAPITAL_NECESSARIO);
        };

        if (capital < 0) {
            throw new Error(MENSAGENS_ERRO.CAPITAL_NEGATIVO);
        };

        if (capital === 0) {
            throw new Error(MENSAGENS_ERRO.CAPITAL_ZERO);
        };
    }

    public static validarMontante(montante: number): void {
        if (this.ehIndefinido(montante)) {
            throw new Error(MENSAGENS_ERRO.MONTANTE_NECESSARIO);
        };

        if (montante < 0) {
            throw new Error(MENSAGENS_ERRO.MONTANTE_NEGATIVO);
        };

        if (montante === 0) {
            throw new Error(MENSAGENS_ERRO.MONTANTE_ZERO);
        };
    }

    public static validarTaxa(taxa: number): void {
        if (this.ehIndefinido(taxa)) {
            throw new Error(MENSAGENS_ERRO.TAXA_NECESSARIO);
        };

        if (taxa < 0) {
            throw new Error(MENSAGENS_ERRO.TAXA_NEGATIVA);
        };

        if (taxa === 0) {
            throw new Error(MENSAGENS_ERRO.TAXA_ZERO);
        };
    }

    public static validarTempo(tempo: number): void {
        if (this.ehIndefinido(tempo)) {
            throw new Error(MENSAGENS_ERRO.TEMPO_NECESSARIO);
        };

        if (tempo < 0) {
            throw new Error(MENSAGENS_ERRO.TEMPO_NEGATIVO);
        };

        if (tempo === 0) {
            throw new Error(MENSAGENS_ERRO.TEMPO_ZERO);
        };
    }

}