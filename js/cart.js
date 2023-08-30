let productosEnCarrito2 = localStorage.getItem("productos-en-el-carrito")
productosEnCarrito2 = JSON.parse(productosEnCarrito2)

const carritoVacio = document.getElementById("carrito-vacio")
const carritoProductos = document.getElementById("carrito-productos")
const carritoAcciones = document.getElementById("carrito-acciones")
const carritoComprado = document.getElementById("carrito-comprado")
let buttonEliminar = document.querySelectorAll(".eliminar")
const botonVaciar = document.getElementById("vaciaste")
const carritoTotal = document.getElementById("total")
const botonComprar = document.getElementById("compraste")


function cargarProductosCarrito(){

    if(productosEnCarrito2 && productosEnCarrito2.length > 0){

        carritoVacio.classList.add("disabled")
        carritoProductos.classList.remove("disabled")
        carritoAcciones.classList.remove("disabled")
        carritoComprado.classList.add("disabled")
        carritoProductos.innerHTML = ""
    
        productosEnCarrito2.forEach(producto => {
    
            const div = document.createElement("div")
            div.classList.add("producto2")
            div.innerHTML = `
                    <img loading="lazy" class="img-carrito" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="nombre-producto">
                        <h4>Nombre</h4>
                        <p>${producto.titulo}</p>
                    </div>
                    <div class="cantidad-producto">
                        <h4>Cantidad</h4>
                        <p>${producto.cantidad}</p>
                    </div>
                    <div class="precio-producto">
                        <h4>Precio</h4>
                        <p>${producto.precio}$</p>
                    </div>
                    <div class="subtotal">
                        <h4>Subtotal</h4>
                        <p>${producto.precio * producto.cantidad}$</p>
                    </div>
                    <button class="eliminar" id="${producto.id}"><i class="fa-solid fa-trash-can" style="color: #ff0026;"></i></button>
            `
    
            carritoProductos.append(div)
        })
    }else{
    
        carritoVacio.classList.remove("disabled")
        carritoProductos.classList.add("disabled")
        carritoAcciones.classList.add("disabled")
        carritoComprado.classList.add("disabled")
    }
    actualizarBotonesEliminar()
    actualizarTotal()
}

cargarProductosCarrito()

function actualizarBotonesEliminar(){
    buttonEliminar = document.querySelectorAll(".eliminar")

    buttonEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarCarrito)
    })
}

function eliminarCarrito(e){
    Toastify({
        text: "Producto Eliminado",
        duration: 1500,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        close: true,
        style: {
        background: "linear-gradient(to right, #352961, #430f58)",
        borderRadius: "2rem",
        fontSize: "1rem",
        padding: "1.2rem",
        textTransform: "upperCase"
        },
        offset: {
            x: 15,
            y: 120
        },
        onClick: function(){}
    }).showToast();

    const idBoton = e.currentTarget.id
    const index = productosEnCarrito2.findIndex(producto => producto.id === idBoton)
    productosEnCarrito2.splice(index, 1)
    cargarProductosCarrito()

    localStorage.setItem("productos-en-el-carrito",JSON.stringify(productosEnCarrito2))
}

botonVaciar.addEventListener("click", vaciarCarrito)

function vaciarCarrito(){
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Se vaciará tu carrito!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#7c73e6',
        cancelButtonColor: '#a0a0a0',
        confirmButtonText: 'Si, borralo!'
        }).then((result)=> {
            if(result.isConfirmed){
                productosEnCarrito2.length = 0
                localStorage.setItem("productos-en-el-carrito", JSON.stringify(productosEnCarrito2))
                cargarProductosCarrito()
            }
        })
}

botonComprar.addEventListener("click", comprarCarrito)

function comprarCarrito(){
    productosEnCarrito2.length = 0
    localStorage.setItem("productos-en-el-carrito", JSON.stringify(productosEnCarrito2))
    cargarProductosCarrito()
    if (productosEnCarrito2 && productosEnCarrito2.length > 0){
        
    }else{
        carritoVacio.classList.add("disabled")
        carritoProductos.classList.add("disabled")
        carritoAcciones.classList.add("disabled")
        carritoComprado.classList.remove("disabled")
    }
}

function actualizarTotal(){
    const totalCalculado = productosEnCarrito2.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0)
    total.innerText = `$${totalCalculado}`
}