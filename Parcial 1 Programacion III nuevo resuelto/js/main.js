// Ejercicio 1 _____________ 0.5 puntos
// Crea un array de objetos con 13 frutas. Cada objeto debe tener las siguientes claves:
// • id
// • nombre
// • precio
// • ruta de la imagen (correspondiente a la carpeta img).

const frutas = [
  {
    id: 1,
    nombre: "arandano",
    precio: 5000,
    img: "img/arandano.jpg",
  },
  {
    id: 2,
    nombre: "anana",
    precio: 3500,
    img: "img/anana.jpg",
  },
  {
    id: 3,
    nombre: "banana",
    precio: 1200,
    img: "img/banana.jpg",
  },
  {
    id: 4,
    nombre: "frambuesa",
    precio: 4500,
    img: "img/frambuesa.png",
  },
  {
    id: 5,
    nombre: "frutilla",
    precio: 2800,
    img: "img/frutilla.jpg",
  },
  {
    id: 6,
    nombre: "kiwi",
    precio: 2200,
    img: "img/kiwi.jpg",
  },
  {
    id: 7,
    nombre: "mandarina",
    precio: 1800,
    img: "img/mandarina.jpg",
  },
  {
    id: 8,
    nombre: "manzana",
    precio: 1500,
    img: "img/manzana.jpg",
  },
  {
    id: 9,
    nombre: "naranja",
    precio: 1600,
    img: "img/naranja.jpg",
  },
  {
    id: 10,
    nombre: "pera",
    precio: 1700,
    img: "img/pera.jpg",
  },
  {
    id: 11,
    nombre: "pomelo-amarillo",
    precio: 2000,
    img: "img/pomelo-amarillo.jpg",
  },
  {
    id: 12,
    nombre: "pomelo-rojo",
    precio: 2100,
    img: "img/pomelo-rojo.jpg",
  },
  {
    id: 13,
    nombre: "sandia",
    precio: 4000,
    img: "img/sandia.jpg",
  },
];
let carrito = [];
// Ejercicio 2 _____________ 0.5 puntos
// Modifica la función inicializadora init() para incluir una función que imprima tu nombre y apellido en el <nav> del HTML
// y también en la consola.
// Pasos:
// • Crea un objeto alumno con tus datos (dni, nombre, apellido).
// • Usa backticks (``) para mostrar en consola un mensaje que incluya estos datos desde el objeto.
// • Imprimí tu nombre y apellido en el <nav> y en la consola.
// • Todo esto debe ser parte de la funcion imprimirDatosAlumno()

const alumno = {
  dni: 46027657,
  nombre: "Morena",
  apellido: "Siciliano",
};
function imprimirDatosAlumno(alumno) {
  // muestro en consola y en el nav mis datos
  console.log(
    `DNI: ${alumno.dni}, Nombre: ${alumno.nombre}, Apellido: ${alumno.apellido}.`
  );
  let navbar = document.querySelector(".nombreAlumno");
  let nombreAlumno = `
        <p>${alumno.nombre}</p>
        <p>${alumno.apellido}</p>
    `;
  navbar.innerHTML = nombreAlumno;
}

// Ejercicio 3 _____________ 1 punto
// Implementa una función que imprima en pantalla los productos (frutas) del array de objetos. Agrega esta función dentro de
// init() .
const contenedorProductos = document.querySelector(".contenedor-productos");
function mostrarProductos(array) {
  // muestro las frutas en pantalla
  let tarjetaProducto = "";
  if (!array) {
    tarjetaProducto = "No hay productos por ahora...⏱️";
  }
  for (let i = 0; i < array.length; i++) {
    const producto = array[i];

    tarjetaProducto += `
            <div class="card-producto">
                <div> <img src=${producto.img} alt=${producto.nombre}/></div>
                <div class="card-productos-datos">
                    <div>
                        <h2>${producto.nombre}</h2>
                        <p>${producto.precio}</p>
                    </div>
                    <div>
                        <button onclick="agregarProducto(${producto.id})">Agregar a carrito</button>
                    </div>
                </div>
            </div>
        `;
  }
  contenedorProductos.innerHTML = tarjetaProducto;
}
// Ejercicio 4 _____________ 1 punto
// Implementar una función de filtro, que se dispare al escribir en un campo input, filtrando los productos que coincidan con el
// campo de texto.

