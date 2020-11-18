/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
This project takes an array of objects and makes a list of 9 items per page. you can click on the navigation
buttons to move from one page to another as well as search for specific names or characters
*/
/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
/**Global Variables */
const ul = document.querySelector(".student-list");
const linkList = document.querySelector(".link-list");
const headerDiv = document.querySelector(".header");
const page = document.querySelector(".page");

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

/** inserting searchbar */
searchBar();

function showPage(list, page) {
  // to store the start index and the end index of the list items to be displayed on the given page
  let startIndex = page * 9 - 9;
  let EndIndex = page * 9;
  ul.innerHTML = "";

  // looping over list to create elemenets and display them
  for (let i = 0; i < list.length; i++) {
    if (i >= startIndex && i < EndIndex) {
      let li = `<li class="student-item cf">
                  <div class="student-details">
                    <img class="avatar" src="${list[i].picture.medium}" alt="Profile Picture">
                    <h3>${list[i].name.first} ${list[i].name.last}</h3>
                    <span class="email">${list[i].email}</span>
                  </div>
                  <div class="joined-details">
                    <span class="date">Joined ${list[i].registered.date}</span>
                  </div>
                </li>`;
      ul.insertAdjacentHTML("beforeend", li);
    }
  }
}
/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination(list) {
  // this gives us the number of buttons depending on the list provided
  let numberOfButtons = Math.ceil(list.length / 9);
  linkList.innerHTML = "";

  //Looping over numberOfButtons to create and display the buttons
  for (let i = 0; i < numberOfButtons; i++) {
    let li = `<li>
                <button type="button">${i + 1}</button>
              </li>`;
    linkList.insertAdjacentHTML("beforeend", li);
  }
  // highlighting first button
  linkList.firstElementChild.firstElementChild.classList.add("active");

  linkList.addEventListener("click", (e) => {
    // getting the array of buttons so we can loop over them
    const buttons = document.querySelectorAll("Button");
    // Just buttons on the page trigger click event
    if (e.target.tagName === "BUTTON") {
      // here we loop over any button that has class active and we romve it
      for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].classList.contains("active")) {
          buttons[i].classList.remove("active");
        }
      }
      /** adding active class to button clicked and passing its textContent to as the newpage */
      e.target.className = "active";
      let newpage = e.target.textContent;
      showPage(list, newpage);
    }
  });
}

/** this function creates the search bar */
function searchBar() {
  let searchlabel = `<label for="search" class="student-search">
                        <input id="search" placeholder="Search by name...">
                        <button type="button">
                          <img src="img/icn-search.svg" alt="Search icon">
                        </button>
                      </label>`;

  headerDiv.insertAdjacentHTML("beforeend", searchlabel);
}

/** adding functionality to the search bar */
const search = document.querySelector(".student-search");
search.addEventListener("keyup", (e) => {
  let matchingNamesList = [];
  let inputText = e.target.value.toLowerCase().trim();
  /** Now we loop through the list to look for mathcing names and push them to mathcingNamesList */
  for (let i = 0; i < data.length; i++) {
    let fullName = `${data[i].name.first.toLowerCase().trim()} ${data[
      i
    ].name.last
      .toLowerCase()
      .trim()}`;
    //checking if input matches first or last name
    if (fullName.includes(inputText)) {
      matchingNamesList.push(data[i]);
    }
  }
  if(matchingNamesList.length === 0){
    showError();
  }

 
  // this log is to check if the right elements are being pused to array console.log(matchingNamesList);
  showPage(matchingNamesList, 1);
  addPagination(matchingNamesList);
  hideError();

});

/** Adding another event Listner to look for clicks on the search icon */
// this eventListener is simialr to the keyup event so we just changes some variables
search.addEventListener("click", (e) => {
  let inputText = document.querySelector("input").value.trim();
  let matches = [];
  if (e.target.tagName === "IMG") {
    for (let i = 0; i < data.length; i++) {
      let fullName = `${data[i].name.first.toLowerCase().trim()} ${data[
        i
      ].name.last
        .toLowerCase()
        .trim()}`;
      if (fullName.includes(inputText)) {
        matches.push(data[i]);
      }
    }
    // if there are no matching names his play error message
    if (matchingNamesList.length === 0) {
      showError();
    }
    // this log is to check if the right elements are being pused to array console.log(matches);
    showPage(matches, 1);
    addPagination(matches);
    hideError();
  }
});

//Making Error Function to display if no names were found;
function showError(){
  //Inside this function we hide the student ul and display our message
  let h3 = document.createElement("h3");
  h3.textContent = "No results found";
  ul.display = "none";
  headerDiv.append(h3);
}

function hideError(){
  //here we hide the error messge by removing it from the header
  let h3 = document.querySelector("h3");
  headerDiv.removeChild(h3);
}

// Call functions
showPage(data, 1);
addPagination(data);
