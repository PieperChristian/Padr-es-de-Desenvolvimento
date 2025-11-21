import { MontantePorCapitalTaxaTempoStrategy } from "../../srcComPadroes/interface/strategies/estrategias/MontantePorCapitalTaxaTempoStrategy";
import { MontantePorCapitalJurosStrategy } from "../../srcComPadroes/interface/strategies/estrategias/MontantePorCapitalJurosStrategy";
import { MontantePorJurosTaxaTempoStrategy } from "../../srcComPadroes/interface/strategies/estrategias/MontantePorJurosTaxaTempoStrategy";
import { CalculadoraFinanceiraFacade } from "../../srcComPadroes/core/CalculadoraFinanceiraFacade";

jest.mock("../../srcComPadroes/core/CalculadoraFinanceiraFacade");
jest.mock('inquirer', () => ({ prompt: jest.fn() }));

import inquirer from 'inquirer';

describe("Estratégias de Cálculo de Montante - Padrão Strategy", () => {
    let mockFacade: jest.Mocked<CalculadoraFinanceiraFacade>;

    beforeEach(() => {
        mockFacade = new CalculadoraFinanceiraFacade() as jest.Mocked<CalculadoraFinanceiraFacade>;
        jest.clearAllMocks();
    });

    describe("MontantePorCapitalTaxaTempoStrategy", () => {
        let strategy: MontantePorCapitalTaxaTempoStrategy;

        beforeEach(() => {
            strategy = new MontantePorCapitalTaxaTempoStrategy(mockFacade);
        });

        it("deve obter inputs: capital, taxa e tempo", async () => {
            const mockInputs = { capital: 1000, taxa: 0.10, tempo: 12 };
            (inquirer.prompt as unknown as jest.Mock).mockResolvedValue(mockInputs);

            const inputs = await strategy.obterInputs();

            expect(inquirer.prompt).toHaveBeenCalled();
            expect(inputs).toEqual(mockInputs);
        });

        it("deve chamar facade.calcularMontante com método 'capitalTaxaTempo'", () => {
            const inputs = { capital: 1000, taxa: 0.10, tempo: 12 };
            const mockResultado = 2200;
            mockFacade.calcularMontante.mockReturnValue(mockResultado);

            const resultado = strategy.calcular(inputs);

            expect(mockFacade.calcularMontante).toHaveBeenCalledWith('capitalTaxaTempo', inputs);
            expect(resultado).toBe(mockResultado);
        });

        it("deve formatar resultado como 'Montante: R$ X.XX'", () => {
            expect(strategy.formatarResultado(2200)).toBe("Montante: R$ 2200.00\n");
        });

        it("deve retornar 'Montante' como nome do cálculo", () => {
            expect(strategy.getNomeCalculo()).toBe("Montante");
        });
    });

    describe("MontantePorCapitalJurosStrategy", () => {
        let strategy: MontantePorCapitalJurosStrategy;

        beforeEach(() => {
            strategy = new MontantePorCapitalJurosStrategy(mockFacade);
        });

        it("deve obter inputs: capital e juros", async () => {
            const mockInputs = { capital: 1000, juros: 1200 };
            (inquirer.prompt as unknown as jest.Mock).mockResolvedValue(mockInputs);

            const inputs = await strategy.obterInputs();

            expect(inquirer.prompt).toHaveBeenCalled();
            expect(inputs).toEqual(mockInputs);
        });

        it("deve chamar facade.calcularMontante com método 'capitalJuros'", () => {
            const inputs = { capital: 1000, juros: 1200 };
            const mockResultado = 2200;
            mockFacade.calcularMontante.mockReturnValue(mockResultado);

            const resultado = strategy.calcular(inputs);

            expect(mockFacade.calcularMontante).toHaveBeenCalledWith('capitalJuros', inputs);
            expect(resultado).toBe(mockResultado);
        });

        it("deve formatar resultado como 'Montante: R$ X.XX'", () => {
            expect(strategy.formatarResultado(2200)).toBe("Montante: R$ 2200.00\n");
        });

        it("deve retornar 'Montante' como nome do cálculo", () => {
            expect(strategy.getNomeCalculo()).toBe("Montante");
        });
    });

    describe("MontantePorJurosTaxaTempoStrategy", () => {
        let strategy: MontantePorJurosTaxaTempoStrategy;

        beforeEach(() => {
            strategy = new MontantePorJurosTaxaTempoStrategy(mockFacade);
        });

        it("deve obter inputs: juros, taxa e tempo", async () => {
            const mockInputs = { juros: 1200, taxa: 0.10, tempo: 12 };
            (inquirer.prompt as unknown as jest.Mock).mockResolvedValue(mockInputs);

            const inputs = await strategy.obterInputs();

            expect(inquirer.prompt).toHaveBeenCalled();
            expect(inputs).toEqual(mockInputs);
        });

        it("deve chamar facade.calcularMontante com método 'jurosTaxaTempo'", () => {
            const inputs = { juros: 1200, taxa: 0.10, tempo: 12 };
            const mockResultado = 2200;
            mockFacade.calcularMontante.mockReturnValue(mockResultado);

            const resultado = strategy.calcular(inputs);

            expect(mockFacade.calcularMontante).toHaveBeenCalledWith('jurosTaxaTempo', inputs);
            expect(resultado).toBe(mockResultado);
        });

        it("deve formatar resultado como 'Montante: R$ X.XX'", () => {
            expect(strategy.formatarResultado(2200)).toBe("Montante: R$ 2200.00\n");
        });

        it("deve retornar 'Montante' como nome do cálculo", () => {
            expect(strategy.getNomeCalculo()).toBe("Montante");
        });
    });
});
