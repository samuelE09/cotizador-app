import {useState, useContext} from 'react'
import {CotizadorContext} from '../contexts/CotizadorApp'
import Swal from 'sweetalert2'

function Impuestos() {

    const {agregarImpuesto, impuestos} = useContext(CotizadorContext)

    const [tipoImpuesto, setTipoImpuesto] = useState("")
    const [valorImpuesto, setValorImpuesto] = useState("")

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
    const handleClick = (e)=>{
        e.preventDefault()
        if (tipoImpuesto !="" && valorImpuesto != 0) {
          agregarImpuesto({
            tipoImpuesto,
            valorImpuesto
          })
          setTipoImpuesto("")
          setValorImpuesto("")
    
          Toast.fire({
            icon: 'success',
            title: `Impuesto Agregado`
          })
        }
    }

    if (impuestos.length != 0){
        return(
          <button 
          type="button" 
          className="btn btn-warning fw-bold mx-3" 
          >
            IGV / IVA
          </button>)
      }
    return (
        <> 
        <button 
            type="button" 
            className="btn btn-warning fw-bold mx-3" 
            data-bs-toggle="modal" 
            data-bs-target="#exampleModal3"
            >
            IGV/IVA
        </button>
        
        <div className="modal fade" id="exampleModal3"  aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                </button>
                </div>
                <div className="modal-body">
                    <form className="form" onSubmit={handleClick}>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                        <select 
                            className="form-select text-muted mb-3" 
                            aria-label="Default select example"
                            onChange={(e)=>{setTipoImpuesto(e.target.value)}}
                            value={tipoImpuesto}
                            required
                            >
                            <option value="">Tipo de Impuesto</option>
                            <option value="IGV">IGV</option>
                            <option value="IVA">IVA</option> 
                        </select>
                        <input 
                                placeholder='Valor'
                                type="number"
                                className="form-control mb-3"
                                onChange={(e)=>{setValorImpuesto(e.target.value)}}
                                value={valorImpuesto}
                                required
                        />
                      </div>
                        
                        <div className="text-center">
                        <button 
                            type="submit"
                            className="btn btn-warning fw-bold mt-4"
                            data-bs-dismiss= {(tipoImpuesto != "" && valorImpuesto != "") ? "modal":""}
                            >Agregar Impuesto
                        </button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </div>
        </>
    )
}

export default Impuestos