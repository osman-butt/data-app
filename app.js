"use strict";

window.addEventListener("load", initApp);

// Initialize app
async function initApp() {
  console.log("App init");
  // Set grid view as default
  localStorage.setItem("viewMode", "grid");
  document.querySelector("#view-btn").addEventListener("click", changeView);

  // Fecth json data
  const characters = await getCharacter(
    "https://cederdorff.github.io/dat-js/05-data/southpark.json"
  );
  // Display data in grid and table view
  characters.forEach(showCharacterGrid);
  characters.forEach(showCharacterTable);
  // Display number of characters
  document.querySelector("#number-of-char").textContent = characters.length;
}

// This function is called when the view button is clicked. It switches between the grid and table views
function changeView() {
  const view = getView();
  if (view == "grid") {
    this.textContent = "Show grid view";
    saveView("table");
    document.querySelector("#grid").offsetLeft;
    document.querySelector("#grid").classList.add("hidden");
    document.querySelector("#table-characters").classList.remove("hidden");
  } else {
    this.textContent = "Show table view";
    saveView("grid");
    document.querySelector("#grid").offsetLeft;
    document.querySelector("#grid").classList.remove("hidden");
    document.querySelector("#table-characters").offsetLeft;
    document.querySelector("#table-characters").classList.add("hidden");
  }
}

// Retrieve view mode = table or grid
function getView() {
  const view = localStorage.getItem("viewMode");
  return view;
}

// Set view mode = table or grid
function saveView(view) {
  localStorage.setItem("viewMode", view);
}

// Generate the HTML for displaying a single character in grid format
function showCharacterGrid(character) {
  console.log("showCharacterGrid");
  const characterHTML = /*html*/ `
        <article class="grid-item">
          <img
            src="${character.image}"
            alt=""
          />
          <h2 style="text-align: center;">${character.name}</h2>
          <p><span class="object-property">Age:</span> ${character.age}</p>
          <p><span class="object-property">Ocupation:</span> ${character.occupation}</p>
          <p><span class="object-property">Voiced by:</span> ${character.voicedBy}</p>
        </article>
  `;
  document
    .querySelector("#grid-characters")
    .insertAdjacentHTML("beforeend", characterHTML);

  document
    .querySelector("#grid-characters article:last-child")
    .addEventListener("click", function () {
      showDetails(character);
    });
}

// Generate the HTML for displaying a single character in grid table
function showCharacterTable(character) {
  console.log("showCharacterTable");
  const characterHTML = /*html*/ `
    <tr>
      <td class="img-col">
        <img src="${character.image}" alt="" class="table-item"/>
      </td>
      <td>${character.name}</td>
      <td>${character.age}</td>
      <td class="gender-col">${character.gender}</td>
      <td class="ocupation-col">${character.occupation}</td>
    </tr>
  `;
  document
    .querySelector("#table-characters")
    .querySelector("tbody")
    .insertAdjacentHTML("beforeend", characterHTML);

  document
    .querySelector("#table-characters tbody tr:last-child")
    .addEventListener("click", function () {
      showDetails(character);
    });
}

// This function is called when a character is clicked. It shows the details for the cliked character
function showDetails(character) {
  console.log("Show details");
  console.log(character);
  document.querySelector("#dialog-name").textContent = character.name;
  document.querySelector("#dialog-nickname").textContent = character.nickname;
  document.querySelector("#dialog-ocupation").textContent =
    character.occupation;
  document.querySelector("#dialog-age").textContent = character.age;
  document.querySelector("#dialog-voicedby").textContent = character.voicedBy;
  document.querySelector("#dialog-gender").textContent = character.gender;
  document.querySelector("#dialog-religion").textContent = character.religion;
  document.querySelector("#dialog-catchphrase").textContent =
    character.catchPhrase;
  document.querySelector("#dialog-haircolor").textContent = character.hairColor;
  document.querySelector("#dialog-schoolgrade").textContent =
    character.schoolGrade;

  // If there are more than 6 episodes, then a read more btn is added,
  // and data is hidden. The data can then be accessed by clicking
  // the read more btn.
  if (character.episodes != null) {
    if (character.episodes.length > 46) {
      const episodesHTML = /*html*/ `
      ${character.episodes.substr(
        0,
        46
      )} <span id="dots">...</span><span id="more">
      ${character.episodes.substr(
        46
      )}</span><button id="readMoreBtn">Read more</button></p>
    `;
      document.querySelector("#dialog-episodes").innerHTML = episodesHTML;
      document
        .querySelector("#readMoreBtn")
        .addEventListener("click", showMore);
    } else {
      document.querySelector("#dialog-episodes").textContent =
        character.episodes;
    }
  } else {
    document.querySelector("#dialog-episodes").textContent = character.episodes;
  }
  document.querySelector("#dialog-appearances").textContent =
    character.appearances;
  document.querySelector("#dialog-firstAppearance").textContent =
    character.firstAppearance;
  document.querySelector("#dialog-img").src = character.image;
  document.querySelector("#dialog-character").showModal();
}

// This function is called when the read more btn is clicked,
// in the details view
function showMore() {
  let dots = document.querySelector("#dots");
  let moreText = document.querySelector("#more");
  let btnText = document.querySelector("#readMoreBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}

// This function fetches the character data from a json file
// and returns it as an array of objects.
async function getCharacter(url) {
  console.log("Get Character");
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}
