export default function removeDecimals(value){
    if(isNaN(value)){
        return; /* Que no siga ya que no es un numero que se pueda parsear */
    }

    return Math.round(value * 100) / 100 /* corro la coma dos lugares y luego divido por 100 para dejarle 2 decimales. */

    // return +value.toFixed(2) Alternativa tofixed que devuelve cadena pero con el mas la paso a num.
}