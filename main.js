const API_KEY = "16339870-38d4a3f87ddf672e6798c0e88";
const per_page = "30";
const selectMenu = document.getElementById("category");
let category = "all";
const theme = document.getElementById("theme");
const searchBar = document.getElementById("search_bar");
const opitions = document.querySelectorAll(".opition");
const activationBtn = document.querySelector(".activate");
let q = "";
const img = document.createElement("img");
const div = document.createElement("div");
const p = document.createElement("p");
let a = document.createElement("a");
let websiteSource = "https://pixabay.com/users/";
const imgContainer = document.querySelector(".image-container");

async function requestApi() {
  try {
    imgContainer.innerHTML = "";
    await fetch(
      `https://pixabay.com/api/?key=${API_KEY}&category=${category}&safesearch=true&per_page=${per_page}&q=${q}&orientation=${"horizontal"}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.hits == "") {
          let noResultDiv = div.cloneNode();
          let noResultContent = p.cloneNode();
          noResultDiv.classList.add("no-result");
          noResultContent.textContent = "No Results Were found";
          noResultDiv.appendChild(noResultContent);

          imgContainer.appendChild(noResultDiv);
        } else {
          Array.from(data.hits).forEach((element) => {
            // cloning html elements to use
            let mainImage = img.cloneNode();
            let containerDiv = div.cloneNode();
            let detailsDiv = div.cloneNode();
            let userImage = img.cloneNode();
            let userName = p.cloneNode();
            let userImageLink = a.cloneNode();
            let imageLink = a.cloneNode();
            // clearing root div

            // adding the values & attributes
            userName.textContent = element.user;
            userImage.setAttribute("src", element.userImageURL);
            mainImage.setAttribute("src", element.largeImageURL);
            detailsDiv.classList.add("info");
            userImageLink.setAttribute(
              "href",
              `${websiteSource}${element.user}-${element.user_id}/`
            );
            imageLink.setAttribute("href", `${element.pageURL}`);
            // appending phase
            imageLink.appendChild(mainImage);
            userImageLink.appendChild(userImage);
            detailsDiv.appendChild(userImageLink);
            detailsDiv.appendChild(userName);
            containerDiv.appendChild(imageLink);
            containerDiv.appendChild(detailsDiv);
            imgContainer.appendChild(containerDiv);
          });
        }
      });
  } catch (error) {
    console.error(error);
  }
}
selectMenu.addEventListener("change", () => {
  category = selectMenu.value;
});
requestApi();
activationBtn.addEventListener("click", () => {
  q = searchBar.value;
  requestApi();
});
theme.addEventListener("change", () => {
  document.body.classList.toggle("dark-theme");
});
