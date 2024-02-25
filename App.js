const mainContentContainer = document.querySelector(".main-content-container")
const dataArr = []
async function getData(){
    const data = await fetch("data.json")
    const response = data.json()
    return response
}

getData()
.then((item) => {
    item.forEach(item => {
        dataArr.push({
            "title":item.title,
            "timeframes": item.timeframes
        })
    })
})
.then(() => {
    mainContentContainer.innerHTML = dataArr.map(cardTemplate).join("")
})
function cardTemplate(item){
    let title = item.title.toLowerCase().trim().replace(" ", "-")
    return `
        <div class="card-container" data-type="${title}">
            <div class="card-body">
                <div class="header">
                    <h3>
                       ${item.title}
                    </h3>
                    <a href="#">
                        <img src="images/icon-ellipsis.svg" alt="Card ${item.title} Option">
                    </a>
                </div>
                <div class="body">
                    <p class="current" data-showed="daily">
                        <span class="main-data">
                            ${item.timeframes.daily.current}hrs
                        </span>
                        <span class="details-data">
                            Last Week - ${item.timeframes.daily.previous}hrs
                        </span>
                    </p>
                    <p data-showed="monthly">
                        <span class="main-data">
                            ${item.timeframes.monthly.current}hrs
                        </span>
                        <span class="details-data">
                            Last Week - ${item.timeframes.monthly.previous}hrs
                        </span>
                    </p>
                    <p data-showed="weekly">
                        <span class="main-data">
                            ${item.timeframes.weekly.current}hrs
                        </span>
                        <span class="details-data">
                            Last Week - ${item.timeframes.weekly.previous}hrs
                        </span>
                    </p>
                </div>
            </div>
        </div>
    `
}

// Navigation Click Events
const calNavContainer = document.querySelector(".cal-nav-container")
const calNavLinks = [...calNavContainer.querySelectorAll("a")]

function getCurrent(){
    let current = calNavContainer.querySelector("a.current")
    let index = calNavLinks.indexOf(current)
    return index
}

calNavLinks.forEach(item => {
    item.addEventListener("click", (e)=>{
        
        e.preventDefault()


        const detailsCard = [...mainContentContainer.querySelectorAll(".body")]
        const filterName = item.innerHTML.toLowerCase().trim()

        detailsCard.forEach(card => {    
            let current = card.querySelector("p.current")
            let cardData = card.querySelector("p[data-showed='"+filterName+"']")
            current.classList.remove("current")
            cardData.classList.add("current")
        })
        
        let i = getCurrent()
        calNavLinks[i].classList.remove("current")
        item.classList.add("current")

    })
})