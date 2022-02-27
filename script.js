const main = document.querySelector("main");
const addUserBtn = document.querySelector(".add-user");
const doubleBtn = document.querySelector(".double");
const showMillBtn = document.querySelector(".show-millioner");
const sortBtn = document.querySelector(".sort");
const calWealthBtn = document.querySelector(".calculate-wealth");
const tableBody = document.querySelector("tbody");

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

//fetch random user and add money
async function getRandomUser() {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)

    }
    addData(newUser)
}

//add user to empty data array
function addData(user) {
    data.push(user);
    createHtml();
}

//create html
function createHtml(providedData = data) {
    tableBody.innerHTML = "";
    providedData.forEach(data => {
        tableBody.innerHTML +=
            `<tr>
            <td>${data.name}</td>
            <td>$ ${formatMoney(data.money)}</td>
        </tr>`
    })
}

//format in money foramt
function formatMoney(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
}

// event listners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillBtn.addEventListener("click", showMillionaire);
calWealthBtn.addEventListener("click", calculateWealth)

//double money button event
function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 }
    });
    createHtml();
}

//sort button event
function sortByRichest() {
    data.sort((a, b) => b.money - a.money);
    createHtml();
}

//filter method 
function showMillionaire() {
    data = data.filter(user => user.money > 1000000);

    createHtml();
}

//calculate wealth

function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
    const tableFoot = document.querySelector("tfoot");

    tableFoot.innerHTML =
        `<tr>
   <td class>Total Wealth:</td>
   <td>$ ${formatMoney(wealth)}</td>
</tr>`
}