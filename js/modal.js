
function cargarProductos2(){

    navOpen.innerHTML = "";

    productosEnCarrito2.forEach(producto => {

        const div2 = document.createElement("div");
        div2.classList.add("modal-cart-div");

        div2.innerHTML = `
        <div class="modal-cart-div">
        <div class="container-prenda">
            <img class="img-modal" src="${producto.imagen}" alt="">
            <h3 class="producto-modal">${producto.titulo}</h3>
        </div>
        <div class="container-cantidad-prenda">
            <p class="p-c">Cantidad</p>
            <p>${producto.cantidad}</p>
        </div>
        <div class="container-precio-prenda">
            <p class="p-c">Subtotal</p>
            <p>${producto.precio * producto.cantidad}$</p>
        </div>
        <div class="container-x">
        <button id="${producto.id}" class="eliminar eliminar2"><i class="fa-solid fa-trash-can" style="color: #ff0026;"></i></button>
    </div>
    </div>
    <hr>
        `;

        navOpen.appendChild(div2);

        const buttonEliminar2 = div2.querySelector(".eliminar")
        buttonEliminar2.addEventListener("click", eliminarProductoDeCarrito);
    });
    actualizarBotonesAgregar();
    totalModal();
};

function eliminarProductoDeCarrito(e) {

    const idProductoEliminar = e.currentTarget.getAttribute("id");
    const index2 = productosEnCarrito2.findIndex((producto) => producto.id === idProductoEliminar);
    
    if (index2 !== -1) {
    productosEnCarrito2.splice(index2, 1);
    localStorage.setItem("productos-en-el-carrito", JSON.stringify(productosEnCarrito2));
    
    cargarProductos2();
}
}

function totalModal(){
    const totalModal = productosEnCarrito2.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total2.innerText = ` ${totalModal}$`
};


const navOpen = document.getElementById("nav-open");
const navOpen2 = document.getElementById("nav-open2");
const modalButtonAbrir = document.getElementById("modal-cart");
const modalButtonCerrar = document.querySelector(".boton-cerrar-modal");
modalButtonCerrar.classList.add("boton-cerrar-modal");

modalButtonCerrar.addEventListener('click', () => {
    navOpen.classList.remove("visible");
    navOpen.classList.add("disabled");
    navOpen2.classList.remove("visible");
    navOpen2.classList.add("disabled");
});

modalButtonAbrir.addEventListener('click', () => {
    navOpen.classList.add("visible");
    navOpen.classList.remove("disabled");
    navOpen2.classList.add("visible");
    navOpen2.classList.remove("disabled");
    cargarProductos2();
    totalModal();
});

const minusButton = document.getElementById("minus");
