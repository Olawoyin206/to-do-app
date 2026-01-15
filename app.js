        let addButton = document.getElementById("addItems");
        let itemsContainer = document.getElementById("itemsContainer");

        let todos = [];

        /* -- LOAD FROM LOCAL STORAGE -- */
        loadTodos();
        renderTodos();

        /* ------ ADD ITEM ------- */
        addButton.addEventListener("click", function () {
          let inputItems = document.getElementById("inputItems").value;

          if (inputItems === "") {
            alert("Input Something");
            return;
          }

          todos.push({
            text: inputItems,
            completed: false,
          });

          saveTodos();
          renderTodos();

          document.getElementById("inputItems").value = "";
        });

        /* ----- RENDER TODOS ------ */
        function renderTodos() {
          itemsContainer.innerHTML = "";

          todos.forEach((todo, index) => {
            let li = document.createElement("li");
            let addedItem = document.createElement("p");
            let deleteButton = document.createElement("button");
            let completedTask = document.createElement("input");

            completedTask.type = "checkbox";
            completedTask.checked = todo.completed;

            addedItem.textContent = todo.text;
            deleteButton.textContent = "X";

            /* --- COMPLETE TASK --- */
            completedTask.addEventListener("change", function () {
              todos[index].completed = completedTask.checked;
              saveTodos();
              renderTodos();
            });

            /* --- DELETE TASK --- */
            deleteButton.addEventListener("click", function () {
              todos.splice(index, 1);
              saveTodos();
              renderTodos();
            });

            if (todo.completed) {
              addedItem.style.textDecoration = "line-through";
              addedItem.style.color = "grey";
            }

            li.append(completedTask, addedItem, deleteButton);
            itemsContainer.appendChild(li);
          });
        }

        /* --- SAVE ---- */
        function saveTodos() {
          localStorage.setItem("todos", JSON.stringify(todos));
        }

        /* ---- LOAD ----- */
        function loadTodos() {
          let data = localStorage.getItem("todos");
          if (data) {
            todos = JSON.parse(data);
          }
        }
