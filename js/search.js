const searchBox = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
  search(searchBox.value);
});

async function search(keyword) {
  url = `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${keyword}`;

  let res = await fetch(url);
  let rawData = await res.json();
  let data = rawData.data;

  cardsArea.innerHTML = "";
  totalCount.innerHTML = `${data.length} Issues`;

  changeBtnStyle();
  data.forEach((item) => createCard(item));
}
