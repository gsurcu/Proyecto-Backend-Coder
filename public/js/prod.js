document.getElementById("btn-create").addEventListener("click", () => createProducto());
document.getElementById("btn-update").addEventListener("click", () => updateProducto());
document.getElementById("btn-delete").addEventListener("click", () => deleteProducto());

const getDataById = (id = '') => new URLSearchParams(new FormData(document.getElementById(id)));

const createProducto = () => {
  const datos = getDataById("form-create");console.log(datos)
  let headers = {
    method: "POST",
    body: datos,
    // headers: {"Content-type": "application/json"}
  }
  
  fetch(`/api/productos/`, headers)
  .then(res=>res.json())
  .then(res=>console.log(res));
}

const updateProducto = () => {
  const datos = getDataById("form-update");console.log(datos)
  const p = document.getElementById('p')
  fetch(`/api/productos/${p.innerHTML}`, {
    method: "PUT",
    body: datos
  }).then(res=>res.json())
  .then(res=>console.log(res))
}

const deleteProducto = () => {
  const datos = getDataById("form-delete");

  fetch(`/api/productos/${b._id}`, {
    method: "DELETE"
  }).then(res=>res.json())
  .then(res=>console.log(res))
}
