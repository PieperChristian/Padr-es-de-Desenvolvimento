# 💼 Core - Lógica de Negócio e Regras da Calculadora Financeira

Este diretório contém a **lógica de negócio** e as **regras de validação** da Calculadora Financeira, implementando cálculos de **Juros Simples** de forma pura, isolada e testável.

---

## 📂 Estrutura do Diretório

```text
core/
├── JurosSimples.ts                      # Classe principal com fórmulas de cálculo
├── ValidadoresJuros.ts                  # Validações de regras de negócio
├── Util/
│   └── InterfacesCalculadoraJuros.ts   # Interfaces TypeScript para entradas
└── constants/
    └── MensagensErro.ts                # Mensagens de erro padronizadas
```

---

## 🎯 Arquitetura do Core

### Princípios de Design

✅ **Separação de Responsabilidades**: lógica de cálculo isolada da interface  
✅ **Métodos Estáticos**: não requer instanciação, uso direto via `JurosSimples.metodo()`  
✅ **Type Safety**: interfaces TypeScript garantem contratos de entrada  
✅ **Validação Rigorosa**: todas as entradas são validadas antes do cálculo  
✅ **Mensagens Centralizadas**: erros consistentes e fáceis de manter  
✅ **Testabilidade**: 141 testes automatizados com 100% de cobertura

---

## 📐 Fórmulas de Juros Simples

### Conceitos Fundamentais

O **regime de juros simples** é caracterizado pela aplicação de juros apenas sobre o capital inicial, sem capitalização dos juros ao longo do tempo.

**Fórmula base:**

```text
J = C × i × t
M = C + J
```

Onde:

- **J** = Juros
- **C** = Capital (principal)
- **M** = Montante (capital + juros)
- **i** = Taxa de juros (em decimal, ex: 0.10 para 10%)
- **t** = Tempo (na mesma unidade da taxa)

---

## 🧮 Classe JurosSimples

A classe `JurosSimples` oferece **15 métodos estáticos** para calcular qualquer variável a partir das demais, cobrindo todas as combinações possíveis de entradas.

### 1. Cálculo de Juros (3 métodos)

#### 1.1 `jurosPorCapitalTaxaTempo()`

**Fórmula:** `J = C × i × t`

**Entradas:**

- `capital` (number): valor inicial investido
- `taxa` (number): taxa de juros (decimal)
- `tempo` (number): período de tempo

**Exemplo:**

```typescript
const resultado = JurosSimples.jurosPorCapitalTaxaTempo({
  capital: 1000,
  taxa: 0.10,      // 10% ao período
  tempo: 12        // 12 períodos
});
// Resultado: 1200 (R$ 1.200,00 de juros)
```

#### 1.2 `jurosPorCapitalMontante()`

**Fórmula:** `J = M - C`

**Entradas:**

- `capital` (number): valor inicial
- `montante` (number): valor final (capital + juros)

**Exemplo:**

```typescript
const resultado = JurosSimples.jurosPorCapitalMontante({
  capital: 1000,
  montante: 2200
});
// Resultado: 1200
```

#### 1.3 `jurosPorTaxaTempoMontante()`

**Fórmula:** `J = M / (1 + 1/(i×t))`

**Entradas:**

- `taxa` (number): taxa de juros
- `tempo` (number): período
- `montante` (number): valor final

**Exemplo:**

```typescript
const resultado = JurosSimples.jurosPorTaxaTempoMontante({
  taxa: 0.10,
  tempo: 12,
  montante: 2200
});
// Resultado: 1200
```

---

### 2. Cálculo de Capital (3 métodos)

#### 2.1 `capitalPorJurosTaxaTempo()`

**Fórmula:** `C = J / (i × t)`

**Entradas:**

- `juros` (number): juros gerados
- `taxa` (number): taxa de juros
- `tempo` (number): período

**Exemplo:**

