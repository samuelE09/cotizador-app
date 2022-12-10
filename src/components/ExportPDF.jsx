import {useState,useContext} from 'react'
import {CotizadorContext} from '../contexts/CotizadorApp'
import jsPDF from 'jspdf'
import "jspdf-autotable"
import Swal from 'sweetAlert2'

function ExportPDF() {

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

  const {hoy,mes,año} = useContext(CotizadorContext)

  const [nom_cliente, setNom_cliente] = useState("")
  const [contacto_cliente, setContacto_cliente] = useState("")
  const [email_cliente, setEmail_cliente] = useState("")
  const [ubicacion, setUbicacion] = useState("")
  const [nom_emp, setNom_emp] = useState("")
  const [contacto_emp, setContacto_emp] = useState("")
  const [email_emp, setEmail_emp] = useState("")
  const [persona_encargada, setPersona_encargada] = useState("")
  const [ruta_logo, setRuta_logo] = useState("")
  const [comentarios, setComentarios] = useState("")

  const ExportarPDF = (e) => {
    e.preventDefault()
    const pdf = new jsPDF();
        let yIndex = 125
        pdf.setFontSize(10)
        ruta_logo ? pdf.addImage(URL.createObjectURL(ruta_logo), 15, 10, 20, 20) : null//logo
        pdf.text(150,20,`Fecha: ${hoy}/${mes}/${año}`)  //fecha
        //Datos del cliente
        pdf.setFont("Helvetica", "Bold")
        pdf.text(15,45,`Datos del Cliente`) // nombre Cliente
        pdf.setFont("Helvetica", '')
        pdf.text(15,55,`Cliente: ${nom_cliente}`) // nombre Cliente
        pdf.text(130,55,`Contacto: ${contacto_cliente}`) // Contacto cliente
        pdf.text(15,65,`Email: ${email_cliente}`) // email cliente
        pdf.text(80,65,`Ubicacion: ${ubicacion}`) // ubicacion cliente
        //Datos de la empresa
        pdf.setFont("Helvetica", "Bold")
        pdf.text(15,75,`Datos de la Empresa`)
        pdf.setFont("Helvetica",'')
        pdf.text(15,85,`Empresa: ${nom_emp}`) // nombre Empresa
        pdf.text(130,85,`Contacto: ${contacto_emp}`) // Contacto empresa
        pdf.text(15,95,`Email: ${email_emp}`) // email empresa
        pdf.text(80,95,`Presona Encargada: ${persona_encargada}`) //Persona encargada
        pdf.setFont("Helvetica", "Bold")
        pdf.setFontSize(20)
        pdf.text(70,115,"Listado de Productos")
        if (yIndex > 375) {
          yIndex= 45;
          pdf.addPage();
        }
        pdf.autoTable({
            html: "#tabla_datos",
            columns:[
                {header: '#'}, 
                {header: 'Descripción'},
                {header: 'Cantidad'},
                {header: 'Medida'},
                {header: 'Costo Unidad'},
                {header: 'Costo Total'}],
            styles: { halign: 'center', fontStyle:"bold" },
            startY: yIndex
            })
        let finalY = pdf.lastAutoTable.finalY; 
        pdf.setFontSize(10)
        pdf.setFont("Helvetica", "Bold")
        pdf.text(15, finalY+10, `${comentarios}`, {align: 'justify',lineHeightFactor: 1.5,maxWidth:180})
        pdf.save(`Cotización_${nom_cliente}_${año}_${mes}_${hoy}.pdf`)

        Toast.fire({
          icon: 'success',
          title: `Exportado Satisfactoriamente`
      })
  }

  return (
    <>
    <button type="button" className="btn btn-warning fw-bold mx-3" data-bs-toggle="modal" data-bs-target="#exampleModal2">
        Exportar Cotización
    </button>
    <div className="modal fade text-center" id="exampleModal2"  aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form onSubmit={ExportarPDF}>
              <p className='fw-bold fs-5' style={{color:"white"}}>Datos del Cliente</p>
              <input 
                  type="text"
                  value={nom_cliente}  
                  className="form-control mb-3"
                  placeholder='Nombre del Cliente'
                  onChange={(e)=>{setNom_cliente(e.target.value)}}
                  required
                  />
              <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <input 
                      type="number"
                      //value={precioManoObra}  
                      className="form-control mb-3"
                      placeholder='Contacto'
                      onChange={(e)=>{setContacto_cliente(e.target.value)}}
                      required
                />
                <input 
                    type="email"
                    //value={precioManoObra}  
                    className="form-control mb-3"
                    placeholder='Email'
                    onChange={(e)=>{setEmail_cliente(e.target.value)}}
                />
              </div>
              <input 
                  type="text"
                  //value={precioManoObra}  
                  className="form-control mb-3"
                  placeholder='Ubicacion - Georeferencia'
                  onChange={(e)=>{setUbicacion(e.target.value)}}
                  required
                />
              <p className='fw-bold fs-5' style={{color:"white"}}>Datos de la Empresa</p>
              <input 
                  type="text"
                  //value={precioManoObra}  
                  className="form-control mb-3"
                  placeholder='Nombre de la Empresa'
                  onChange={(e)=>{setNom_emp(e.target.value)}}
                  required
                  />
              <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                <input 
                    type="number"
                    //value={precioManoObra}  
                    className="form-control mb-3"
                    placeholder='Contacto'
                    onChange={(e)=>{setContacto_emp(e.target.value)}}
                    required
                  />
                <input 
                  type="email"
                  //value={precioManoObra}  
                  className="form-control mb-3"
                  placeholder='Email'
                  onChange={(e)=>{setEmail_emp(e.target.value)}}
                  required
                />
              </div>
              
              
              <input 
                  type="text"
                  //value={precioManoObra}  
                  className="form-control mb-3"
                  placeholder='Personal Encargado'
                  onChange={(e)=>{setPersona_encargada(e.target.value)}}
                  required
                />
              <input 
                  type="file"
                  className="form-control mb-3"
                  name="imgLogo" 
                  id="dg_input6" 
                  onChange={(e)=>setRuta_logo(e.target.files[0])}/>
                  <br />
                  <div className='text-center'>
                    {ruta_logo ? <img src={URL.createObjectURL(ruta_logo)} alt="Preview" height="80" className='mb-4'/> : null  }
                  </div>
              <textarea
                    className='form-control mb-3'
                    height="30px"
                    type="text" 
                    name="Comentarios_Adicionales"
                    placeholder='Comentarios Adicionales'
                    onChange={(e)=>{setComentarios(e.target.value)}}
                    autoFocus
                    //value={descripcion_product}
                    />
              <button 
                    type="submit" 
                    className="btn btn-warning"
                    data-bs-dismiss={
                      (nom_emp != "" && 
                      nom_cliente != "" && 
                      contacto_cliente != "" &&
                      ubicacion != "" && 
                      contacto_emp != "" && 
                      email_emp != "" &&
                      persona_encargada != "") ? "modal":""}
                    >
                    <span className="fw-bold">
                      <img src="./export-pdf.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top" />
                      Exportar
                    </span>
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
    </>
    
  )
}

export default ExportPDF