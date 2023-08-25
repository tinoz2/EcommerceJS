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

function cargarProductos(productosElegidos){

    contenedorTarjetas.innerHTML = "";

    productosElegidos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
        <div class="container-productos">
        <div class="producto">
            <img class="img-producto" src="${producto.imagen}" alt="">
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
}else{
    productosEnCarrito2 = []
}

function agregarAlCarrito(e){
    Toastify({
        text: "Producto Agregado",
        duration: 1500,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
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
    const productosAgregado = productos.find(producto => producto.id === idBoton)

    if(productosEnCarrito2.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito2.findIndex(producto => producto.id === idBoton)
        productosEnCarrito2[index].cantidad++
    }else{
        productosAgregado.cantidad = 1
        productosEnCarrito2.push(productosAgregado)
    }
    localStorage.setItem("productos-en-el-carrito", JSON.stringify(productosEnCarrito2))
}