```typescript
const resultado = JurosSimples.capitalPorJurosTaxaTempo({
  juros: 1200,
  taxa: 0.10,
  tempo: 12
});
// Resultado: 1000
```

#### 2.2 `capitalPorJurosMontante()`

**Fórmula:** `C = M - J`

**Entradas:**

- `juros` (number): juros gerados
- `montante` (number): valor final

**Exemplo:**

```typescript
const resultado = JurosSimples.capitalPorJurosMontante({
  juros: 1200,
  montante: 2200
});
// Resultado: 1000
```

#### 2.3 `capitalPorTaxaTempoMontante()`

**Fórmula:** `C = M / (1 + i × t)`

**Entradas:**

- `taxa` (number): taxa de juros
- `tempo` (number): período
- `montante` (number): valor final

**Exemplo:**

```typescript
const resultado = JurosSimples.capitalPorTaxaTempoMontante({
  taxa: 0.10,
  tempo: 12,
  montante: 2200
});
// Resultado: 1000
```

---

### 3. Cálculo de Montante (3 métodos)

#### 3.1 `montantePorCapitalTaxaTempo()`

**Fórmula:** `M = C × (1 + i × t)`

**Entradas:**

- `capital` (number): valor inicial
- `taxa` (number): taxa de juros
- `tempo` (number): período

**Exemplo:**

```typescript
const resultado = JurosSimples.montantePorCapitalTaxaTempo({
  capital: 1000,
  taxa: 0.10,
  tempo: 12
});
// Resultado: 2200
```

#### 3.2 `montantePorCapitalJuros()`

**Fórmula:** `M = C + J`

**Entradas:**

- `capital` (number): valor inicial
- `juros` (number): juros gerados

**Exemplo:**

```typescript
const resultado = JurosSimples.montantePorCapitalJuros({
  capital: 1000,
  juros: 1200
});
// Resultado: 2200
```

#### 3.3 `montantePorJurosTaxaTempo()`

**Fórmula:** `M = J × (1 + 1/(i×t))`

**Entradas:**

- `juros` (number): juros gerados
- `taxa` (number): taxa de juros
- `tempo` (number): período

**Exemplo:**

```typescript
const resultado = JurosSimples.montantePorJurosTaxaTempo({
  juros: 1200,
  taxa: 0.10,
  tempo: 12
});
// Resultado: 2200
```

---

### 4. Cálculo de Taxa (3 métodos)

#### 4.1 `taxaPorCapitalJurosTempo()`

**Fórmula:** `i = J / (C × t)`

**Entradas:**

- `capital` (number): valor inicial
- `juros` (number): juros gerados
- `tempo` (number): período

**Exemplo:**

```typescript
const resultado = JurosSimples.taxaPorCapitalJurosTempo({
  capital: 1000,
  juros: 1200,
  tempo: 12
});
// Resultado: 0.10 (10%)
```

#### 4.2 `taxaPorCapitalMontanteTempo()`

**Fórmula:** `i = (M/C - 1) / t`

**Entradas:**

- `capital` (number): valor inicial
- `montante` (number): valor final
- `tempo` (number): período

**Exemplo:**

```typescript
const resultado = JurosSimples.taxaPorCapitalMontanteTempo({
  capital: 1000,
  montante: 2200,
  tempo: 12
});
// Resultado: 0.10 (10%)
```

#### 4.3 `taxaPorJurosMontanteTempo()`

**Fórmula:** `i = 1 / ((M/J - 1) × t)`

**Entradas:**

- `juros` (number): juros gerados
- `montante` (number): valor final
- `tempo` (number): período

**Exemplo:**

```typescript
const resultado = JurosSimples.taxaPorJurosMontanteTempo({
  juros: 1200,
  montante: 2200,
  tempo: 12
});
// Resultado: 0.10 (10%)
```

---

### 5. Cálculo de Tempo (3 métodos)

#### 5.1 `tempoPorCapitalJurosTaxa()`

**Fórmula:** `t = J / (C × i)`

