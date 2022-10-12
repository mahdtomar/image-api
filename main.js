const API_KEY = "16339870-38d4a3f87ddf672e6798c0e88";
const category = "industry";
const per_page = "9";
const img = document.createElement("img");
const div = document.createElement("div");
const p = document.createElement("p");
let a = document.createElement("a");
let websiteSource = "https://pixabay.com/users/";
const imgContainer = document.querySelector(".image-container");
let available_opisions = {
  id: 195893,
  pageURL: "https://pixabay.com/en/blossom-bloom-flower-195893/",
  type: "photo",
  tags: "blossom, bloom, flower",
  previewURL:
    "https://cdn.pixabay.com/photo/2013/10/15/09/12/flower-195893_150.jpg",
  previewWidth: 150,
  previewHeight: 84,
  webformatURL: "https://pixabay.com/get/35bbf209e13e39d2_640.jpg",
  webformatWidth: 640,
  webformatHeight: 360,
  largeImageURL: "https://pixabay.com/get/ed6a99fd0a76647_1280.jpg",
  fullHDURL: "https://pixabay.com/get/ed6a9369fd0a76647_1920.jpg",
  imageURL: "https://pixabay.com/get/ed6a9364a9fd0a76647.jpg",
  imageWidth: 4000,
  imageHeight: 2250,
  imageSize: 4731420,
  views: 7671,
  downloads: 6439,
  likes: 5,
  comments: 2,
  user_id: 48777,
  user: "Josch13",
  userImageURL:
    "https://cdn.pixabay.com/user/2013/11/05/02-10-23-764_250x250.jpg",
};
async function requestApi() {
  try {
    await fetch(
      `https://pixabay.com/api/?key=${API_KEY}&category=${category}&safesearch=true&per_page=${per_page}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        Array.from(data.hits).forEach((element) => {
          // cloning html elements to use
          let mainImage = img.cloneNode();
          let containerDiv = div.cloneNode();
          let detailsDiv = div.cloneNode();
          let userImage = img.cloneNode();
          let userName = p.cloneNode();
          let userImageLink = a.cloneNode();
          let imageLink = a.cloneNode();
          // adding the values & attributes
          userName.textContent = element.user;
          userImage.setAttribute("src", element.userImageURL);
          mainImage.setAttribute("src", element.largeImageURL);
          detailsDiv.classList.add("info");
          userImageLink.setAttribute(
            "href",
            `${websiteSource}${element.user}-${element.user_id}/`
          );
          imageLink.setAttribute(
            "href",
            `${element.pageURL}`
          );
        console.log(element)
          // appending phase
          imageLink.appendChild(mainImage)
          userImageLink.appendChild(userImage);
          detailsDiv.appendChild(userImageLink);
          detailsDiv.appendChild(userName);
          containerDiv.appendChild(imageLink);
          containerDiv.appendChild(detailsDiv);
          imgContainer.appendChild(containerDiv);
        });
      });
  } catch (error) {
    console.error(error);
  }
}

requestApi();
