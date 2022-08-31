/* 
    VAMOS A SIMULAR UN SISTEMA DONDE
    UN OPERADOR DE UNA DROGUERIA PUEDE REALIZAR
    CIERTAS OPERACIONES RELACIONADAS CON EL INVENTARIO
    DE VARIOS PRODUCTOS: INGRESAR PRODUCTOS, REPORTAR ERRORES DE STOCK
    FACTURAR A CCLIENTES, Y OBTENER UN RESUMEN DE LAS OPERACIONES
    REALIZADAS DURANTE LA JORNADA
/*


/* BASE DE DATOS - ARRAY */
const productoBaseDeDatos = [
    {
        nombreProducto:'ACTRON 600 X 30',
        laboratorio:'LABORATORIOS BAYER',
        trazabilidad:'7501318634756',
        costo:403.5,
        stock:60,
        sector:'A01',
        precio:609.28,
    },
    {
        nombreProducto:'TAFIROL 1G X 50',
        laboratorio:'GENOMMA LAB',
        trazabilidad:'7798140258667',
        costo:700,
        stock:200,
        sector:'A02',
        precio:1057,
    },
    {
        nombreProducto:'TAFIROL 1G X 100',
        laboratorio:'GENOMMA LAB',
        trazabilidad:'4040404040401',
        costo:1500,
        stock:250,
        sector:'A03',
        precio:2265,
    },
    {
        nombreProducto:'LOSACOR 50 X 30',
        laboratorio:'ROEMMERS SAICF',
        trazabilidad:'7795345009636',
        costo:1800,
        stock:50,
        sector:'A04',
        precio:2718,
    },
    {
        nombreProducto:'TAFIROL 1G X 24',
        laboratorio:'GENOMMA LAB',
        trazabilidad:'1071500089',
        costo:441,
        stock:200,
        sector:'A05',
        precio:665.98,
    },
]



/*      Start Class         */
class Producto {
    constructor (nombreProducto, laboratorio, trazabilidad, costo, stock, sector, precio){
        this.nombreProducto = nombreProducto
        this.laboratorio = laboratorio
        this.trazabilidad = trazabilidad
        this.costo = costo
        this.stock = stock
        this.sector  = sector
        this.precio = precio
    }
    // METODOS DE PRODUCTO

    consultarDatos() {
        return `Los datos del producto ${this.nombreProducto} son:\n\nLaboratorio: ${this.laboratorio}\nTrazabilidad: ${this.trazabilidad}\nCosto: $${this.costo}\nPrecio al cliente: $${this.precio}\nStock Actual: ${this.stock}\nSector: ${this.sector}`
    }

    aplicarPrecio(){    // 30 % de ganancia + 21 % de IVA
        this.precio = (this.costo * 1.30) * 1.21
    }
    
    previoCarrito(){
        if((this.stock - egresoStock) < 0) {
            productosEnFalta = egresoStock - this.stock
            return [this.nombreProducto, this.stock, (this.precio*this.stock), productosEnFalta]
        } else {
            return [this.nombreProducto , egresoStock, (this.precio*egresoStock).toFixed(2)]
        }
    }

    metodoCarrito(){
        if((this.stock - egresoStock) < 0) {
            totalcarrito = this.precio * this.stock
            this.stock  = 0
            return totalcarrito
        }  else {
            totalcarrito = this.precio * egresoStock
            return totalcarrito
        }

    }
    // AUMENTO Y DISMINUCION DE STOCK 
    aumentarStock() { 
        this.stock += ingresoStock
    }

    disminuirStock() {
        if((this.stock - egresoStock) < 0) {
            alert(`El producto ${this.nombreProducto} no puede tener stock negativo. Debe reportar un stock no mayor a ${this.stock}`)
        } else {
            this.stock -= egresoStock
        }
    }

    //AUMENTO PRECIO --- ej 500 * ((100 + 25) / 100) = 625  siendo 25 el % ingresado
    aumentarPrecio() {
        this.precio = this.precio * ((100 + porcAumento) / 100)
    }

