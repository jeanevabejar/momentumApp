document.addEventListener("DOMContentLoaded", function () {
  const hour = document.getElementById("hours");
  const mins = document.getElementById("mins");
  const sec = document.getElementById("sec");
  const dateTime = document.getElementById("day-time");
  const quotesBox = document.getElementById("quotes");
  const quotes = document.getElementById("quotes-data");
  const random = Math.floor(Math.random() * 100);
  const input = document.querySelector(".search");
  const inputBtn = document.querySelector(".search-btn");
  const locate = document.querySelector("#locate");
  const notes = document.querySelector("#notes");
  const settings = document.querySelector(".settings");
  const todolist = document.querySelector(".todolist");
  const mesInput = document.getElementById("mes-input");
  const message = document.getElementById("message");
  const messageBox = document.getElementById("message-box");
  const background = document.getElementById("background-video");
  const backgroundIcon = document.getElementById("background-icon");
  const question = document.getElementById("question");
  const focusInput = document.getElementById("focus-input");
  const focus = document.getElementById("focus");
  const todoInput = document.getElementById("todo-input");
  const btn = document.querySelector(".add");
  const list = document.querySelector(".list");
  const weather = document.querySelector("#forecast");
  const location = document.querySelector("#location");
  const main = document.querySelector("main");

  // clock....
  function zero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  setInterval(function () {
    const d = new Date();
    if (d.getHours() === 12) {
      dateTime.innerText = "PM";
      hour.innerText = zero(d.getHours());
      message.innerText = "Good Day,";
    } else if (d.getHours() > 12 && d.getHours() < 18) {
      dateTime.innerText = "PM";
      hour.innerText = zero(d.getHours() - 12);
      message.innerText = "Good Afternoon,";
    } else if (d.getHours() >= 18 && d.getHours() < 23) {
      dateTime.innerText = "PM";
      hour.innerText = zero(d.getHours() - 12);
      message.innerText = "Good Evening,";
    } else if (d.getHours() === 0) {
      dateTime.innerText = "AM";
      hour.innerText = zero(d.getHours() + 12);
      message.innerText = "Good Night,";
    } else {
      dateTime.innerText = "AM";
      hour.innerText = zero(d.getHours());
      message.innerText = "Good Morning,";
    }
    mins.innerText = zero(d.getMinutes());
    sec.innerText = zero(d.getSeconds());
  }, 1000);

  // quotes && add quotes
let storeQuotes= [];

  const url = `https://dummyjson.com/quotes/${random}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      quotes.textContent = data.quote;
    });

quotes.addEventListener("click", addQuotes);
function addQuotes(){
  const newElem = document.createElement('input');
  quotes.style.display = "none";
  quotesBox.appendChild(newElem);
  newElem.addEventListener('keypress', function(e){
    if(e.key === "Enter" && newElem.value !== ""){
      quotes.style.display = "flex";
      quotes.textContent = newElem.value;
      newElem.style.display ="none";
      storeQuotes.push(newElem.value);
     console.log(savedQuotes);
    }
  
  })
 
}



  //weather && location
  inputBtn.addEventListener("click", fetchApiData);
  input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      fetchApiData();
    }
  });

  function fetchApiData() {
    if (input.value !== "") {
      const srcInput = input.value.trim();
      const url = `https://api.weatherapi.com/v1/current.json?key=de7a83bd59a146d589333904232209&q=${srcInput}`;
      fetch(url)
        .then((Response) => Response.json())
        .then((data) => {
          weather.textContent = data.current.temp_c;
          location.textContent = data.location.name;
        });
      input.value = "";
    } else {
      const url = `https://api.weatherapi.com/v1/current.json?key=de7a83bd59a146d589333904232209&q=$philippines`;
      fetch(url)
        .then((Response) => Response.json())
        .then((data) => {
          weather.textContent = data.current.temp_c;
          location.textContent = data.location.country;
        });
    }
  }
  fetchApiData();

  //toggle setting && to-do
  locate.addEventListener("click", function () {
    settings.classList.toggle("display");
  });

  notes.addEventListener("click", function () {
    todolist.classList.toggle("display");
  });
  main.addEventListener("click", function () {
    todolist.classList.add("display");
    settings.classList.add("display");
  });

  btn.addEventListener("click", adding);

  function adding() {
    const newList = document.createElement("li");
    const newBtn = document.createElement("button");
    if (todoInput.value !== "") {
      newList.textContent = todoInput.value;
      list.appendChild(newList);
      todoInput.value = "";
      newList.appendChild(newBtn);
      newBtn.textContent = "–";
    }
    newBtn.addEventListener("click", removing);
    function removing() {
      list.removeChild(newList);
      const edit = document.createElement("input");
    }
  }
  // name input...
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    displayUserData(savedUser);
  }

  mesInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && mesInput.value !== "") {
      localStorage.setItem("user", mesInput.value);
      displayUserData(mesInput.value);
    }
  });

  function displayUserData(user) {
    const newElem = document.createElement("h2");
    newElem.textContent = user + ".";
    newElem.style.cursor = "pointer";
    messageBox.appendChild(newElem);
    mesInput.style.display = "none";

    newElem.addEventListener("click", function () {
      messageBox.removeChild(newElem);
      mesInput.style.display = "flex";
      mesInput.value = "";
      localStorage.removeItem("user");
    });
  }

  //focus input.....
  focusInput.value = localStorage.getItem("focus");

  focusInput.addEventListener("keypress", function (e) {
    newElem = document.createElement("h1");
    if (e.key === "Enter" && focusInput.value !== "") {
      localStorage.setItem("focus", focusInput.value);
      newElem.textContent = focusInput.value;
      focus.append(newElem);
      question.innerHTML = "<h1>Today</h1>";
      focusInput.style.display = "none";
      newElem.style.cursor = "pointer";
    }
    focus.addEventListener("click", function () {
      focus.removeChild(newElem);
      focusInput.style.display = "flex";
    });
  });

  //background changer...

  const backgroundArr = [
    "https://assets.mixkit.co/videos/preview/mixkit-window-on-a-rainy-day-2846-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-long-running-wave-crashing-onto-shore-48525-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-blast-of-neon-colors-on-water-47352-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-flying-through-dark-matter-in-space-30563-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-stone-sculpture-hands-in-the-dark-32987-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-bubbling-water-in-slow-motion-182-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-night-sky-with-stars-at-a-calm-lake-time-lapse-1704-large.mp4",
    "https://assets.mixkit.co/videos/preview/mixkit-clouds-and-blue-sky-background-2408-large.mp4",
  ];
  backgroundIcon.addEventListener("click", function () {
    const random = Math.floor(Math.random() * backgroundArr.length);
    background.setAttribute("src", backgroundArr[random]);
  });
});
