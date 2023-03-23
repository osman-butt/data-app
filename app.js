"use strict";

window.addEventListener("load", initApp);

async function initApp() {
  const wendy = await getCharacter("wendy.json");

  showCharacter(wendy);
  showCharacter(wendy);
  showCharacter(wendy);
}

function showCharacter(character) {
  console.log("showCharacter");
  const characterHTML = /*html*/ `
          <article class="grid-item">
          <img
            src="${character.image}"
            alt=""
          />
          <h2>${character.name}</h2>
          <p>Ocupation: ${character.occupation}</p>
          <p>Age: ${character.age}</p>
          <p>Voice by: ${character.voicedBy}</p>
        </article>
  `;
  document
    .querySelector("#characters")
    .insertAdjacentHTML("beforeend", characterHTML);

  document
    .querySelector("#characters article:last-child")
    .addEventListener("click", showDetails);

  function showDetails() {
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
    document.querySelector("#dialog-haircolor").textContent =
      character.hairColor;
    document.querySelector("#dialog-schoolgrade").textContent =
      character.schoolGrade;
    document.querySelector("#dialog-episodes").textContent = character.episodes;
    document.querySelector("#dialog-appearances").textContent =
      character.appearances;
    document.querySelector("#dialog-firstAppearance").textContent =
      character.firstAppearance;
    document.querySelector("#dialog-img").src = character.image;
    document.querySelector("#dialog-character").showModal();
  }
}

async function getCharacter(url) {
  console.log("Get Character");
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

// {
//   "name": "Wendy Testaburger",
//   "nickname": "Wendyl Testaburger",
//   "image": "https://static.wikia.nocookie.net/southpark/images/9/9e/Wendyy.png",
//   "occupation": "Student",
//   "age": 10,
//   "voicedBy": "April Stewart",
//   "gender": "Female",
//   "religion": "Atheist",
//   "catchPhrase": "",
//   "hairColor": "Black",
//   "schoolGrade": 4,
//   "episodes": "1,2,7,8,9,11,20,22,24,25,36,41,42,51,54,55,56,59,61,63,72,74,89,110,119,123,134,135,142,167,174,176,180,183,185,186,190,194,199,205,213,217,219,221,230,231,239,247,249,250,255,261,262,263,268,269,271,272,284,285,286,292,301,308,310",
//   "episodes": "S01E01, S01E02, S01E07, S01E08, S01E09, S01E11, S02E07, S02E09, S02E11, S02E12, S03E05, S03E10, S03E11, S04E03, S04E06, S04E07, S04E08, S04E11, S04E13, S04E15, S05E07, S05E09, S06E10, S07E14, S08E08, S08E12, S09E09, S09E10, S10E03, S11E14, S12E07, S12E09, S12E13, S13E02, S13E04, S13E05, S13E09, S13E13, S14E04, S14E10, S15E04, S15E08, S15E10, S15E12, S16E07, S16E08, S17E02, S17E10, S18E02, S18E03, S18E08, S19E04, S19E05, S19E06, S20E01, S20E02, S20E04, S20E05, S21E07, S21E08, S21E09, S22E05, S23E04, S24E01, S25E01",
//   "appearances": 65,
//   "firstAppearance": "S01E01"
// }
