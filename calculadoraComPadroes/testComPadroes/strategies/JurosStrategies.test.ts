import { JurosPorCapitalTaxaTempoStrategy } from "../../srcComPadroes/interface/strategies/estrategias/JurosPorCapitalTaxaTempoStrategy";
import { JurosPorCapitalMontanteStrategy } from "../../srcComPadroes/interface/strategies/estrategias/JurosPorCapitalMontanteStrategy";
import { JurosPorTaxaTempoMontanteStrategy } from "../../srcComPadroes/interface/strategies/estrategias/JurosPorTaxaTempoMontanteStrategy";
import { CalculadoraFinanceiraFacade } from "../../srcComPadroes/core/CalculadoraFinanceiraFacade";

// Mock da Facade
jest.mock("../../srcComPadroes/core/CalculadoraFinanceiraFacade");

// Mock do inquirer
jest.mock('inquirer', () => ({
    prompt: jest.fn()
}));

import inquirer from 'inquirer';

describe("Estratégias de Cálculo de Juros - Padrão Strategy", () => {
    let mockFacade: jest.Mocked<CalculadoraFinanceiraFacade>;

    beforeEach(() => {
        mockFacade = new CalculadoraFinanceiraFacade() as jest.Mocked<CalculadoraFinanceiraFacade>;
        jest.clearAllMocks();
    });

    describe("JurosPorCapitalTaxaTempoStrategy", () => {
        let strategy: JurosPorCapitalTaxaTempoStrategy;

        beforeEach(() => {
            strategy = new JurosPorCapitalTaxaTempoStrategy(mockFacade);
        });

        it("deve obter inputs: capital, taxa e tempo", async () => {
            // Arrange
            const mockInputs = { capital: 1000, taxa: 0.10, tempo: 12 };
            (inquirer.prompt as unknown as jest.Mock).mockResolvedValue(mockInputs);

            // Act
            const inputs = await strategy.obterInputs();

            // Assert
            expect(inquirer.prompt).toHaveBeenCalled();
            expect(inputs).toEqual(mockInputs);
        });

        it("deve chamar facade.calcularJuros com método 'capitalTaxaTempo'", () => {
            // Arrange
            const inputs = { capital: 1000, taxa: 0.10, tempo: 12 };
            const mockResultado = 1200;
            mockFacade.calcularJuros.mockReturnValue(mockResultado);

            // Act
            const resultado = strategy.calcular(inputs);

            // Assert
            expect(mockFacade.calcularJuros).toHaveBeenCalledWith('capitalTaxaTempo', inputs);
            expect(resultado).toBe(mockResultado);
        });

        it("deve formatar resultado como 'Juros: R$ X.XX'", () => {
            // Arrange
            const resultado = 1200;

            // Act
            const formatado = strategy.formatarResultado(resultado);

            // Assert
            expect(formatado).toBe("Juros: R$ 1200.00\n");
        });

        it("deve retornar 'Juros' como nome do cálculo", () => {
            expect(strategy.getNomeCalculo()).toBe("Juros");
        });
    });

    describe("JurosPorCapitalMontanteStrategy", () => {
        let strategy: JurosPorCapitalMontanteStrategy;

        beforeEach(() => {
            strategy = new JurosPorCapitalMontanteStrategy(mockFacade);
        });

        it("deve obter inputs: capital e montante", async () => {
            // Arrange
            const mockInputs = { capital: 1000, montante: 2200 };
            (inquirer.prompt as unknown as jest.Mock).mockResolvedValue(mockInputs);

            // Act
            const inputs = await strategy.obterInputs();

            // Assert
            expect(inquirer.prompt).toHaveBeenCalled();
            expect(inputs).toEqual(mockInputs);
        });

        it("deve chamar facade.calcularJuros com método 'capitalMontante'", () => {
            // Arrange
            const inputs = { capital: 1000, montante: 2200 };
            const mockResultado = 1200;
            mockFacade.calcularJuros.mockReturnValue(mockResultado);

            // Act
            const resultado = strategy.calcular(inputs);

            // Assert
            expect(mockFacade.calcularJuros).toHaveBeenCalledWith('capitalMontante', inputs);
            expect(resultado).toBe(mockResultado);
        });

        it("deve formatar resultado como 'Juros: R$ X.XX'", () => {
            // Arrange
            const resultado = 1200;

            // Act
            const formatado = strategy.formatarResultado(resultado);

            // Assert
            expect(formatado).toBe("Juros: R$ 1200.00\n");
        });

        it("deve retornar 'Juros' como nome do cálculo", () => {
            expect(strategy.getNomeCalculo()).toBe("Juros");
        });
    });

    describe("JurosPorTaxaTempoMontanteStrategy", () => {
        let strategy: JurosPorTaxaTempoMontanteStrategy;

        beforeEach(() => {
            strategy = new JurosPorTaxaTempoMontanteStrategy(mockFacade);
        });

        it("deve obter inputs: taxa, tempo e montante", async () => {
            // Arrange
            const mockInputs = { taxa: 0.10, tempo: 12, montante: 2200 };
            (inquirer.prompt as unknown as jest.Mock).mockResolvedValue(mockInputs);

            // Act
            const inputs = await strategy.obterInputs();

            // Assert
            expect(inquirer.prompt).toHaveBeenCalled();
            expect(inputs).toEqual(mockInputs);
        });

        it("deve chamar facade.calcularJuros com método 'taxaTempoMontante'", () => {
            // Arrange
            const inputs = { taxa: 0.10, tempo: 12, montante: 2200 };
            const mockResultado = 1200;
            mockFacade.calcularJuros.mockReturnValue(mockResultado);

            // Act
            const resultado = strategy.calcular(inputs);

            // Assert
            expect(mockFacade.calcularJuros).toHaveBeenCalledWith('taxaTempoMontante', inputs);
            expect(resultado).toBe(mockResultado);
        });

        it("deve formatar resultado como 'Juros: R$ X.XX'", () => {
            // Arrange
            const resultado = 1200;

            // Act
            const formatado = strategy.formatarResultado(resultado);

            // Assert
            expect(formatado).toBe("Juros: R$ 1200.00\n");
        });

        it("deve retornar 'Juros' como nome do cálculo", () => {
            expect(strategy.getNomeCalculo()).toBe("Juros");
        });
    });

    describe("Integração entre estratégias de Juros", () => {
        it("todas as estratégias devem formatar resultado da mesma forma", () => {
            const strategies = [
                new JurosPorCapitalTaxaTempoStrategy(mockFacade),
                new JurosPorCapitalMontanteStrategy(mockFacade),
                new JurosPorTaxaTempoMontanteStrategy(mockFacade)
            ];

            const resultado = 1234.56;
            const esperado = "Juros: R$ 1234.56\n";

            strategies.forEach(strategy => {
                expect(strategy.formatarResultado(resultado)).toBe(esperado);
            });
        });

        it("todas as estratégias devem retornar 'Juros' como nome", () => {
            const strategies = [
                new JurosPorCapitalTaxaTempoStrategy(mockFacade),
                new JurosPorCapitalMontanteStrategy(mockFacade),
                new JurosPorTaxaTempoMontanteStrategy(mockFacade)
            ];

            strategies.forEach(strategy => {
                expect(strategy.getNomeCalculo()).toBe("Juros");
            });
        });
    });
});
