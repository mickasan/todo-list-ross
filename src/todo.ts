interface TodoInterface{
    name:string;
    description: string;
    completed: boolean;
}
class Task implements TodoInterface{
    constructor(public name: string, public description: string, public completed: boolean){}
}
class Tasks{
    public static allTasks: Task[]= new Array;
    createTodoItem(name:string,description:string):number {
        let newItem = new Task(name,description, false);
        let totalCount: number = Tasks.allTasks.push(newItem);
        return totalCount;
    }
}

function toAlltask(task:string, description:string){
    let todo = new Tasks();
    todo.createTodoItem(task, description);
    renderList(false);
    saveStaksToSession(Tasks.allTasks);
    (<HTMLInputElement>document.getElementById("new_todo")).value = "";
    (<HTMLInputElement>document.getElementById("todo_description")).value=""; 
}

function saveStaksToSession(data :any){
    localStorage.clear();
    sessionStorage.setItem('tasks', JSON.stringify(data));
}

function updateTasks(){
    let tasks = <HTMLInputElement>document.getElementById("todo_list");
    tasks.addEventListener('click', (event: { target: any; }) => {
        const target = event.target;
        const id = target.id;
        const type = target.type;
        if (type === 'checkbox') {
           let updatedTask = <HTMLInputElement>document.getElementById(id);
           let isChecked = updatedTask.checked;
           Tasks.allTasks[id].completed = isChecked;
           saveStaksToSession(Tasks.allTasks);
           isChecked
            ? updatedTask.parentElement.parentElement.classList.add('bg-success')
            : updatedTask.parentElement.parentElement.classList.remove('bg-success') ;
        }
      });
}

function renderList(fromSession:boolean) {
    let data:any;
    data = fromSession 
        ? JSON.parse(sessionStorage.getItem('tasks'))
        : Tasks.allTasks ;

    if(data){
        let list='';
        let div = <HTMLDivElement>document.getElementById("todo_list");
        for (let i = 0; i < data.length; i++){
            if(fromSession){
                let newItem = new Task(data[i].name,data[i].description, data[i].completed);
                Tasks.allTasks.push(newItem);
            }
            list += data[i].completed ? '<tr class="bg-success">' : '<tr>';
            list += data[i].completed ? '<td><input type="checkbox" id="' + i + '" name="task" checked></td>':'<td><input type="checkbox" id="' + i + '" name="task" ></td>';
            list += '<td>' + data[i].name + '</td><td>' + data[i].description + '</td>';
            list += '</tr>';

          }
          div.innerHTML = list;
    }
}

window.onload = function() {
    let task= <HTMLInputElement>document.getElementById("new_todo");
    let description = <HTMLInputElement>document.getElementById("todo_description");
    document.getElementById("add_todo").addEventListener('click',()=>toAlltask(task.value, description.value));
    renderList(true);
    updateTasks();
}