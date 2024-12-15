const loadData = async (text = "13", showAll) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${text}`;
  const res = await fetch(url);
  const data = await res.json();
  const phone = data.data;

  phoneDisplay(phone, showAll);
};

const phoneDisplay = (phones, s) => {
  const main_container = document.getElementById("main_container");
  console.log(s);
  //clear previous search data
  // clear phone container cards before adding new cards
  main_container.textContent = "";

  const showAll = document.getElementById("show-all-container");
  if (phones.length > 12 && !s) {
    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }

  if (!s) {
    phones = phones.slice(0, 12);
  }

  phones.forEach((phone) => {
    const { brand, image, phone_name, slug } = phone;
    const div = document.createElement("div");
    div.classList = "card bg-red-500 w-96 shadow-xl text-neutral-100 ";
    div.innerHTML = `
           <figure class="px-10 pt-10">
    <img
      src=${image}
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${brand}</h2>
    <p>${phone_name}</p>
    <div class="card-actions">
      <button class="btn btn-primary">Buy Now</button>
      <button onclick="showDetail('${slug}');show_modal.showModal()" class="btn btn-primary">Show Details</button>
    </div>
  </div>
    
    `;

    main_container.appendChild(div);

    // hide loading spinner
    toggleLoadingSpinner(false);
  });
};

//search button
const handleSearch = (showAll) => {
  toggleLoadingSpinner(true);
  const inputData = document.getElementById("searchInput");
  const searchText = inputData.value;
  loadData(searchText, showAll);
};
//toggol loding
const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};
const showDetail = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  //console.log(data);
  showPhoneDetails(data);
};

const showPhoneDetails = (phone) => {
  console.log(phone.data);
  const { name, brand, image, mainFeatures, others, releaseDate } = phone.data;
  const { chipSet, displaySize, memory, storage } = mainFeatures;
  //const { WALN, Bluetooth } = others;
  const phoneDisplay = document.getElementById("phone_display");
  phoneDisplay.innerHTML = `
     <div class="card pt-2">
  <figure>
    <img
      src=${image}
      alt="Movie" />
  </figure>
  <div class="card-body">
    <h2 class="card-title text-bold text-orange-400" NAME       : ${name}</h2>
    <h1 class="card-title text-bold text-orange-400">BRAND      : ${brand}</h1>
    <h2 class="card-title text-bold text-orange-400">CHIPSET    : ${chipSet}</h2>
    <h2 class="card-title text-bold text-orange-400">DISPLAY    : ${displaySize}</h2>
    <h2 class="card-title text-bold text-orange-400">MEMORY     : ${memory}</h2>
    <h2 class="card-title text-bold text-orange-400">STORAGE    : ${storage}</h2>
    <h2 class="card-title text-bold text-orange-400">RELASEDATE : ${releaseDate}</h2>
     
   
  </div>
</div>
  
  `;

  show_modal.showModal();
};

const show_all = () => {
  handleSearch(true);
};

loadData();
