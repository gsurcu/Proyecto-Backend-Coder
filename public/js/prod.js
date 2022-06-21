const templateProp = document.getElementById('templateProp').content
const fragment = document.createDocumentFragment()

const updateProp = document.getElementById('update-prop')
const updateProps = document.getElementById('update-props')
const updateBtn = document.getElementById('update-button')
const propProd = document.getElementById('propProd')

let props = []

document.querySelector('input.update-add-prop').addEventListener('click', e => { agregar(e)})
updateProps.addEventListener('click', e => { quitar(e)})
document.querySelectorAll('.select').forEach(element => {element.addEventListener('click', e => {select(e)})});
document.querySelectorAll('.unselect').forEach(element => {element.addEventListener('click', e => {unselect(e)})});

const select = (e) => {
  const formProd = e.target.parentElement;
  const form = formProd.parentElement;
  const id = form.querySelector('.form-titulo > h3 > span');
  const selectId = formProd.querySelector('.form-select')

  id.innerHTML = selectId.value;
  formProd.classList.add("none")
  form.querySelector('.form-titulo').classList.remove("none")
  
  if (formProd.id == "update-prod") {
    updateProp.classList.remove("none")
  } else {
    form.querySelector('.form-button').classList.remove("none")
  }
}
const unselect = (e) => {
  const formTitulo = e.target.parentElement;
  const form = formTitulo.parentElement;
  formTitulo.classList.add("none")
  form.querySelector('.form-prod').classList.remove("none")
  
  if (formTitulo.id == "update-titulo") {
    updateProp.classList.add("none")
    updateBtn.classList.add('none')
    updateProps.innerHTML = ''
    props = []
    if (propProd.contains(document.querySelector('.none'))) {
      const collection = propProd.children;
      for (let i = 0; i < collection.length; i++) {
        collection[i].classList.remove('none');
      }
    }
  } else {
    form.querySelector('.form-button').classList.add("none")
  }
}
const agregar = () => {
  if(propProd.value == ''){
    return
  } else {
    const removerOpcion = document.querySelector(`option[value=${propProd.value}]`);
    removerOpcion.classList.add('none')
    
    updateProps.classList.remove('none')
    props.push(propProd.value)
    pintarProps()
    updateBtn.classList.remove('none')
    propProd.value = ''
  }
}
const quitar = (e) => {
  if (e.target.classList.contains('update-del-prop')) {
    const propParent = e.target.parentElement;
    const removerInput = propParent.querySelector('input.prop').id
    const agregarOpcion = document.querySelector(`option[value=${removerInput}]`);
    
    props = props.filter(prop => prop != removerInput)
    pintarProps()
    
    agregarOpcion.classList.remove('none')
  }
  if(updateProps.innerHTML == '') {updateProps.classList.add('none');updateBtn.classList.add('none')}
}
const pintarProps = () => {
  updateProps.innerHTML = ''

  for (const prop of props) {
    const inputProp = templateProp.querySelector('input.prop')
    templateProp.querySelector('label').for = prop;
    inputProp.id = prop;
    inputProp.name = prop;
    inputProp.placeholder = `Ingrese ${prop} del producto`;
    if(prop == 'price'|| prop == 'stock' ){
      inputProp.type = 'number'
    }
    const clone = templateProp.cloneNode(true)
    fragment.appendChild(clone)
  }
  updateProps.appendChild(fragment)   
}