
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
