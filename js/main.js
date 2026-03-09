const cardsArea = document.getElementById("cardsArea");
const loading = document.getElementById("loading");
const totalCount = document.getElementById("totalCount");

const modalTrigger = document.getElementById("singleDetails");
const modalDetails = document.querySelector("#singleDetails .modal-box");

let currentButton = "all";
const statusButtons = document.querySelectorAll("section .butam");

// EventListner on Buttons
statusButtons.forEach((item) => {
  item.addEventListener("click", () => {
    //changing the current button status
    currentButton = item.innerText.toLowerCase();

    changeBtnStyle(item);

    allData();

    showModal();
  });
});

// This function will show the loading animation
function showLoading() {
  loading.classList.add("flex");
  loading.classList.remove("hidden");
}

// This function will hide the loading animation
function hideLoading() {
  loading.classList.add("hidden");
  loading.classList.remove("flex");
}

// This function contains the code for changing the btn style
function changeBtnStyle(active) {
  statusButtons.forEach((item) => {
    item.classList =
      "px-12 py-3 border-gray-400 text-[#64748B] btn btn-outline";
  });

  active.classList = "px-12 py-3 btn btn-primary";
}

// This Function
async function allData() {
  let url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

  showLoading();

  let res = await fetch(url);
  let data = await res.json();
  let finalData = data.data;

  hideLoading();

  // Open status Data
  let openData = finalData.filter((item) => item.status === "open");

  // Closed status Data
  let closeData = finalData.filter((item) => item.status === "closed");

  // Clearing the container before adding the cards
  cardsArea.innerHTML = "";

  // Adding the cards based on which button is active
  if (currentButton === "all") {
    finalData.forEach((item) => createCard(item));
    totalCount.innerHTML = `${finalData.length} Issues`;
  } else if (currentButton === "open") {
    openData.forEach((item) => createCard(item));
    totalCount.innerHTML = `${openData.length} Issues`;
  } else if (currentButton === "closed") {
    closeData.forEach((item) => createCard(item));
    totalCount.innerHTML = `${closeData.length} Issues`;
  }
}
// This Function Creates Cards.
function createCard(data) {
  let card = document.createElement("div");
  card.classList = `bg-white shadow-sm rounded-sm border-t-3 ${data.status === "open" ? "border-green-500" : "border-[#a855f7]"} `;

  card.innerHTML = `
        <!-- Card Body -->
              <div class="p-4 space-y-3">
                <!-- Card Top Part -->
                <div class="flex justify-between items-center">
                  <img src=${
                    data.status === "open"
                      ? "./assets/Open-Status.png"
                      : "./assets/Closed.png"
                  }  alt="Status Image" />

                  <div class="badge badge-soft ${data.priority === "medium" ? "badge-warning" : data.priority === "high" ? "badge-secondary" : ""}">${data.priority}</div>
                </div>
                <!-- Card Content -->
                <div class="space-y-3">
                  <!-- Text -->
                  <div class="text-left space-y-2">
                    <h4 class="font-semibold line-clamp-2">
                      ${data.title}
                    </h4>
                    <p class="text-gray-400 line-clamp-2">
                      ${data.description}
                    </p>
                  </div>

                  <!-- Info Badge -->
                  <div class="space-x-1">
                    <div class="badge badge-soft badge-secondary">${data.labels[0]}</div>
                    <div class="badge badge-soft badge-warning">
                      ${data.labels[1] ?? ""}
                    </div>
                  </div>
                </div>
              </div>

              <!-- More Card Info -->
              <div class="p-4 border-t border-gray-300 space-y-2">
                <p class="text-gray-400 text-xs">#${data.id} by ${data.author}</p>

                <p class="text-gray-400 text-xs">${data.createdAt}</p>
              </div>
    `;

  cardsArea.appendChild(card);
}

// This functions will show the modal
async function showModal(id) {
  url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/1`;

  const res = await fetch(url);
  const data = await res.json();
  console.log(data.data);

  // modalDetails.innerHTML = `
  //   <h3 id="modalHeading" class="text-lg font-bold">Hello!</h3>

  //             <p class="py-4">
  //               Press ESC key or click the button below to close
  //             </p>
  //             <div class="modal-action">
  //               <form method="dialog">
  //                 <!-- if there is a button in form, it will close the modal -->
  //                 <button class="btn btn-primary">Close</button>
  //               </form>
  //             </div>
  // `;

  modalTrigger.showModal();
}

allData();
