import {useContext, useState} from 'react'
import {CotizadorContext} from '../contexts/CotizadorApp'
import Monedas from './Monedas'
import "./style.css"

import Swal from 'sweetalert2'

function ProductForm() {

    const {crearProducto, moneda} = useContext(CotizadorContext)

    const [descripcion_product, setDescripcion_product] = useState("")
    const [cantidad_product, setCantidad_product] = useState("")
    const [medida, setMedida] = useState("-")
    const [precioUND, setPrecioUND] = useState("")
   

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

    const addProduct = (e)=>{
        e.preventDefault()
        crearProducto({
            descripcion_product,
            cantidad_product,
            medida,
            precioUND,
            precio_total: parseFloat(cantidad_product)* parseFloat(precioUND),
        })
        Toast.fire({
            icon: 'success',
            title: `Producto Agregado!`
        })
        setDescripcion_product("")
        setCantidad_product("")
        setMedida("-")
        setPrecioUND("")
    }

  return (
    <>
  
        <div className="card p-5 text-center mb-3 container">
            <form onSubmit={addProduct}> 
                <div className="mb-3">
                    <textarea
                        className='form-control mb-3'
                        type="text" 
                        name="descripcion_producto"
                        placeholder='Descripcion del Producto'
                        onChange={(e)=>{setDescripcion_product(e.target.value)}}
                        autoFocus
                        value={descripcion_product}
                        required/>

                    <div className="row row-cols-1 row-cols-md-4 g-4 mb-3">
                        <div className="col">
                            <input
                                className='form-control'
                                type="number" 
                                name="cantidad_productos" 
                                placeholder='Cantidad'
                                onChange={(e)=>{setCantidad_product(e.target.value)}}
                                value={cantidad_product}
                                required/>
                        </div>
                        <div className="col">
                                <select 
                                    className="form-select"
                                    value={medida}
                                    aria-label="Default select example"
                                    onChange={(e)=>{setMedida(e.target.value)}}>
                                    <option value="-">-</option>
                                    <option value="MTRS">MRTS</option>
                                    <option value="UND">UND</option>
                                </select>
                        </div>
                        <div className="col">
                            <input
                                className='form-control'
                                type="number" 
                                name="precio_productos" 
                                placeholder='Precio'
                                onChange={(e)=>{setPrecioUND(e.target.value)}}
                                value={precioUND}
                                required/>
                        </div>
                        <div className='col'>
                            <Monedas/>
                        </div>
                    </div>
                    <div className="d-grid gap-2 col-6 mx-auto">
                        <button 
                            type="submit"
                            className='btn btn-warning fw-bold mt-4'
                            >Agregar Producto
                        </button>
                    </div>
                    
                </div>
            </form>
        </div>
    
    </>
  )
}

export default ProductForm