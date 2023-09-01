let productos = []

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data
        cargarProductos(productos)
    })

const contenedorTarjetas = document.getElementById("productos-container");
const buttonCategoria = document.querySelectorAll(".button-categoria");
const tituloPrincipal = document.getElementById("titulo-principal")
let botonesAgregar = document.querySelectorAll(".add")
const numerito = document.getElementById("numerito")
const numerito2 = document.getElementById("numerito2")

function cargarProductos(productosElegidos){


    productos.sort((a, b) => a.precio - b.precio);
  
    productos.forEach((producto) => {
    });

    contenedorTarjetas.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <div class="container-productos">
        <div class="producto">
            <img loading="lazy" class="img-producto" src="${producto.imagen}" alt="${producto.titulo}">
        </div>
        <div class="container-valores">
            <h3 class="nombre-prenda">${producto.titulo}</h3>
            <p class="valor">${producto.precio}$ <span class="uy">UY</span></p>
            <button class="add" id="${producto.id}">Agregar</button>
        </div>
        </div>
        `;
        contenedorTarjetas.appendChild(div);
    });

    actualizarBotonesAgregar()
}


buttonCategoria.forEach(boton =>{
    boton.addEventListener("click", (e)=>{

        if(e.currentTarget.id != "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id)
            tituloPrincipal.innerText = productoCategoria.categoria.nombre

            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        }
    });
});

function actualizarBotonesAgregar(){
    botonesAgregar = document.querySelectorAll(".add")

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito)
    })
}

let productosEnCarrito2

let productosEnCarrito2LS = localStorage.getItem("productos-en-el-carrito")

if(productosEnCarrito2LS){
    productosEnCarrito2 = JSON.parse(productosEnCarrito2LS)
    actualizarNumerito()
    actualizarNumerito2()
}
else{
    productosEnCarrito2 = []
}

function agregarAlCarrito(e){
    Toastify({
        text: "Producto Agregado",
        duration: 1500,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        close: true,
        style: {
        background: "linear-gradient(to right, #352961, #430f58)",
        borderRadius: "2rem",
        fontSize: "0.75rem",
        padding: "0.75rem",
        textTransform: "upperCase"
        },
        offset: {
            x: 15,
            y: 120
        },
        onClick: function(){}
    }).showToast();

    const idBoton = e.currentTarget.id
    const productosAgregado = productos.find(producto => producto.id === idBoton)

    if(productosEnCarrito2.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito2.findIndex(producto => producto.id === idBoton)
        productosEnCarrito2[index].cantidad++
    }else{
        productosAgregado.cantidad = 1
        productosEnCarrito2.push(productosAgregado)
    }

    actualizarNumerito()
    actualizarNumerito2()

    localStorage.setItem("productos-en-el-carrito", JSON.stringify(productosEnCarrito2))
}

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito2.reduce((acc, producto) => acc + producto.cantidad, 0)
    numerito.innerText = nuevoNumerito
}
function actualizarNumerito2(){
    let nuevoNumerito = productosEnCarrito2.reduce((acc, producto) => acc + producto.cantidad, 0)
    numerito2.innerText = nuevoNumerito
}