    //DISMINUYE PRECIO --- ej 500 * ((100 - 25) / 100) = 375    siendo 25 el % ingresado
    disminuirPrecio() {
        this.precio = this.precio * ((100 - porcDisminucion) / 100)
    }
}

class Carrito{
    constructor(producto, cantidad, precio){
        this.producto = producto
        this.cantidad = cantidad
        this.precio = precio
    }
}

let carrito = []

/* consulto el localStorage si existe */
if(localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
} else {
    localStorage.setItem('carrito', JSON.stringify(carrito))
}





/*  Start Variable    */

const reportes = []
let i = 1, carritototal = 0, totalcarrito = 0, ventasTotales = 0, acumVentas = 0, productosEnFalta = 0, egresoStock = 0




/* Start Funciones */

function imprimirFacturaCliente (cliente, carrito, totalcarrito) {
    console.log(`--- COMPROBANTE DE LA COMPRA ---\n\nCLIENTE:  ${cliente}\n\nProductos facturados:\n${carrito}\n\nTOTAL A PAGAR: $${totalcarrito}`)
}

function existenciaProducto (nombreProducto) {
    let index = (productos.findIndex(id => id.nombreProducto == nombreProducto))
                if(index == -1){
                    idForm.innerHTML = `
                    <div class="alertaStock">
                        <h5>El producto no se encuentra registrado en la base de datos.</h5>
                    </div>
                    `
                } else {
                    return index
                }
}

// funcion para cerrar navs cuando se quiere seleccionar uno
function cerrarNavs() {
    if(cerrar == divIngreso.classList && divIngreso.classList == 'divs divIngreso'){
        divReporte.innerHTML = ""
        divReporte.classList.remove('divReporte')
        divFacturacion.innerHTML = ""
        divFacturacion.classList.remove('divFacturacion')
        divActualizacion.innerHTML = ""
        divActualizacion.classList.remove('divActualizacion')
        divConsulta.innerHTML = ""
        divConsulta.classList.remove('divConsulta')
        divResumen.innerHTML = ""
        divResumen.classList.remove('divResumen')
        divProductos.innerHTML = ""
        divProductos.classList.remove('divProductos')
        divTitleProductos.innerHTML = ""
        divTitleProductos.classList.remove('divTitleProductos')
        divCarrito.innerHTML = ""
    }

    if(cerrar == divReporte.classList && divReporte.classList == 'divs divReporte'){
        divIngreso.innerHTML = ""
        divIngreso.classList.remove('divIngreso')
        divFacturacion.innerHTML = ""
        divFacturacion.classList.remove('divFacturacion')
        divActualizacion.innerHTML = ""
        divActualizacion.classList.remove('divActualizacion')
        divConsulta.innerHTML = ""
        divConsulta.classList.remove('divConsulta')
        divResumen.innerHTML = ""
        divResumen.classList.remove('divResumen')
        divProductos.innerHTML = ""
        divProductos.classList.remove('divProductos')
        divTitleProductos.innerHTML = ""
        divTitleProductos.classList.remove('divTitleProductos')
        divCarrito.innerHTML = ""
    }

    if(cerrar == divFacturacion.classList && divFacturacion.classList == 'divs divFacturacion'){
        divReporte.innerHTML = ""
        divReporte.classList.remove('divReporte')
        divIngreso.innerHTML = ""
        divIngreso.classList.remove('divIngreso')
        divActualizacion.innerHTML = ""
        divActualizacion.classList.remove('divActualizacion')
        divConsulta.innerHTML = ""
        divConsulta.classList.remove('divConsulta')
        divResumen.innerHTML = ""
        divResumen.classList.remove('divResumen')
        divProductos.innerHTML = ""
        divProductos.classList.remove('divProductos')
        divTitleProductos.innerHTML = ""
        divTitleProductos.classList.remove('divTitleProductos')
        divCarrito.innerHTML = ""
    }

    if(cerrar == divActualizacion.classList && divActualizacion.classList == 'divs divActualizacion'){
        divReporte.innerHTML = ""
        divReporte.classList.remove('divReporte')
        divFacturacion.innerHTML = ""
        divFacturacion.classList.remove('divFacturacion')
        divIngreso.innerHTML = ""
        divIngreso.classList.remove('divIngreso')
        divConsulta.innerHTML = ""
        divConsulta.classList.remove('divConsulta')
        divResumen.innerHTML = ""
        divResumen.classList.remove('divResumen')
        divProductos.innerHTML = ""
        divProductos.classList.remove('divProductos')
        divTitleProductos.innerHTML = ""
        divTitleProductos.classList.remove('divTitleProductos')
        divCarrito.innerHTML = ""
    }

    if(cerrar == divConsulta.classList && divConsulta.classList == 'divs divConsulta'){
        divReporte.innerHTML = ""
        divReporte.classList.remove('divReporte')
        divFacturacion.innerHTML = ""
        divFacturacion.classList.remove('divFacturacion')
        divActualizacion.innerHTML = ""
        divActualizacion.classList.remove('divActualizacion')
        divIngreso.innerHTML = ""
        divIngreso.classList.remove('divIngreso')
        divResumen.innerHTML = ""
        divResumen.classList.remove('divResumen')
        divProductos.innerHTML = ""
        divProductos.classList.remove('divProductos')
        divTitleProductos.innerHTML = ""
        divTitleProductos.classList.remove('divTitleProductos')
        divCarrito.innerHTML = ""
    }

    if(cerrar == divResumen.classList && divResumen.classList == 'divs divResumen'){
        divReporte.innerHTML = ""
        divReporte.classList.remove('divReporte')
        divFacturacion.innerHTML = ""
        divFacturacion.classList.remove('divFacturacion')
        divActualizacion.innerHTML = ""
        divActualizacion.classList.remove('divActualizacion')
        divConsulta.innerHTML = ""
        divConsulta.classList.remove('divConsulta')
        divIngreso.innerHTML = ""
        divIngreso.classList.remove('divIngreso')
        divProductos.innerHTML = ""
        divProductos.classList.remove('divProductos')
        divTitleProductos.innerHTML = ""
        divTitleProductos.classList.remove('divTitleProductos')
        divCarrito.innerHTML = ""
    }
}

