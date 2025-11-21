import { CapitalPorJurosTaxaTempoStrategy } from "../../srcComPadroes/interface/strategies/estrategias/CapitalPorJurosTaxaTempoStrategy";
import { CapitalPorJurosMontanteStrategy } from "../../srcComPadroes/interface/strategies/estrategias/CapitalPorJurosMontanteStrategy";
import { CapitalPorTaxaTempoMontanteStrategy } from "../../srcComPadroes/interface/strategies/estrategias/CapitalPorTaxaTempoMontanteStrategy";
import { CalculadoraFinanceiraFacade } from "../../srcComPadroes/core/CalculadoraFinanceiraFacade";

jest.mock("../../srcComPadroes/core/CalculadoraFinanceiraFacade");
jest.mock('inquirer', () => ({ prompt: jest.fn() }));

import inquirer from 'inquirer';

describe("Estratégias de Cálculo de Capital - Padrão Strategy", () => {
    let mockFacade: jest.Mocked<CalculadoraFinanceiraFacade>;

    beforeEach(() => {
        mockFacade = new CalculadoraFinanceiraFacade() as jest.Mocked<CalculadoraFinanceiraFacade>;
        jest.clearAllMocks();
    });

    describe("CapitalPorJurosTaxaTempoStrategy", () => {
        let strategy: CapitalPorJurosTaxaTempoStrategy;

        beforeEach(() => {
            strategy = new CapitalPorJurosTaxaTempoStrategy(mockFacade);
        });

        it("deve obter inputs: juros, taxa e tempo", async () => {
            const mockInputs = { juros: 1200, taxa: 0.10, tempo: 12 };
            (inquirer.prompt as unknown as jest.Mock).mockResolvedValue(mockInputs);

            const inputs = await strategy.obterInputs();

            expect(inquirer.prompt).toHaveBeenCalled();
            expect(inputs).toEqual(mockInputs);
        });

        it("deve chamar facade.calcularCapital com método 'jurosTaxaTempo'", () => {
            const inputs = { juros: 1200, taxa: 0.10, tempo: 12 };
            const mockResultado = 1000;
            mockFacade.calcularCapital.mockReturnValue(mockResultado);

            const resultado = strategy.calcular(inputs);

            expect(mockFacade.calcularCapital).toHaveBeenCalledWith('jurosTaxaTempo', inputs);
            expect(resultado).toBe(mockResultado);
        });

        it("deve formatar resultado como 'Capital: R$ X.XX'", () => {
            expect(strategy.formatarResultado(1000)).toBe("Capital: R$ 1000.00\n");
        });

        it("deve retornar 'Capital' como nome do cálculo", () => {
            expect(strategy.getNomeCalculo()).toBe("Capital");
        });
    });

    describe("CapitalPorJurosMontanteStrategy", () => {
        let strategy: CapitalPorJurosMontanteStrategy;

        beforeEach(() => {
            strategy = new CapitalPorJurosMontanteStrategy(mockFacade);
        });

        it("deve obter inputs: juros e montante", async () => {
            const mockInputs = { juros: 1200, montante: 2200 };
            (inquirer.prompt as unknown as jest.Mock).mockResolvedValue(mockInputs);

            const inputs = await strategy.obterInputs();

            expect(inquirer.prompt).toHaveBeenCalled();
            expect(inputs).toEqual(mockInputs);
        });

        it("deve chamar facade.calcularCapital com método 'jurosMontante'", () => {
            const inputs = { juros: 1200, montante: 2200 };
            const mockResultado = 1000;
            mockFacade.calcularCapital.mockReturnValue(mockResultado);

            const resultado = strategy.calcular(inputs);

            expect(mockFacade.calcularCapital).toHaveBeenCalledWith('jurosMontante', inputs);
            expect(resultado).toBe(mockResultado);
        });

        it("deve formatar resultado como 'Capital: R$ X.XX'", () => {
            expect(strategy.formatarResultado(1000)).toBe("Capital: R$ 1000.00\n");
        });

        it("deve retornar 'Capital' como nome do cálculo", () => {
            expect(strategy.getNomeCalculo()).toBe("Capital");
        });
    });

    describe("CapitalPorTaxaTempoMontanteStrategy", () => {
        let strategy: CapitalPorTaxaTempoMontanteStrategy;

        beforeEach(() => {
            strategy = new CapitalPorTaxaTempoMontanteStrategy(mockFacade);
        });

        it("deve obter inputs: taxa, tempo e montante", async () => {
            const mockInputs = { taxa: 0.10, tempo: 12, montante: 2200 };
            (inquirer.prompt as unknown as jest.Mock).mockResolvedValue(mockInputs);

            const inputs = await strategy.obterInputs();

            expect(inquirer.prompt).toHaveBeenCalled();
            expect(inputs).toEqual(mockInputs);
        });

        it("deve chamar facade.calcularCapital com método 'taxaTempoMontante'", () => {
            const inputs = { taxa: 0.10, tempo: 12, montante: 2200 };
            const mockResultado = 1000;
            mockFacade.calcularCapital.mockReturnValue(mockResultado);

            const resultado = strategy.calcular(inputs);

            expect(mockFacade.calcularCapital).toHaveBeenCalledWith('taxaTempoMontante', inputs);
            expect(resultado).toBe(mockResultado);
        });

        it("deve formatar resultado como 'Capital: R$ X.XX'", () => {
            expect(strategy.formatarResultado(1000)).toBe("Capital: R$ 1000.00\n");
        });

        it("deve retornar 'Capital' como nome do cálculo", () => {
            expect(strategy.getNomeCalculo()).toBe("Capital");
        });
    });
});
