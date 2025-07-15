document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("todo-form");
    const input = document.getElementById("todo-input");
    const list = document.getElementById("todo-list");
  
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
  
    function saveTodos() {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  
    function renderTodos() {
      list.innerHTML = "";
      todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.textContent = todo.text;
        if (todo.completed) {
          li.classList.add("completed");
        }
  
        li.addEventListener("click", () => {
          todo.completed = !todo.completed;
          saveTodos();
          renderTodos();
        });
  
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.className = "delete";
        deleteBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          todos.splice(index, 1);
          saveTodos();
          renderTodos();
        });
  
        li.appendChild(deleteBtn);
        list.appendChild(li);
      });
    }
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (text !== "") {
        todos.push({ text, completed: false });
        input.value = "";
        saveTodos();
        renderTodos();
      }
    });
  
    renderTodos();
  });
  