**Entradas:**

- `capital` (number): valor inicial
- `juros` (number): juros gerados
- `taxa` (number): taxa de juros

**Exemplo:**

```typescript
const resultado = JurosSimples.tempoPorCapitalJurosTaxa({
  capital: 1000,
  juros: 1200,
  taxa: 0.10
});
// Resultado: 12
```

#### 5.2 `tempoPorCapitalMontanteTaxa()`

**Fórmula:** `t = (M/C - 1) / i`

**Entradas:**

- `capital` (number): valor inicial
- `montante` (number): valor final
- `taxa` (number): taxa de juros

**Exemplo:**

```typescript
const resultado = JurosSimples.tempoPorCapitalMontanteTaxa({
  capital: 1000,
  montante: 2200,
  taxa: 0.10
});
// Resultado: 12
```

#### 5.3 `tempoPorJurosMontanteTaxa()`

**Fórmula:** `t = 1 / ((M/J - 1) × i)`

**Entradas:**

- `juros` (number): juros gerados
- `montante` (number): valor final
- `taxa` (number): taxa de juros

**Exemplo:**

```typescript
const resultado = JurosSimples.tempoPorJurosMontanteTaxa({
  juros: 1200,
  montante: 2200,
  taxa: 0.10
});
// Resultado: 12
```

---

## 🛡️ Sistema de Validação

### Classe ValidadoresJuros

A classe `ValidadoresJuros` implementa validações rigorosas para **todas as entradas** antes de realizar qualquer cálculo, garantindo:

- ✅ Integridade dos dados
- ✅ Prevenção de cálculos inválidos
- ✅ Mensagens de erro claras e consistentes
- ✅ Proteção contra valores indefinidos/nulos

### Regras de Validação

Cada validador verifica **3 condições**:

#### 1. **Validação de Existência**

```typescript
private static ehIndefinido(valor: any): boolean {
    return valor === undefined || valor === null || isNaN(valor);
}
```

**Erro lançado:** `"[Campo] é necessário para este cálculo e não pode ser indefinido ou nulo."`

#### 2. **Validação de Sinal (não-negativo)**

```typescript
if (valor < 0) {
    throw new Error(MENSAGENS_ERRO.[CAMPO]_NEGATIVO);
}
```

**Erro lançado:** `"[Campo] não pode ser negativo."`

#### 3. **Validação de Zero**

```typescript
if (valor === 0) {
    throw new Error(MENSAGENS_ERRO.[CAMPO]_ZERO);
}
```

**Erro lançado:** `"[Campo] não pode ser zero para este cálculo."`

### Validadores Disponíveis

| Validador            | Verifica                         | Campos                             |
| -------------------- | -------------------------------- | ---------------------------------- |
| `validarJuros()`     | undefined, null, < 0, === 0      | Valores de juros                   |
| `validarCapital()`   | undefined, null, < 0, === 0      | Valores de capital                 |
| `validarMontante()`  | undefined, null, < 0, === 0      | Valores de montante                |
| `validarTaxa()`      | undefined, null, < 0, === 0      | Taxas de juros                     |
| `validarTempo()`     | undefined, null, < 0, === 0      | Períodos de tempo                  |

### Fluxo de Validação

```typescript
public static jurosPorCapitalTaxaTempo(inputs: EntradasJuros['CapitalTaxaTempo']): number {
    // 1. Validações executadas ANTES do cálculo
    ValidadoresJuros.validarCapital(inputs.capital);
    ValidadoresJuros.validarTaxa(inputs.taxa);
    ValidadoresJuros.validarTempo(inputs.tempo);

    // 2. Cálculo executado APENAS se validações passarem
    return inputs.capital * inputs.taxa * inputs.tempo;
}
```

**Comportamento:**

- ✅ **Validação OK**: retorna resultado numérico
- ❌ **Validação falha**: lança `Error` com mensagem descritiva

---

