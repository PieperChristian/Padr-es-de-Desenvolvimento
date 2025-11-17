# 📊 Calculadora Financeira

> ⚠️ **Projeto em Desenvolvimento** - Este projeto está em fase inicial de desenvolvimento e pode conter funcionalidades incompletas ou em teste.

Biblioteca de cálculos financeiros desenvolvida em TypeScript com suporte a juros simples e compostos, incluindo validações e testes automatizados.

## 🚀 Funcionalidades

### ✅ Implementado
- **Juros Simples**: Cálculos de juros, capital, montante, taxa e tempo
- **Validações**: Sistema de validação de entradas financeiras
- **Testes Automatizados**: Cobertura de testes com Jest

### 🔄 Em Desenvolvimento
- Juros Compostos
- Amortização
- Fluxo de Caixa
- Documentação completa da API

## 🛠️ Tecnologias

- **TypeScript** 5.9.3
- **Jest** 30.2.0 (testes)
- **ts-jest** 29.4.5 (suporte TypeScript para Jest)

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/calculadora-financeira.git

# Entre no diretório
cd calculadora-financeira

# Instale as dependências
npm install
```

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes com cobertura
npm run test:coverage
```

## 📖 Uso Básico

```typescript
import { JurosSimples } from './src/JurosSimples';

// Calcular juros a partir de capital, taxa e tempo
const juros = JurosSimples.jurosPorCapitalTaxaTempo({
  capital: 1000,
  taxa: 0.05,    // 5% ao período
  tempo: 12      // 12 períodos
});

console.log(`Juros: R$ ${juros.toFixed(2)}`);
// Output: Juros: R$ 600.00

// Calcular capital a partir de juros, taxa e tempo
const capital = JurosSimples.capitalPorJurosTaxaTempo({
  juros: 600,
  taxa: 0.05,
  tempo: 12
});

console.log(`Capital: R$ ${capital.toFixed(2)}`);
// Output: Capital: R$ 1000.00
```

## 📁 Estrutura do Projeto

```
calculadora-financeira/
├── src/
│   ├── JurosSimples.ts          # Classe principal de juros simples
│   ├── ValidadoresJuros.ts      # Validadores de entrada
│   ├── Util/                    # Interfaces e utilitários
│   ├── constants/               # Constantes do projeto
│   └── index.ts                 # Ponto de entrada
├── test/                        # Testes automatizados
├── jest.config.js               # Configuração do Jest
├── tsconfig.json                # Configuração do TypeScript
└── package.json                 # Dependências e scripts
```

## 🤝 Contribuindo

Como este projeto está em desenvolvimento, contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abrir um Pull Request

## 📝 Licença

ISC

## 👤 Autor

**Christian Pieper**
- GitHub: [@seu-usuario](https://github.com/seu-usuario)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!
