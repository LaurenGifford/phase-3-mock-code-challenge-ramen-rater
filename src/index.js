// DOM ELEMENTS
const fetchURL = 'http://localhost:3000/ramens'
const ramenMenu = document.querySelector('#ramen-menu')
const ramenDetails = document.querySelector('#ramen-detail')
const newCommentForm = document.querySelector('#ramen-rating')
const newRamenForm = document.querySelector('#new-ramen')

// EVENT LISTENERS
window.addEventListener('load', getRamen)
window.addEventListener('load', getRamenInfo(1))

document.body.addEventListener('submit', (e) => {
    e.preventDefault()
    switch (true) {
        case (e.target === newCommentForm):
            updateInfo(e)
            break
        case (e.target === newRamenForm):
            addNewRamen(e)
            break
    }
})

ramenMenu.addEventListener('click', (e) => {
    switch (true) {
        case (e.target.className === "delete-button"):
            deleteRamen(e)
            break
        case (e.target.className === "ramen-pic"):
            const ramenId = e.target.dataset.id
            getRamenInfo(ramenId)
            break
    }
})

// LOGIC HANDLERS
function deleteRamen(e){
    const rmvRamenPic = e.target.previousSibling
    const rmvDiv = rmvRamenPic.closest('.img-holder')
    const rmvRamenId = rmvRamenPic.dataset.id

    fetch(`${fetchURL}/${rmvRamenId}`, {
        method: "DELETE"
    })
    .then(() => {
        rmvDiv.remove()
        if (rmvRamenId === ramenDetails.dataset.id){
            removeInfo()
        }
    })
}

function removeInfo(){
    const details = {
        name: "",
        restaurant: "",
        image: "./assets/image-placeholder.jpg",
        rating: "",
        comment: ""
    }
    displayDetails(details)
}

function addNewRamen(e){
     const name = e.target['name'].value
     const restaurant = e.target['restaurant'].value
     const image = e.target['image'].value
     const rating = e.target['rating'].value
     const comment = e.target['new-comment'].value
     const newRamen = {name, restaurant, image, rating, comment}

     fetch(`${fetchURL}`, {
        method : "POST",
        headers : {
            "Content-Type" : 'application/json'
        },
        body : JSON.stringify(newRamen)
    })
    .then(response => response.json())
    .then(ramenInfo => {
        renderRamen(ramenInfo)
        displayDetails(ramenInfo)
    })
    e.target.reset()
}


function updateInfo(e){
    const selectedRamenId = e.target.dataset.id

    const rating = e.target['rating'].value
    const comment = e.target['comment'].value
    const newRamen = {rating, comment}

    fetch(`${fetchURL}/${selectedRamenId}`, {
        method : "PATCH",
        headers : {
            "Content-Type" : 'application/json'
        },
        body : JSON.stringify(newRamen)
    })
    .then(response => response.json())
    .then(ramenInfo => displayDetails(ramenInfo))
}

function getRamenInfo(id){
    fetch(`${fetchURL}/${id}`)
    .then(response => response.json())
    .then(ramenDetails => displayDetails(ramenDetails))
}

function displayDetails(details){
    newCommentForm.dataset.id = details.id
    ramenDetails.dataset.id = details.id

    const img = ramenDetails.querySelector('img')
    img.src = details.image

    const name = ramenDetails.querySelector('h2')
    name.innerText = details.name

    const restaurant = ramenDetails.querySelector('h3')
    restaurant.innerText = details.restaurant

    const rating = newCommentForm.querySelector('input[type=text]')
    rating.value = details.rating

    const comment = newCommentForm.querySelector('textarea')
    comment.value = details.comment
}


function getRamen(){
    fetch(fetchURL)
    .then(response => response.json())
    .then(ramenData => {
        ramenData.forEach(ramen => renderRamen(ramen))
    })
}

function renderRamen(ramen){
    const imgDiv = document.createElement('div')
    imgDiv.className = "img-holder"
    imgDiv.Id = 'img-div'

    const ramenImg = document.createElement('img')
    ramenImg.dataset.id = ramen.id
    ramenImg.className = 'ramen-pic'
    ramenImg.src = ramen.image

    const deleteBtn = document.createElement('button')
    deleteBtn.className = 'delete-button'
    deleteBtn.innerText = "Delete Ramen"

    imgDiv.append(ramenImg, deleteBtn)
    ramenMenu.append(imgDiv)
}

