const sub3_1 = document.querySelector('#sub3-1')

function surrealText(){

    data = sub3_1.getBoundingClientRect()
    console.log(data.top)
    if(data.top <= 70){
        sub3_1.classList.add('sub3-1-fade')
    }

}

document.addEventListener('scroll',surrealText)