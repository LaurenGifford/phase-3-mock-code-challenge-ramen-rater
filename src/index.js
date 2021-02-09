// DOM ELEMENTS
const fetchURL = 'http://localhost:3000/ramens'
const ramenMenu = document.querySelector('#ramen-menu')
const ramenDetails = document.querySelector('#ramen-detail')
const newCommentForm = document.querySelector('#ramen-rating')

// EVENT LISTENERS
window.addEventListener('load', getRamen)
ramenMenu.addEventListener('click', getRamenInfo)
newCommentForm.addEventListener('submit', updateInfo)

// LOGIC HANDLERS
function updateInfo(e){
    e.preventDefault()
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
    .then(ramenInfo => displayUpdates(ramenInfo))
}

function displayUpdates(info){
    // if (info.id === newCommentForm.dataset.id){
    const rating = newCommentForm.querySelector('input[type=text]')
    rating.value = info.rating

    const comment = newCommentForm.querySelector('textarea')
    comment.value = info.comment
    // }
}


function getRamenInfo(e){
    const selectedImgId = e.target.dataset.id

    fetch(`${fetchURL}/${selectedImgId}`)
    .then(response => response.json())
    .then(ramenDetails => displayDetails(ramenDetails))
}

function displayDetails(details){
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

    newCommentForm.dataset.id = details.id
}


function getRamen(){
    fetch(fetchURL)
    .then(response => response.json())
    .then(ramenData => {
        ramenData.forEach(ramen => renderRamen(ramen))
    })
}

function renderRamen(ramen){
    const ramenImg = document.createElement('img')
    ramenImg.dataset.id = ramen.id
    ramenImg.className = 'ramen-pic'
    ramenImg.src = ramen.image

    ramenMenu.append(ramenImg)
}
