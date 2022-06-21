document.getElementById("btn-create").addEventListener("click", () => createProducto());
document.getElementById("btn-update").addEventListener("click", () => updateProducto());
document.getElementById("btn-delete").addEventListener("click", () => deleteProducto());

const getDataById = (id = '') => new URLSearchParams(new FormData(document.getElementById(id)));

const createCarrito = () => {
  const datos = getDataById("form-create");console.log(datos)
  
  fetch(`/api/carrito/`, {
    method: "POST",
    body: datos,
  }).then(res=>res.json())
  .then(res=>console.log(res));
}

const deleteCarrito = () => {
  const idCart = document.getElementById('delete-id')
  fetch(`/api/carrito/${idCart.innerHTML}`, {
    method: "DELETE"
  }).then(res=>res.json())
  .then(res=>console.log(res))
}

const addProducto = () => {
  const datos = getDataById("update-form");console.log(datos)
  const id = document.getElementById('update-id')
  const idCart = document.getElementById('update-id')
  
  fetch(`/api/carrito/${idCart.innerHTML}/productos/${id.innerHTML}`, {
    method: "POST",
    body: datos
  }).then(res=>res.json())
  .then(res=>console.log(res))
}

const deleteProducto = () => {
  const id = document.getElementById('update-id')
  const idCart = document.getElementById('update-id')
  
  fetch(`/api/carrito/${idCart.innerHTML}/productos/${id.innerHTML}`, {
    method: "DELETE"
  }).then(res=>res.json())
  .then(res=>console.log(res))
}
