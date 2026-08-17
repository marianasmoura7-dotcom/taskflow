import { useState } from "react";

function Contador () {
    const [contador , setcontador] = useState(0)
    return (
        <div> 
            <p> Valor: {contador}</p>
            <button onClick={() => setcontador (contador + 1)}>
                Incrementar
            </button>

        </div>
    );
}
export default Contador 