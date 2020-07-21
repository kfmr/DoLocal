const searchBtn = document.querySelector("#page-home main a")
const popUp = document.querySelector("#pop-up")
const closePopUp = document.querySelector("#pop-up .header a")

searchBtn.addEventListener("click", () => {
popUp.classList.toggle("hide")
})

closePopUp.addEventListener("click", () => {
    popUp.classList.toggle("hide")
})
