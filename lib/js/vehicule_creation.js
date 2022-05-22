/** first select **/
const firstSelect = document.getElementById("firstSelect");
/* firsts paiement methods */
const firstEmprunt = document.getElementById("firstSelectEmprunt");
const firstAutofinancement = document.getElementById("firstSelectAutofinancement");
const firstCreditBail = document.getElementById("firstSelectCreditBail");
const firstLocFinanciere = document.getElementById("firstSelectLocFinanciere");

firstSelect.addEventListener('change', (e) => {
    if (+e.target.value === 1) {
        firstEmprunt.style.display = 'block'
    } else {
        firstEmprunt.style.display = 'none'
    }
})

firstSelect.addEventListener('change', (e) => {
    if (+e.target.value === 2) {
        firstAutofinancement.style.display = 'block'
    } else {
        firstAutofinancement.style.display = 'none'
    }
})

firstSelect.addEventListener('change', (e) => {
    if (+e.target.value === 3) {
        firstCreditBail.style.display = 'block'
    } else {
        firstCreditBail.style.display = 'none'
    }
})

firstSelect.addEventListener('change', (e) => {
    if (+e.target.value === 4) {
        firstLocFinanciere.style.display = 'block'
    } else {
        firstLocFinanciere.style.display = 'none'
    }
})

/** second select **/
const secondSelect = document.getElementById("secondSelect");
/* second paiement methods */
const secondEmprunt = document.getElementById("secondSelectEmprunt");
const secondAutofinancement = document.getElementById("secondSelectAutofinancement");
const secondCreditBail = document.getElementById("secondSelectCreditBail");
const secondLocFinanciere = document.getElementById("secondSelectLocFinanciere");

secondSelect.addEventListener('change', (e) => {
    if (+e.target.value === 5) {
        secondEmprunt.style.display = 'block'
    } else {
        secondEmprunt.style.display = 'none'
    }
})

secondSelect.addEventListener('change', (e) => {
    if (+e.target.value === 6) {
        secondAutofinancement.style.display = 'block'
    } else {
        secondAutofinancement.style.display = 'none'
    }
})

secondSelect.addEventListener('change', (e) => {
    if (+e.target.value === 7) {
        secondCreditBail.style.display = 'block'
    } else {
        secondCreditBail.style.display = 'none'
    }
})

secondSelect.addEventListener('change', (e) => {
    if (+e.target.value === 8) {
        secondLocFinanciere.style.display = 'block'
    } else {
        secondLocFinanciere.style.display = 'none'
    }
})