import {EntradasJuros, EntradasMontante, EntradasCapital, EntradasTempo, EntradasTaxa, } from "./Util/InterfacesCalculadoraJuros";
import { ValidadoresJuros } from "./ValidadoresJuros";

export class JurosSimples {

    public static jurosPorCapitalTaxaTempo(inputs: EntradasJuros['CapitalTaxaTempo']): number {
        ValidadoresJuros.validarCapital(inputs.capital);
        ValidadoresJuros.validarTaxa(inputs.taxa);
        ValidadoresJuros.validarTempo(inputs.tempo);

        return inputs.capital * inputs.taxa * inputs.tempo;
    }

    public static jurosPorCapitalMontante(inputs: EntradasJuros['CapitalMontante']): number {
        ValidadoresJuros.validarCapital(inputs.capital);
        ValidadoresJuros.validarMontante(inputs.montante);
        
        return inputs.montante - inputs.capital;
    }

    public static jurosPorTaxaTempoMontante(inputs: EntradasJuros['TaxaTempoMontante']): number {
        ValidadoresJuros.validarTaxa(inputs.taxa);
        ValidadoresJuros.validarTempo(inputs.tempo);
        ValidadoresJuros.validarMontante(inputs.montante);

        return inputs.montante / ( 1 + 1 / ( inputs.taxa * inputs.tempo ) );
    }

    public static capitalPorJurosTaxaTempo(inputs: EntradasCapital['JurosTaxaTempo']): number {
        ValidadoresJuros.validarJuros(inputs.juros);
        ValidadoresJuros.validarTaxa(inputs.taxa);
        ValidadoresJuros.validarTempo(inputs.tempo);

        return inputs.juros / ( inputs.taxa * inputs.tempo );
    }

    public static capitalPorJurosMontante(inputs: EntradasCapital['JurosMontante']): number {
        ValidadoresJuros.validarJuros(inputs.juros);
        ValidadoresJuros.validarMontante(inputs.montante);

        return inputs.montante - inputs.juros;
    }

    public static capitalPorTaxaTempoMontante(inputs: EntradasCapital['TaxaTempoMontante']): number {
        ValidadoresJuros.validarTaxa(inputs.taxa);
        ValidadoresJuros.validarTempo(inputs.tempo);
        ValidadoresJuros.validarMontante(inputs.montante);

        return inputs.montante / ( 1 + inputs.taxa * inputs.tempo );
    }

    public static montantePorCapitalTaxaTempo(inputs: EntradasMontante['CapitalTaxaTempo']): number {
        ValidadoresJuros.validarCapital(inputs.capital);
        ValidadoresJuros.validarTaxa(inputs.taxa);
        ValidadoresJuros.validarTempo(inputs.tempo);

        return inputs.capital * ( 1 + inputs.taxa * inputs.tempo );
    }

    public static montantePorCapitalJuros(inputs: EntradasMontante['CapitalJuros']): number {
        ValidadoresJuros.validarCapital(inputs.capital);
        ValidadoresJuros.validarJuros(inputs.juros);

        return inputs.capital + inputs.juros;
    }

    public static montantePorJurosTaxaTempo(inputs: EntradasMontante['JurosTaxaTempo']): number {
        ValidadoresJuros.validarJuros(inputs.juros);
        ValidadoresJuros.validarTaxa(inputs.taxa);
        ValidadoresJuros.validarTempo(inputs.tempo);

        return inputs.juros * ( 1 + 1 / ( inputs.taxa * inputs.tempo ) );
    }

    public static taxaPorCapitalJurosTempo(inputs: EntradasTaxa['CapitalJurosTempo']): number {
        ValidadoresJuros.validarCapital(inputs.capital);
        ValidadoresJuros.validarJuros(inputs.juros);
        ValidadoresJuros.validarTempo(inputs.tempo);

        return inputs.juros / ( inputs.capital * inputs.tempo );
    }

    public static taxaPorCapitalMontanteTempo(inputs: EntradasTaxa['CapitalMontanteTempo']): number {
        ValidadoresJuros.validarCapital(inputs.capital);
        ValidadoresJuros.validarMontante(inputs.montante);
        ValidadoresJuros.validarTempo(inputs.tempo);
        
        return ( inputs.montante / inputs.capital - 1 ) / inputs.tempo;
    }

    public static taxaPorJurosMontanteTempo(inputs: EntradasTaxa['JurosMontanteTempo']): number {
        ValidadoresJuros.validarJuros(inputs.juros);
        ValidadoresJuros.validarMontante(inputs.montante);
        ValidadoresJuros.validarTempo(inputs.tempo);

        return 1 / ( ( inputs.montante / inputs.juros - 1 ) * inputs.tempo );
    }

    public static tempoPorCapitalJurosTaxa(inputs: EntradasTempo['CapitalJurosTaxa']): number {
        ValidadoresJuros.validarCapital(inputs.capital);
        ValidadoresJuros.validarJuros(inputs.juros);
        ValidadoresJuros.validarTaxa(inputs.taxa);

        return inputs.juros / ( inputs.capital * inputs.taxa );
    }

    public static tempoPorCapitalMontanteTaxa(inputs: EntradasTempo['CapitalMontanteTaxa']): number {
        ValidadoresJuros.validarCapital(inputs.capital);
        ValidadoresJuros.validarMontante(inputs.montante);
        ValidadoresJuros.validarTaxa(inputs.taxa);

        return ( inputs.montante / inputs.capital - 1 ) / inputs.taxa;
    }
    
    public static tempoPorJurosMontanteTaxa(inputs: EntradasTempo['JurosMontanteTaxa']): number {
        ValidadoresJuros.validarJuros(inputs.juros);
        ValidadoresJuros.validarMontante(inputs.montante);
        ValidadoresJuros.validarTaxa(inputs.taxa);

        return 1 / ( ( inputs.montante / inputs.juros - 1 ) * inputs.taxa );
    }

}