import { TempoPorCapitalJurosTaxaStrategy } from "../../srcComPadroes/interface/strategies/estrategias/TempoPorCapitalJurosTaxaStrategy";
import { TempoPorCapitalMontanteTaxaStrategy } from "../../srcComPadroes/interface/strategies/estrategias/TempoPorCapitalMontanteTaxaStrategy";
import { TempoPorJurosMontanteTaxaStrategy } from "../../srcComPadroes/interface/strategies/estrategias/TempoPorJurosMontanteTaxaStrategy";
import { CalculadoraFinanceiraFacade } from "../../srcComPadroes/core/CalculadoraFinanceiraFacade";

jest.mock("../../srcComPadroes/core/CalculadoraFinanceiraFacade");
jest.mock('inquirer', () => ({ prompt: jest.fn() }));

import inquirer from 'inquirer';

describe("Estratégias de Cálculo de Tempo - Padrão Strategy", () => {
    let mockFacade: jest.Mocked<CalculadoraFinanceiraFacade>;

    beforeEach(() => {
        mockFacade = new CalculadoraFinanceiraFacade() as jest.Mocked<CalculadoraFinanceiraFacade>;
        jest.clearAllMocks();
    });

    describe("TempoPorCapitalJurosTaxaStrategy", () => {
        let strategy: TempoPorCapitalJurosTaxaStrategy;

        beforeEach(() => {
            strategy = new TempoPorCapitalJurosTaxaStrategy(mockFacade);
        });

        it("deve obter inputs: capital, juros e taxa", async () => {
            const mockInputs = { capital: 1000, juros: 1200, taxa: 0.10 };
            (inquirer.prompt as unknown as jest.Mock).mockResolvedValue(mockInputs);

            const inputs = await strategy.obterInputs();

            expect(inquirer.prompt).toHaveBeenCalled();
            expect(inputs).toEqual(mockInputs);
        });

        it("deve chamar facade.calcularTempo com método 'capitalJurosTaxa'", () => {
            const inputs = { capital: 1000, juros: 1200, taxa: 0.10 };
            const mockResultado = 12;
            mockFacade.calcularTempo.mockReturnValue(mockResultado);

            const resultado = strategy.calcular(inputs);

            expect(mockFacade.calcularTempo).toHaveBeenCalledWith('capitalJurosTaxa', inputs);
            expect(resultado).toBe(mockResultado);
        });

        it("deve formatar resultado como 'Tempo: X.X unidades'", () => {
            expect(strategy.formatarResultado(12)).toBe("Tempo: 12.0\n");
        });

        it("deve retornar 'Tempo' como nome do cálculo", () => {
            expect(strategy.getNomeCalculo()).toBe("Tempo");
        });
    });

    describe("TempoPorCapitalMontanteTaxaStrategy", () => {
        let strategy: TempoPorCapitalMontanteTaxaStrategy;

        beforeEach(() => {
            strategy = new TempoPorCapitalMontanteTaxaStrategy(mockFacade);
        });

        it("deve obter inputs: capital, montante e taxa", async () => {
            const mockInputs = { capital: 1000, montante: 2200, taxa: 0.10 };
            (inquirer.prompt as unknown as jest.Mock).mockResolvedValue(mockInputs);

            const inputs = await strategy.obterInputs();

            expect(inquirer.prompt).toHaveBeenCalled();
            expect(inputs).toEqual(mockInputs);
        });

        it("deve chamar facade.calcularTempo com método 'capitalMontanteTaxa'", () => {
            const inputs = { capital: 1000, montante: 2200, taxa: 0.10 };
            const mockResultado = 12;
            mockFacade.calcularTempo.mockReturnValue(mockResultado);

            const resultado = strategy.calcular(inputs);

            expect(mockFacade.calcularTempo).toHaveBeenCalledWith('capitalMontanteTaxa', inputs);
            expect(resultado).toBe(mockResultado);
        });

        it("deve formatar resultado como 'Tempo: X.X unidades'", () => {
            expect(strategy.formatarResultado(12)).toBe("Tempo: 12.0\n");
        });

        it("deve retornar 'Tempo' como nome do cálculo", () => {
            expect(strategy.getNomeCalculo()).toBe("Tempo");
        });
    });

    describe("TempoPorJurosMontanteTaxaStrategy", () => {
        let strategy: TempoPorJurosMontanteTaxaStrategy;

        beforeEach(() => {
            strategy = new TempoPorJurosMontanteTaxaStrategy(mockFacade);
        });

        it("deve obter inputs: juros, montante e taxa", async () => {
            const mockInputs = { juros: 1200, montante: 2200, taxa: 0.10 };
            (inquirer.prompt as unknown as jest.Mock).mockResolvedValue(mockInputs);

            const inputs = await strategy.obterInputs();

            expect(inquirer.prompt).toHaveBeenCalled();
            expect(inputs).toEqual(mockInputs);
        });

        it("deve chamar facade.calcularTempo com método 'jurosMontanteTaxa'", () => {
            const inputs = { juros: 1200, montante: 2200, taxa: 0.10 };
            const mockResultado = 12;
            mockFacade.calcularTempo.mockReturnValue(mockResultado);

            const resultado = strategy.calcular(inputs);

            expect(mockFacade.calcularTempo).toHaveBeenCalledWith('jurosMontanteTaxa', inputs);
            expect(resultado).toBe(mockResultado);
        });

        it("deve formatar resultado como 'Tempo: X.X unidades'", () => {
            expect(strategy.formatarResultado(12)).toBe("Tempo: 12.0\n");
        });

        it("deve retornar 'Tempo' como nome do cálculo", () => {
            expect(strategy.getNomeCalculo()).toBe("Tempo");
        });
    });
});
