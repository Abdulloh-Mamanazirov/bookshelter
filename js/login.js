let form = document.querySelector("form");
let username = document.querySelector(".username");
let password = document.querySelector(".password");

// fetch("https://reqres.in/api/login", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({
//     email: "eve.holt@reqres.in",
//     password: "cityslicka",
//   }),
// })
//   .then((res) => res.json())
//   .then((data) => {
//     console.log(data);
//     localStorage.setItem("token", data.token);
//   });

// form.addEventListener("submit", (e) => {
//   e.preventDefault();
//   console.log(username.value, password.value);
//   // window.location.replace("../index.html");
// });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let username = document.querySelector(".username").value;
  let password = document.querySelector(".password").value;

  let data = {
    username: username,
    password: password,
  };

  fetch("https://reqres.in/api/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Something went wrong");
      }
    })
    .then((response) => {
      let token = response.token;
      localStorage.setItem("token", token);
      if (localStorage.getItem("token")) {
        window.location.replace("../index.html");
      }
    })
    .catch((error) => {
      console.log(error);
      document.querySelector('.errorMsg').removeAttribute('hidden')
    });
});
/*
fetch("https://reqres.in/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ username: "eve.holt@reqres.in", password: "cityslicka" }),
})
  .then((res) => res.json())
  .then((data) => console.log(data))
  .catch((err) => console.log(err));

let postData = async () => {
  try {
    let res = await fetch("https://reqres.in/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: "eve.holt@reqres.in", password: "cityslicka" }),
    });
    let data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
postData();
*/