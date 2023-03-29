"use strict";

window.addEventListener("load", initApp);

async function initApp() {
  console.log("App init");
  localStorage.setItem("viewMode", "grid");
  document.querySelector("#view-btn").addEventListener("click", changeView);

  const characters = await getCharacter(
    "https://cederdorff.github.io/dat-js/05-data/southpark.json"
  );
  characters.forEach(showCharacterGrid);
  characters.forEach(showCharacterTable);
  document.querySelector("#number-of-char").textContent = characters.length;
}

function changeView() {
  let view = getView();
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

function getView() {
  const view = localStorage.getItem("viewMode");
  return view;
}

function saveView(view) {
  localStorage.setItem("viewMode", view);
}

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

function showMore() {
  let dots = document.getElementById("dots");
  let moreText = document.getElementById("more");
  let btnText = document.getElementById("readMoreBtn");

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

async function getCharacter(url) {
  console.log("Get Character");
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}
