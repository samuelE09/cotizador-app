import {useContext} from 'react'
import {CotizadorContext} from '../contexts/CotizadorApp'

function Monedas() {

    const {setMoneda} = useContext(CotizadorContext);

    const enviarMoneda = (e) => {
        setMoneda(e.target.value);
  }
  return (
    <>
        <select 
            className="form-select text-muted" 
            aria-label="Default select example"
            onChange={enviarMoneda}>
            <option defaultValue="-">Tipo de Moneda</option>
            <option value="S/.">Sol Peruano</option>
            <option value="$">Peso</option>
            <option value="US$">Dólar estadounidense</option>
            <option value="€">Euro</option>
        </select>
    </>
  )
}


export default Monedas