//BARRA BUSQUEDA
function buscarProductos() {
  // filtra los productos mientras escribo
  let barraBusqueda = document.querySelector(".barra-busqueda");
  barraBusqueda.addEventListener("keyup", () => {
    let valorInput = barraBusqueda.value.toLowerCase().trim();
    console.log(valorInput);
    let productosFiltrados = frutas.filter((p) =>
      p.nombre.toLowerCase().includes(valorInput)
    );
    console.log(productosFiltrados);
    mostrarProductos(productosFiltrados);
  });
}

//////funciones validadoras////////
//////validar id producto
function validarId(id) {
  // devuelve true o false si el id existe
  return productos.some((e) => e.id === id); // devuelve true o false
}
////// validar id en el carrito: para ver si ya esta agregado
function validarProductoEnElCarrito(id) {
  // revisa si el producto ya está en el carrito
  return carrito.find((p) => p.id === id);
}
// /// FUNCIONES CONTADOR CARRITO
// Ejercicio 7 _____________ 1 punto
// • Implementa un contador de números de productos del carrito. Si hay 0 productos se eliminan del carrito.
// • Actualiza la cantidad de productos en el header en la parte de Carrito: 0 productos
// • Actualiza el precio del valor total del carrito abajo de todo a la derecha (cuando haya productos en el carrito)
function contadorCarrito() {
  // cuenta cuántos productos hay en el carrito
  let carritoContador = document.querySelector("#contador-carrito");
  let contador = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  carritoContador.textContent = contador;
}
/// disminuir cantidad
function disminuirCantidad(id) {
  // baja la cantidad del producto o lo saca si queda en 0
  let item = carrito.find((c) => c.id === id);
  if (!item) return;
  item.cantidad--;
  if (item.cantidad === 0) {
    eliminarProducto(id);
    return;
  }

  actualizarCarrito();
}
//aumentar cantidad
function incrementarCantidad(id) {
  // suma uno al producto del carrito
  let item = carrito.find((p) => p.id === id);
  if (!item) return;
  item.cantidad++;

  actualizarCarrito();
}

// calcular total carrito
function calcularTotalCarrito() {
  // suma el total del carrito
  let carritoTotal = carrito.reduce(
    (acc, item) => acc + item.cantidad * item.precio,
    0
  );

  return carritoTotal;
}
function mostrarTotalCarrito() {
  // muestra el total abajo a la derecha
  let totalContenedor = document.querySelector(".total-carrito");
  let valorTotal = calcularTotalCarrito();
  let totalCarrito = `
                      <h2>Total</h2>
                      <p>$${valorTotal}</p>
                      `;
  totalContenedor.innerHTML = totalCarrito;
}

// Ejercicio 6 _____________ 1 punto
// • Almacena los productos del carrito en localStorage .
// • Los productos en el localStorage deben estar además con los últimos cambios de carrito y los productos que se hayan
// eliminado del carrito
// • Si existen productos previamente en el localStorage, deben poder verse cuando se cargue la pagina

///MANEJO DE LOCAL STORAGE
function cargarCarritoLS(nombreArr, array) {
  // guarda el carrito en localStorage
  localStorage.setItem(nombreArr, JSON.stringify(array));
}

function traerCarritoLS(nombreArrLocal) {
  // trae el carrito del localStorage
  let items = localStorage.getItem(nombreArrLocal);
  return items ? JSON.parse(items) : [];
}

function actualizarCarrito() {
  // actualiza el localStorage y muestra todo
  cargarCarritoLS("carrito", carrito);
  mostrarCarrito();
  contadorCarrito();
  mostrarTotalCarrito();
}

