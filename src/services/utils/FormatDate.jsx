export function formatTimestampToInputDate(timestamp){

    const collator = new Intl.DateTimeFormat("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }); /* Seteo en en-CA para el formato yyyy-mm-dd necesario para lo que requiere recibir el react form */

    return collator.format(timestamp)
}

export function formatTimestampToUserDate(timestamp){
    const collator = new Intl.DateTimeFormat("es-AR", {
        year:"numeric",
        month: "2-digit",
        day: "2-digit"
    })

    return collator.format(timestamp)
}