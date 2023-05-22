
const discover  = document.querySelector('#discover')
const surreal  = document.querySelector('#surreal')
const firstdiv  = document.querySelector('.firstdiv')
const seconddiv = document.querySelector('.seconddiv')
const thirddiv  = document.querySelector('.thirddiv')

function scrolldiscover(){
    seconddiv.scrollIntoView()
}
function scrollsurreal(){
    thirddiv.scrollIntoView()
}

discover.addEventListener('click',scrolldiscover)
surreal.addEventListener('click',scrollsurreal)