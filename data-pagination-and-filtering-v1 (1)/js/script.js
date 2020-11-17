/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/** Inserting search bar */
const headerDiv = document.querySelector(".header");
let searchLabel = document.createElement("label");
searchLabel.className = "student-search";
searchLabel.for = "search";
let input = document.createElement("input");
input.type = "text";
input.id = "search";
input.placeholder = "Search by name...";
let searchButton = document.createElement("button");
searchButton.type = "button";
let searchimg = document.createElement("img");
searchimg.src = "img/icn-search.svg";
searchimg.alt = "search icon";

// Now we append the block to the header div/
searchButton.appendChild(searchimg);
searchLabel.appendChild(input);
searchLabel.appendChild(searchButton);
headerDiv.appendChild(searchLabel);


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
  //the startIndex and endIndex are used to calculate the number of items per page
  let startIndex = page * 9 - 8;
  let endIndex = page * 9;

  const ul = document.querySelector(".student-list");
  ul.innerHTML = "";
  /* here we loop over the list creating 9 students per page and setting their profile information */
  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i <= endIndex) {
      const li = document.createElement("li");
      li.className = "student-item cf";
      const div = document.createElement("div");
      div.className = "student-details";
      const img = document.createElement("img");
      img.className = "avatar";
      img.src = `${list[i].picture.thumbnail}`;
      const h3 = document.createElement("h3");
      h3.textContent = `${list[i].name.first}`;
      const span = document.createElement("span");
      span.className = "email";
      span.textContent = `${list[i].email}`;
      const div2 = document.createElement("div");
      div2.className = "joined-details";
      const span2 = document.createElement("span");
      span2.className = "date";
      span2.textContent = `${list[i].registered.date}`;
      /* once the students are created we append them to the div*/
      ul.appendChild(li);
      li.appendChild(div);
      div.appendChild(img);
      div.appendChild(h3);
      div.appendChild(span);
      li.appendChild(div2);
      div2.appendChild(span2);
    }
  }
}




/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
  let numOfPages = Math.ceil(list.length / 9);
  const ul = document.querySelector(".link-list");
  ul.innerHTML = "";
  /* here we make a loop using numOfPages to create the amount of buttons we need*/
  for (let i = 0; i < numOfPages; i++) {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = `${i + 1}`;
    li.appendChild(button);
    ul.appendChild(li);
    const firstButton = document.querySelector("button");
    firstButton.className = "active";
  }

  ul.addEventListener("click", (e) => {
    const buttons = document.getElementsByTagName("BUTTON");
    /** if statement makes sure the click event is only for the buttons */
    if (e.target.tagName === "BUTTON") {
      let clickedButton = e.target;
      /** this loop check if the buttons have the active class and if they do it remove it */
      for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].classList.contains("active")) {
          buttons[i].classList.remove("active");
        }
      }

      clickedButton.className = "active";
      const page = clickedButton.textContent;
      showPage(list, page);
    }
  });
  // search bar functionality
  searchLabel.addEventListener("keyup", (e) => {
    let newList = [];
    let name = input.value;
    for(let i = 0; i < list.length; i++){
      if(list[i].name.first.toLowerCase().includes(name)){
        newList.push(list[i]);
        showPage(newList, newList.length/9);
        addPagination(newList)
      }
      
    }

  });
  // Click on the search icon functionality //
  searchLabel.addEventListener("click", (e) => {
    if(e.target.tagName === "IMG"){
    let newList = [];
    let name = input.value;
    for (let i = 0; i < list.length; i++) {
      if (list[i].name.first.toLowerCase().includes(name)) {
        newList.push(list[i]);
        showPage(newList, newList.length / 9);
        addPagination(newList);
        
      }
    }
  }
  });
}

//Call functions
showPage(data, 1);
addPagination(data);