function sacarMostrarStock(){
    divProductos.innerHTML = ""
    divProductos.classList.remove('divProductos')
    divTitleProductos.innerHTML = ""
    divTitleProductos.classList.remove('divTitleProductos')
}

/* end funciones */




/*  Convertimos en "Producto" a las const de la base de datos */
const productos = productoBaseDeDatos.map (producto => new Producto(
    producto.nombreProducto,
    producto.laboratorio,
    producto.trazabilidad,
    producto.costo,
    producto.stock,
    producto.sector,
    producto.precio,
))

console.table(productos)  //    Tabla de datos inicial


const divProductos = document.getElementById('divProductos')




/* partes del DOM por secciones */

/*
    VOY S INTEGRAR SWEATALERT ESTA VEZ PARA EL INGRESO DE STOCK
    DONDE AL INGRESAR EL PRODUCTO NOS SALGA UN AVISO EN DETALLE
    SOBRE EL INGRESO    
*/



/* seccion ingreso */

/*
    EL OPERADOR PUEDE INGRESAR UN PRODUCTO QUE YA SE ENCUENTRA EN LA BASE DE DATOS
    O BIEN INGRESAR UN NUEVO PRODUCTO COMPLETANDO TODOS LOS CAMPOS SOLICITADOS
    Y SE AÑADIRA A LA BASE DE DATOS

*/


