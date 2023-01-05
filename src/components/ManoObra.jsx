import {useState, useContext} from 'react'
import {CotizadorContext} from '../contexts/CotizadorApp'
import Swal from 'sweetalert2'

function ManoObraComponent() {

  const {agregarManoObra, ManoObra} = useContext(CotizadorContext)

  const [descripcionManoObra, setDescripcionManoObra] = useState("")
  const [precioManoObra, setPrecioManoObra] = useState("")
  
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
    if (descripcionManoObra!="" && precioManoObra != 0) {
      agregarManoObra({
        descripcionManoObra,
        precioManoObra
      })
      setDescripcionManoObra("")
      setPrecioManoObra("")

      Toast.fire({
        icon: 'success',
        title: `Mano de Obra Agregada!`
      })
    }
  }

  if (ManoObra.length != 0){
    return(
      <button 
      type="button" 
      className="btn btn-warning fw-bold mx-3" 
      >
        Mano de Obra
      </button>)
    
  }

  return (
    <> 
      <button 
        type="button" 
        className="btn btn-warning fw-bold mx-3" 
        data-bs-toggle="modal" 
        data-bs-target="#exampleModal"
        >
        Mano de Obra
      </button>
      
      <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
              </button>
            </div>
            <div className="modal-body">
                <form className="form" onSubmit={handleClick}>
                    <textarea
                        placeholder='Descripcion'
                        type="textarea"
                        value={descripcionManoObra}
                        id="input1" 
                        className="form-control"
                        onChange={(e)=>{setDescripcionManoObra(e.target.value)}}
                        required
                        /> 
                        <br />
                    <div className="row g-2 justify-content-center align-items-center">
                          <div className="col-sm-7">
                            <span className='fw-bold fs-5' style={{color:"white"}}>Costo de Mano de Obra: </span>
                          </div>
                          <div className="col-sm">
                            <input 
                              placeholder='Costo'
                              type="number"
                              value={precioManoObra} 
                              id="input2" 
                              className="form-control"
                              onChange={(e)=>{setPrecioManoObra(e.target.value)}}
                              required
                            />
                          </div>
                    </div>

                    <div className="text-center">
                      <button 
                        type="submit"
                        className="btn btn-warning fw-bold mt-4"
                        data-bs-dismiss= {(descripcionManoObra != "" && precioManoObra != "") ? "modal":""}
                        >Agregar Costos
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

export default ManoObraComponent