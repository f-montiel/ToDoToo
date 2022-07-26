//creacion del primer tab como ejemplo.
window.onload = () => {
    document.getElementById("tabName").value = "To Do";
    createTab();
}
// Función para crear los tabs
function createTab(submitEvent) {
    // Previene que se ejecute el evento del submit
    if(submitEvent){
        submitEvent.preventDefault();
    }
    // Obtencion del valor del imput
    let tabName = document.getElementById("tabName");
    let tabNameValue = tabName.value;
    // Obtencion de la Unorder List donde se crearan los tabs
    let toDoNav = document.getElementById("toDoNav");
    // Creacion del list item, agregado de la clases de boostrap correspondiente.
    let toDoTab = document.createElement("li");
    toDoTab.classList.add("nav-item");
    //agrego la clase al item para identificar las posicion de creacion
    toDoTab.classList.add("todo-li");
    // Creacion del link(a) que contiene el nombre del tab, asignacion de clase y atributos
    let toDoA = document.createElement("a");
    toDoA.classList.add("nav-link");
    toDoA.setAttribute("href", "#");
    toDoA.addEventListener("click", function () {
        activeTab(this);
    });
    toDoA.textContent = tabNameValue;
    // Insercion del link en el list item
    toDoTab.appendChild(toDoA);
    // Identificacion de la posicion en la que se insertara en nuevo tab (con la clase todo-li con la que se crean los items de la ul)
    let position = document.getElementsByClassName("todo-li").length;
    // Insercion del item (li) en la unorder list (ul)
    toDoNav.insertBefore(toDoTab, toDoNav.children[position]);
    //Limpiado del valor del imput que no esta funcionando.3
    createArticle(tabNameValue);
    activeTab(toDoA);
    tabName.value = "";
}

// Función para crear la seccion donde incluiremos el nuevo formulario y la lista desordenada
// que utilizaremos en la creacion de los items
function createArticle(idPrefix) {
    // Seccion donde vamos a agregar el articulo
    let newSection = document.getElementById("listContainer");
    // Creación del articulo
    //<article id="">
    let newArticle = document.createElement("article");
    let newArticleId = idPrefix + "Article";
    newArticle.setAttribute("id", newArticleId);
    // Creacion del formulario
    //<form class="form-group my-3">
    let newForm = document.createElement("form");
    newForm.classList.add("form-group", "my-3");
    //Creacion del label
    //<label for="task" class="form-label">Nombre del listado</label>
    let newLabel = document.createElement("label");
    newLabel.classList.add("form-label");
    let newInputId = idPrefix + "Input";
    newLabel.setAttribute("for", newInputId);
    newLabel.textContent = idPrefix;
    // Creacion del input
    // <input type="text" id="task" class="form-control" autofocus placeholder="Ingrese su tarea">
    let newInput = document.createElement("input");
    newInput.setAttribute("type", "text");
    newInput.setAttribute("id", newInputId);
    newInput.classList.add("form-control");
    newInput.setAttribute("autofocus", "true");
    newInput.setAttribute("placeholder", "Nuevo item");
    //Creacion del boton (input submit);
    //<input type="submit" class="btn btn-primary my-3" value="Agregar" onclick="inputValidation(event)">
    let newBtn = document.createElement("input");
    newBtn.setAttribute("type", "submit");
    newBtn.classList.add("btn", "btn-primary", "my-3");
    newBtn.setAttribute("value", "Agregar");
    newBtn.addEventListener("click", function () {
        inputValidation(event, newInputId, newListId);
    });
    //Creacion de la lista desordenada
    //<ul class="list-group" id="taskList">
    let newList = document.createElement("ul");
    newList.classList.add("list-group", "col-12");
    let newListId = idPrefix + "List";
    newList.setAttribute("id", newListId);
    // Insercion de los elementos creados en orden.
    newForm.appendChild(newLabel);
    newForm.appendChild(newInput);
    newForm.appendChild(newBtn);
    newArticle.appendChild(newForm);
    newArticle.appendChild(newList);
    newSection.appendChild(newArticle);
}