const divIngreso = document.getElementById('divIngreso')
const botonIngreso = document.getElementById('botonIngreso')
botonIngreso.addEventListener('click', (e) => {
    if(divIngreso.classList == 'divs divIngreso'){
        // si existe class 'divs divIngreso', al hacer click se remueve la clase y se vacia el div
        e.preventDefault()
        divIngreso.innerHTML = ""   
        divIngreso.classList.remove('divIngreso')
        sacarMostrarStock()  
    } else{
        // Se genera el form para completar el ingreso de los productos
        e.preventDefault()
        cerrar = divIngreso.classList
        divIngreso.classList.add('divIngreso')
        cerrarNavs()
        divIngreso.innerHTML = `
            <form id="idForm">
                <div class="mb-3">
                    <label for="nombreProducto" class="form-label">Nombre del Producto</label>
                    <input type="text" class="form-control" id="nombreProducto" required>
                </div>
                <div class="mb-3">
                    <label for="laboratorio" class="form-label">Laboratorio</label>
                    <input type="text" class="form-control" id="laboratorio" required>
                </div>
                <div class="mb-3">
                    <label for="trazabilidad" class="form-label">Trazabilidad</label>
                    <input type="text" class="form-control" id="trazabilidad" required>
                </div>
                <div class="mb-3">
                    <label for="costo" class="form-label">Costo</label>
                    <input type="number" class="form-control" id="costo" required>
                </div>
                <div class="mb-3">
                    <label for="stock" class="form-label">Stock</label>
                    <input type="number" class="form-control" id="stock" required>
                </div>
                <div class="mb-3">
                    <label for="sector" class="form-label">Sector</label>
                    <input type="text" class="form-control" id="sector" required>
                </div>
                <button type="submit" class="btn btn-operacion">Ingresar Producto</button>
                <button type="button" id="mostrarStock" class="btn btn-stock">Mostrar Stock</button>
            </form>
            `
            // habilitamos el idForm para poder usar el submit y asi no se resete la pagina
            const idForm = document.getElementById('idForm')
            idForm.addEventListener('submit', (e) => {
                e.preventDefault()
                const nombreProducto = document.getElementById("nombreProducto").value
                const laboratorio = document.getElementById("laboratorio").value
                const trazabilidad = document.getElementById("trazabilidad").value
                const costo = document.getElementById("costo").value
                const stock = document.getElementById("stock").value
                const sector = document.getElementById("sector").value

                const producto = new Producto(nombreProducto, laboratorio, trazabilidad, costo, stock, sector)
                productos.unshift(producto)
                productos[0].aplicarPrecio()
                idForm.reset()
                console.table(productos)

                /* INSERTAMOS SWEATALERT AL HACER CLICK */
                Swal.fire({
                    title: 'Producto Ingresado.',
                    html:
                    `
                    <p>Nombre: ${nombreProducto}</p>
                    <p>GTIN: ${trazabilidad}</p>
                    <p>Sector: ${sector}</p>
                    `,
                    icon: 'success'
                }
                    
                  )
            })

            // habilitamos el boton Mostrar Stock
            const mostrarStock = document.getElementById('mostrarStock')
            mostrarStock.addEventListener('click', (e) => {
                if(divProductos.classList == 'divs divProductos'){
                    e.preventDefault()
                    divProductos.innerHTML = ""   
                    divProductos.classList.remove('divProductos')
                    divTitleProductos.innerHTML = ""   
                    divTitleProductos.classList.remove('divTitleProductos')
                } else {
                    e.preventDefault()
                    divProductos.classList.add('divProductos')
                    divTitleProductos.classList.add('divTitleProductos')
                    divTitleProductos.innerHTML = `<h2 class="title-productos">Productos en Stock</h2>`
                    productos.forEach((array) => {
                        divProductos.innerHTML += `
                        <div class="card productos">
                            <div class="card-body car-resumen">
                                <h5 class="card-title">${array.nombreProducto}</h5>
                                <p class="card-text">SKU: ${array.trazabilidad}</p>
                                <p class="card-text">Precio: $${array.precio}</p>
                                <p class="card-text">Stock: ${array.stock}</p>
                            </div>
                        </div>
                        `
                    })
                }
            })
    }
})



