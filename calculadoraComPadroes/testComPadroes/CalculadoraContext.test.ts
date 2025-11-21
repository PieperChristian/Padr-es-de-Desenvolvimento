import { CalculadoraContext } from "../srcComPadroes/interface/strategies/CalculadoraContext";
import { CalculoStrategy } from "../srcComPadroes/interface/strategies/CalculoStrategy";

// Mock do inquirer para evitar problemas de ESM
jest.mock('inquirer', () => ({ 
    prompt: jest.fn().mockResolvedValue({ voltar: true }) 
}));

// Mock da estratégia para testar o Context
class MockStrategy implements CalculoStrategy {
    obterInputs = jest.fn();
    calcular = jest.fn();
    formatarResultado = jest.fn();
    getNomeCalculo = jest.fn();
}

describe("CalculadoraContext - Testes do padrão Strategy", () => {
    let mockStrategy: MockStrategy;
    let mockMenuPrincipal: any;
    let context: CalculadoraContext;

    beforeEach(() => {
        mockStrategy = new MockStrategy();
        mockMenuPrincipal = {
            menuPrincipal: jest.fn()
        };
        context = new CalculadoraContext(mockStrategy, mockMenuPrincipal);
        
        // Mocka console.log e console.error para não poluir a saída dos testes
        jest.spyOn(console, 'log').mockImplementation();
        jest.spyOn(console, 'error').mockImplementation();
        jest.spyOn(console, 'clear').mockImplementation();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe("executar - Fluxo de execução do algoritmo", () => {
        it("deve executar o fluxo completo: obter inputs → calcular → formatar → exibir resultado", async () => {
            // Arrange: configura o comportamento dos mocks
            const mockInputs = { capital: 1000, taxa: 0.10, tempo: 12 };
            const mockResultado = 1200;
            const mockFormatado = "Juros calculados: R$ 1200.00";
            const mockNome = "Cálculo de Juros por Capital, Taxa e Tempo";

            mockStrategy.obterInputs.mockResolvedValue(mockInputs);
            mockStrategy.calcular.mockReturnValue(mockResultado);
            mockStrategy.formatarResultado.mockReturnValue(mockFormatado);
            mockStrategy.getNomeCalculo.mockReturnValue(mockNome);

            // Act: executa o contexto
            await context.executar();

            // Assert: verifica que todos os métodos foram chamados na ordem correta
            expect(mockStrategy.getNomeCalculo).toHaveBeenCalledTimes(1);
            expect(mockStrategy.obterInputs).toHaveBeenCalledTimes(1);
            expect(mockStrategy.calcular).toHaveBeenCalledWith(mockInputs);
            expect(mockStrategy.formatarResultado).toHaveBeenCalledWith(mockResultado);
            expect(console.log).toHaveBeenCalledWith(mockFormatado);
        });

        it("deve exibir o nome do cálculo antes de executar", async () => {
            // Arrange
            const mockNome = "Teste de Cálculo";
            mockStrategy.getNomeCalculo.mockReturnValue(mockNome);
            mockStrategy.obterInputs.mockResolvedValue({});
            mockStrategy.calcular.mockReturnValue(100);
            mockStrategy.formatarResultado.mockReturnValue("Resultado: 100");

            // Act
            await context.executar();

            // Assert
            expect(console.log).toHaveBeenCalledWith(`\n--- Calculando ${mockNome} ---`);
        });

        it("deve chamar menuPrincipal após exibir o resultado", async () => {
            // Arrange
            mockStrategy.getNomeCalculo.mockReturnValue("Teste");
            mockStrategy.obterInputs.mockResolvedValue({});
            mockStrategy.calcular.mockReturnValue(100);
            mockStrategy.formatarResultado.mockReturnValue("Resultado: 100");

            // Act
            await context.executar();

            // Assert
            expect(console.clear).toHaveBeenCalled();
            expect(mockMenuPrincipal.menuPrincipal).toHaveBeenCalled();
        });
    });

    describe("executar - Tratamento de erros", () => {
        it("deve capturar e exibir erro lançado por obterInputs", async () => {
            // Arrange
            const erro = new Error("Erro ao obter inputs");
            mockStrategy.getNomeCalculo.mockReturnValue("Teste");
            mockStrategy.obterInputs.mockRejectedValue(erro);

            // Act
            await context.executar();

            // Assert
            expect(console.log).toHaveBeenCalledWith("\n❌ ERRO:");
            expect(console.log).toHaveBeenCalledWith(erro.message);
            expect(mockStrategy.calcular).not.toHaveBeenCalled();
        });

        it("deve capturar e exibir erro lançado por calcular", async () => {
            // Arrange
            const erro = new Error("Divisão por zero");
            mockStrategy.getNomeCalculo.mockReturnValue("Teste");
            mockStrategy.obterInputs.mockResolvedValue({ value: 10 });
            mockStrategy.calcular.mockImplementation(() => {
                throw erro;
            });

            // Act
            await context.executar();

            // Assert
            expect(console.log).toHaveBeenCalledWith("\n❌ ERRO:");
            expect(console.log).toHaveBeenCalledWith(erro.message);
            expect(mockStrategy.formatarResultado).not.toHaveBeenCalled();
        });

        it("deve capturar e exibir erro lançado por formatarResultado", async () => {
            // Arrange
            const erro = new Error("Erro ao formatar");
            mockStrategy.getNomeCalculo.mockReturnValue("Teste");
            mockStrategy.obterInputs.mockResolvedValue({});
            mockStrategy.calcular.mockReturnValue(100);
            mockStrategy.formatarResultado.mockImplementation(() => {
                throw erro;
            });

            // Act
            await context.executar();

            // Assert
            expect(console.log).toHaveBeenCalledWith("\n❌ ERRO:");
            expect(console.log).toHaveBeenCalledWith(erro.message);
        });

        it("deve voltar ao menu principal mesmo com erro", async () => {
            // Arrange
            mockStrategy.getNomeCalculo.mockReturnValue("Teste");
            mockStrategy.obterInputs.mockRejectedValue(new Error("Erro qualquer"));

            // Act
            await context.executar();

            // Assert
            expect(console.clear).toHaveBeenCalled();
            expect(mockMenuPrincipal.menuPrincipal).toHaveBeenCalled();
        });
    });

    describe("executar - Integração dos componentes", () => {
        it("deve passar os inputs obtidos para calcular", async () => {
            // Arrange
            const inputs = { a: 1, b: 2, c: 3 };
            mockStrategy.getNomeCalculo.mockReturnValue("Teste");
            mockStrategy.obterInputs.mockResolvedValue(inputs);
            mockStrategy.calcular.mockReturnValue(6);
            mockStrategy.formatarResultado.mockReturnValue("6");

            // Act
            await context.executar();

            // Assert
            expect(mockStrategy.calcular).toHaveBeenCalledWith(inputs);
        });

        it("deve passar o resultado calculado para formatarResultado", async () => {
            // Arrange
            const resultado = 42.567;
            mockStrategy.getNomeCalculo.mockReturnValue("Teste");
            mockStrategy.obterInputs.mockResolvedValue({});
            mockStrategy.calcular.mockReturnValue(resultado);
            mockStrategy.formatarResultado.mockReturnValue("42.57");

            // Act
            await context.executar();

            // Assert
            expect(mockStrategy.formatarResultado).toHaveBeenCalledWith(resultado);
        });

        it("deve exibir o resultado formatado no console", async () => {
            // Arrange
            const resultadoFormatado = "Resultado Final: R$ 1234.56";
            mockStrategy.getNomeCalculo.mockReturnValue("Teste");
            mockStrategy.obterInputs.mockResolvedValue({});
            mockStrategy.calcular.mockReturnValue(1234.56);
            mockStrategy.formatarResultado.mockReturnValue(resultadoFormatado);

            // Act
            await context.executar();

            // Assert
            expect(console.log).toHaveBeenCalledWith(resultadoFormatado);
        });
    });
});
