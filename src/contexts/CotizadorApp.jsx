import {createContext, useState, useEffect} from 'react'
import Swal from 'sweetalert2'


export const CotizadorContext = createContext()

export function CotizadorAppProvider(props) {

    const [productos, setProductos] = useState([])
    const [ManoObra, setManoObra] = useState([])
    const [impuestos, setImpuestos] = useState([])
    const [subtotal_producto, setSubtotal_producto] = useState(0)
    const [subtotal_obra, setSubtotal_obra] = useState(0)
    const [porcentaje, setPorcentaje] = useState(0)
    const [subtotal_impuesto, setSubtotal_Impuesto] = useState(0)
    const [total, setTotal] = useState(0)
    const [moneda, setMoneda] = useState();
    
   
    const fecha = new Date()
    const hoy = fecha.getDate()
    const mes = fecha.getMonth() +1 
    const año = fecha.getFullYear()


    useEffect(() => {
      setProductos(productos)
      Swal.fire({
        icon: 'info',
        title: 'Gracias por estar Aquí!',
        text: 'Esta es una Herramienta disponible para uso totalmente gratuito!',
        footer: 'Al final puedes encontrar los iconos de un Formulario y de Paypal por si deseas dejarme tu Feedback o realizar alguna Donación'
      })
    }, [])

    useEffect(() => {
      if (ManoObra.length != 0) {
        setTotal(subtotal_producto + subtotal_obra)
      }
      else{
        setTotal(subtotal_producto)
      }
    }, [subtotal_producto])

    useEffect(() => {
      if (ManoObra.length === 0) {
        setTotal(subtotal_producto)
      }
      else{
        setTotal(subtotal_producto + subtotal_obra)
      }
    }, [subtotal_obra])

    useEffect(() => {
      if (impuestos.length === 0) {
        setSubtotal_Impuesto(0)
      }
      else{
        setSubtotal_Impuesto(parseFloat(total * (porcentaje/100)).toFixed(2))
      }
    }, [total])

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

    function crearProducto(producto) {
      setProductos([...productos, {
        descripcion_product : producto.descripcion_product,
        cantidad_product : producto.cantidad_product,
        medida: producto.medida,
        precioUND: parseFloat(producto.precioUND).toFixed(2),
        precio_total: parseFloat(producto.precio_total).toFixed(2),
        moneda:producto.moneda,
      }])
      setSubtotal_producto(subtotal_producto + producto.precio_total)
      
    }
    
    function borrarProducto(productIndex, precio_total) {
      setProductos(productos.filter( (producto,index) => index != productIndex ))
      setSubtotal_producto(subtotal_producto - parseFloat(precio_total))
      Toast.fire({
        icon: 'success',
        title: `Producto Eliminado de la Lista!`
      })
    }

    function agregarManoObra(item) {
      setManoObra([{
        descripcionManoObra : item.descripcionManoObra,
        precioManoObra : item.precioManoObra
      }])
      setSubtotal_obra(subtotal_obra + parseFloat(item.precioManoObra))
    }

    function borrarManoObra(dataIndex, precio) {
      setManoObra( ManoObra.filter( (data,index) => index != dataIndex ))
      setSubtotal_obra(subtotal_obra - parseFloat(precio))
      Toast.fire({
        icon: 'success',
        title: `Mano de Obra Eliminado de la Lista!`
      })
    }

    function agregarImpuesto(item) {
      setImpuestos([{
        tipoImpuesto : item.tipoImpuesto,
        valorImpuesto : item.valorImpuesto,
      }])
      setPorcentaje(item.valorImpuesto)
      setSubtotal_Impuesto(parseFloat(total * (item.valorImpuesto/100)).toFixed(2))
    }
    function borrarImpuesto(dataIndex) {
      setImpuestos(impuestos.filter( (data,index) => index != dataIndex ))
      setSubtotal_Impuesto(0)
      Toast.fire({
        icon: 'success',
        title: `Mano de Obra Eliminado de la Lista!`
      })
    }


    
  return (
    <>
      <CotizadorContext.Provider value={{
         productos,
         moneda,
         setMoneda,
         crearProducto,
         borrarProducto,
         ManoObra,
         agregarManoObra,
         borrarManoObra,
         impuestos,
         agregarImpuesto,
         borrarImpuesto,
         hoy,mes,año,
         subtotal_producto,total, subtotal_impuesto
        }}>
          {props.children}
      </CotizadorContext.Provider>
    </>
  )

}
