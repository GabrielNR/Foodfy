const modalOverlay = document.querySelector('.modal-overlay')
const cards = document.querySelectorAll('.card')//card_image-container

for(let card of cards){
    card.addEventListener('click', function(){
        const image_id = card.getAttribute('id')

        modalOverlay.querySelector('img').src = `/layouts/assets/${image_id}`  
        modalOverlay.querySelector('h4').innerText = card.querySelector('h4').innerText
        modalOverlay.querySelector('p').innerText = card.querySelector('p').innerText
        
        
        modalOverlay.classList.add('active');
    })
}

document.querySelector('.close-modal').addEventListener('click', function(){
    modalOverlay.classList.remove('active')
})
