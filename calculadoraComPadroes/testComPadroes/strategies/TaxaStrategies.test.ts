import { TaxaPorCapitalJurosTempoStrategy } from "../../srcComPadroes/interface/strategies/estrategias/TaxaPorCapitalJurosTempoStrategy";
import { TaxaPorCapitalMontanteTempoStrategy } from "../../srcComPadroes/interface/strategies/estrategias/TaxaPorCapitalMontanteTempoStrategy";
import { TaxaPorJurosMontanteTempoStrategy } from "../../srcComPadroes/interface/strategies/estrategias/TaxaPorJurosMontanteTempoStrategy";
import { CalculadoraFinanceiraFacade } from "../../srcComPadroes/core/CalculadoraFinanceiraFacade";

jest.mock("../../srcComPadroes/core/CalculadoraFinanceiraFacade");
jest.mock('inquirer', () => ({ prompt: jest.fn() }));

import inquirer from 'inquirer';

describe("Estratégias de Cálculo de Taxa - Padrão Strategy", () => {
    let mockFacade: jest.Mocked<CalculadoraFinanceiraFacade>;

    beforeEach(() => {
        mockFacade = new CalculadoraFinanceiraFacade() as jest.Mocked<CalculadoraFinanceiraFacade>;
        jest.clearAllMocks();
    });

    describe("TaxaPorCapitalJurosTempoStrategy", () => {
        let strategy: TaxaPorCapitalJurosTempoStrategy;

        beforeEach(() => {
            strategy = new TaxaPorCapitalJurosTempoStrategy(mockFacade);
        });

        it("deve obter inputs: capital, juros e tempo", async () => {
            const mockInputs = { capital: 1000, juros: 1200, tempo: 12 };
            (inquirer.prompt as unknown as jest.Mock).mockResolvedValue(mockInputs);

            const inputs = await strategy.obterInputs();

            expect(inquirer.prompt).toHaveBeenCalled();
            expect(inputs).toEqual(mockInputs);
        });

        it("deve chamar facade.calcularTaxa com método 'capitalJurosTempo'", () => {
            const inputs = { capital: 1000, juros: 1200, tempo: 12 };
            const mockResultado = 0.10;
            mockFacade.calcularTaxa.mockReturnValue(mockResultado);

            const resultado = strategy.calcular(inputs);

            expect(mockFacade.calcularTaxa).toHaveBeenCalledWith('capitalJurosTempo', inputs);
            expect(resultado).toBe(mockResultado);
        });

        it("deve formatar resultado como 'Taxa: X.XX%'", () => {
            expect(strategy.formatarResultado(0.10)).toBe("Taxa: 0.10%\n");
        });

        it("deve retornar 'Taxa' como nome do cálculo", () => {
            expect(strategy.getNomeCalculo()).toBe("Taxa");
        });
    });

    describe("TaxaPorCapitalMontanteTempoStrategy", () => {
        let strategy: TaxaPorCapitalMontanteTempoStrategy;

        beforeEach(() => {
            strategy = new TaxaPorCapitalMontanteTempoStrategy(mockFacade);
        });

        it("deve obter inputs: capital, montante e tempo", async () => {
            const mockInputs = { capital: 1000, montante: 2200, tempo: 12 };
            (inquirer.prompt as unknown as jest.Mock).mockResolvedValue(mockInputs);

            const inputs = await strategy.obterInputs();

            expect(inquirer.prompt).toHaveBeenCalled();
            expect(inputs).toEqual(mockInputs);
        });

        it("deve chamar facade.calcularTaxa com método 'capitalMontanteTempo'", () => {
            const inputs = { capital: 1000, montante: 2200, tempo: 12 };
            const mockResultado = 0.10;
            mockFacade.calcularTaxa.mockReturnValue(mockResultado);

            const resultado = strategy.calcular(inputs);

            expect(mockFacade.calcularTaxa).toHaveBeenCalledWith('capitalMontanteTempo', inputs);
            expect(resultado).toBe(mockResultado);
        });

        it("deve formatar resultado como 'Taxa: X.XX%'", () => {
            expect(strategy.formatarResultado(0.10)).toBe("Taxa: 0.10%\n");
        });

        it("deve retornar 'Taxa' como nome do cálculo", () => {
            expect(strategy.getNomeCalculo()).toBe("Taxa");
        });
    });

    describe("TaxaPorJurosMontanteTempoStrategy", () => {
        let strategy: TaxaPorJurosMontanteTempoStrategy;

        beforeEach(() => {
            strategy = new TaxaPorJurosMontanteTempoStrategy(mockFacade);
        });

        it("deve obter inputs: juros, montante e tempo", async () => {
            const mockInputs = { juros: 1200, montante: 2200, tempo: 12 };
            (inquirer.prompt as unknown as jest.Mock).mockResolvedValue(mockInputs);

            const inputs = await strategy.obterInputs();

            expect(inquirer.prompt).toHaveBeenCalled();
            expect(inputs).toEqual(mockInputs);
        });

        it("deve chamar facade.calcularTaxa com método 'jurosMontanteTempo'", () => {
            const inputs = { juros: 1200, montante: 2200, tempo: 12 };
            const mockResultado = 0.10;
            mockFacade.calcularTaxa.mockReturnValue(mockResultado);

            const resultado = strategy.calcular(inputs);

            expect(mockFacade.calcularTaxa).toHaveBeenCalledWith('jurosMontanteTempo', inputs);
            expect(resultado).toBe(mockResultado);
        });

        it("deve formatar resultado como 'Taxa: X.XX%'", () => {
            expect(strategy.formatarResultado(0.10)).toBe("Taxa: 0.10%\n");
        });

        it("deve retornar 'Taxa' como nome do cálculo", () => {
            expect(strategy.getNomeCalculo()).toBe("Taxa");
        });
    });
});