/* seccion reporte */
const divReporte = document.getElementById('divReporte')
const botonReporte = document.getElementById('botonReporte')
botonReporte.addEventListener('click', (e) => {
    if(divReporte.classList == 'divs divReporte'){
        e.preventDefault()
        divReporte.innerHTML = ""   
        divReporte.classList.remove('divReporte')
        sacarMostrarStock()
    } else {
        e.preventDefault()
        cerrar = divReporte.classList
        divReporte.classList.add('divReporte')
        cerrarNavs()
        divReporte.innerHTML = `
        <form id="idForm">
                <div class="mb-3">
                <label for="nombreProducto" class="form-label">Nombre del Producto</label>
                <input type="text" class="form-control" id="nombreProducto" required>
                </div>
                <div class="mb-3">
                    <label for="stock" class="form-label">Stock</label>
                    <input type="number" class="form-control" id="stock" required>
                </div>
                <div class="mb-3">
                    <label for="motivoReporte" class="form-label">Motivo:</label>
                    <input type="text" class="form-control" id="motivo" required>
                </div>
                <button type="submit" class="btn btn-operacion">Reportar Producto</button>
                <button type="button" id="mostrarStock" class="btn btn-stock">Mostrar Stock</button>
            </form>
        `
        const idForm = document.getElementById('idForm')
        idForm.addEventListener('submit', (e) => {
            e.preventDefault()

            nombreProducto = document.getElementById("nombreProducto").value
            egresoStock = document.getElementById("stock").value
            const motivoReporte = document.getElementById('motivo').value

            index = existenciaProducto(nombreProducto)
            productos[index].disminuirStock(egresoStock)
            reportes.push([nombreProducto, egresoStock, motivoReporte])


            console.log(reportes)
            idForm.reset()
            console.table(productos)
        })
        // habilitamos el boton Mostrar Stock
        const mostrarStock = document.getElementById('mostrarStock')
        mostrarStock.addEventListener('click', (e) => {
            if(divProductos.classList == 'divs divProductos'){
                e.preventDefault()
                divProductos.innerHTML = ""   
                divProductos.classList.remove('divProductos')
                divTitleProductos.innerHTML = ""   
                divTitleProductos.classList.remove('divTitleProductos')
            } else {
                e.preventDefault()
                divProductos.classList.add('divProductos')
                divTitleProductos.classList.add('divTitleProductos')
                divTitleProductos.innerHTML = `<h2 class="title-productos">Productos en Stock</h2>`
                productos.forEach((array) => {
                    divProductos.innerHTML += `
                    <div class="card productos">
                        <div class="card-body car-resumen">
                            <h5 class="card-title">${array.nombreProducto}</h5>
                            <p class="card-text">SKU: ${array.trazabilidad}</p>
                            <p class="card-text">Precio: $${array.precio}</p>
                            <p class="card-text">Stock: ${array.stock}</p>
                        </div>
                    </div>
                    `
                })
            }
        })
    }
})


