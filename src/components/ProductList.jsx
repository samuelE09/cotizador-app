import {useContext} from 'react'
import {CotizadorContext} from '../contexts/CotizadorApp'
import ExportPDF from './ExportPDF'
import ManoObraComponent from './ManoObra'

function ProductList() {

    const {productos, borrarProducto, ManoObra, borrarManoObra, subtotal_producto, total} = useContext(CotizadorContext)

    if (productos.length == 0 && ManoObra.length==0){
        return <div className="alert alert-info mt-4 text-center" role="alert">
        <h1>Aun no hay Productos listados</h1>
      </div>
    }
    
        return (
            <>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <ManoObraComponent />
                <ExportPDF />
            </div>

            <div className="mt-5 mb-5">
                <div className="table-responsive contenido_tabla p-4">
                    <table className="table table-striped table-hover" id='tabla_datos'>
                        <thead className='text-center'>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Medida</th>
                                <th scope="col">Costo Unidad</th>
                                <th scope="col">Costo Total</th>
                                <th scope="col">Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productos.map( (producto,index) => (
                                <tr key={index} className="text-center">
                                    <th scope='row'> {index} </th>
                                    <td>{producto.descripcion_product}</td>
                                    <td>{producto.cantidad_product}</td>
                                    <td>{producto.medida}</td>
                                    <td>$ {producto.precioUND}</td>
                                    <td>$ {producto.precio_total}</td>
                                    <td>
                                        <button
                                            className='btn'
                                            onClick={()=>{borrarProducto(index, producto.precio_total)}}>
                                            <img src="./delete.svg" width="30px" alt=""/>
                                        </button> 
                                    </td>
                                </tr>
        
                            ))}
                            <tr className='text-center'>
                                <th scope="row"></th>
                                <td className='fw-bold'></td>
                                <td className='fw-bold'></td>
                                <td className='fw-bold'></td>
                                <td className='fw-bold'>SubTotal</td>
                                <td className='fw-bold'>$ {parseFloat(subtotal_producto).toFixed(2)}</td>
                                <td className='fw-bold'></td>   
                            </tr>
                            {ManoObra.map( (obra, index )=> (
                                <tr key={index} className="text-center" >
                                    <th scope='row'></th>
                                    <td>{obra.descripcionManoObra}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className='text-center'>$ {parseFloat(obra.precioManoObra).toFixed(2)}</td>
                                    <td>
                                        <button
                                            className='btn'
                                            onClick={()=>{borrarManoObra(index, obra.precioManoObra)}}>
                                            <img src="./delete.svg" width="30px" alt=""/>
                                        </button> 
                                    </td>
                                </tr>           
                            ))}
                            <tr className='text-center'>
                                <th scope="row"></th>
                                <td className='fw-bold'></td>
                                <td className='fw-bold'></td>
                                <td className='fw-bold'></td>
                                <td className='fw-bold'>Total</td>
                                <td className='fw-bold'>$ {parseFloat(total).toFixed(2)}</td>
                                <td className='fw-bold'></td>   
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </> 
          ) 
                                
}

export default ProductList