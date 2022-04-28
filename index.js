window.addEventListener("DOMContentLoaded", init);

function init(event) {
  loadBags();
}

async function loadBags() {
  const response = await fetch(
    "http://moerkdesigns.com/silfenwordpress/wp-json/wp/v2/bag?_embed"
  );
  console.log("lacj-response", response);
  const thedata = await response.json();
  displayData(thedata);
}

function displayData(bags) {
  console.log(bags);
  bags.forEach((bag) => {
    console.log(bag.title.rendered);
    const templateEl = document.querySelector("template").content;
    const cloneEl = templateEl.cloneNode(true);


    cloneEl.querySelector(".bagimg").src =
      bag._embedded[
        "wp:featuredmedia"
      ][0].media_details.sizes.medium_large.source_url;
    cloneEl.querySelector("h2").textContent = bag.title.rendered;
    let priceEl = cloneEl.querySelector(".price span");
    let priceText = bag.price;

    cloneEl.querySelector(".pricespan").textContent ='DKK'+' '+ bag.price;

  

    let colors = bag._embedded["wp:term"][1];
    if (colors.length) {
    //   alert("hey");
     cloneEl.querySelector(".colour span").textContent = "";
     const ulEl = document.createElement("ul");
     colors.forEach((color) => {
    const liEl = document.createElement("li");
     liEl.style.backgroundColor = color.name;
     ulEl.appendChild(liEl);
     });
    cloneEl.querySelector(".colour span").appendChild(ulEl);
    }

    const parentEl = document.querySelector("main");
    parentEl.appendChild(cloneEl);
  });

}