/* 
    EL OPERADOR PUEDE FACTURARLE A CLIENTES
    INGRESANDO PRODUCTOS A FACTURAR QUE SE ENCUENTREN EN LA BASE DE DATOS

*/
/* seccion facturcion */
const divFacturacion = document.getElementById('divFacturacion')
const botonFacturacion = document.getElementById('botonFacturacion')
botonFacturacion.addEventListener('click', (e) => {
    if(divFacturacion.classList == 'divs divFacturacion'){
        e.preventDefault()
        divFacturacion.innerHTML = ""   
        divFacturacion.classList.remove('divFacturacion')
        divCarrito.innerHTML = ""
    } else {
        e.preventDefault()
        cerrar = divFacturacion.classList
        divFacturacion.classList.add('divFacturacion')
        cerrarNavs()
        divFacturacion.innerHTML = `
        <form id="idForm">
            <div class="mb-3">
                <label for="nombreCliente" class="form-label">Cliente</label>
                <input type="text" class="form-control" id="nombreCliente" required>
            </div>
            <div class="mb-3">
                <label for="nombreProducto" class="form-label">Producto a facturar</label>
                <input type="text" class="form-control" id="nombreProducto" required>
            </div>
            <div class="mb-3">
                <label for="stock" class="form-label">Stock</label>
                <input type="number" class="form-control" id="stock" required>
            </div>
            <button type="submit" class="btn btn-operacion">Añadir al Carrito</button>
            <button id="mostrarCarrito" type="button" class="btn btn-operacion">Mostrar Carrito</button>
        </form>
        `
        const idForm = document.getElementById('idForm')
        idForm.addEventListener('submit', (e) => {
            e.preventDefault()

            const cliente = document.getElementById('nombreCliente').value
            nombreProducto = document.getElementById("nombreProducto").value
            egresoStock = document.getElementById("stock").value

            index = existenciaProducto(nombreProducto)
            totalcarrito += productos[index].metodoCarrito()
           
            productos[index].previoCarrito()

            
            const nuevoCarrito = new Carrito(nombreProducto, productos[index].previoCarrito([1]), productos[index].previoCarrito([2]))

            carrito.push(nuevoCarrito)

            productos[index].disminuirStock()
            localStorage.setItem("carrito", JSON.stringify(carrito))
            
            
            console.log(carrito)
            console.log(totalcarrito)
            console.table(productos)

            const divCarrito = document.getElementById('divCarrito')
            divCarrito.classList.add('divCarrito')
            carrito.forEach((carrito,index) => {
                divCarrito.classList.add('divCarrito')
                divCarrito.innerHTML =""
                divCarrito.innerHTML += `
                    <div>
                        <div class="mb-3">
                            <h2 class="title-productos">Carrito</h2>  
                        </div>
                        <div id="carrito${index}">
                            <h3>Cliente: ${cliente}</h3>
                            <p>${carrito.producto}  ---  ${carrito.cantidad[1]}  ---  $${carrito.precio[2]}\n</p>
                        </div>
                        <div>
                            <p>$${totalcarrito}</p>
                            <button type="button" class="btn btn-operacion" id="facturar">Facturar</button>
                        </div>
                    </div>
                    `
            })

            divFacturacion.innerHTML = `
            <form id="idForm">
                <div class="mb-3">
                    <label for="nombreCliente" class="form-label">Cliente</label>
                    <input type="text" class="form-control" id="nombreCliente">
                </div>
                <div class="mb-3">
                    <label for="nombreProducto" class="form-label">Producto a facturar</label>
                    <input type="text" class="form-control" id="nombreProducto" required>
                </div>
                <div class="mb-3">
                    <label for="stock" class="form-label">Stock</label>
                    <input type="number" class="form-control" id="stock" required>
                </div>
                <button type="submit" class="btn btn-operacion">Añadir al Carrito</button>
                <button id="mostrarCarrito" type="button" class="btn btn-operacion">Mostrar Carrito</button>
            </form>
            `
            
            const idForm = document.getElementById('idForm')
            idForm.addEventListener('submit', (e) => {
                e.preventDefault()

            const cliente = document.getElementById('nombreCliente').value
            nombreProducto = document.getElementById("nombreProducto").value
            egresoStock = document.getElementById("stock").value

            index = existenciaProducto(nombreProducto)
            
            
            totalcarrito += productos[index].metodoCarrito()
            productos[index].previoCarrito()

            
            const nuevoCarrito = new Carrito(nombreProducto, productos[index].previoCarrito([1]), productos[index].previoCarrito([2]))

            carrito.push(nuevoCarrito)
            productos[index].disminuirStock()
            
            localStorage.setItem("carrito", JSON.stringify(carrito))
            
            
            console.log(carrito)
            console.log(totalcarrito)
            console.table(productos)

                const divCarrito = document.getElementById('divCarrito')
                carrito.forEach((carrito, indice) =>{
                    divCarrito.classList.add('divCarrito')
                    divCarrito.innerHTML =""
                    divCarrito.innerHTML += `
                    <div class="mb-3">
                        <h2 class="title-productos">Carrito</h2>
                        <h3>${cliente}</h3>
                    </div> 
                    <div id="carrito${indice}">
                        <p>${carrito[indice].producto}  ---  ${carrito[indice].cantidad[1]}  ---  $${carrito[indice].precio[2]}</p>
                    </div>
                    <div>
                        <p>${totalcarrito}</p>
                        <button type="button" class="btn btn-operacion" id="facturarTodo">Facturar Todo</button>
                    </div>
                    `
                })
            })

            
            
            const botonCarrito = document.getElementById("mostrarCarrito")
            botonCarrito.addEventListener('click', (e) =>{
                if(divCarrito.classList == 'divs divCarrito'){
                    e.preventDefault()
                    divCarrito.innerHTML += ""
                    divCarrito.classList.remove('divCarrito')
                } else {
                    carrito = JSON.parse(localStorage.getItem('carrito'))
                    e.preventDefault()
                    carrito.forEach((carrito, indice) =>{
                        divCarrito.classList.add('divCarrito')
                        carrito = JSON.parse(localStorage.getItem('carrito'))
                        divCarrito.innerHTML =""
                        divCarrito.innerHTML += `
                        <div class="mb-3">
                            <h2 class="title-productos">Carrito</h2>
                            <h3>Cliente: ${cliente}</h3>
                        </div> 
                        <div id="carrito${indice}">
                            <p>${carrito[indice].producto}  ---  ${carrito[indice].cantidad[1]}  ---  $${carrito[indice].precio[2]}</p>
                        </div>
                        <div>
                            <p>${totalcarrito}</p>
                            <button type="button" class="btn btn-operacion" id="facturar">Facturar Todo</button>
                        </div>
                        `
                    })
                }
            })
            
            const botonFacturar = document.getElementById('facturar')
            botonFacturar.addEventListener('click', () =>{
                
                divFacturacion.innerHTML = ""
                divFacturacion.classList.remove("divFacturacion")
                divCarrito.innerHTML=""

                /* INSERTAMOS SWEATALERT AL HACER CLICK */
                Swal.fire({
                    title: 'Facturación Realizada.',
                    html:
                    `
                    <p>Cliente: ${cliente}</p>
                    <p>Precio Total: ${totalcarrito.toFixed(2)}</p>
                    `,
                    icon: 'success'
                }
                    
                  )

                ventasTotales += 1
                acumVentas += totalcarrito
                carrito = []
                localStorage.setItem('carrito', JSON.stringify(carrito))
                totalcarrito = 0
            })

            const botonFacturarTodo = document.getElementById('facturarTodo')
            botonFacturarTodo.addEventListener('click', () =>{
                ventasTotales += 1
                acumVentas += totalcarrito
                carrito = []
                localStorage.setItem('carrito', JSON.stringify(carrito))
                totalcarrito = 0
                divFacturacion.innerHTML = ""
                divFacturacion.classList.remove("divFacturacion")
                divCarrito.innerHTML=""
            })
        })
        

    }

})