## 🔒 Interfaces TypeScript

As interfaces garantem **type safety** e definem contratos claros para cada método.

### Estrutura das Interfaces

Localizadas em `Util/InterfacesCalculadoraJuros.ts`:

```typescript
export interface EntradasJuros {
    CapitalTaxaTempo: { capital: number, taxa: number, tempo: number }
    CapitalMontante: { capital: number, montante: number }
    TaxaTempoMontante: { taxa: number, tempo: number, montante: number }
}

export interface EntradasCapital {
    JurosMontante: { juros: number, montante: number }
    JurosTaxaTempo: { juros: number, taxa: number, tempo: number }
    TaxaTempoMontante: { taxa: number, tempo: number, montante: number }
}

export interface EntradasMontante {
    CapitalJuros: { capital: number, juros: number }
    CapitalTaxaTempo: { capital: number, taxa: number, tempo: number }
    JurosTaxaTempo: { juros: number, taxa: number, tempo: number }
}

export interface EntradasTaxa {
    CapitalJurosTempo: { capital: number, juros: number, tempo: number }
    CapitalMontanteTempo: { capital: number, montante: number, tempo: number }
    JurosMontanteTempo: { juros: number, montante: number, tempo: number }
}

export interface EntradasTempo {
    CapitalJurosTaxa: { capital: number, juros: number, taxa: number }
    CapitalMontanteTaxa: { capital: number, montante: number, taxa: number }
    JurosMontanteTaxa: { juros: number, montante: number, taxa: number }
}
```

### Uso das Interfaces

**Pattern de uso seguro:**

```typescript
// Tipo inferido automaticamente
const dados: EntradasJuros['CapitalTaxaTempo'] = {
    capital: 1000,
    taxa: 0.10,
    tempo: 12
};

// TypeScript garante que todas as propriedades estão presentes
const resultado = JurosSimples.jurosPorCapitalTaxaTempo(dados);
```

**Benefícios:**

- ✅ Autocompletar no editor
- ✅ Detecção de erros em tempo de desenvolvimento
- ✅ Documentação implícita via tipos
- ✅ Refatoração segura

---

## 📋 Mensagens de Erro

Centralizadas em `constants/MensagensErro.ts` para facilitar manutenção e internacionalização:

```typescript
export const MENSAGENS_ERRO = {
    // Juros
    JUROS_NEGATIVO: "Os juros não podem ser negativos.",
    JUROS_ZERO: "Os juros não podem ser zero para este cálculo.",
    JUROS_NECESSARIOS: "Os juros são necessários para este cálculo e não pode ser indefinido ou nulo.",

    // Capital
    CAPITAL_NEGATIVO: "O capital não pode ser negativo.",
    CAPITAL_ZERO: "O capital não pode ser zero para este cálculo.",
    CAPITAL_NECESSARIO: "O capital é necessário para este cálculo e não pode ser indefinido ou nulo.",

    // Montante
    MONTANTE_NEGATIVO: "O montante não pode ser negativo.",
    MONTANTE_ZERO: "O montante não pode ser zero para este cálculo.",
    MONTANTE_NECESSARIO: "O montante é indispensável para este cálculo e não pode ser indefinido ou nulo.",

    // Taxa
    TAXA_NEGATIVA: "A taxa não pode ser negativa.",
    TAXA_ZERO: "A taxa não pode ser zero para este cálculo.",
    TAXA_NECESSARIO: "A taxa é indispensável para este cálculo e não pode ser indefinido ou nulo.",

    // Tempo
    TEMPO_NEGATIVO: "O tempo não pode ser negativo.",
    TEMPO_ZERO: "O tempo não pode ser zero para este cálculo.",
    TEMPO_NECESSARIO: "O tempo é indispensável para este cálculo e não pode ser indefinido ou nulo."
};
```

**Padrão de uso:**

```typescript
if (valor === 0) {
    throw new Error(MENSAGENS_ERRO.CAPITAL_ZERO);
}
```

