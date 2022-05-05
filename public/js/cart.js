document.getElementById("create").addEventListener("click", () => createProducto())
document.getElementById("update").addEventListener("click", () => updateProducto())
document.getElementById("delete").addEventListener("click", () => deleteProducto())

const getDataById = (id = '') => new URLSearchParams(new FormData(document.getElementById(id)));

const createProducto = () => {
  const datos = getDataById("formulario1");console.log(datos)
  let headers = {
    method: "POST",
    body: datos,
    // headers: {"Content-type": "application/json"}
  }
  
  fetch(`https://reqres.in/api/users`, headers)
  .then(res=>res.json())
  .then(res=>console.log(res));
}

const updateProducto = () => {
  const datos = getDataById("formulario2");

  fetch(`https://reqres.in/api/users/${b._id}`, {
    method: "PUT",
    body: datos
  }).then(res=>res.json())
  .then(res=>console.log(res))
}

const deleteProducto = () => {
  const datos = getDataById("formulario3");

  fetch(`https://reqres.in/api/users/${b._id}`, {
    method: "DELETE"
  }).then(res=>res.json())
  .then(res=>console.log(res))
}
