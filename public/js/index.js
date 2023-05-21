
const discover  = document.querySelector('#discover')
const firstdiv  = document.querySelector('.firstdiv')
const seconddiv = document.querySelector('.seconddiv')

const cards     = document.querySelectorAll('.card')

function scrolldiscover(){
    seconddiv.scrollIntoView()
}

function cardclick(){
    console.log(cards)
}

discover.addEventListener('click',scrolldiscover)

cards.forEach((item)=>{
    item.addEventListener('click',cardclick)
})