---

## 🧪 Cobertura de Testes

A lógica de negócio possui **100% de cobertura** com **141 testes automatizados** usando Jest.

### Categorias de Testes

#### 1. **Validações de Valores Corretos** (15 testes)

Testa se os cálculos retornam resultados precisos para entradas válidas:

```typescript
it("deve calcular juros corretamente quando dados capital, taxa e tempo", () => {
    const input: EntradasJuros['CapitalTaxaTempo'] = { 
        capital: 1000,
        taxa: 0.10,
        tempo: 12
    };

    const resultado = JurosSimples.jurosPorCapitalTaxaTempo(input);
    const esperado = 1200;
    
    expect(resultado).toBeCloseTo(esperado, 2);
});
```

#### 2. **Validações de Valores Inválidos** (90 testes)

Testa se validações rejeitam corretamente valores negativos e zero:

```typescript
it("deve lançar erro quando capital é negativo", () => {
    const input: EntradasJuros['CapitalTaxaTempo'] = { 
        capital: -1000,
        taxa: 0.10,
        tempo: 12
    };

    expect(() => JurosSimples.jurosPorCapitalTaxaTempo(input))
        .toThrow("O capital não pode ser negativo.");
});

it("deve lançar erro quando capital é zero", () => {
    const input: EntradasJuros['CapitalTaxaTempo'] = { 
        capital: 0,
        taxa: 0.10,
        tempo: 12
    };

    expect(() => JurosSimples.jurosPorCapitalTaxaTempo(input))
        .toThrow("O capital não pode ser zero para este cálculo.");
});
```

#### 3. **Validações de Campos Obrigatórios** (36 testes)

Testa se validações rejeitam valores `undefined` ou `null`:

```typescript
it("deve lançar erro quando capital é undefined", () => {
    const input: any = { 
        capital: undefined,
        taxa: 0.10,
        tempo: 12
    };

    expect(() => JurosSimples.jurosPorCapitalTaxaTempo(input))
        .toThrow("O capital é necessário para este cálculo e não pode ser indefinido ou nulo.");
});
```

### Executando os Testes

```bash
# Executar todos os testes
npm test

# Executar com cobertura
npm test -- --coverage

# Executar em modo watch
npm test -- --watch
```

### Resultados Esperados

```text
PASS  test/JurosSimples.test.ts
  Cenários para Juros Simples: 
    Validações de valores corretos (15 passed)
    Validações de valores inválidos (90 passed)
    Validações de campos obrigatórios (36 passed)

Test Suites: 1 passed, 1 total
Tests:       141 passed, 141 total
Snapshots:   0 total
Time:        0.812 s
```

---

## 🔄 Fluxo de Execução

### Diagrama de Fluxo

```text
┌─────────────────────────────┐
│   Chamada do método         │
│   JurosSimples.metodo()     │
└──────────┬──────────────────┘
           │
           ↓
┌─────────────────────────────┐
│   ValidadoresJuros          │
│   - validarCapital()        │
│   - validarTaxa()           │
│   - validarTempo()          │
│   - etc...                  │
└──────────┬──────────────────┘
           │
           ├─→ ❌ Erro: lança Exception
           │            ↓
           │     Interface captura
           │     em try-catch
           │
           ↓
        ✅ OK
           │
           ↓
┌─────────────────────────────┐
│   Execução da fórmula       │
│   return C × i × t          │
└──────────┬──────────────────┘
           │
           ↓
┌─────────────────────────────┐
│   Retorno do resultado      │
│   (number)                  │
└─────────────────────────────┘
```

### Exemplo Completo

