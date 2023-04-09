const avatar = document.querySelector("#avatar");
const computerImg = document.querySelector("#compImg");
const input = document.querySelector("input")
const output = document.querySelector("output")
const avatarList = document.querySelector(".login__form-avatar-list");
const avatarItems = [
  {
    id: 1,
    img: "../assets/media/images/avatar-1.png"
  },
  {
    id: 2,
    img: "../assets/media/images/avatar-2.png"
  },
  {
    id: 3,
    img: "../assets/media/images/avatar-3.png"
  },
  {
    id: 4,
    img: "../assets/media/images/avatar-4.png"
  }, {
    id: 5,
    img: "../assets/media/images/avatar-5.png"
  },
]
let avatarID = 1

avatarItems.forEach((item, inx) => {
  let li = document.createElement('li');
  li.className = "login__form-avatar-item"
  li.innerHTML = `
    <img src=${item.img} alt="avatar">
  `;
  avatarList.appendChild(li)
})

const avatarLi = document.querySelectorAll('.login__form-avatar-item');
avatar.innerHTML = `<img class="login__avatar-box" src=${avatarItems[0].img} alt="avatar">`

function imgHandler(avatarIMG) {
  avatarLi.forEach((item, inx) => {
    item.addEventListener('click', () => {
      avatarID = avatarItems[inx].id
      avatarIMG.innerHTML = `<img class="login__avatar-box" src=${avatarItems[inx].img} alt="avatar">`
    })
  })
}
imgHandler(avatar)

const email = document.querySelector("#email")
const submit = document.querySelector("#submit")
const username = document.querySelector("#username")
let usernameValue = ""
let emailValue = ""

username.addEventListener('change', (e) => {
  usernameValue = e.target.value
})
email.addEventListener('change', (e) => {
  emailValue = e.target.value
})

submit.addEventListener("click", () => {
  if (usernameValue.length !== 0 && emailValue.length !== 0) {
    email.classList.remove('error')
    username.classList.remove('error')
    localStorage.setItem('email', emailValue)
    localStorage.setItem('avatarID', avatarID)
    localStorage.setItem('username', usernameValue)
  }
  else {
    email.classList.add('error')
    username.classList.add('error')
  }
})
