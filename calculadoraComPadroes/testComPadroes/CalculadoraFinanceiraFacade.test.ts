import { CalculadoraFinanceiraFacade } from "../srcComPadroes/core/CalculadoraFinanceiraFacade";
import { JurosSimples } from "../srcComPadroes/core/JurosSimples";

// Mock do JurosSimples para isolar os testes da Facade
jest.mock("../srcComPadroes/core/JurosSimples");

describe("CalculadoraFinanceiraFacade - Testes do padrão Facade", () => {
    let facade: CalculadoraFinanceiraFacade;
    
    beforeEach(() => {
        facade = new CalculadoraFinanceiraFacade();
        jest.clearAllMocks();
    });

    describe("calcularJuros - Cálculo de Juros", () => {
        it("deve chamar jurosPorCapitalTaxaTempo quando método='capitalTaxaTempo'", () => {
            const mockRetorno = 1200;
            (JurosSimples.jurosPorCapitalTaxaTempo as jest.Mock).mockReturnValue(mockRetorno);

            const resultado = facade.calcularJuros('capitalTaxaTempo', {
                capital: 1000,
                taxa: 0.10,
                tempo: 12
            });

            expect(JurosSimples.jurosPorCapitalTaxaTempo).toHaveBeenCalledWith({
                capital: 1000,
                taxa: 0.10,
                tempo: 12
            });
            expect(resultado).toBe(mockRetorno);
        });

        it("deve chamar jurosPorCapitalMontante quando método='capitalMontante'", () => {
            const mockRetorno = 1200;
            (JurosSimples.jurosPorCapitalMontante as jest.Mock).mockReturnValue(mockRetorno);

            const resultado = facade.calcularJuros('capitalMontante', {
                capital: 1000,
                montante: 2200
            });

            expect(JurosSimples.jurosPorCapitalMontante).toHaveBeenCalledWith({
                capital: 1000,
                montante: 2200
            });
            expect(resultado).toBe(mockRetorno);
        });

        it("deve chamar jurosPorTaxaTempoMontante quando método='taxaTempoMontante'", () => {
            const mockRetorno = 1200;
            (JurosSimples.jurosPorTaxaTempoMontante as jest.Mock).mockReturnValue(mockRetorno);

            const resultado = facade.calcularJuros('taxaTempoMontante', {
                taxa: 0.10,
                tempo: 12,
                montante: 2200
            });

            expect(JurosSimples.jurosPorTaxaTempoMontante).toHaveBeenCalledWith({
                taxa: 0.10,
                tempo: 12,
                montante: 2200
            });
            expect(resultado).toBe(mockRetorno);
        });
    });

    describe("calcularCapital - Cálculo de Capital", () => {
        it("deve chamar capitalPorJurosTaxaTempo quando método='jurosTaxaTempo'", () => {
            const mockRetorno = 1000;
            (JurosSimples.capitalPorJurosTaxaTempo as jest.Mock).mockReturnValue(mockRetorno);

            const resultado = facade.calcularCapital('jurosTaxaTempo', {
                juros: 1200,
                taxa: 0.10,
                tempo: 12
            });

            expect(JurosSimples.capitalPorJurosTaxaTempo).toHaveBeenCalledWith({
                juros: 1200,
                taxa: 0.10,
                tempo: 12
            });
            expect(resultado).toBe(mockRetorno);
        });

        it("deve chamar capitalPorJurosMontante quando método='jurosMontante'", () => {
            const mockRetorno = 1000;
            (JurosSimples.capitalPorJurosMontante as jest.Mock).mockReturnValue(mockRetorno);

            const resultado = facade.calcularCapital('jurosMontante', {
                juros: 1200,
                montante: 2200
            });

            expect(JurosSimples.capitalPorJurosMontante).toHaveBeenCalledWith({
                juros: 1200,
                montante: 2200
            });
            expect(resultado).toBe(mockRetorno);
        });

        it("deve chamar capitalPorTaxaTempoMontante quando método='taxaTempoMontante'", () => {
            const mockRetorno = 1000;
            (JurosSimples.capitalPorTaxaTempoMontante as jest.Mock).mockReturnValue(mockRetorno);

            const resultado = facade.calcularCapital('taxaTempoMontante', {
                taxa: 0.10,
                tempo: 12,
                montante: 2200
            });

            expect(JurosSimples.capitalPorTaxaTempoMontante).toHaveBeenCalledWith({
                taxa: 0.10,
                tempo: 12,
                montante: 2200
            });
            expect(resultado).toBe(mockRetorno);
        });
    });

    describe("calcularMontante - Cálculo de Montante", () => {
        it("deve chamar montantePorCapitalTaxaTempo quando método='capitalTaxaTempo'", () => {
            const mockRetorno = 2200;
            (JurosSimples.montantePorCapitalTaxaTempo as jest.Mock).mockReturnValue(mockRetorno);

            const resultado = facade.calcularMontante('capitalTaxaTempo', {
                capital: 1000,
                taxa: 0.10,
                tempo: 12
            });

            expect(JurosSimples.montantePorCapitalTaxaTempo).toHaveBeenCalledWith({
                capital: 1000,
                taxa: 0.10,
                tempo: 12
            });
            expect(resultado).toBe(mockRetorno);
        });

        it("deve chamar montantePorCapitalJuros quando método='capitalJuros'", () => {
            const mockRetorno = 2200;
            (JurosSimples.montantePorCapitalJuros as jest.Mock).mockReturnValue(mockRetorno);

            const resultado = facade.calcularMontante('capitalJuros', {
                capital: 1000,
                juros: 1200
            });

            expect(JurosSimples.montantePorCapitalJuros).toHaveBeenCalledWith({
                capital: 1000,
                juros: 1200
            });
            expect(resultado).toBe(mockRetorno);
        });

        it("deve chamar montantePorJurosTaxaTempo quando método='jurosTaxaTempo'", () => {
            const mockRetorno = 2200;
            (JurosSimples.montantePorJurosTaxaTempo as jest.Mock).mockReturnValue(mockRetorno);

            const resultado = facade.calcularMontante('jurosTaxaTempo', {
                juros: 1200,
                taxa: 0.10,
                tempo: 12
            });

            expect(JurosSimples.montantePorJurosTaxaTempo).toHaveBeenCalledWith({
                juros: 1200,
                taxa: 0.10,
                tempo: 12
            });
            expect(resultado).toBe(mockRetorno);
        });
    });

    describe("calcularTaxa - Cálculo de Taxa", () => {
        it("deve chamar taxaPorCapitalJurosTempo quando método='capitalJurosTempo'", () => {
            const mockRetorno = 0.10;
            (JurosSimples.taxaPorCapitalJurosTempo as jest.Mock).mockReturnValue(mockRetorno);

            const resultado = facade.calcularTaxa('capitalJurosTempo', {
                capital: 1000,
                juros: 1200,
                tempo: 12
            });

            expect(JurosSimples.taxaPorCapitalJurosTempo).toHaveBeenCalledWith({
                capital: 1000,
                juros: 1200,
                tempo: 12
            });
            expect(resultado).toBe(mockRetorno);
        });

        it("deve chamar taxaPorCapitalMontanteTempo quando método='capitalMontanteTempo'", () => {
            const mockRetorno = 0.10;
            (JurosSimples.taxaPorCapitalMontanteTempo as jest.Mock).mockReturnValue(mockRetorno);

            const resultado = facade.calcularTaxa('capitalMontanteTempo', {
                capital: 1000,
                montante: 2200,
                tempo: 12
            });

            expect(JurosSimples.taxaPorCapitalMontanteTempo).toHaveBeenCalledWith({
                capital: 1000,
                montante: 2200,
                tempo: 12
            });
            expect(resultado).toBe(mockRetorno);
        });

        it("deve chamar taxaPorJurosMontanteTempo quando método='jurosMontanteTempo'", () => {
            const mockRetorno = 0.10;
            (JurosSimples.taxaPorJurosMontanteTempo as jest.Mock).mockReturnValue(mockRetorno);

            const resultado = facade.calcularTaxa('jurosMontanteTempo', {
                juros: 1200,
                montante: 2200,
                tempo: 12
            });

            expect(JurosSimples.taxaPorJurosMontanteTempo).toHaveBeenCalledWith({
                juros: 1200,
                montante: 2200,
                tempo: 12
            });
            expect(resultado).toBe(mockRetorno);
        });
    });

    describe("calcularTempo - Cálculo de Tempo", () => {
        it("deve chamar tempoPorCapitalJurosTaxa quando método='capitalJurosTaxa'", () => {
            const mockRetorno = 12;
            (JurosSimples.tempoPorCapitalJurosTaxa as jest.Mock).mockReturnValue(mockRetorno);

            const resultado = facade.calcularTempo('capitalJurosTaxa', {
                capital: 1000,
                juros: 1200,
                taxa: 0.10
            });

            expect(JurosSimples.tempoPorCapitalJurosTaxa).toHaveBeenCalledWith({
                capital: 1000,
                juros: 1200,
                taxa: 0.10
            });
            expect(resultado).toBe(mockRetorno);
        });

        it("deve chamar tempoPorCapitalMontanteTaxa quando método='capitalMontanteTaxa'", () => {
            const mockRetorno = 12;
            (JurosSimples.tempoPorCapitalMontanteTaxa as jest.Mock).mockReturnValue(mockRetorno);

            const resultado = facade.calcularTempo('capitalMontanteTaxa', {
                capital: 1000,
                montante: 2200,
                taxa: 0.10
            });

            expect(JurosSimples.tempoPorCapitalMontanteTaxa).toHaveBeenCalledWith({
                capital: 1000,
                montante: 2200,
                taxa: 0.10
            });
            expect(resultado).toBe(mockRetorno);
        });

        it("deve chamar tempoPorJurosMontanteTaxa quando método='jurosMontanteTaxa'", () => {
            const mockRetorno = 12;
            (JurosSimples.tempoPorJurosMontanteTaxa as jest.Mock).mockReturnValue(mockRetorno);

            const resultado = facade.calcularTempo('jurosMontanteTaxa', {
                juros: 1200,
                montante: 2200,
                taxa: 0.10
            });

            expect(JurosSimples.tempoPorJurosMontanteTaxa).toHaveBeenCalledWith({
                juros: 1200,
                montante: 2200,
                taxa: 0.10
            });
            expect(resultado).toBe(mockRetorno);
        });
    });
});
