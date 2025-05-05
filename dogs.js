// attempting the dog carousel (this may not work, i tried)
async function loadDogImages() {
  const res = await fetch("https://dog.ceo/api/breeds/image/random/10");
  const data = await res.json();

  const container = document.getElementById("dog-carousel");
  container.innerHTML = "";

  data.message.forEach(url => {
    const img = document.createElement("img");
    img.src = url;
    img.style.width = "300px";
    img.style.marginRight = "10px";
    container.appendChild(img);
  });

  // starting carousel
  new SimpleSlider("#dog-carousel", {
    autoplay: true,
    interval: 3000,
    delay: 1000
  });
}

  
  // load the dog breeds and making the buttons dynamically
  async function loadBreedButtons() {
    const res = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await res.json();
  
    const container = document.getElementById("breed-buttons");
    container.innerHTML = "";
  
    for (let breed in data.message) {
      const btn = document.createElement("button");
      btn.textContent = breed;
      btn.onclick = () => showBreedInfo(breed);
      container.appendChild(btn);
    }
  }
  
  // showing breed info from the dog api
  async function showBreedInfo(breedName) {
    const res = await fetch(`https://api.thedogapi.com/v1/breeds/search?q=${breedName}`);
    const data = await res.json();
  
    const breed = data[0];
    if (!breed) return;
  
    const infoDiv = document.getElementById("breed-info");
    infoDiv.style.display = "block";
    infoDiv.innerHTML = `
      <h4>${breed.name}</h4>
      <p><strong>Description:</strong> ${breed.temperament || "there's no description"}</p>
      <p><strong>Life Span:</strong> ${breed.life_span}</p>
    `;
  }
  
  // load onto dom
  window.addEventListener("DOMContentLoaded", () => {
    loadDogImages();
    loadBreedButtons();
  
    const hash = window.location.hash;
    if (hash.startsWith("#breed=")) {
      const breedName = decodeURIComponent(hash.split("=")[1]);
      showBreedInfo(breedName);
    }
  });
  