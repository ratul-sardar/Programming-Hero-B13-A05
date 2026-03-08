const cardsArea = document.getElementById("cardsArea");
let currentButton = "all";
const statusButtons = document.querySelectorAll("section .btn");

// EventListner on Buttons
statusButtons.forEach((item) => {
  item.addEventListener("click", () => {
    //changing the current button status
    currentButton = item.innerText.toLowerCase();
    console.log(currentButton);

    changeBtnStyle(item);

    allData();
  });
});

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

  let res = await fetch(url);
  let data = await res.json();
  let finalData = data.data;

  let openData = finalData.filter((item) => item.status === "open");
  let closeData = finalData.filter((item) => item.status === "closed");

  cardsArea.innerHTML = "";

  if (currentButton === "all") {
    finalData.forEach((item) => createCard(item));
  } else if (currentButton === "open") {
    openData.forEach((item) => createCard(item));
  } else if (currentButton === "closed") {
    closeData.forEach((item) => createCard(item));
  }
}
// This Function Creates Cards.
function createCard(data) {
  console.log(data);
  let card = document.createElement("div");
  card.classList = "bg-white shadow-sm rounded-sm border-t-3 border-green-500";

  card.innerHTML = `
        <!-- Card Body -->
              <div class="p-4 space-y-3">
                <!-- Card Top Part -->
                <div class="flex justify-between items-center">
                  <img src="./assets/Open-Status.png" alt="Open-Status" />

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
                    <div class="badge badge-soft badge-secondary">Bug</div>
                    <div class="badge badge-soft badge-warning">
                      help wanted
                    </div>
                  </div>
                </div>
              </div>

              <!-- More Card Info -->
              <div class="p-4 border-t border-gray-300 space-y-2">
                <p class="text-gray-400 text-xs">#1 by john_doe</p>

                <p class="text-gray-400 text-xs">1/15/2024</p>
              </div>
    `;

  cardsArea.appendChild(card);
}

allData();