```typescript
// Interface coleta dados
const inputs = {
    capital: 1000,
    taxa: 0.10,
    tempo: 12
};

try {
    // Core valida e calcula
    const resultado = JurosSimples.jurosPorCapitalTaxaTempo(inputs);
    
    // Interface exibe resultado
    console.log(`Juros: R$ ${resultado.toFixed(2)}`);
    // Output: "Juros: R$ 1200.00"
    
} catch (error: any) {
    // Interface captura e exibe erro
    console.log(`❌ ERRO: ${error.message}`);
    // Ex: "❌ ERRO: O capital não pode ser zero para este cálculo."
}
```

---

## 📊 Tabela de Referência Rápida

### Métodos por Variável Calculada

| Variável     | Método                              | Entradas Necessárias          |
| ------------ | ----------------------------------- | ----------------------------- |
| **Juros**    | `jurosPorCapitalTaxaTempo()`        | Capital, Taxa, Tempo          |
|              | `jurosPorCapitalMontante()`         | Capital, Montante             |
|              | `jurosPorTaxaTempoMontante()`       | Taxa, Tempo, Montante         |
| **Capital**  | `capitalPorJurosTaxaTempo()`        | Juros, Taxa, Tempo            |
|              | `capitalPorJurosMontante()`         | Juros, Montante               |
|              | `capitalPorTaxaTempoMontante()`     | Taxa, Tempo, Montante         |
| **Montante** | `montantePorCapitalTaxaTempo()`     | Capital, Taxa, Tempo          |
|              | `montantePorCapitalJuros()`         | Capital, Juros                |
|              | `montantePorJurosTaxaTempo()`       | Juros, Taxa, Tempo            |
| **Taxa**     | `taxaPorCapitalJurosTempo()`        | Capital, Juros, Tempo         |
|              | `taxaPorCapitalMontanteTempo()`     | Capital, Montante, Tempo      |
|              | `taxaPorJurosMontanteTempo()`       | Juros, Montante, Tempo        |
| **Tempo**    | `tempoPorCapitalJurosTaxa()`        | Capital, Juros, Taxa          |
|              | `tempoPorCapitalMontanteTaxa()`     | Capital, Montante, Taxa       |
|              | `tempoPorJurosMontanteTaxa()`       | Juros, Montante, Taxa         |

### Fórmulas Matemáticas

| Variável | Fórmula Básica               | Derivações                                      |
| -------- | ---------------------------- | ----------------------------------------------- |
| Juros    | `J = C × i × t`              | `J = M - C`, `J = M / (1 + 1/(i×t))`        |
| Capital  | `C = J / (i × t)`            | `C = M - J`, `C = M / (1 + i×t)`            |
| Montante | `M = C × (1 + i × t)`        | `M = C + J`, `M = J × (1 + 1/(i×t))`        |
| Taxa     | `i = J / (C × t)`            | `i = (M/C - 1) / t`, `i = 1/((M/J-1)×t)`    |
| Tempo    | `t = J / (C × i)`            | `t = (M/C - 1) / i`, `t = 1/((M/J-1)×i)`    |

---

## 🚀 Boas Práticas de Uso

### ✅ DO (Faça)

```typescript
// ✅ Use interfaces para type safety
const dados: EntradasJuros['CapitalTaxaTempo'] = {
    capital: 1000,
    taxa: 0.10,
    tempo: 12
};

// ✅ Sempre capture exceções
try {
    const resultado = JurosSimples.jurosPorCapitalTaxaTempo(dados);
} catch (error: any) {
    console.error(error.message);
}

// ✅ Use taxas em decimal (não percentual)
const taxa = 0.10; // 10%

// ✅ Mantenha unidades consistentes
const taxa = 0.10;     // 10% ao mês
const tempo = 12;       // 12 meses
```

### ❌ DON'T (Não faça)

```typescript
// ❌ Não passe valores sem validação prévia
JurosSimples.jurosPorCapitalTaxaTempo({ capital: -100, taxa: 0, tempo: null });

// ❌ Não ignore erros de validação
JurosSimples.jurosPorCapitalTaxaTempo(dados); // sem try-catch

// ❌ Não confunda taxa decimal com percentual
const taxa = 10; // ERRADO! Use 0.10 para 10%

// ❌ Não misture unidades de tempo
const taxa = 0.10;     // taxa mensal
const tempo = 365;      // tempo em dias (INCONSISTENTE!)
```

