import './Modal.css'

export default function Modal({title, handleClose, isOpen, children}){


    if(!isOpen) return; /* Si no esta abierto devuelvo null por lo que no pinta el return de abajo*/

    return(
        <div className="modal-overlay" onClick={handleClose}> {/* Tambien aqui puedo poner para que cierre clickeando fuera del modal */}
            <div className="modal-content" onClick={(e) => e.stopPropagation()}> {/* Evito propagación para que no aplique el handleStop de overlay */}
                <div className="modal-header">
                    {title}
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    )
}