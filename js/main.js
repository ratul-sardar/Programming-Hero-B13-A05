const cardsArea = document.getElementById("cardsArea");

console.log("HI");

async function allData(params) {
  let url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";

  let res = await fetch(url);
  let data = await res.json();
  let finalData = data.data;

  finalData.forEach((item) => {
    let card = document.createElement("div");
    card.classList =
      "bg-white shadow-sm rounded-sm border-t-3 border-green-500";

    card.innerHTML = `
        <!-- Card Body -->
              <div class="p-4 space-y-3">
                <!-- Card Top Part -->
                <div class="flex justify-between items-center">
                  <img src="./assets/Open-Status.png" alt="Open-Status" />

                  <div class="badge badge-soft badge-secondary">Hard</div>
                </div>
                <!-- Card Content -->
                <div class="space-y-3">
                  <!-- Text -->
                  <div class="text-left space-y-2">
                    <h4 class="font-semibold">
                      Fix navigation menu on mobile devices
                    </h4>
                    <p class="text-gray-400 line-clamp-2">
                      The navigation menu doesn't collapse properly on mobile
                      devices. Need to fix the responsive behavior.
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
  });
}

allData();