---

## 🔧 Extensibilidade

### Adicionando Novos Cálculos

Para adicionar um novo tipo de cálculo (ex: Juros Compostos):

#### 1. Criar nova classe de cálculo

```typescript
// core/JurosCompostos.ts
import { ValidadoresJuros } from "./ValidadoresJuros";

export class JurosCompostos {
    public static montantePorCapitalTaxaTempo(inputs: {
        capital: number,
        taxa: number,
        tempo: number
    }): number {
        ValidadoresJuros.validarCapital(inputs.capital);
        ValidadoresJuros.validarTaxa(inputs.taxa);
        ValidadoresJuros.validarTempo(inputs.tempo);

        // Fórmula: M = C × (1 + i)^t
        return inputs.capital * Math.pow(1 + inputs.taxa, inputs.tempo);
    }
}
```

#### 2. Reutilizar validadores existentes

```typescript
// Validadores já estão prontos!
ValidadoresJuros.validarCapital(inputs.capital);
ValidadoresJuros.validarTaxa(inputs.taxa);
```

#### 3. Adicionar interfaces específicas

```typescript
// Util/InterfacesCalculadoraJuros.ts
export interface EntradasJurosCompostos {
    CapitalTaxaTempo: { capital: number, taxa: number, tempo: number }
    // ... outras combinações
}
```

#### 4. Escrever testes

```typescript
// test/JurosCompostos.test.ts
describe("JurosCompostos", () => {
    it("deve calcular montante com capitalização", () => {
        const input = { capital: 1000, taxa: 0.10, tempo: 12 };
        const resultado = JurosCompostos.montantePorCapitalTaxaTempo(input);
        expect(resultado).toBeCloseTo(3138.43, 2);
    });
});
```

---

## 📚 Referências

### Documentação Externa

- [Juros Simples - Conceitos](https://www.bcb.gov.br/pre/bc_atende/port/servicos2.asp)
- [TypeScript - Handbook](https://www.typescriptlang.org/docs/)
- [Jest - Testing Framework](https://jestjs.io/docs/getting-started)

### Arquivos Relacionados

- `/interface` - Interface CLI que consome esta lógica
- `/test` - Suite completa de testes (141 testes)
- `package.json` - Configuração do projeto
- `tsconfig.json` - Configuração TypeScript

---

## 🤝 Contribuindo

Ao modificar ou adicionar funcionalidades no core:

1. ✅ Mantenha métodos estáticos
2. ✅ Valide todas as entradas antes de calcular
3. ✅ Use interfaces TypeScript para contratos
4. ✅ Adicione mensagens de erro em `MensagensErro.ts`
5. ✅ Escreva testes para todos os cenários (sucesso + erros)
6. ✅ Documente fórmulas matemáticas nos comentários
7. ✅ Garanta 100% de cobertura de testes
8. ✅ Mantenha separação entre lógica e interface

### Checklist de Pull Request

- [ ] Todos os testes passam (`npm test`)
- [ ] Cobertura de testes mantida em 100%
- [ ] TypeScript compila sem erros (`npx tsc --noEmit`)
- [ ] Validações implementadas para novas entradas
- [ ] Interfaces TypeScript criadas/atualizadas
- [ ] Mensagens de erro adicionadas ao constants
- [ ] Fórmulas documentadas em comentários
- [ ] README atualizado (se aplicável)

---

## 📞 Suporte

Para dúvidas sobre a lógica de negócio ou fórmulas matemáticas, abra uma issue no repositório com:

- Descrição do problema/dúvida
- Exemplo de entrada e saída esperada
- Fórmula matemática envolvida (se aplicável)

**Desenvolvido com 🧮 para cálculos financeiros precisos e confiáveis!**
