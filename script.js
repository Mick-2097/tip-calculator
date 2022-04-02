const initial = document.querySelector('.bill')
const percentages = document.querySelectorAll('.percent')
const percent = document.querySelector('.custom')
const divisor = document.querySelector('.head')
const tip = document.querySelector('.final-tip')
const bill = document.querySelector('.final-bill')
const reset = document.querySelector('.reset')
const error = document.querySelector('.error')
const noBill = document.querySelector('.no-bill')
let tipAmount = 0
let validInput = 'false'

percentages.forEach(x => {
    x.addEventListener('click', event => {
        percent.value = ''
        percent.style.border = 'none'
        percent.placeholder = 'custom'
        if (initial.value && !percent.value && divisor.value) {
            tipAmount = event.target.id
            calculate()
        } 
        if (!initial.value) {
            noBill.style.opacity = '1'
            initial.style.border = '2px solid red'
        } else {
            noBill.style.opacity = '0'
            initial.style.border = 'none'
        }
        if (!divisor.value) {
            error.style.opacity = '1'
            divisor.style.border = '2px solid red'
        } else {
            error.style.opacity = '0'
            divisor.style.border = 'none'
        }
    })
})
percent.addEventListener('change', updateValue => {
    if (percent.value > 5 && percent.value <= 500) {
        validInput = 'true'
        percent.style.border = 'none'
        percent.placeholder = 'custom'
    } else {
        validInput = 'false'
    }
    if (initial.value && validInput === 'true' && divisor.value) {
        tipAmount = (percent.value / 100)
        calculate()
    }
    if (!initial.value) {
        noBill.style.opacity = '1'
        initial.style.border = '2px solid red'
    }
    if (validInput === 'false') {
        percent.style.border = '2px solid red'
        percent.value = ''
        percent.placeholder = '6-500'
    }
    if (!divisor.value) {
        error.style.opacity = '1'
        divisor.style.border = '2px solid red'
    }
})
reset.addEventListener('click', event => {
    if (reset.classList.contains('active')) location.reload()
})
reset.addEventListener('mouseenter', event => {
    if (event.target.classList.contains('active')) {
        event.target.style.backgroundColor = 'rgb(159, 232, 223)'
    }
})
reset.addEventListener('mouseleave', event => {
    if (event.target.classList.contains('active')) {
        event.target.style.backgroundColor = 'var(--Strong-cyan)'
    }
})
function calculate() {
    tip.innerText = '$' + (Math.floor(((initial.value * tipAmount) / divisor.value) * 100) / 100).toFixed(2)
    bill.innerText = '$' + ((+initial.value * +tipAmount + +initial.value) / +divisor.value).toFixed(2)
    reset.classList.add('active')
    noBill.style.opacity = '0'
    initial.style.border = 'none'
    error.style.opacity = '0'
    divisor.style.border = 'none'
}