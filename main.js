let myURL = [];

const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");
const saveTabBtn = document.getElementById("saveTab-btn");

let myURLFromLocalStorage = JSON.parse(localStorage.getItem("myURL"));

if (myURLFromLocalStorage) {
    myURL = myURLFromLocalStorage;
    render(myURL);
}

function render(urls) {
    let listItems = "";
    for (let i = 0; i < urls.length; i++) {
        listItems += `
        <li>
            <a target ='_blank' href='${urls[i]}'> 
                ${urls[i]} 
            </a>
        </li>
        `;
    }
    ulEl.innerHTML = listItems;
}

inputBtn.addEventListener("click", function () {
    if (inputEl.value) {
        myURL.push(inputEl.value);
        inputEl.value = "";
        localStorage.setItem("myURL", JSON.stringify(myURL));
    }
    render(myURL);
});

saveTabBtn.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        myURL.push(tabs[0].url);
        localStorage.setItem("myURL", JSON.stringify(myURL));
        render(myURL);
    });
});

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    myURL = [];
    render(myURL);
});
