# 📟 Interface de Terminal - Calculadora Financeira

Este diretório contém toda a **interface de linha de comando (CLI)** da Calculadora Financeira, construída com [Inquirer.js](https://github.com/SBoudrias/Inquirer.js/) para proporcionar uma experiência interativa e amigável no terminal.

---

## 📂 Estrutura do Diretório

```text
interface/
├── CalculadoraMenu.ts          # Menu principal da aplicação
├── auxiliaresPrompts.ts        # Helpers reutilizáveis para prompts
├── menus/                      # Submenus de navegação
│   ├── MenuCalculadora.ts      # Interface base para menus
│   ├── JurosMenu.ts           # Menu de cálculo de Juros
│   ├── CapitalMenu.ts         # Menu de cálculo de Capital
│   ├── MontanteMenu.ts        # Menu de cálculo de Montante
│   ├── TaxaMenu.ts            # Menu de cálculo de Taxa
│   └── TempoMenu.ts           # Menu de cálculo de Tempo
└── fluxos/                     # Fluxos de entrada/cálculo/saída
    ├── CalcularJuros.ts       # Lógica de interface para Juros
    ├── CalcularCapital.ts     # Lógica de interface para Capital
    ├── CalcularMontante.ts    # Lógica de interface para Montante
    ├── CalcularTaxa.ts        # Lógica de interface para Taxa
    └── CalcularTempo.ts       # Lógica de interface para Tempo
```

---

## 🎯 Arquitetura da Interface

### 1. **Menu Principal** (`CalculadoraMenu.ts`)

Ponto de entrada da aplicação CLI. Responsável por:

- Exibir o menu principal com as opções de cálculo
- Navegar entre os diferentes submenus
- Gerenciar o ciclo de vida da aplicação (iniciar/sair)

```typescript
// Exemplo de uso
const app = new CalculadoraMenu();
await app.iniciar();
```

### 2. **Helpers de Prompts** (`auxiliaresPrompts.ts`)

Funções utilitárias para criar prompts padronizados e reutilizáveis:

#### `criarPromptNumero(name, message, opts)`

Cria um prompt para entrada de números com validação automática.

```typescript
criarPromptNumero('capital', 'Qual o Capital (R$)?', { 
    min: 0, 
    invalidMessage: 'Capital não pode ser negativo.' 
})
```

**Características:**

- Aceita vírgula ou ponto como separador decimal
- Validação de formato numérico
- Validação de valor mínimo opcional
- Mensagem de erro customizável

#### `criarPromptConfirmacao(name, message, default)`

Cria um prompt de confirmação (Sim/Não).

```typescript
criarPromptConfirmacao('voltar', 'Deseja voltar ao menu principal?', true)
```

#### `criarPromptMenu(name, message, choices, opts)`

Cria um prompt de menu de seleção.

```typescript
criarPromptMenu(
    'opcao',
    'O que você deseja calcular?',
    ['Juros', 'Capital', 'Taxa', 'Tempo', new inquirer.Separator(), 'Sair'],
    { raw: true }
)
```

**Opções:**

- `raw: true` - Usa `rawlist` (numerado) ao invés de `list` (setas)
- Suporta separadores visuais com `inquirer.Separator()`

### 3. **Submenus** (`menus/`)

Cada submenu corresponde a um tipo de cálculo e oferece diferentes combinações de entrada.

**Padrão de implementação:**

```typescript
export class MenuJuros {
    private menuPrincipal: any;
    private calculosJuros: CalcularJuros;

    constructor(menuPrincipal: any) {
        this.menuPrincipal = menuPrincipal;
        this.calculosJuros = new CalcularJuros(menuPrincipal);
    }

    public async menuJuros(): Promise<void> {
        const resposta = await inquirer.prompt([
            criarPromptMenu('opcao', 'O que você possui?', [...])
        ]);

        switch (resposta.opcao) {
            case 'Capital, taxa e tempo':
                await this.calculosJuros.CalcularJurosPorCapitalTaxaTempo();
                break;
            // ...
        }
    }
}
```

**Responsabilidades:**

- Apresentar opções de entrada para o cálculo específico
- Delegar execução para a classe de fluxo correspondente
- Gerenciar navegação de volta ao menu principal

### 4. **Fluxos de Cálculo** (`fluxos/`)

Classes que implementam a **lógica de interface** para cada tipo de cálculo, seguindo o padrão:

```typescript
export class CalcularJuros {
    private menuPrincipal: CalculadoraMenu;

    constructor(menuPrincipal: CalculadoraMenu) {
        this.menuPrincipal = menuPrincipal;
    }

    public async CalcularJurosPorCapitalTaxaTempo(): Promise<void> {
        console.log("\n--- Calculando Juros ---");

        try {
            // 1. Coleta de dados do usuário
            const inputs = await inquirer.prompt([
                criarPromptNumero('capital', 'Qual o Capital (R$)?', { min: 0 }),
                criarPromptNumero('taxa', 'Qual a Taxa (ex: 0.1 para 10%)?'),
                criarPromptNumero('tempo', 'Qual o Tempo?', { min: 0 })
            ]);

            // 2. Preparação dos dados
            const dadosParaCalculo: EntradasJuros['CapitalTaxaTempo'] = {
                capital: inputs.capital,
                taxa: inputs.taxa,
                tempo: inputs.tempo
            };

            // 3. Chamada à lógica de negócio
            const resultado = JurosSimples.jurosPorCapitalTaxaTempo(dadosParaCalculo);

            // 4. Exibição do resultado
            console.log("\n✅ RESULTADO:");
            console.log(`Juros: R$ ${resultado.toFixed(2)}\n`);

        } catch (error: any) {
            // 5. Tratamento de erros
            console.log("\n❌ ERRO:");
            console.log(error.message);
        }

        // 6. Confirmação de volta ao menu
        await this.confirmarVoltaMenu();
    }

    private async confirmarVoltaMenu(): Promise<void> {
        const { voltar } = await inquirer.prompt([
            criarPromptConfirmacao('voltar', 'Deseja voltar ao menu principal?', true)
        ]);

        if (voltar) {
            console.clear();
            await this.menuPrincipal.menuPrincipal();
        }
    }
}
```

---

## 🔄 Fluxo de Navegação

```text
┌─────────────────────────────────┐
│   CalculadoraMenu.iniciar()     │ 
│   (Menu Principal)              │
└────────────┬────────────────────┘
             │
             ├─→ Juros ──────┐
             ├─→ Capital ────┤
             ├─→ Montante ───┼─→ [Submenu] ──→ [Fluxo de Cálculo]
             ├─→ Taxa ───────┤       │                  │
             ├─→ Tempo ──────┘       │                  │
             └─→ Sair                ↓                  ↓
                               confirmarVoltaMenu()  resultado
                                     ↓
                               Menu Principal
```

**Exemplo de fluxo completo:**

1. Usuário inicia aplicação
2. Menu principal exibe opções (Juros, Capital, etc.)
3. Usuário seleciona "Juros"
4. `MenuJuros` apresenta combinações de entrada
5. Usuário seleciona "Capital, taxa e tempo"
6. `CalcularJuros.CalcularJurosPorCapitalTaxaTempo()` é executado
7. Prompts coletam: capital, taxa, tempo
8. Validação automática via `inquirer` (formato, valores mínimos)
9. Dados enviados para `JurosSimples.jurosPorCapitalTaxaTempo()`
10. Validação de negócio (valores zero/negativos)
11. Resultado exibido ou erro capturado
12. Confirmação para voltar ao menu principal

---

## ✅ Validações

### Camada 1: Validação de Formato (Inquirer)

Executada **durante a entrada** pelo `inquirer`:

- Formato numérico válido
- Valores mínimos (`min` option)
- **Comportamento**: Re-solicita automaticamente entrada inválida

```typescript
criarPromptNumero('capital', 'Qual o Capital (R$)?', { 
    min: 0, 
    invalidMessage: 'Capital não pode ser negativo.' 
})
```

### Camada 2: Validação de Negócio (JurosSimples)

Executada **após a coleta** pela lógica de negócio:

- Valores zero quando não permitidos
- Relações lógicas entre valores (ex: montante > capital)
- Campos obrigatórios (undefined/null)
- **Comportamento**: Lança exceção capturada no `try-catch`

```typescript
try {
    const resultado = JurosSimples.jurosPorCapitalTaxaTempo(dados);
    // sucesso
} catch (error: any) {
    console.log("\n❌ ERRO:");
    console.log(error.message); // ex: "Capital não pode ser zero"
}
```

---

## 🎨 Padrões de Código

### ✨ Convenções de Nomenclatura

- **Menus**: `Menu[Elemento]` (ex: `MenuJuros`)
- **Fluxos**: `Calcular[Elemento]` (ex: `CalcularJuros`)
- **Métodos de cálculo**: `Calcular[Elemento]Por[Entradas]` (ex: `CalcularJurosPorCapitalTaxaTempo`)
- **Helpers**: verbos descritivos (ex: `criarPromptNumero`, `perguntarConfirmacao`)

### 📦 Imports

```typescript
import inquirer from 'inquirer';
import { criarPromptNumero, criarPromptConfirmacao } from '../auxiliaresPrompts';
import type { EntradasJuros } from '../../core/Util/InterfacesCalculadoraJuros';
import { JurosSimples } from '../../core/JurosSimples';
```

### 🏗️ Padrão Constructor

```typescript
export class MenuJuros {
    private menuPrincipal: any;
    private calculosJuros: CalcularJuros;

    constructor(menuPrincipal: any) {
        this.menuPrincipal = menuPrincipal;
        // Instancia fluxo no constructor
        this.calculosJuros = new CalcularJuros(menuPrincipal);
    }
}
```

### 🔍 Padrão Try-Catch

```typescript
try {
    const inputs = await inquirer.prompt([...]); // DENTRO do try
    const resultado = JurosSimples.calcular(dados);
    console.log("\n✅ RESULTADO:");
    console.log(`Valor: ${resultado.toFixed(2)}\n`);
} catch (error: any) {
    console.log("\n❌ ERRO:");
    console.log(error.message);
}
```

### 📊 Formatação de Resultados

```typescript
// Valores monetários (Capital, Juros, Montante)
console.log(`Capital: R$ ${resultado.toFixed(2)}`);

// Percentuais (Taxa)
console.log(`Taxa: ${resultado.toFixed(2)}%`);

// Tempo
console.log(`Tempo: ${resultado.toFixed(1)} períodos`);
```

### 🔄 Padrão confirmarVoltaMenu

```typescript
private async confirmarVoltaMenu(): Promise<void> {
    const { voltar } = await inquirer.prompt([
        criarPromptConfirmacao('voltar', 'Deseja voltar ao menu principal?', true)
    ]);

    if (voltar) {
        console.clear();
        await this.menuPrincipal.menuPrincipal();
    }
}
```

---

## 🚀 Como Adicionar um Novo Fluxo de Cálculo

### 1. Criar classe no `/fluxos`

```typescript
// fluxos/CalcularNovoCalculo.ts
import inquirer from "inquirer";
import type { EntradasNovoCalculo } from "../../core/Util/Interfaces";
import { JurosSimples } from "../../core/JurosSimples";
import type { CalculadoraMenu } from "../menus/MenuCalculadora";
import { criarPromptNumero, criarPromptConfirmacao } from '../auxiliaresPrompts';

export class CalcularNovoCalculo {
    private menuPrincipal: CalculadoraMenu;

    constructor(menuPrincipal: CalculadoraMenu) {
        this.menuPrincipal = menuPrincipal;
    }

    public async CalcularNovoCalculoPorXyz(): Promise<void> {
        console.log("\n--- Calculando Novo Cálculo ---");

        try {
            const inputs = await inquirer.prompt([
                criarPromptNumero('x', 'Valor X?', { min: 0 }),
                criarPromptNumero('y', 'Valor Y?')
            ]);

            const dados: EntradasNovoCalculo['Xyz'] = {
                x: inputs.x,
                y: inputs.y
            };

            const resultado = JurosSimples.novoCalculoPorXyz(dados);

            console.log("\n✅ RESULTADO:");
            console.log(`Resultado: ${resultado.toFixed(2)}\n`);

        } catch (error: any) {
            console.log("\n❌ ERRO:");
            console.log(error.message);
        }

        await this.confirmarVoltaMenu();
    }

    private async confirmarVoltaMenu(): Promise<void> {
        const { voltar } = await inquirer.prompt([
            criarPromptConfirmacao('voltar', 'Deseja voltar ao menu principal?', true)
        ]);

        if (voltar) {
            console.clear();
            await this.menuPrincipal.menuPrincipal();
        }
    }
}
```

### 2. Criar submenu em `/menus`

```typescript
// menus/NovoCalculoMenu.ts
import inquirer from 'inquirer';
import { CalcularNovoCalculo } from '../fluxos/CalcularNovoCalculo';
import { criarPromptConfirmacao, criarPromptMenu } from '../auxiliaresPrompts';

export class NovoCalculoMenu {
    private menuPrincipal: any;
    private calculosNovoCalculo: CalcularNovoCalculo;

    constructor(menuPrincipal: any) {
        this.menuPrincipal = menuPrincipal;
        this.calculosNovoCalculo = new CalcularNovoCalculo(menuPrincipal);
    }

    public async menuNovoCalculo(): Promise<void> {
        const resposta = await inquirer.prompt([
            criarPromptMenu(
                'opcao',
                'O que você possui?',
                [
                    'X e Y',
                    'Outra opção',
                    new inquirer.Separator(),
                    'Voltar ao menu principal'
                ],
                { raw: true }
            )
        ]);

        switch (resposta.opcao) {
            case 'X e Y':
                await this.calculosNovoCalculo.CalcularNovoCalculoPorXyz();
                break;
            case 'Voltar ao menu principal':
                await this.confirmarVoltaMenu();
                break;
        }
    }

    private async confirmarVoltaMenu(): Promise<void> {
        const { voltar } = await inquirer.prompt([
            criarPromptConfirmacao('voltar', 'Deseja voltar?', true)
        ]);

        if (voltar) {
            console.clear();
            await this.menuPrincipal.menuPrincipal();
        }
    }
}
```

### 3. Adicionar ao menu principal

```typescript
// CalculadoraMenu.ts
import { NovoCalculoMenu } from './menus/NovoCalculoMenu';

export class CalculadoraMenu {
    private novoCalculo: NovoCalculoMenu;

    constructor() {
        this.novoCalculo = new NovoCalculoMenu(this);
    }

    public async menuPrincipal(): Promise<void> {
        const resposta = await inquirer.prompt([
            criarPromptMenu(
                'opcao',
                'O que você deseja calcular?',
                [
                    'Juros',
                    'Novo Cálculo', // ← adicionar aqui
                    new inquirer.Separator(),
                    'Sair'
                ],
                { raw: true }
            )
        ]);

        switch (resposta.opcao) {
            case 'Novo Cálculo':
                await this.novoCalculo.menuNovoCalculo();
                break;
            // ...
        }
    }
}
```

---

## 🧪 Testes

Atualmente, **não existem testes automatizados para a interface CLI**. A lógica de negócio (`/core/JurosSimples`) possui cobertura completa de testes (141 testes passando).

### Por que não testar a interface?

Testar CLIs interativas com `inquirer` é complexo porque:

- Requer mockar stdin/stdout
- Prompts são assíncronos e dependem de input do usuário
- Testes end-to-end são frágeis e lentos

### Estratégia de qualidade

✅ **Testes unitários da lógica de negócio** (já implementado)  
✅ **Separação de responsabilidades** (interface vs. lógica)  
✅ **Validação em camadas** (inquirer + JurosSimples)  
✅ **Testes manuais** da experiência do usuário

---

## 📚 Tecnologias Utilizadas

- **[Inquirer.js v13](https://github.com/SBoudrias/Inquirer.js/)** - Biblioteca para prompts interativos
- **TypeScript 5.9** - Tipagem estática e segurança de tipos
- **Node.js v22** - Runtime JavaScript

---

## 🤝 Contribuindo

Ao modificar ou adicionar funcionalidades na interface, siga:

1. ✅ Use os helpers de `auxiliaresPrompts.ts`
2. ✅ Mantenha o padrão de nomenclatura
3. ✅ Coloque inputs **dentro** do `try-catch`
4. ✅ Use formatação `.toFixed()` nos resultados
5. ✅ Implemente `confirmarVoltaMenu()` em todos os fluxos
6. ✅ Teste manualmente todos os caminhos de navegação
7. ✅ Garanta que validações estejam funcionando (formato + negócio)

---

## 📞 Contato

Para dúvidas ou sugestões sobre a interface CLI, abra uma issue no repositório.

**Desenvolvido com ❤️ para facilitar cálculos financeiros no terminal!**
