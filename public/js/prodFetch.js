document.getElementById("btn-create").addEventListener("click", () => createProducto());
document.getElementById("btn-update").addEventListener("click", () => updateProducto());
document.getElementById("btn-delete").addEventListener("click", () => deleteProducto());

const getDataById = (id = '') => new URLSearchParams(new FormData(document.getElementById(id)));

const createProducto = () => {
  const datos = getDataById("form-create");console.log(datos)
  
  fetch(`/api/productos/`, {
    method: "POST",
    body: datos,
  }).then(res=>res.json())
  .then(res=>console.log(res));
}

const updateProducto = () => {
  const datos = getDataById("update-form");console.log(datos)
  const id = document.getElementById('update-id')
  
  fetch(`/api/productos/${id.innerHTML}`, {
    method: "PUT",
    body: datos
  }).then(res=>res.json())
  .then(res=>console.log(res))
}

const deleteProducto = () => {
  const id = document.getElementById('delete-id')
  fetch(`/api/productos/${id.innerHTML}`, {
    method: "DELETE"
  }).then(res=>res.json())
  .then(res=>console.log(res))
}
