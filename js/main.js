let productos = [];

const fetchData = async () => {
    try{
        const response = await fetch("./js/productos.json")
        const data = await response.json()
        productos = data
        cargarProductos(productos)
    }
    catch(error){
        console.error("Error en los productos", error)
    }
};

fetchData();

const contenedorTarjetas = document.getElementById("productos-container");
const buttonCategoria = document.querySelectorAll(".button-categoria");
const tituloPrincipal = document.getElementById("titulo-principal");
let botonesAgregar = document.querySelectorAll(".add");
const numerito = document.getElementById("numerito");
const numerito2 = document.getElementById("numerito2");


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
                <div class="div-preview">
                    <button id="preview" class="preview">Vista previa</button>
                </div>
                    <button class="add" id="${producto.id}">Agregar</button>
            </div>
        </div>
        `;

        const previewButton = div.querySelector("#preview");
        if (previewButton) {
            previewButton.addEventListener("click", showPreview);
        };

        contenedorTarjetas.appendChild(div);
    });

    actualizarBotonesAgregar();
};


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

    botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", agregarAlCarrito);
    });
};

let productosEnCarrito2;

let productosEnCarrito2LS = localStorage.getItem("productos-en-el-carrito");

if(productosEnCarrito2LS){
    productosEnCarrito2 = JSON.parse(productosEnCarrito2LS)
    actualizarNumerito();
    actualizarNumerito2();
}
else{
    productosEnCarrito2 = []
};

function agregarAlCarrito(e){
    Toastify({
        text: "Producto Agregado",
        duration: 1000,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        className: "tsresponsive",
        style: {
        background: "linear-gradient(to right, #352961, #430f58)",
        borderRadius: "2rem",
        fontSize: "1rem",
        padding: "1rem",
        textTransform: "upperCase"
        },
        offset: {
            x: 15,
            y: 120
        },
        onClick: function(){}
    }).showToast();

    const idBoton = e.currentTarget.id;
    const productosAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito2.some(producto => producto.id === idBoton)){
        const index = productosEnCarrito2.findIndex(producto => producto.id === idBoton)
        productosEnCarrito2[index].cantidad++
    }else{
        productosAgregado.cantidad = 1;
        productosEnCarrito2.push(productosAgregado);
    };

    actualizarNumerito();
    actualizarNumerito2();
    cargarProductos2();

    localStorage.setItem("productos-en-el-carrito", JSON.stringify(productosEnCarrito2));
};

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito2.reduce((acc, producto) => acc + producto.cantidad, 0)
    numerito.innerText = nuevoNumerito
};

function actualizarNumerito2(){
    let nuevoNumerito = productosEnCarrito2.reduce((acc, producto) => acc + producto.cantidad, 0)
    numerito2.innerText = nuevoNumerito
};

const preview = document.getElementById("preview");

preview.addEventListener("click", showPreview);

function showPreview(){
    Swal.fire({
        title: "ZEN",
        text: "Talle S y M disponibles.",
        imageUrl: './imgoptimizadas/Sweet2.webp',
        imageWidth: 300,
        imageHeight: 300,
        imageAlt: 'ZenPreview',
    })
        .then((result)=> {
        if(result.isConfirmed){
        }
    });
};