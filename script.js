// Info date 
const dateNumber = document.getElementById('dateNumber'); 
const dateText = document.getElementById('dateText');
const dateMonth = document.getElementById('dateMonth');
const dateYear = document.getElementById('dateYear');
const lista=document.getElementById('usuarios');

// Tasks Container
const tasksContainer = document.getElementById('tasksContainer');

const setDate = () => {
    const date = new Date();
    dateNumber.textContent = date.toLocaleString('es', { day: 'numeric' });
    dateText.textContent = date.toLocaleString('es', { weekday: 'long' });
    dateMonth.textContent = date.toLocaleString('es', { month: 'short' });
    dateYear.textContent = date.toLocaleString('es', { year: 'numeric' });
};

const addNewTask = event => {
    event.preventDefault();
    const { value } = event.target.taskText;
    const value2=document.getElementById("usuarios").value;
    if (!value || !value2) 
    {
      mostrarResultado('Tarea Requerida', false);
      return;
    }
    mostrarResultado('', false);
    let nombre='';
    hacerLlamadaApi(value2).then((data) => {
          nombre=data.username;
          const task = document.createElement('div');
          task.classList.add('task', 'roundBorder');
          task.addEventListener('click', cambiaTaskEstado)
          task.textContent = value + ' - ' + nombre;
          const trashButton = document.createElement("button");
          trashButton.innerHTML = `Elimina`;
          trashButton.classList.add("trash-btn");
          trashButton.addEventListener('click', eliminaItem)
           task.appendChild(trashButton);
          tasksContainer.prepend(task);
          event.target.reset();
        });
    
    
    
};

const eliminaItem = e => {
  e.stopPropagation();
  const item = e.target;
  const elemento = item.parentElement;
  console.log(item);
  console.log(elemento);
  console.log(elemento.textContent);
  
    quita(elemento.textContent).forEach(el => tasksContainer.appendChild(el))

  
  
};

const quita = (_texto) => {
  const toDo = [];
  tasksContainer.childNodes.forEach(el => {
    if (el.textContent == _texto){
    }else
    {
      toDo.push(el);
    } 
})
  return [...toDo];
}

const cambiaTaskEstado = event => {
    event.target.classList.toggle('done');
};

const orderna = () => {
    const done = [];
    const toDo = [];
    tasksContainer.childNodes.forEach(el => {
        el.classList.contains('done') ? done.push(el) : toDo.push(el)
    })
    return [...toDo, ...done];
}

const OrderTasks = () => {
    orderna().forEach(el => tasksContainer.appendChild(el))
}

function cargadatos(){
      llamatodoApi()
        .then((data) => {
          let datos=data;
          
          datos.map(function(dato) {
           const option =document.createElement('option');
           option.value=dato.id;
           option.text=dato.username;
           lista.appendChild(option);
                });

        })
        .catch((error) => {
          mostrarResultado(`Fracaso: ${error.message}`, false);
        });

    }

    function llamatodoApi(){
    return new Promise((resolve, reject) => {
        // Llamada a una API simulada (puedes cambiar la URL)
        fetch('https://jsonplaceholder.typicode.com/users')
          .then((response) => {
            if (response.ok) {
              return response.json(); // Si la respuesta es exitosa, convertimos a JSON
            } else {
              reject(new Error('Error al obtener el usuario.')); // Si hay error, rechazamos
            }
          })
          .then((data) => resolve(data)) // Resolvemos la promesa con los datos obtenidos
          .catch(() => reject(new Error('No se pudo conectar con la API.'))); // Error de red o similar
      });
   }

    function mostrarResultado(mensaje, exito) {
      resultado.textContent = mensaje;
      resultado.className = exito ? 'exito' : 'fracaso';
    }

    function hacerLlamadaApi(_id) {
      return new Promise((resolve, reject) => {
        // Llamada a una API simulada (puedes cambiar la URL)

        const url='https://jsonplaceholder.typicode.com/users/'+_id;

        fetch(url)
          .then((response) => {
            if (response.ok) {

              return response.json(); // Si la respuesta es exitosa, convertimos a JSON
            } else {
              reject(new Error('Error al obtener el usuario.')); // Si hay error, rechazamos
            }
          })
          .then((data) => resolve(data)) // Resolvemos la promesa con los datos obtenidos
          .catch(() => reject(new Error('No se pudo conectar con la API.'))); // Error de red o similar
      });
    }


setDate();