/* seccion Resumen */
const botonResumen = document.getElementById('botonResumen')
const divResumen = document.getElementById('divResumen')
botonResumen.addEventListener('click', (e) => {
    if(divResumen.classList == 'divs divResumen'){
        e.preventDefault()
        divResumen.innerHTML = ""
        divResumen.classList.remove('divResumen') 
        sacarMostrarStock()
    } else {
        cerrar = divResumen.classList
        divResumen.classList.add('divResumen')
        cerrarNavs()
        divResumen.innerHTML = `
        <div class="card resumen">
            <div class="card-body">
                <h5 class="card-title title-resumen">Resumen del Día</h5>
                <p class="card-text">Ventas del día: ${ventasTotales}</p>
                <p class="card-text">Monto total acumulado: $${acumVentas}</p>
            </div>  
        </div>
        `
        divTitleProductos.innerHTML = `<div><h2 class="title-productos">Productos en Stock</h2></div>`
        productos.forEach((array) => {
            divProductos.innerHTML += `
            <div class="card productos">
                <div class="card-body car-resumen">
                    <h5 class="card-title">${array.nombreProducto}</h5>
                    <p class="card-text">SKU: ${array.trazabilidad}</p>
                    <p class="card-text">Precio: $${array.precio}</p>
                    <p class="card-text">Stock: ${array.stock}</p>
                </div>
            </div>
            `
        })
        
    }
    
})