// Función para validar que el imput de los listados no este vacio
function inputValidation(submitEvent, newInputId, newListId) {
    // Evita que se ejecute el evento del submit que hace el request y actualiza la pagina y valida HTML
    submitEvent.preventDefault();
    // Valida que el input no este vacio.
    let taskImput = document.getElementById(newInputId);
    let value = taskImput.value;
    if (!value) {
        alert("Debe completar el campo");
    } else {
        createTask(value, newListId);
        taskImput.value = "";
    }
    // slist(document.getElementById(newListId));
}
// Función para crear un elemento de una lista.

let dragedItem = null; //Variable utilizada para identificar el item arrastrado en el drag and drop.

function createTask(value, newListId) {
    let taskList = document.getElementById(newListId);
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item", "d-flex", "align-items-center", "col-12");
    
//Drag and Drop
    //Variable va a contener un array con los items de la ul
    let targetItem = null;
    //Atributo necesario para que se pueda arrastrar un item.
    listItem.draggable = true;
    //Array (arreglo) con todos los items de la lista.
    let dragAndDropItems = taskList.getElementsByTagName("li");
    //Funcion en la que se identifica el elemento que se esta arrastrando cuando se activa el evento drag start
    listItem.ondragstart = (ev) => {
        dragedItem = ev.target;
        while(dragedItem.parentElement != taskList){
            dragedItem = dragedItem.parentElement;
        }
        console.log(dragedItem);
    };
    // Funcion donde se identifica el elemento donde estamos parados luego de inicar el arrastrado
    // y porteriomente comparar si es el mismo que el elemento arrastardo, en caso de que difieren
    // al elemento donde estoy parado le agrego la clase active para que se pinte de azul
    listItem.ondragenter = (ev) => {
        targetItem = ev.target;
        while(targetItem.parentElement != taskList){
            targetItem = targetItem.parentElement;
        }
        console.log(targetItem, dragedItem);
        if (targetItem != dragedItem) { targetItem.classList.add("active"); }
    };
    // Funcion que quita la clase active cuando avandono el elemento donde estaba parado en la funcion anterior.
    listItem.ondragleave = () => {
        targetItem.classList.remove("active");
      };
    //Funcion que se ejecuta mientras suelto el elemento y quita la clase active de todos los items de la lista
    listItem.ondragend = () => { 
        for (let indice of dragAndDropItems) {
            indice.classList.remove("active");
        }
    }
    // Funcion que se ejecuta una vez soltado el elemento e identifica el lugar e inserta el elemento donde corresponde.
    listItem.ondragover = (evt) => { evt.preventDefault(); };
    listItem.ondrop = (evt) => {
        evt.preventDefault();
        if (targetItem != dragedItem) {
          let currentpos = 0;
          let droppedpos = 0;
          for (let it=0; it<dragAndDropItems.length; it++) {
            if (dragedItem == dragAndDropItems[it]) { currentpos = it; }
            if (targetItem == dragAndDropItems[it]) { droppedpos = it; }
          }
          if (currentpos < droppedpos) {
            targetItem.parentNode.insertBefore(dragedItem, targetItem.nextSibling);
          } else {
            targetItem.parentNode.insertBefore(dragedItem, targetItem);
          }
        }
      }
    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    let paragraph = document.createElement("p");
    paragraph.textContent = value;
    paragraph.classList.add("my-0", "mx-3");
    let link = document.createElement("a");
    link.classList.add("bi", "bi-trash", "ms-auto");
    link.setAttribute("href", "#");
    link.addEventListener("click", function () {
        deleteTask(this);
    });
    let inputCheckbox = listItem.appendChild(checkbox);
    let task = listItem.appendChild(paragraph);
    let taskListItem = taskList.appendChild(listItem);
    let deleteIcon = listItem.appendChild(link);
}
function deleteTask(taskListChildItem) {
    let taskListItem = taskListChildItem.parentElement;
    taskListItem.remove();
}

// Funcion para habilitar los tabs

function activeTab(tab) {
    let tabs = document.getElementsByTagName("a");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }
    tab.classList.add("active");
    let articleId = tab.textContent + "Article";
    let articles = document.getElementsByTagName("article");
    for (let i = 0; i < articles.length; i++) {
        articles[i].setAttribute("hidden", "true");
    }
    let activeTab = document.getElementById(articleId);
    activeTab.removeAttribute("hidden");
    let sortableUl = document.getElementById(tab.textContent + "List");
}