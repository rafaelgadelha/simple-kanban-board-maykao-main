const cards = document.querySelectorAll('.card')
const dropzones = document.querySelectorAll('.dropzone')
const groupbtndeletetask = document.querySelectorAll('.btndeleteTask')
const groupstatus = document.querySelectorAll('.status')
addIdCards()
addFuncDeleteTask()



function addIdCards(){
  let cards = document.querySelectorAll('.card')
  cards.forEach(function(card, index){
    card.addEventListener('dragstart', dragstart)
    card.addEventListener('drag', drag)
    card.addEventListener('dragend', dragend)
    card.setAttribute('id', 'card'+ index);
  })
}

function dragstart(){
  dropzones.forEach( dropzone => dropzone.classList.add('highlight'))
  this.classList.add('is-dragging')  
}
function drag(){
}
function dragend(){
  dropzones.forEach( dropzone => dropzone.classList.remove('highlight'))
  this.classList.remove('is-dragging')
  saveData()
}

dropzones.forEach(dropzone => {
  dropzone.addEventListener('dragenter', dragenter)
  dropzone.addEventListener('dragover', dragover)
  dropzone.addEventListener('dragleave', dragleave)
  dropzone.addEventListener('drop', drop)
})


function dragenter(){
}
function dragover(ev){
  ev.preventDefault();
  this.classList.add('over')
  const cardBeingDragged = document.querySelector('.is-dragging')
  this.appendChild(cardBeingDragged)
}
function dragleave(){
  this.classList.remove('over')
}
function drop(ev){
  ev.preventDefault()
  this.classList.remove('over')
  
  
  let cardsTodo = document.querySelectorAll(".todo> .card> .status")
  cardsTodo.forEach(cardTodo =>{
    cardTodo.classList.remove("blue", "green")
    cardTodo.classList.add("yellow")
  })
  let cardsProgress = document.querySelectorAll(".progress> .card> .status")
  cardsProgress.forEach(cardProgress =>{
    cardProgress.classList.remove("yellow", "green")
    cardProgress.classList.add("blue")
  })
  let cardsDone = document.querySelectorAll(".done> .card> .status")
  cardsDone.forEach(cardDone =>{
    cardDone.classList.remove("blue", "yellow")
    cardDone.classList.add("green")
  })

}

document.querySelector('.addtask').addEventListener("click", addTask)

function addTask(e, status, title, description){
  if(e !== undefined){e.preventDefault()}
  let statusT
  let titleT
  let descriptionT
  
  if(status !== undefined){statusT = status}else{statusT = 'yellow'}
  if(title !== undefined){titleT = title}else{titleT = ''}
  if(description !== undefined){descriptionT = description}else{descriptionT = ''}
  
  let card = document.createElement('div')
    card.classList.add('card')
    card.setAttribute('draggable', true)
      let statusBar = document.createElement('div')
        statusBar.classList.add('status', statusT)
      card.appendChild(statusBar)
      let btnDeleteTask = document.createElement('div')
        btnDeleteTask.classList.add('btndeleteTask', 'hide')
        let linkDeleteTask = document.createElement('a')
          linkDeleteTask.setAttribute('href', '#')
          linkDeleteTask.innerHTML = 'X'
          btnDeleteTask.appendChild(linkDeleteTask)
      card.appendChild(btnDeleteTask)
      let content = document.createElement('div')
        content.classList.add('content')
        let inputTaskTitle = document.createElement('input')
          inputTaskTitle.setAttribute('type', 'text')
          inputTaskTitle.setAttribute('name', 'taskTitle')
          inputTaskTitle.setAttribute('value', titleT)
          inputTaskTitle.setAttribute('placeholder', 'Task Title')
          inputTaskTitle.setAttribute('onChange', "saveData()")
        content.appendChild(inputTaskTitle)
      card.appendChild(content)
      let descriptionTask = document.createElement('div')
        descriptionTask.classList.add('description')
        let descriptionText = document.createElement('textarea')
          descriptionText.innerHTML = descriptionT
          descriptionText.setAttribute('placeholder', 'Task description')
          descriptionText.setAttribute('onChange', "saveData()")
          descriptionText.classList.add('description-text')
          descriptionTask.appendChild(descriptionText)
      card.appendChild(descriptionTask)
      if(statusT == 'yellow'){
        document.querySelector('.todo').appendChild(card)
        
      }else if(statusT == 'blue'){
        document.querySelector('.progress').appendChild(card)
        
      }else if(statusT == 'green'){
        document.querySelector('.done').appendChild(card)
        
      }

addIdCards()
addFuncDeleteTask() 
}

function saveData(e){
  if(e!== undefined){e.preventDefault()}
  var dadosCards = []
  let i = 0
  let cards = document.querySelectorAll('.card')
    cards.forEach(card => {
      let statusTask = cards[i].childNodes[0].classList.value.substring(7, 13)
      if(statusTask.match(/green/)){
        statusTask = 'green'
      }else if(statusTask.match(/blue/)){
        statusTask = 'blue'
      }else if(statusTask.match(/yellow/)){
        statusTask = 'yellow'
      }
      let titleTask = cards[i].childNodes[2].childNodes[0].value
      let descriptionTask = cards[i].childNodes[3].childNodes[0].value
      dadosCards.push(
          {id: i++,
           statusCard: statusTask,
           titleCard: titleTask,
           descriptionCard: descriptionTask
      })
    })
    localStorage.clear
    localStorage.dadosCards = JSON.stringify(dadosCards)
}

function recoveryData(){
  dadosCards = JSON.parse(localStorage.dadosCards)
  if(dadosCards.length != 0){

  for(let i = 0; i < dadosCards.length; i++){
    let status = dadosCards[i].statusCard
    let title = dadosCards[i].titleCard
    let description = dadosCards[i].descriptionCard
     addTask(undefined, status, title, description)
  }
}
}

const btnRemoveTask = document.querySelector('.removetask')
btnRemoveTask.addEventListener("click", removeTask)
function removeTask(e){
  if(e !== undefined) {e.preventDefault()}
  const groupbtndeletetask = document.querySelectorAll('.btndeleteTask')
  const groupstatus = document.querySelectorAll('.status')
  if(btnRemoveTask.classList.contains("clicked")){
    btnRemoveTask.classList.remove('clicked')
    groupstatus.forEach(status =>{
      status.classList.add('show')
      status.classList.remove('hide')
    })
    groupbtndeletetask.forEach(btnDeleteTask =>{
      btnDeleteTask.classList.add('hide')
      btnDeleteTask.classList.remove('show')
    })
  }else{
    groupstatus.forEach(status =>{
      status.classList.add('hide')
      status.classList.remove('show')
    })
    groupbtndeletetask.forEach(btnDeleteTask =>{
      btnDeleteTask.classList.add('show')
      btnDeleteTask.classList.remove('hide')
    })
    btnRemoveTask.classList.add('clicked')
  }  
}

function addFuncDeleteTask(){
  let groupbtndeletetask = document.querySelectorAll('.btndeleteTask')
  groupbtndeletetask.forEach(btnDeleteTask =>{
    btnDeleteTask.addEventListener('click', deleteTask)
  })
}

function deleteTask(e){
  e.preventDefault();
  id = this.parentElement.getAttribute('id')
  document.querySelector("#"+id).remove()
  removeTask()
  saveData()
}

recoveryData()
