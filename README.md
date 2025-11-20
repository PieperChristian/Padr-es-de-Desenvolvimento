# 💰 Calculadora Financeira

Sistema completo de cálculos financeiros desenvolvido em **TypeScript**, com interface CLI interativa e lógica de negócio robusta. O projeto implementa cálculos de **Juros Simples** com validações rigorosas, cobertura completa de testes e uma experiência de usuário amigável no terminal.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)
[![Jest](https://img.shields.io/badge/Jest-30.2.0-green)](https://jestjs.io/)
[![Tests](https://img.shields.io/badge/Tests-141%20passing-brightgreen)](test/)
[![License](https://img.shields.io/badge/License-ISC-yellow)](LICENSE)

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#️-tecnologias)
- [Instalação](#-instalação)
- [Como Usar](#-como-usar)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Testes](#-testes)
- [Documentação](#-documentação)
- [Roadmap](#️-roadmap)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)
- [Autor](#-autor)

---

## 🎯 Sobre o Projeto

A **Calculadora Financeira** é uma aplicação educacional e profissional que oferece cálculos precisos de juros simples através de uma interface CLI (Command Line Interface) interativa. O projeto segue princípios sólidos de engenharia de software, com separação clara entre lógica de negócio e interface, validações em múltiplas camadas e cobertura completa de testes automatizados.

### 🌟 Diferenciais

✅ **Interface CLI Interativa** - Navegação intuitiva com [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/)  
✅ **15 Métodos de Cálculo** - Todas as combinações possíveis de entradas para Juros Simples  
✅ **Validação Rigorosa** - Sistema de validação em camadas (formato + negócio)  
✅ **Type Safety** - TypeScript com interfaces para contratos claros  
✅ **100% Testado** - 141 testes automatizados com Jest  
✅ **Código Limpo** - Separação de responsabilidades (Core + Interface)  
✅ **Mensagens Claras** - Erros descritivos e formatação amigável  

---

## 🚀 Funcionalidades

### ✅ Implementado

#### 🧮 Cálculos de Juros Simples

- **Calcular Juros**: 3 combinações de entrada
  - Por Capital, Taxa e Tempo
  - Por Capital e Montante
  - Por Taxa, Tempo e Montante

- **Calcular Capital**: 3 combinações de entrada
  - Por Juros, Taxa e Tempo
  - Por Juros e Montante
  - Por Taxa, Tempo e Montante

- **Calcular Montante**: 3 combinações de entrada
  - Por Capital, Taxa e Tempo
  - Por Capital e Juros
  - Por Juros, Taxa e Tempo

- **Calcular Taxa**: 3 combinações de entrada
  - Por Capital, Juros e Tempo
  - Por Capital, Montante e Tempo
  - Por Juros, Montante e Tempo

- **Calcular Tempo**: 3 combinações de entrada
  - Por Capital, Juros e Taxa
  - Por Capital, Montante e Taxa
  - Por Juros, Montante e Taxa

#### 🛡️ Sistema de Validação

- Validação de formato (números válidos, valores mínimos)
- Validação de negócio (valores zero, negativos)
- Validação de campos obrigatórios (undefined/null)
- Mensagens de erro descritivas e padronizadas

#### 🖥️ Interface CLI

- Menu principal com todas as opções de cálculo
- Submenus para cada tipo de cálculo
- Navegação intuitiva com confirmações
- Formatação de resultados (moeda, percentual, tempo)
- Sistema de retry após erros de validação

#### 🧪 Testes Automatizados

- 141 testes unitários com Jest
- Cobertura de 100% da lógica de negócio
- Testes de valores corretos, inválidos e obrigatórios
- Execução rápida (< 1 segundo)

---

## 🛠️ Tecnologias

| Tecnologia | Versão | Descrição |
|-----------|--------|-----------|
| **TypeScript** | 5.9.3 | Linguagem principal com tipagem estática |
| **Node.js** | 22.18.0 | Runtime JavaScript |
| **Inquirer.js** | 13.0.1 | Biblioteca para prompts interativos CLI |
| **Jest** | 30.2.0 | Framework de testes |
| **ts-jest** | 29.4.5 | Suporte TypeScript para Jest |
| **ts-node** | - | Execução direta de TypeScript |

---

## 📦 Instalação

### Pré-requisitos

- **Node.js** >= 18.x
- **npm** >= 9.x

### Passo a Passo

```bash
# 1. Clone o repositório
git clone https://github.com/PieperChristian/Calculadora-Financeira.git

# 2. Entre no diretório
cd Calculadora-Financeira

# 3. Instale as dependências
npm install

# 4. (Opcional) Compile o TypeScript
npx tsc
```

---

## 💻 Como Usar

### 🎮 Interface CLI (Recomendado)

Execute a aplicação interativa no terminal:

```bash
npm run start:calc
```

**Fluxo de uso:**

1. Menu principal exibe opções: Juros, Capital, Montante, Taxa, Tempo
2. Selecione o tipo de cálculo desejado
3. Escolha a combinação de entradas disponíveis
4. Digite os valores solicitados (validados automaticamente)
5. Visualize o resultado formatado
6. Confirme para voltar ao menu ou sair

**Exemplo de sessão:**

```text
========================================
    💰  CALCULADORA FINANCEIRA  💰
========================================

? O que você deseja calcular?
  1) Juros
  2) Montante
  3) Capital
  4) Taxa
  5) Tempo
  ──────────────
  6) Sair

> 1

? O que você possui?
  1) Capital, taxa e tempo
  2) Capital e montante
  3) Taxa, tempo e montante
  ──────────────
  4) Voltar ao menu principal

> 1

--- Calculando Juros ---
? Qual o Capital (R$)? 1000
? Qual a Taxa (ex: 0.1 para 10%)? 0.10
? Qual o Tempo (na mesma unidade da taxa)? 12

✅ RESULTADO:
Juros: R$ 1200.00

? Deseja voltar ao menu principal? (Y/n)
```

### 📚 Uso Programático

Você também pode usar a lógica de negócio diretamente no seu código:

```typescript
import { JurosSimples } from './src/core/JurosSimples';

// Calcular juros a partir de capital, taxa e tempo
const juros = JurosSimples.jurosPorCapitalTaxaTempo({
  capital: 1000,
  taxa: 0.10,    // 10% ao período
  tempo: 12      // 12 períodos
});

console.log(`Juros: R$ ${juros.toFixed(2)}`);
// Output: Juros: R$ 1200.00

// Calcular taxa a partir de capital, juros e tempo
const taxa = JurosSimples.taxaPorCapitalJurosTempo({
  capital: 1000,
  juros: 1200,
  tempo: 12
});

console.log(`Taxa: ${(taxa * 100).toFixed(2)}%`);
// Output: Taxa: 10.00%

// Tratamento de erros
try {
  const resultado = JurosSimples.jurosPorCapitalTaxaTempo({
    capital: -1000,  // valor inválido
    taxa: 0.10,
    tempo: 12
  });
} catch (error: any) {
  console.error(error.message);
  // Output: "O capital não pode ser negativo."
}
```

---

## 📁 Estrutura do Projeto

```text
Calculadora-Financeira/
├── src/
│   ├── core/                           # Lógica de negócio (Business Logic)
│       │   ├── README.md                   # 📖 Documentação do Core
│       │   ├── JurosSimples.ts             # Classe com 15 métodos de cálculo
│       │   ├── ValidadoresJuros.ts         # Validações de regras de negócio
│       │   ├── Util/
│       │   │   └── InterfacesCalculadoraJuros.ts  # Interfaces TypeScript
│       │   └── constants/
│       │       └── MensagensErro.ts        # Mensagens padronizadas
│       │
│       ├── interface/                      # Interface CLI (Presentation Layer)
│       │   ├── README.md                   # 📖 Documentação da Interface
│       │   ├── CalculadoraMenu.ts          # Menu principal
│       │   ├── auxiliaresPrompts.ts        # Helpers reutilizáveis
│       │   ├── menus/                      # Submenus de navegação
│       │   │   ├── MenuCalculadora.ts      # Interface base
│       │   │   ├── JurosMenu.ts            # Menu de Juros
│       │   │   ├── CapitalMenu.ts          # Menu de Capital
│       │   │   ├── MontanteMenu.ts         # Menu de Montante
│       │   │   ├── TaxaMenu.ts             # Menu de Taxa
│       │   │   └── TempoMenu.ts            # Menu de Tempo
│       │   └── fluxos/                     # Fluxos de entrada/cálculo/saída
│       │       ├── CalcularJuros.ts        # 3 métodos de cálculo de Juros
│       │       ├── CalcularCapital.ts      # 3 métodos de cálculo de Capital
│       │       ├── CalcularMontante.ts     # 3 métodos de cálculo de Montante
│       │       ├── CalcularTaxa.ts         # 3 métodos de cálculo de Taxa
│       │       └── CalcularTempo.ts        # 3 métodos de cálculo de Tempo
│       │
│       └── main.ts                         # Ponto de entrada da CLI
│
├── test/
│   └── JurosSimples.test.ts                # 141 testes automatizados
│
├── coverage/                               # Relatórios de cobertura (gerado)
├── jest.config.js                          # Configuração do Jest
├── tsconfig.json                           # Configuração do TypeScript
├── package.json                            # Dependências e scripts
├── LICENSE                                 # Licença ISC
└── README.md                               # Este arquivo
```

### 🗂️ Organização por Camadas

**Core (`/core`)**: Lógica de negócio pura

- ✅ Sem dependências de interface
- ✅ Métodos estáticos
- ✅ 100% testado
- ✅ Reutilizável em qualquer contexto

**Interface (`/interface`)**: Camada de apresentação

- ✅ Consome o Core
- ✅ Gerencia interação com usuário
- ✅ Validação de formato (Inquirer)
- ✅ Navegação e UX

---

## 🧪 Testes

### Executar Testes

```bash
# Executar todos os testes
npm test

# Executar com cobertura detalhada
npm run test:coverage

# Executar em modo watch (desenvolvimento)
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

### Cobertura de Testes

| Categoria | Testes | Descrição |
|-----------|--------|-----------|
| **Valores Corretos** | 15 | Testa cálculos com entradas válidas |
| **Valores Inválidos** | 90 | Testa rejeição de negativos e zeros |
| **Campos Obrigatórios** | 36 | Testa rejeição de undefined/null |
| **Total** | **141** | **100% de cobertura do Core** |

---

## 📖 Documentação

### Documentação Detalhada

Cada módulo possui sua própria documentação completa:

📘 **[Core - Lógica de Negócio](src/core/README.md)**

- Fórmulas matemáticas de Juros Simples
- 15 métodos de cálculo documentados
- Sistema de validação rigoroso
- Interfaces TypeScript
- Exemplos de uso programático

📗 **[Interface - CLI Interativa](src/interface/README.md)**

- Arquitetura da interface
- Fluxo de navegação
- Helpers reutilizáveis
- Padrões de código
- Guia para adicionar novos fluxos

### Referências Rápidas

**Fórmulas básicas de Juros Simples:**

```text
J = C × i × t     (Juros)
M = C + J         (Montante)
C = J / (i × t)   (Capital)
i = J / (C × t)   (Taxa)
t = J / (C × i)   (Tempo)
```

**Exemplo de cálculo:**

- Capital: R$ 1.000,00
- Taxa: 10% ao mês (0.10)
- Tempo: 12 meses
- **Juros: R$ 1.200,00**
- **Montante: R$ 2.200,00**

---

## 🗺️ Roadmap

### 🔜 Próximas Implementações

#### 📱 Frontend Web (Em Planejamento)

- [ ] Interface web responsiva com React/Next.js
- [ ] Dashboard com gráficos de evolução
- [ ] Comparação de cenários (simples vs. compostos)
- [ ] Histórico de cálculos
- [ ] Exportação de resultados (PDF/Excel)
- [ ] Temas claro/escuro

#### 🧮 Juros Compostos

- [ ] Implementar classe `JurosCompostos`
- [ ] 15 métodos de cálculo (mesma estrutura de Juros Simples)
- [ ] Validações e testes automatizados
- [ ] Fórmulas: `M = C × (1 + i)^t`
- [ ] Integração com interface CLI e Web

#### 💸 Descontos Simples

- [ ] Desconto comercial (bancário)
- [ ] Desconto racional (por dentro)
- [ ] Cálculo de valor atual
- [ ] Validações específicas
- [ ] Testes completos

#### 📊 Outros Cálculos Financeiros

- [ ] **Amortização**
  - Sistema Price (SAC)
  - Sistema Francês (Tabela Price)
  - Sistema Americano

- [ ] **Análise de Investimentos**
  - VPL (Valor Presente Líquido)
  - TIR (Taxa Interna de Retorno)
  - Payback simples e descontado

- [ ] **Fluxo de Caixa**
  - Séries uniformes
  - Séries gradientes
  - Perpetuidades

- [ ] **Conversão de Taxas**
  - Taxa nominal → taxa efetiva
  - Taxas equivalentes
  - Taxas proporcionais

#### 🌍 Melhorias Gerais

- [ ] Internacionalização (i18n) - suporte a múltiplos idiomas
- [ ] API REST para integração externa
- [ ] Documentação com JSDoc completa
- [ ] Publicação no npm como biblioteca
- [ ] CI/CD com GitHub Actions
- [ ] Badges de status no README

---

## 🤝 Contribuindo

Contribuições são muito bem-vindas! Este projeto segue padrões rigorosos de qualidade de código.

### Como Contribuir

1. **Fork** o projeto
2. Crie uma **branch** para sua feature

   ```bash
   git checkout -b feature/MinhaFeature
   ```

3. **Desenvolva** seguindo os padrões do projeto
4. **Escreva testes** para sua implementação
5. **Commit** suas mudanças

   ```bash
   git commit -m "feat: adiciona cálculo de juros compostos"
   ```

6. **Push** para sua branch

   ```bash
   git push origin feature/MinhaFeature
   ```

7. Abra um **Pull Request**

### Padrões de Código

✅ Use TypeScript com tipagem forte  
✅ Siga o padrão de nomenclatura existente  
✅ Mantenha separação Core/Interface  
✅ Adicione validações para novas entradas  
✅ Escreva testes para todos os cenários  
✅ Documente métodos públicos  
✅ Mantenha mensagens de erro claras  

### Checklist de Pull Request

- [ ] Código compila sem erros (`npx tsc --noEmit`)
- [ ] Todos os testes passam (`npm test`)
- [ ] Cobertura de testes mantida/aumentada
- [ ] Documentação atualizada (README + comentários)
- [ ] Commit messages descritivos
- [ ] Nenhum console.log desnecessário
- [ ] Código formatado e limpo

---

## 📝 Licença

Este projeto está sob a licença **ISC**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👤 Autor

Christian Pieper

- 🌐 GitHub: [@PieperChristian](https://github.com/PieperChristian)
- 📫 Repositório: [Calculadora-Financeira](https://github.com/PieperChristian/Calculadora-Financeira)

---

## 🙏 Agradecimentos

- Comunidade TypeScript pela excelente documentação
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/) pela biblioteca de prompts
- [Jest](https://jestjs.io/) pelo framework de testes robusto

---

⭐ **Se este projeto foi útil para você, considere dar uma estrela no GitHub!**

💡 **Sugestões e feedbacks são sempre bem-vindos através das Issues!**
