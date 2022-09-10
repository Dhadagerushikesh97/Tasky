const taskContainer = document.querySelector(".task__container");
const generateNewCard = (taskData) =>`
                <div class="col-md-6 col-lg-4">
                    <div class="card">
                        <div class="card-header d-flex justify-content-end gap-2">
                            <button type="button" class="btn btn-outline-success"><i class="fa-solid fa-pencil"></i></button>
                            <button type="button" class="btn btn-outline-danger id=${taskData.id} onclick="deleteCard.apply(this,arguments)"><i class="fa-solid fa-trash-can" id=${taskData.id} onclick="deleteCard.apply(this,arguments)"></i></button>
                        </div>
                        <img src=${taskData.imageUrl}>
                        <div class="card-body">
                          <h5 class="card-title">${taskData.taskTitle}</h5>
                          <p class="card-text">
                          <h5 class="card-title">${taskData.taskDescription}</p>
                          <a href="#" class="btn btn-primary">${taskData.taskType}</a>
                        </div>
                        <div class="card-footer">
                            <button type="button" class="btn btn-outline-primary float-end">
                                Open Task
                            </button>
                        </div>
                    </div>
                </div>`;


var globalStore=[];

const loadInitialCardData = () => {
    // local storage to get tasky card data
    const getCardData = localStorage.getItem("tasky");
    // convert from string to normal object
    const {cards} = JSON.parse(getCardData);
    // loop over those of task object to create HTML card
    cards.map((cardObject) => {
        // inject it to DOM
        taskContainer.insertAdjacentHTML("beforeend",generateNewCard(cardObject)); 

        // update our globalstore
        globalStore.push(cardObject);
    })
};

const saveChanges = () =>{
    const taskData = {
        id : `${Date.now()}`, //random digits every second for id
        imageUrl: document.getElementById("imageurl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("tasktype").value,
        taskDescription: document.getElementById("taskdes").value,
    };

    taskContainer.insertAdjacentHTML("beforeend",generateNewCard(taskData)); 
    
    globalStore.push(taskData);

    localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
}; 

const deleteCard = (event) =>{
    event = window.event;
    
    // id
    const targetId = event.target.id;

const tagname=event.target.tagName; // button in capital letters
    // match the id of the element with the id inside the gloabalstore
    // if match found remove

    globalStore = globalStore.filter((cardObject)=> cardObject.id !== targetId);
    localStorage.setItem("tasky",JSON.stringify({cards:globalStore}));
    // contac parent
    if(tagname==="BUTTON"){
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
    }
    else{
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
    }

};