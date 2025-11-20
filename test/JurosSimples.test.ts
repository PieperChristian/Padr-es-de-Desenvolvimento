import { JurosSimples } from "../src/core/JurosSimples";
import { MENSAGENS_ERRO } from "../src/core/constants/MensagensErro";
import { EntradasTempo, EntradasTaxa, EntradasCapital, EntradasJuros, EntradasMontante } from "../src/core/Util/InterfacesCalculadoraJuros";

describe("Cenários para Juros Simples: ", () => {

    describe("Validações de valores corretos - ", () => {

        describe("Ao calcular Juros: ", () => {
            
            it("deve calcular, corretamente, quando dado capital e montante", () => {
                const input: EntradasJuros['CapitalMontante'] = { 
                    capital: 1000,
                    montante: 2200
                };

                const jurosCalculado = JurosSimples.jurosPorCapitalMontante(input);
                const jurosEsperado = 1200;
                expect(jurosCalculado).toBeCloseTo(jurosEsperado, 2);
            });

            it("deve calcular, corretamente, quando dados capital, taxa e tempo", () => {
                const input: EntradasJuros['CapitalTaxaTempo'] = { 
                    capital: 1000,
                    taxa: 0.10,
                    tempo: 12
                };

                const jurosCalculado = JurosSimples.jurosPorCapitalTaxaTempo(input);
                const jurosEsperado = 1200;
                expect(jurosCalculado).toBeCloseTo(jurosEsperado, 2);
            });

            it("deve calcular, corretamente, quando dados taxa, tempo e montante", () => {
                const input: EntradasJuros['TaxaTempoMontante'] = { 
                    taxa: 0.10,
                    tempo: 12,
                    montante: 2200
                };

                const jurosCalculado = JurosSimples.jurosPorTaxaTempoMontante(input);
                const jurosEsperado = 1200;
                expect(jurosCalculado).toBeCloseTo(jurosEsperado, 2);
            });
        
        });

        describe("Ao calcular Capital: ", () => {

            it("deve calcular, corretamente, quando dados juros e montante", () => {
                const input: EntradasCapital['JurosMontante'] = {
                    juros: 1200,
                    montante: 2200
                };

                const capitalCalculado = JurosSimples.capitalPorJurosMontante(input);
                const capitalEsperado = 1000;
                expect(capitalCalculado).toBeCloseTo(capitalEsperado, 2);
            });

            it("deve calcular, corretamente, quando dados juros, taxa e tempo", () => {
                const input: EntradasCapital['JurosTaxaTempo'] = {
                    juros: 1200,
                    taxa: 0.10,
                    tempo: 12
                };

                const capitalCalculado = JurosSimples.capitalPorJurosTaxaTempo(input);
                const capitalEsperado = 1000;
                expect(capitalCalculado).toBeCloseTo(capitalEsperado, 2);
            });

            it("deve calcular, corretamente, quando dados taxa, tempo e montante", () => {
                const input: EntradasCapital['TaxaTempoMontante'] = {
                    taxa: 0.10,
                    tempo: 12,
                    montante: 2200
                };

                const capitalCalculado = JurosSimples.capitalPorTaxaTempoMontante(input);
                const capitalEsperado = 1000;
                expect(capitalCalculado).toBeCloseTo(capitalEsperado, 2);
            });
        
        });

        describe("Ao calcular Montante: ", () => {

            it("deve calcular, corretamente, quando dados capital e juros", () => {
                const input: EntradasMontante['CapitalJuros'] = {
                    capital: 1000,
                    juros: 1200
                };
                
                const montanteCalculado = JurosSimples.montantePorCapitalJuros(input);
                const montanteEsperado = 2200;
                expect(montanteCalculado).toBeCloseTo(montanteEsperado, 2);
            });

            it("deve calcular, corretamente, quando dados capital, taxa e tempo", () => {
                const input: EntradasMontante['CapitalTaxaTempo'] = {
                    capital: 1000,
                    taxa: 0.10,
                    tempo: 12
                };
                
                const montanteCalculado = JurosSimples.montantePorCapitalTaxaTempo(input);
                const montanteEsperado = 2200;
                expect(montanteCalculado).toBeCloseTo(montanteEsperado, 2);
            });

            it("deve calcular, corretamente, quando dados juros, taxa e tempo", () => {
                const input: EntradasMontante['JurosTaxaTempo'] = {
                    juros: 1200,
                    taxa: 0.10,
                    tempo: 12
                };
                
                const montanteCalculado = JurosSimples.montantePorJurosTaxaTempo(input);
                const montanteEsperado = 2200;
                expect(montanteCalculado).toBeCloseTo(montanteEsperado, 2);
            });
        });

        describe("Ao calcular Taxa: ", () => {

            it("deve calcular, corretamente, quando dados capital, juros e tempo", () => {
                const input: EntradasTaxa['CapitalJurosTempo'] = {
                    capital: 1000,
                    juros: 1200,
                    tempo: 12
                };
                
                const taxaCalculada = JurosSimples.taxaPorCapitalJurosTempo(input);
                const taxaEsperada = 0.10;
                expect(taxaCalculada).toBeCloseTo(taxaEsperada, 4);
            });

            it("deve calcular, corretamente, quando dados capital, montante e tempo", () => {
                const input: EntradasTaxa['CapitalMontanteTempo'] = {
                    capital: 1000,
                    montante: 2200,
                    tempo: 12
                };
                
                const taxaCalculada = JurosSimples.taxaPorCapitalMontanteTempo(input);
                const taxaEsperada = 0.10;
                expect(taxaCalculada).toBeCloseTo(taxaEsperada, 4);
            });

            it("deve calcular, corretamente, quando dados juros, montante e tempo", () => {
                const input: EntradasTaxa['JurosMontanteTempo'] = {
                    juros: 1200,
                    montante: 2200,
                    tempo: 12
                };
                
                const taxaCalculada = JurosSimples.taxaPorJurosMontanteTempo(input);
                const taxaEsperada = 0.10;
                expect(taxaCalculada).toBeCloseTo(taxaEsperada, 4);
            });

        });

        describe("Ao calcular Tempo: ", () => {

            it("deve calcular, corretamente, quando dados juros, taxa e montante", () => {
                const input: EntradasTempo['JurosMontanteTaxa'] = {
                    juros: 1200,
                    taxa: 0.10,
                    montante: 2200
                };
                
                const tempoCalculado = JurosSimples.tempoPorJurosMontanteTaxa(input);
                const tempoEperado = 12;
                expect(tempoCalculado).toBeCloseTo(tempoEperado, 2);
            });

            it("deve calcular, corretamente, quando dados montante, capital e taxa", () => {
                const input: EntradasTempo['CapitalMontanteTaxa'] = {
                    capital: 1000,
                    taxa: 0.10,
                    montante: 2200
                };
                
                const tempoCalculado = JurosSimples.tempoPorCapitalMontanteTaxa(input);
                const tempoEperado = 12;
                expect(tempoCalculado).toBeCloseTo(tempoEperado, 2);
            });

            it("deve calcular, corretamente, quando dados montante, juros e taxa", () => {
                const input: EntradasTempo['CapitalJurosTaxa'] = {
                    capital: 1000,
                    juros: 1200,
                    taxa: 0.10
                };
                
                const tempoCalculado = JurosSimples.tempoPorCapitalJurosTaxa(input);
                const tempoEperado = 12;
                expect(tempoCalculado).toBeCloseTo(tempoEperado, 2);
            });

        });

    });

    describe("Validações de valores inválidos (negativos) para Juros Simples - ", () => {

        describe("Ao calcular Juros: ", () => {

            const cenariosInvalidosPorCapitalTaxaTempo = [
                {
                    desc: "capital negativo",
                    input: {capital: -1000, taxa: 0.10, tempo: 12},
                    erro: MENSAGENS_ERRO.CAPITAL_NEGATIVO
                },
                {
                    desc: "taxa negativa",
                    input: {capital: 1000, taxa: -0.10, tempo: 12},
                    erro: MENSAGENS_ERRO.TAXA_NEGATIVA
                },
                {
                    desc: "tempo negativo",
                    input: {capital: 1000, taxa: 0.10, tempo: -12},
                    erro: MENSAGENS_ERRO.TEMPO_NEGATIVO
                },
                {
                    desc: "capital zero",
                    input: {capital: 0, taxa: 0.10, tempo: 12},
                    erro: MENSAGENS_ERRO.CAPITAL_ZERO
                },
                {
                    desc: "taxa zero",
                    input: {capital: 1000, taxa: 0, tempo: 12},
                    erro: MENSAGENS_ERRO.TAXA_ZERO
                },
                {
                    desc: "tempo zero",
                    input: {capital: 1000, taxa: 0.10, tempo: 0},
                    erro: MENSAGENS_ERRO.TEMPO_ZERO
                }
            ];

            const cenariosInvalidosPorCapitalMontante = [
                {
                    desc: "capital negativo",
                    input: {capital: -1000, montante: 2200},
                    erro: MENSAGENS_ERRO.CAPITAL_NEGATIVO
                },
                {
                    desc: "montante negativo",
                    input: {capital: 1000, montante: -2200},
                    erro: MENSAGENS_ERRO.MONTANTE_NEGATIVO
                },
                {
                    desc: "capital zero",
                    input: {capital: 0, montante: 2200},
                    erro: MENSAGENS_ERRO.CAPITAL_ZERO
                },
                {
                    desc: "montante zero",
                    input: {capital: 1000, montante: 0},
                    erro: MENSAGENS_ERRO.MONTANTE_ZERO
                }
            ];

            const cenariosInvalidosPorTaxaTempoMontante = [
                {
                    desc: "taxa negativa",
                    input: {taxa: -0.10, tempo: 12, montante: 2200},
                    erro: MENSAGENS_ERRO.TAXA_NEGATIVA
                },
                {
                    desc: "tempo negativo",
                    input: {taxa: 0.10, tempo: -12, montante: 2200},
                    erro: MENSAGENS_ERRO.TEMPO_NEGATIVO
                },
                {
                    desc: "montante negativo",
                    input: {taxa: 0.10, tempo: 12, montante: -2200},
                    erro: MENSAGENS_ERRO.MONTANTE_NEGATIVO
                },
                {
                    desc: "taxa zero",
                    input: {taxa: 0, tempo: 12, montante: 2200},
                    erro: MENSAGENS_ERRO.TAXA_ZERO
                },
                {
                    desc: "tempo zero",
                    input: {taxa: 0.10, tempo: 0, montante: 2200},
                    erro: MENSAGENS_ERRO.TEMPO_ZERO
                },
                {
                    desc: "montante zero",
                    input: {taxa: 0.10, tempo: 12, montante: 0},
                    erro: MENSAGENS_ERRO.MONTANTE_ZERO
                }
            ];

            it.each(cenariosInvalidosPorCapitalTaxaTempo)('deve lançar um erro quando dados capital, taxa e tempo, sendo $desc', ( {input, erro} ) => {
                expect(() => {
                    JurosSimples.jurosPorCapitalTaxaTempo(input);
                }).toThrow(erro);
            });

            it.each(cenariosInvalidosPorCapitalMontante)('deve lançar um erro quando dados capital e montante, sendo $desc', ( {input, erro} ) => {
                expect(() => {
                    JurosSimples.jurosPorCapitalMontante(input);
                }).toThrow(erro);
            });

            it.each(cenariosInvalidosPorTaxaTempoMontante)('deve lançar um erro quando dados taxa, tempo e montante, sendo $desc', ( {input, erro} ) => {
                expect(() => {
                    JurosSimples.jurosPorTaxaTempoMontante(input);
                }).toThrow(erro);
            });

        });

        describe("Ao calcular Capital: ", () => {
            
            const cenariosInvalidosPorJurosTaxaTempo = [
                {
                    desc: "juros negativo",
                    input: {juros: -1200, taxa: 0.10, tempo: 12},
                    erro: MENSAGENS_ERRO.JUROS_NEGATIVO
                },
                {
                    desc: "taxa negativa",
                    input: {juros: 1200, taxa: -0.10, tempo: 12},
                    erro: MENSAGENS_ERRO.TAXA_NEGATIVA
                },
                {
                    desc: "tempo negativo",
                    input: {juros: 1200, taxa: 0.10, tempo: -12},
                    erro: MENSAGENS_ERRO.TEMPO_NEGATIVO
                },
                {
                    desc: "juros zero",
                    input: {juros: 0, taxa: 0.10, tempo: 12},
                    erro: MENSAGENS_ERRO.JUROS_ZERO
                },
                {
                    desc: "taxa zero",
                    input: {juros: 1200, taxa: 0, tempo: 12},
                    erro: MENSAGENS_ERRO.TAXA_ZERO
                },
                {
                    desc: "tempo zero",
                    input: {juros: 1200, taxa: 0.10, tempo: 0},
                    erro: MENSAGENS_ERRO.TEMPO_ZERO
                }
            ];

            const cenariosInvalidosPorJurosMontante = [
                {
                    desc: "juros negativo",
                    input: {juros: -1200, montante: 2200},
                    erro: MENSAGENS_ERRO.JUROS_NEGATIVO
                },
                {
                    desc: "montante negativo",
                    input: {juros: 1200, montante: -2200},
                    erro: MENSAGENS_ERRO.MONTANTE_NEGATIVO
                },
                {
                    desc: "juros zero",
                    input: {juros: 0, montante: 2200},
                    erro: MENSAGENS_ERRO.JUROS_ZERO
                },
                {
                    desc: "montante zero",
                    input: {juros: 1200, montante: 0},
                    erro: MENSAGENS_ERRO.MONTANTE_ZERO
                }
            ];

            const cenariosInvalidosPorTaxaTempoMontante = [
                {
                    desc: "taxa negativa",
                    input: {taxa: -0.10, tempo: 12, montante: 2200},
                    erro: MENSAGENS_ERRO.TAXA_NEGATIVA
                },
                {
                    desc: "tempo negativo",
                    input: {taxa: 0.10, tempo: -12, montante: 2200},
                    erro: MENSAGENS_ERRO.TEMPO_NEGATIVO
                },
                {
                    desc: "montante negativo",
                    input: {taxa: 0.10, tempo: 12, montante: -2200},
                    erro: MENSAGENS_ERRO.MONTANTE_NEGATIVO
                },
                {
                    desc: "taxa zero",
                    input: {taxa: 0, tempo: 12, montante: 2200},
                    erro: MENSAGENS_ERRO.TAXA_ZERO
                },
                {
                    desc: "tempo zero",
                    input: {taxa: 0.10, tempo: 0, montante: 2200},
                    erro: MENSAGENS_ERRO.TEMPO_ZERO
                },
                {
                    desc: "montante zero",
                    input: {taxa: 0.10, tempo: 12, montante: 0},
                    erro: MENSAGENS_ERRO.MONTANTE_ZERO
                }
            ];

            it.each(cenariosInvalidosPorJurosTaxaTempo)('deve lançar um erro quando dados juros, taxa e tempo, sendo $desc', ( {input, erro} ) => {
                expect(() => {
                    JurosSimples.capitalPorJurosTaxaTempo(input);
                }).toThrow(erro);
            });

            it.each(cenariosInvalidosPorJurosMontante)('deve lançar um erro quando dados juros e montante, sendo $desc', ( {input, erro} ) => {
                expect(() => {
                    JurosSimples.capitalPorJurosMontante(input);
                }).toThrow(erro);
            });

            it.each(cenariosInvalidosPorTaxaTempoMontante)('deve lançar um erro quando dados taxa, tempo e montante, sendo $desc', ( {input, erro} ) => {
                expect(() => {
                    JurosSimples.capitalPorTaxaTempoMontante(input);
                }).toThrow(erro);
            });

        });

        describe("Ao calcular Montante: ", () => {

            const cenariosInvalidosPorCapitalJuros = [
                {
                    desc: "capital negativo",
                    input: {capital: -1000, juros: 1200},
                    erro: MENSAGENS_ERRO.CAPITAL_NEGATIVO
                },
                {
                    desc: "juros negativo",
                    input: {capital: 1000, juros: -1200},
                    erro: MENSAGENS_ERRO.JUROS_NEGATIVO
                },
                {
                    desc: "capital zero",
                    input: {capital: 0, juros: 1200},
                    erro: MENSAGENS_ERRO.CAPITAL_ZERO
                },
                {
                    desc: "juros zero",
                    input: {capital: 1000, juros: 0},
                    erro: MENSAGENS_ERRO.JUROS_ZERO
                }
            ];

            const cenariosInvalidosPorCapitalTaxaTempo = [
                {
                    desc: "capital negativo",
                    input: {capital: -1000, taxa: 0.10, tempo: 12},
                    erro: MENSAGENS_ERRO.CAPITAL_NEGATIVO
                },
                {
                    desc: "taxa negativa",
                    input: {capital: 1000, taxa: -0.10, tempo: 12},
                    erro: MENSAGENS_ERRO.TAXA_NEGATIVA
                },
                {
                    desc: "tempo negativo",
                    input: {capital: 1000, taxa: 0.10, tempo: -12},
                    erro: MENSAGENS_ERRO.TEMPO_NEGATIVO
                },
                {
                    desc: "capital zero",
                    input: {capital: 0, taxa: 0.10, tempo: 12},
                    erro: MENSAGENS_ERRO.CAPITAL_ZERO
                },
                {
                    desc: "taxa zero",
                    input: {capital: 1000, taxa: 0, tempo: 12},
                    erro: MENSAGENS_ERRO.TAXA_ZERO
                },
                {
                    desc: "tempo zero",
                    input: {capital: 1000, taxa: 0.10, tempo: 0},
                    erro: MENSAGENS_ERRO.TEMPO_ZERO
                }
            ];

            const cenariosInvalidosPorJurosTaxaTempo = [
                {
                    desc: "juros negativo",
                    input: {juros: -1200, taxa: 0.10, tempo: 12},
                    erro: MENSAGENS_ERRO.JUROS_NEGATIVO
                },
                {
                    desc: "taxa negativa",
                    input: {juros: 1200, taxa: -0.10, tempo: 12},
                    erro: MENSAGENS_ERRO.TAXA_NEGATIVA
                },
                {
                    desc: "tempo negativo",
                    input: {juros: 1200, taxa: 0.10, tempo: -12},
                    erro: MENSAGENS_ERRO.TEMPO_NEGATIVO
                },
                {
                    desc: "juros zero",
                    input: {juros: 0, taxa: 0.10, tempo: 12},
                    erro: MENSAGENS_ERRO.JUROS_ZERO
                },
                {
                    desc: "taxa zero",
                    input: {juros: 1200, taxa: 0, tempo: 12},
                    erro: MENSAGENS_ERRO.TAXA_ZERO
                },
                {
                    desc: "tempo zero",
                    input: {juros: 1200, taxa: 0.10, tempo: 0},
                    erro: MENSAGENS_ERRO.TEMPO_ZERO
                }
            ];

            it.each(cenariosInvalidosPorCapitalJuros)('deve lançar um erro quando dados capital e juros, sendo $desc', ({ input, erro }) => {
                expect(() => {
                    JurosSimples.montantePorCapitalJuros(input);
                }).toThrow(erro);
            });

            it.each(cenariosInvalidosPorCapitalTaxaTempo)('deve lançar um erro quando dados capital, taxa e tempo, sendo $desc', ({ input, erro }) => {
                expect(() => {
                    JurosSimples.montantePorCapitalTaxaTempo(input);
                }).toThrow(erro);
            });

            it.each(cenariosInvalidosPorJurosTaxaTempo)('deve lançar um erro quando dados juros, taxa e tempo, sendo $desc', ({ input, erro }) => {
                expect(() => {
                    JurosSimples.montantePorJurosTaxaTempo(input);
                }).toThrow(erro);
            });

        });

        describe("Ao calcular Tempo: ", () => {

            const cenariosInvalidosPorJurosMontanteTaxa = [
                {
                    desc: "juros negativo",
                    input: {juros: -1200, taxa: 0.10, montante: 2200},
                    erro: MENSAGENS_ERRO.JUROS_NEGATIVO
                },
                {
                    desc: "taxa negativa",
                    input: {juros: 1200, taxa: -0.10, montante: 2200},
                    erro: MENSAGENS_ERRO.TAXA_NEGATIVA
                },
                {
                    desc: "montante negativo",
                    input: {juros: 1200, taxa: 0.10, montante: -2200},
                    erro: MENSAGENS_ERRO.MONTANTE_NEGATIVO
                },
                {
                    desc: "juros zero",
                    input: {juros: 0, taxa: 0.10, montante: 2200},
                    erro: MENSAGENS_ERRO.JUROS_ZERO
                },
                {
                    desc: "taxa zero",
                    input: {juros: 1200, taxa: 0, montante: 2200},
                    erro: MENSAGENS_ERRO.TAXA_ZERO
                },
                {
                    desc: "montante zero",
                    input: {juros: 1200, taxa: 0.10, montante: 0},
                    erro: MENSAGENS_ERRO.MONTANTE_ZERO
                }
            ];

            const cenariosInvalidosPorCapitalMontanteTaxa = [
                {
                    desc: "capital negativo",
                    input: {capital: -1000, taxa: 0.10, montante: 2200},
                    erro: MENSAGENS_ERRO.CAPITAL_NEGATIVO
                },
                {
                    desc: "taxa negativa",
                    input: {capital: 1000, taxa: -0.10, montante: 2200},
                    erro: MENSAGENS_ERRO.TAXA_NEGATIVA
                },
                {
                    desc: "montante negativo",
                    input: {capital: 1000, taxa: 0.10, montante: -2200},
                    erro: MENSAGENS_ERRO.MONTANTE_NEGATIVO
                },
                {
                    desc: "capital zero",
                    input: {capital: 0, taxa: 0.10, montante: 2200},
                    erro: MENSAGENS_ERRO.CAPITAL_ZERO
                },
                {
                    desc: "taxa zero",
                    input: {capital: 1000, taxa: 0, montante: 2200},
                    erro: MENSAGENS_ERRO.TAXA_ZERO
                },
                {
                    desc: "montante zero",
                    input: {capital: 1000, taxa: 0.10, montante: 0},
                    erro: MENSAGENS_ERRO.MONTANTE_ZERO
                }
            ];

            const cenariosInvalidosPorCapitalJurosTaxa = [
                {
                    desc: "capital negativo",
                    input: {capital: -1000, juros: 1200, taxa: 0.10},
                    erro: MENSAGENS_ERRO.CAPITAL_NEGATIVO
                },
                {
                    desc: "juros negativo",
                    input: {capital: 1000, juros: -1200, taxa: 0.10},
                    erro: MENSAGENS_ERRO.JUROS_NEGATIVO
                },
                {
                    desc: "taxa negativa",
                    input: {capital: 1000, juros: 1200, taxa: -0.10},
                    erro: MENSAGENS_ERRO.TAXA_NEGATIVA
                },
                {
                    desc: "capital zero",
                    input: {capital: 0, juros: 1200, taxa: 0.10},
                    erro: MENSAGENS_ERRO.CAPITAL_ZERO
                },
                {
                    desc: "juros zero",
                    input: {capital: 1000, juros: 0, taxa: 0.10},
                    erro: MENSAGENS_ERRO.JUROS_ZERO
                },
                {
                    desc: "taxa zero",
                    input: {capital: 1000, juros: 1200, taxa: 0},
                    erro: MENSAGENS_ERRO.TAXA_ZERO
                }
            ];

            it.each(cenariosInvalidosPorJurosMontanteTaxa)('deve lançar um erro quando dados juros, montante e taxa, sendo $desc', ({ input, erro }) => {
                expect(() => {
                    JurosSimples.tempoPorJurosMontanteTaxa(input);
                }).toThrow(erro);
            });

            it.each(cenariosInvalidosPorCapitalMontanteTaxa)('deve lançar um erro quando dados capital, montante e taxa, sendo $desc', ({ input, erro }) => {
                expect(() => {
                    JurosSimples.tempoPorCapitalMontanteTaxa(input);
                }).toThrow(erro);
            });

            it.each(cenariosInvalidosPorCapitalJurosTaxa)('deve lançar um erro quando dados capital, juros e taxa, sendo $desc', ({ input, erro }) => {
                expect(() => {
                    JurosSimples.tempoPorCapitalJurosTaxa(input);
                }).toThrow(erro);
            });

        });

        describe("Ao calcular Taxa: ", () => {

            const cenariosInvalidosPorCapitalJurosTempo = [
                {
                    desc: "capital negativo",
                    input: {capital: -1000, juros: 1200, tempo: 12},
                    erro: MENSAGENS_ERRO.CAPITAL_NEGATIVO
                },
                {
                    desc: "juros negativo",
                    input: {capital: 1000, juros: -1200, tempo: 12},
                    erro: MENSAGENS_ERRO.JUROS_NEGATIVO
                },
                {
                    desc: "tempo negativo",
                    input: {capital: 1000, juros: 1200, tempo: -12},
                    erro: MENSAGENS_ERRO.TEMPO_NEGATIVO
                },
                {
                    desc: "capital zero",
                    input: {capital: 0, juros: 1200, tempo: 12},
                    erro: MENSAGENS_ERRO.CAPITAL_ZERO
                },
                {
                    desc: "juros zero",
                    input: {capital: 1000, juros: 0, tempo: 12},
                    erro: MENSAGENS_ERRO.JUROS_ZERO
                },
                {
                    desc: "tempo zero",
                    input: {capital: 1000, juros: 1200, tempo: 0},
                    erro: MENSAGENS_ERRO.TEMPO_ZERO
                }
            ];

            const cenariosInvalidosPorCapitalMontanteTempo = [
                {
                    desc: "capital negativo",
                    input: {capital: -1000, montante: 2200, tempo: 12},
                    erro: MENSAGENS_ERRO.CAPITAL_NEGATIVO
                },
                {
                    desc: "montante negativo",
                    input: {capital: 1000, montante: -2200, tempo: 12},
                    erro: MENSAGENS_ERRO.MONTANTE_NEGATIVO
                },
                {
                    desc: "tempo negativo",
                    input: {capital: 1000, montante: 2200, tempo: -12},
                    erro: MENSAGENS_ERRO.TEMPO_NEGATIVO
                },
                {
                    desc: "capital zero",
                    input: {capital: 0, montante: 2200, tempo: 12},
                    erro: MENSAGENS_ERRO.CAPITAL_ZERO
                },
                {
                    desc: "montante zero",
                    input: {capital: 1000, montante: 0, tempo: 12},
                    erro: MENSAGENS_ERRO.MONTANTE_ZERO
                },
                {
                    desc: "tempo zero",
                    input: {capital: 1000, montante: 2200, tempo: 0},
                    erro: MENSAGENS_ERRO.TEMPO_ZERO
                }
            ];

            const cenariosInvalidosPorJurosMontanteTempo = [
                {
                    desc: "juros negativo",
                    input: {juros: -1200, montante: 2200, tempo: 12},
                    erro: MENSAGENS_ERRO.JUROS_NEGATIVO
                },
                {
                    desc: "montante negativo",
                    input: {juros: 1200, montante: -2200, tempo: 12},
                    erro: MENSAGENS_ERRO.MONTANTE_NEGATIVO
                },
                {
                    desc: "tempo negativo",
                    input: {juros: 1200, montante: 2200, tempo: -12},
                    erro: MENSAGENS_ERRO.TEMPO_NEGATIVO
                },
                {
                    desc: "juros zero",
                    input: {juros: 0, montante: 2200, tempo: 12},
                    erro: MENSAGENS_ERRO.JUROS_ZERO
                },
                {
                    desc: "montante zero",
                    input: {juros: 1200, montante: 0, tempo: 12},
                    erro: MENSAGENS_ERRO.MONTANTE_ZERO
                },
                {
                    desc: "tempo zero",
                    input: {juros: 1200, montante: 2200, tempo: 0},
                    erro: MENSAGENS_ERRO.TEMPO_ZERO
                }
            ];

            it.each(cenariosInvalidosPorCapitalJurosTempo)('deve lançar um erro quando dados capital, juros e tempo, sendo $desc', ({ input, erro }) => {
                expect(() => {
                    JurosSimples.taxaPorCapitalJurosTempo(input);
                }).toThrow(erro);
            });

            it.each(cenariosInvalidosPorCapitalMontanteTempo)('deve lançar um erro quando dados capital, montante e tempo, sendo $desc', ({ input, erro }) => {
                expect(() => {
                    JurosSimples.taxaPorCapitalMontanteTempo(input);
                }).toThrow(erro);
            });

            it.each(cenariosInvalidosPorJurosMontanteTempo)('deve lançar um erro quando dados juros, montante e tempo, sendo $desc', ({ input, erro }) => {
                expect(() => {
                    JurosSimples.taxaPorJurosMontanteTempo(input);
                }).toThrow(erro);
            });

        });

    });

    describe("Validações de campos obrigatórios para Juros Simples (Undefined/Null) - ", () => {

        describe("Ao calcular Juros:", () => {

            const cenariosFaltandoValoresPorCapitalTaxaTempo = [
            {
                desc: "faltar o capital",
                input: { taxa: 0.10, tempo: 12 } as any, 
                metodo: (i: any) => JurosSimples.jurosPorCapitalTaxaTempo(i),
                erro: MENSAGENS_ERRO.CAPITAL_NECESSARIO
            },
            {
                desc: "faltar a taxa",
                input: { capital: 1000, tempo: 12 } as any,
                metodo: (i: any) => JurosSimples.jurosPorCapitalTaxaTempo(i),
                erro: MENSAGENS_ERRO.TAXA_NECESSARIO
            },
            {
                desc: "faltar o tempo",
                input: { capital: 1000, taxa: 0.10 } as any,
                metodo: (i: any) => JurosSimples.jurosPorCapitalTaxaTempo(i),
                erro: MENSAGENS_ERRO.TEMPO_NECESSARIO
            }
            ];

            const cenariosFaltandoValoresPorCapitalMontante = [
                {
                    desc: "faltar capital",
                    input: { montante: 2200 } as any,
                    metodo: (i: any) => JurosSimples.jurosPorCapitalMontante(i),
                    erro: MENSAGENS_ERRO.CAPITAL_NECESSARIO
                },
                {
                    desc: "faltar montantel",
                    input: { capital: 1000} as any,
                    metodo: (i: any) => JurosSimples.jurosPorCapitalMontante(i),
                    erro: MENSAGENS_ERRO.MONTANTE_NECESSARIO
                }
            ];

            const cenariosFaltandoValoresPorTaxaTempoMontante = [
                {
                    desc: "faltar taxa",
                    input: { tempo: 12, montante: 2200} as any,
                    metodo: (i: any) => JurosSimples.jurosPorTaxaTempoMontante(i),
                    erro: MENSAGENS_ERRO.TAXA_NECESSARIO
                },
                {
                    desc: "faltar tempo",
                    input: { taxa: 0.10, montante: 2200} as any,
                    metodo: (i: any) => JurosSimples.jurosPorTaxaTempoMontante(i),
                    erro: MENSAGENS_ERRO.TEMPO_NECESSARIO
                },
                {
                    desc: "faltar montante",
                    input: { taxa: 0.10, tempo: 12} as any,
                    metodo: (i: any) => JurosSimples.jurosPorTaxaTempoMontante(i),
                    erro: MENSAGENS_ERRO.MONTANTE_NECESSARIO
                }
            ];

            it.each(cenariosFaltandoValoresPorCapitalTaxaTempo)('por Capital, Taxa e Tempo, deve lançar erro de valor indefinido ou nulo quando $desc', ({ input, metodo, erro }) => {
                expect(() => {
                    metodo(input);
                }).toThrow(erro);
            });

            it.each(cenariosFaltandoValoresPorCapitalMontante)('por Capital e Montante, deve lançar erro de valor indefinido ou nulo quando $desc', ({ input, metodo, erro }) => {
                expect(() => {
                    metodo(input);
                }).toThrow(erro);
            });

            it.each(cenariosFaltandoValoresPorTaxaTempoMontante)('por Taxa, Tempo e Montante, deve lançar erro de valor indefinido ou nulo quando $desc', ({ input, metodo, erro }) => {
                expect(() => {
                    metodo(input);
                }).toThrow(erro);
            });

        });

        describe("Ao calcular Capital:", () => {

            const cenariosFaltandoValoresPorJurosTaxaTempo = [
                {
                    desc: "faltar juros",
                    input: { taxa: 0.10, tempo: 12 } as any,
                    metodo: (i: any) => JurosSimples.capitalPorJurosTaxaTempo(i),
                    erro: MENSAGENS_ERRO.JUROS_NECESSARIOS
                },
                {
                    desc: "faltar taxa",
                    input: { juros: 1200, tempo: 12 } as any,
                    metodo: (i: any) => JurosSimples.capitalPorJurosTaxaTempo(i),
                    erro: MENSAGENS_ERRO.TAXA_NECESSARIO
                },
                {
                    desc: "faltar tempo",
                    input: { juros: 1200, taxa: 0.10 } as any,
                    metodo: (i: any) => JurosSimples.capitalPorJurosTaxaTempo(i),
                    erro: MENSAGENS_ERRO.TEMPO_NECESSARIO
                }
            ];

            const cenariosFaltandoValoresPorJurosMontante = [
                {
                    desc: "faltar juros",
                    input: { montante: 2200 } as any,
                    metodo: (i: any) => JurosSimples.capitalPorJurosMontante(i),
                    erro: MENSAGENS_ERRO.JUROS_NECESSARIOS
                },
                {
                    desc: "faltar montante",
                    input: { juros: 1200 } as any,
                    metodo: (i: any) => JurosSimples.capitalPorJurosMontante(i),
                    erro: MENSAGENS_ERRO.MONTANTE_NECESSARIO
                }
            ];

            const cenariosFaltandoValoresPorTaxaTempoMontante = [
                {
                    desc: "faltar taxa",
                    input: { tempo: 12, montante: 2200} as any,
                    metodo: (i: any) => JurosSimples.capitalPorTaxaTempoMontante(i),
                    erro: MENSAGENS_ERRO.TAXA_NECESSARIO
                },
                {
                    desc: "faltar tempo",
                    input: { taxa: 0.10, montante: 2200} as any,
                    metodo: (i: any) => JurosSimples.capitalPorTaxaTempoMontante(i),
                    erro: MENSAGENS_ERRO.TEMPO_NECESSARIO
                },
                {
                    desc: "faltar montante",
                    input: { taxa: 0.10, tempo: 12} as any,
                    metodo: (i: any) => JurosSimples.capitalPorTaxaTempoMontante(i),
                    erro: MENSAGENS_ERRO.MONTANTE_NECESSARIO
                }
            ];

            it.each(cenariosFaltandoValoresPorJurosTaxaTempo)('por Juros, Taxa e Tempo, deve lançar erro de valor indefinido ou nulo quando $desc', ({ input, metodo, erro }) => {
                expect(() => {
                    metodo(input);
                }).toThrow(erro);
            });

            it.each(cenariosFaltandoValoresPorJurosMontante)('por Juros e Montante, deve lançar erro de valor indefinido ou nulo quando $desc', ({ input, metodo, erro }) => {
                expect(() => {
                    metodo(input);
                }).toThrow(erro);
            });

            it.each(cenariosFaltandoValoresPorTaxaTempoMontante)('por Taxa, Tempo e Montante, deve lançar erro de valor indefinido ou nulo quando $desc', ({ input, metodo, erro }) => {
                expect(() => {
                    metodo(input);
                }).toThrow(erro);
            });

        });

        describe("Ao calcular Montante:", () => {

            const cenariosFaltandoValoresPorCapitalJuros = [
                {
                    desc: "faltar capital",
                    input: { juros: 1200 } as any,
                    metodo: (i: any) => JurosSimples.montantePorCapitalJuros(i),
                    erro: MENSAGENS_ERRO.CAPITAL_NECESSARIO
                },
                {
                    desc: "faltar juros",
                    input: { capital: 2200 } as any,
                    metodo: (i: any) => JurosSimples.montantePorCapitalJuros(i),
                    erro: MENSAGENS_ERRO.JUROS_NECESSARIOS
                }
            ];

            const cenariosFaltandoValoresPorCapitalTaxaTempo = [
                {
                    desc: "faltar capital",
                    input: { taxa: 0.10, tempo: 12 } as any,
                    metodo: (i: any) => JurosSimples.montantePorCapitalTaxaTempo(i),
                    erro: MENSAGENS_ERRO.CAPITAL_NECESSARIO
                },
                {
                    desc: "faltar taxa",
                    input: { capital: 2200, tempo: 12 } as any,
                    metodo: (i: any) => JurosSimples.montantePorCapitalTaxaTempo(i),
                    erro: MENSAGENS_ERRO.TAXA_NECESSARIO
                },
                {
                    desc: "faltar tempo",
                    input: { capital: 2200, taxa: 0.10 } as any,
                    metodo: (i: any) => JurosSimples.montantePorCapitalTaxaTempo(i),
                    erro: MENSAGENS_ERRO.TEMPO_NECESSARIO
                }
            ];

            const cenariosFaltandoValoresPorJurosTaxaTempo = [
                {
                    desc: "faltar juros",
                    input: {taxa: 0.10, tempo: 12 },
                    metodo: (i: any) => JurosSimples.montantePorJurosTaxaTempo(i),
                    erro: MENSAGENS_ERRO.JUROS_NECESSARIOS
                },
                {
                    desc: "faltar taxa",
                    input: { juros: 1200, tempo: 12 } as any,
                    metodo: (i: any) => JurosSimples.montantePorJurosTaxaTempo(i),
                    erro: MENSAGENS_ERRO.TAXA_NECESSARIO
                },
                {
                    desc: "faltar tempo",
                    input: { juros: 1200, taxa: 0.10 } as any,
                    metodo: (i: any) => JurosSimples.montantePorJurosTaxaTempo(i),
                    erro: MENSAGENS_ERRO.TEMPO_NECESSARIO
                }
            ];

            it.each(cenariosFaltandoValoresPorCapitalJuros)('por Capital e Juros, deve lançar erro de valor indefinido ou nulo quando $desc', ({ input, metodo, erro }) => {
                expect(() => {
                    metodo(input);
                }).toThrow(erro);
            });

            it.each(cenariosFaltandoValoresPorCapitalTaxaTempo)('por Capital, Taxa e Tempo, deve lançar erro de valor indefinido ou nulo quando $desc', ({ input, metodo, erro }) => {
                expect(() => {
                    metodo(input);
                }).toThrow(erro);
            });

            it.each(cenariosFaltandoValoresPorJurosTaxaTempo)('por Juros, Taxa e Tempo, deve lançar erro de valor indefinido ou nulo quando $desc', ({ input, metodo, erro }) => {
                expect(() => {
                    metodo(input);
                }).toThrow(erro);
            });

        });

        describe("Ao calcular Tempo:", () => {

            const cenariosFaltandoValoresPorJurosMontanteTaxa = [
                {
                    desc: "faltar juros",
                    input: { montante: 2200, taxa: 0.10 } as any,
                    metodo: (i: any) => JurosSimples.tempoPorJurosMontanteTaxa(i),
                    erro: MENSAGENS_ERRO.JUROS_NECESSARIOS
                },
                {
                    desc: "faltar montante",
                    input: { juros: 1200, taxa: 0.10 } as any,
                    metodo: (i: any) => JurosSimples.tempoPorJurosMontanteTaxa(i),
                    erro: MENSAGENS_ERRO.MONTANTE_NECESSARIO
                },
                {
                    desc: "faltar taxa",
                    input: { juros: 1200, montante: 2200 } as any,
                    metodo: (i: any) => JurosSimples.tempoPorJurosMontanteTaxa(i),
                    erro: MENSAGENS_ERRO.TAXA_NECESSARIO
                }
            ];

            const cenariosFaltandoValoresPorCapitalMontanteTaxa = [
                {
                    desc: "faltar capital",
                    input: { montante: 2200, taxa: 0.10 } as any,
                    metodo: (i: any) => JurosSimples.tempoPorCapitalMontanteTaxa(i),
                    erro: MENSAGENS_ERRO.CAPITAL_NECESSARIO
                },
                {
                    desc: "faltar montante",
                    input: { capital: 2200, taxa: 0.10 } as any,
                    metodo: (i: any) => JurosSimples.tempoPorCapitalMontanteTaxa(i),
                    erro: MENSAGENS_ERRO.MONTANTE_NECESSARIO
                },
                {
                    desc: "faltar taxa",
                    input: { capital: 2200, montante: 2200 } as any,
                    metodo: (i: any) => JurosSimples.tempoPorCapitalMontanteTaxa(i),
                    erro: MENSAGENS_ERRO.TAXA_NECESSARIO
                }
            ];

            const cenariosFaltandoValoresPorCapitalJurosTaxa = [
                {
                    desc: "faltar capital",
                    input: { juros: 1200, taxa: 0.10 } as any,
                    metodo: (i: any) => JurosSimples.tempoPorCapitalJurosTaxa(i),
                    erro: MENSAGENS_ERRO.CAPITAL_NECESSARIO
                },
                {
                    desc: "faltar juros",
                    input: { capital: 2200, taxa: 0.10 } as any,
                    metodo: (i: any) => JurosSimples.tempoPorCapitalJurosTaxa(i),
                    erro: MENSAGENS_ERRO.JUROS_NECESSARIOS
                },
                {
                    desc: "faltar taxa",
                    input: { capital: 2200, juros: 1200 } as any,
                    metodo: (i: any) => JurosSimples.tempoPorCapitalJurosTaxa(i),
                    erro: MENSAGENS_ERRO.TAXA_NECESSARIO
                }
            ];

            it.each(cenariosFaltandoValoresPorJurosMontanteTaxa)('por Juros, Montante e Taxa, deve lançar erro de valor indefinido ou nulo quando $desc', ({ input, metodo, erro }) => {
                expect(() => {
                    metodo(input);
                }).toThrow(erro);
            });

            it.each(cenariosFaltandoValoresPorCapitalMontanteTaxa)('por Capital, Montante e Taxa, deve lançar erro de valor indefinido ou nulo quando $desc', ({ input, metodo, erro }) => {
                expect(() => {
                    metodo(input);
                }).toThrow(erro);
            });

            it.each(cenariosFaltandoValoresPorCapitalJurosTaxa)('por Capital, Juros e Taxa, deve lançar erro de valor indefinido ou nulo quando $desc', ({ input, metodo, erro }) => {
                expect(() => {
                    metodo(input);
                }).toThrow(erro);
            });

        });

        describe("Ao calcular Taxa:", () => {

            const cenariosFaltandoValoresPorJurosMontanteTaxa = [
                {
                    desc: "faltar juros",
                    input: { montante: 2200, tempo: 12 } as any,
                    metodo: (i: any) => JurosSimples.taxaPorJurosMontanteTempo(i),
                    erro: MENSAGENS_ERRO.JUROS_NECESSARIOS
                },
                {
                    desc: "faltar montante",
                    input: { juros: 1200, tempo: 12 } as any,
                    metodo: (i: any) => JurosSimples.taxaPorJurosMontanteTempo(i),
                    erro: MENSAGENS_ERRO.MONTANTE_NECESSARIO
                },
                {
                    desc: "faltar tempo",
                    input: { juros: 1200, montante: 2200 } as any,
                    metodo: (i: any) => JurosSimples.taxaPorJurosMontanteTempo(i),
                    erro: MENSAGENS_ERRO.TEMPO_NECESSARIO
                }
            ];

            const cenariosFaltandoValoresPorCapitalMontanteTempo = [
                {
                    desc: "faltar capital",
                    input: { montante: 2200, tempo: 12 } as any,
                    metodo: (i: any) => JurosSimples.taxaPorCapitalMontanteTempo(i),
                    erro: MENSAGENS_ERRO.CAPITAL_NECESSARIO
                },
                {
                    desc: "faltar montante",
                    input: { capital: 2200, tempo: 12 } as any,
                    metodo: (i: any) => JurosSimples.taxaPorCapitalMontanteTempo(i),
                    erro: MENSAGENS_ERRO.MONTANTE_NECESSARIO
                },
                {
                    desc: "faltar tempo",
                    input: { capital: 2200, montante: 2200 } as any,
                    metodo: (i: any) => JurosSimples.taxaPorCapitalMontanteTempo(i),
                    erro: MENSAGENS_ERRO.TEMPO_NECESSARIO
                }
            ];

            const cenariosFaltandoValoresPorJurosMontanteTempo = [
                {
                    desc: "faltar juros",
                    input: { montante: 2200, tempo: 12 } as any,
                    metodo: (i: any) => JurosSimples.taxaPorJurosMontanteTempo(i),
                    erro: MENSAGENS_ERRO.JUROS_NECESSARIOS
                },
                {
                    desc: "faltar montante",
                    input: { juros: 1200, tempo: 12 } as any,
                    metodo: (i: any) => JurosSimples.taxaPorJurosMontanteTempo(i),
                    erro: MENSAGENS_ERRO.MONTANTE_NECESSARIO
                },
                {
                    desc: "faltar tempo",
                    input: { juros: 1200, montante: 2200 } as any,
                    metodo: (i: any) => JurosSimples.taxaPorJurosMontanteTempo(i),
                    erro: MENSAGENS_ERRO.TEMPO_NECESSARIO
                }
            ];

            it.each(cenariosFaltandoValoresPorJurosMontanteTaxa)('por Juros, Montante e Taxa, deve lançar erro de valor indefinido ou nulo quando $desc', ({ input, metodo, erro }) => {
                expect(() => {
                    metodo(input);
                }).toThrow(erro);
            });

            it.each(cenariosFaltandoValoresPorCapitalMontanteTempo)('por Capital, Montante e Tempo, deve lançar erro de valor indefinido ou nulo quando $desc', ({ input, metodo, erro }) => {
                expect(() => {
                    metodo(input);
                }).toThrow(erro);
            });

            it.each(cenariosFaltandoValoresPorJurosMontanteTempo)('por Juros, Montante e Tempo, deve lançar erro de valor indefinido ou nulo quando $desc', ({ input, metodo, erro }) => {
                expect(() => {
                    metodo(input);
                }).toThrow(erro);
            });

        });

    });

});