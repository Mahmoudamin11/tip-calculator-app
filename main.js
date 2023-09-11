let billIn = document.querySelector("input#bill");
let noOfPersons = document.querySelector("input#no");

let reset = document.querySelector("button");

let percents = document.querySelectorAll(".opt");

let custom = document.querySelector(".custom");
let afterCustom = document.querySelector("#after-custom");
let errorP = document.querySelector("p.error");

let amountSpan = document.querySelector("span.js-amount")
let totalSpan = document.querySelector("span.js-total")

let form = document.querySelector("form.filing");

let chosenPer = false, percent;

billIn.addEventListener('focus', (e) => {
    e.target.style.border = "1px solid var(--Strong-cyan)";

})

billIn.addEventListener('blur', (e) => {

    e.target.style.border = "none";
    if (noOfPersons.value == "" || +noOfPersons.value === 0) {
        noOfPersons.style.cssText = "border: 1px solid hsla(4, 90%, 58%, 1)";
        errorP.style.cssText = "visibility: visible;";
    } else {
        noOfPersons.style.cssText = "border: none"
        errorP.style.cssText = "visibility: hidden;";
    }
    readyOrNot();
})

noOfPersons.addEventListener('focus', (e) => {
    e.target.style.cssText = "border: 1px solid hsl(172, 67%, 45%)";
})


noOfPersons.addEventListener('blur', (e) => {
    persons = +noOfPersons.value;

    e.target.style.cssText = "border: none";
    if (noOfPersons.value == "" || +noOfPersons.value === 0) {
        noOfPersons.style.cssText = "border: 1px solid hsla(4, 90%, 58%, 1)"
        errorP.style.cssText = "visibility: visible;";
    } else {
        noOfPersons.style.cssText = "border: none"
        errorP.style.cssText = "visibility: hidden;";
    }
    readyOrNot();
})

afterCustom.addEventListener('focus', (e) => {
    e.target.style.border = "1px solid var(--Strong-cyan)";
})

afterCustom.addEventListener('blur', (e) => {
    if (afterCustom.value === "" || +afterCustom.value === 0) {
        e.target.style.border = "1px solid hsla(4, 90%, 58%, 1)"
    } else {

        e.target.style.border = "1px solid black";
    }
    readyOrNot();
    // percent = +afterCustom.value;
})


if (billIn.value === "") {
    reset.style.cssText = "opacity: 0.3; pointer-events: none;";
}

billIn.addEventListener('change', () => {
    if (billIn.value !== "") {
        reset.style.cssText = "opacity: 1;";
    } else if (billIn.value === "") {
        reset.style.cssText = "opacity: 0.3; pointer-events: none;";
    }
})

document.addEventListener('click', (e) => {
    if (e.target.classList.contains("opt") === true) {
        percents.forEach((el) => {
            el.style.cssText = "background-color: var(--Very-dark-cyan); color: var(--White)";
        });
        e.target.style.cssText = "background-color: var(--Strong-cyan); color: var(--Very-dark-cyan);"
        custom.style.display = "block";
        afterCustom.style.display = "none";
        percent = +e.target.dataset.tech;
        chosenPer = true;
        readyOrNot();
    }
})

custom.addEventListener('click', (e) => {
    percents.forEach((el) => {
        el.style.cssText = "background-color: var(--Very-dark-cyan); color: var(--White)";
    });
    e.target.style.display = "none";
    afterCustom.style.display = "block";
    chosenPer = false;
})

function readyOrNot() {

    if (billIn.value !== "" && +billIn.value !== 0 && (chosenPer === true || afterCustom.value !== "") && noOfPersons.value !== "" && +noOfPersons != 0) {
        if (chosenPer) {
            calPer(+billIn.value, +percent, +noOfPersons.value);
        } else if (chosenPer == false) {
            calNoPer(+billIn.value, +afterCustom.value, +noOfPersons.value);
        }
    }
}

function calPer(billin, per, no) {
    let am = billin * (per / 100) / no;
    let total = (billin / no) + am;
    if (am != undefined && am != NaN) {
        amountSpan.innerHTML = '$' + am;
    }

    if (total != undefined && total != NaN) {
        totalSpan.innerHTML = '$' + total;
    }
}

function calNoPer(b, tip, num) {
    let am = tip / num;
    let total = (b / num) + am;
    if (am != undefined && am != NaN) {
        amountSpan.innerHTML = '$' + am;
    }

    if (total != undefined && total != NaN) {
        totalSpan.innerHTML = '$' + total;
    }
}

reset.addEventListener('click', () => {
    window.location.reload();
})
