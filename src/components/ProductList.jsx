import {useContext, useState, useEffect} from 'react'
import {CotizadorContext} from '../contexts/CotizadorApp'
import ExportPDF from './ExportPDF'
import ManoObraComponent from './ManoObra'
import Impuestos from './Impuestos'

function ProductList() {

    const {productos, borrarProducto, ManoObra, borrarManoObra, subtotal_producto, total, moneda, impuestos,borrarImpuesto, subtotal_impuesto} = useContext(CotizadorContext)
    
    let montoTotal = parseFloat(total) + parseFloat(subtotal_impuesto)

    if (productos.length == 0 && ManoObra.length==0 && impuestos.length==0){
        return <div className="alert alert-info mt-4 text-center" role="alert">
        <h1>Aun no hay Productos listados</h1>
      </div>
    }
    
        return (
            <>
            <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <Impuestos/>
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
                                    <td>
                                        <span>{moneda} </span>
                                        {producto.precioUND}
                                    </td>
                                    <td>
                                        <span>{moneda} </span>
                                        {producto.precio_total}
                                    </td>
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
                                <td className='fw-bold'>
                                    <span>{moneda} </span>
                                    {parseFloat(subtotal_producto).toFixed(2)}</td>
                                <td className='fw-bold'></td>   
                            </tr>
                            {ManoObra.map( (obra, index )=> (
                                <tr key={index} className="text-center" >
                                    <th scope='row'></th>
                                    <td>{obra.descripcionManoObra}</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td className='text-center'>
                                        <span>{moneda} </span>
                                        {parseFloat(obra.precioManoObra).toFixed(2)}</td>
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
                                <td className='fw-bold'>
                                    <span>{moneda} </span>
                                    {parseFloat(total).toFixed(2)}</td>
                                <td className='fw-bold'></td>   
                            </tr>

                            {impuestos.map( (impuesto, index )=> (
                                <tr key={index} className="text-center" >
                                    <th scope='row'></th>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>
                                        <strong> {impuesto.tipoImpuesto}: {impuesto.valorImpuesto} %</strong> 
                                    </td>
                                    <td className='text-center fw-bold'>
                                        <span>{moneda} </span>
                                        {subtotal_impuesto}
                                    </td>
                                    <td>
                                        <button
                                            className='btn'
                                            onClick={()=>{borrarImpuesto(index, impuesto.precio_Impuesto)}}>
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
                                <td className='fw-bold'>Monto Total</td>
                                <td className='fw-bold'>
                                    <span>{moneda} </span>
                                    {parseFloat(montoTotal).toFixed(2)}</td>
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