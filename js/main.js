// MUHAMMADSODIQ  = = = = = = = = = == = =
const Easy = document.querySelector("#Easy");
const Hard = document.querySelector("#Hard");
const Medium = document.querySelector("#Medium");

const headAatar = document.querySelector("#head-avatar");

Easy.addEventListener("click", () => {
  localStorage.setItem("Easy", "Easy");
});
Medium.addEventListener("click", () => {
  localStorage.setItem("Medium", "Medium");
});
Hard.addEventListener("click", () => {
  localStorage.setItem("Hard", "Hard");
});
// = = = = = = = = = = = = = = == = = = = = == = = =