// Ejercicio 5 _____________ 2 puntos
// 1. Implementar la funcionalidad de carrito, esta debe estar asociada al boton de cada elemento del carrito. El carrito debe
// mostrarse por console.log()
// 2. Incorporar la funcion mostrarCarrito() asociada al boton de cada elemento del carrito El HTML generado debe
// seguir esta estructura:
// <li class="bloque-item">
// <p class="nombre-item">nombreProducto - precioProducto</p>
// <button class="boton-eliminar">Eliminar</button>
// </li>
// 3. Incorporar la funcion eliminarProducto() . Este debe estar asociado al boton del carrito

//////CRUD CARRITO
///abrimos el carrito desde el boton
function abrirCarrito() {
  // abre o cierra el carrito
  let carritoVista = document.querySelector(".seccion-carrito");
  if (carritoVista.style.display === "flex") {
    carritoVista.style.display = "none";
  } else {
    carritoVista.style.display = "flex";
  }
  mostrarCarrito();
}

function mostrarCarrito() {
  // muestra el carrito en el HTML
  let productosLS = traerCarritoLS("carrito");
  const itemsCarrito = document.querySelector("#items-carrito");
  let listadoCarrito = "";
  if (!productosLS.length) {
    itemsCarrito.innerHTML = "<p>Tu carrito esta vacio 😕</p>";
    return;
  }
  for (let i = 0; i < productosLS.length; i++) {
    const producto = productosLS[i];
    listadoCarrito += `
            <li class="item-carrito">
                <img src=${producto.img} alt=${producto.nombre}/>
                <h2>${producto.nombre}</h2>
                <div class="item-carrito-cantidad">
                    <button onclick="disminuirCantidad(${
                      producto.id
                    })">-</button>
                    <p>${producto.cantidad}</p>
                    <button onclick="incrementarCantidad(${
                      producto.id
                    })">+</button>
                </div>
                <p>${producto.precio * producto.cantidad}</p>
                <button onclick="eliminarProducto(${producto.id})">x</button>
            </li>
        `;
  }
  itemsCarrito.innerHTML = listadoCarrito;
}
function agregarProducto(id) {
  // agrega un producto al carrito
  if (!id) {
    throw new Error("Error. El producto con ese id no existe.");
  }
  let producto = frutas.find((p) => p.id === id);
  // llamo a la funcion que verifica que el producto exista en el carrito y me lo devuelve o devuelve undefined si no existe.
  let productoEnCarrito = validarProductoEnElCarrito(producto.id);
  if (!productoEnCarrito) {
    let item = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      img: producto.img,
      cantidad: 1,
    };
    carrito.push(item);
  } else {
    productoEnCarrito.cantidad++;
  }
  actualizarCarrito();
}
// ELIMINAR ITEM
function eliminarProducto(id) {
  // saca un producto del carrito
  carrito = carrito.filter((c) => c.id !== id);
  actualizarCarrito();
}
// Ejercicio 8 _____________ 1 punto
// • Crea dos botones en línea con el título de sección productos.
// • Implementa la funcionalidad para ordenar los productos en estos dos botones. Un boton debe ordenar por nombre los
// productos y el otro por precio de menor a mayor
function ordenarNombre() {
  // ordena los productos por nombre
  frutas.sort((a, b) => a.nombre.localeCompare(b.nombre));
  mostrarProductos(frutas);
}

///////////////////////////////
// ordena la lista de productos de menor a mayor precio
function ordenarPrecio() {
  // ordena los productos por precio (menor a mayor)
  frutas.sort((a, b) => a.precio - b.precio);
  mostrarProductos(frutas);
}

// Ejercicio 9 _____________ 0.5 puntos
// • Implementa la funcionalidad para Vaciar carrito. Crea un botón en la sección carrito que vacíe todo el carrito
//ELIMINAR CARRITO COMPLETO

function eliminarCarrito() {
  // vacía todo el carrito
  carrito = [];
  actualizarCarrito();
}
function init() {
  // función principal que se ejecuta al cargar
  carrito = traerCarritoLS("carrito");
  imprimirDatosAlumno(alumno);
  mostrarProductos(frutas);
  mostrarTotalCarrito();
  buscarProductos();
  contadorCarrito();
}
init();
