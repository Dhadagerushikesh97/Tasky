const taskContainer = document.querySelector(".task__container");
console.log(taskContainer);
const generateNewCard = (taskData) =>`
                <div class="col-md-6 col-lg-4" id=${taskData.id}>
                    <div class="card">
                        <div class="card-header d-flex justify-content-end gap-2">
                            <button type="button" class="btn btn-outline-success"><i class="fa-solid fa-pencil"></i></button>
                            <button type="button" class="btn btn-outline-danger"><i class="fa-solid fa-trash-can"></i></button>
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


const globalStore=[];

const loadInitialCardData = () => {
    // local storage to get tasky card data
    const getCardData = localStorage.getItem("tasky");
    // convert from string to normal object
    const {cards} = JSON.parse(getCardData);
    // loop over those of task object to create HTML card,inject it to DOM
    cards.map((cardObject) => {
        
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

const deleteCard = () =>{ 


};