// import fetch from "node-fetch";

const method = "GET";
const hostScheme = "https";
const hostName = "ebea-2a0d-6fc0-2818-c200-b8b2-ebc7-6eb4-519f.ngrok.io";

const productsBarEndPoint = "bars/retrieve_products_bar";
const barDetailsEndPoint = "bars/retrieve_bar";

const storeId = window?.Shopify?.shop || "amir-test-store-app.myshopify.com";
const EMPTY_PRODUCT_URL =
  "https://static.vecteezy.com/system/resources/previews/002/916/029/original/realistic-white-round-podium-illuminated-by-spotlight-empty-winner-stage-product-pedestal-exhibition-platform-vector.jpg";
const PRODUCT_WIDTH = 50;
const PRODUCT_HEIGHT = 50;
const CSS_URL =
  "https://cdn.statically.io/gh/AmirGabayy/amir-build-up-resources/main/resources/cstyle.css";
// "style7.css";

window.onload = function () {
  let head = document.getElementsByTagName("head")[0];

  // console.log("starting window.load");

  // add jquery
  if (!window.jQuery) {
    // console.log("start adding jQuery");
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://code.jquery.com/jquery-latest.min.js";
    // console.log("adding jQuery");
    head.appendChild(script);
    // console.log("added jQuery");
  }

  // add css
  let cssId = "barCss";
  if (!document.getElementById(cssId)) {
    var link = document.createElement("link");
    link.id = cssId;
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = CSS_URL;
    link.media = "all";
    head.appendChild(link);
  }
};

async function checkJQuery() {
  let head = document.getElementsByTagName("head")[0];
  if (!window.jQuery) {
    // console.log("start adding jQuery");
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "http://code.jquery.com/jquery-latest.min.js";
    // console.log("adding jQuery");
    head.appendChild(script);
    // console.log("added jQuery");
  }
}

async function checkCss() {
  let head = document.getElementsByTagName("head")[0];
  // add css
  let cssId = "barCss";
  if (!document.getElementById(cssId)) {
    var link = document.createElement("link");
    link.id = cssId;
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = CSS_URL;
    link.media = "all";
    head.appendChild(link);
  }
}

async function fetchProducts() {
  // console.log("sending requst to url: " + url);

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const products = await response.json();

    // console.log("products: " + JSON.stringify(products));

    return products;
  } else {
    return undefined;
  }
}

function getChildHtml(imageSrc, productLink) {
  const str = `
  <div class = "bar-child">
    <img class = "bar-child-img" src=${imageSrc ? imageSrc : EMPTY_PRODUCT_URL}
     width=${PRODUCT_WIDTH} height=${PRODUCT_HEIGHT}></img>
  </div>`;
  return str;
}

async function appendBar(products) {
  // $(document).ready(function () {
  //   console.log("starting scripttag");
  //   $("body").prepend(`<div> ScriptTag Bar </div>`);
  // });

  await checkJQuery();
  await checkCss();

  // get div with all the images
  const barHtmlStr = `<div id=barStory class = bar> </div>`;

  let body = document.getElementsByTagName("body")[0];

  // $("body").prepend(barHtmlStr);
  body.insertAdjacentHTML("afterbegin", barHtmlStr);
  let barStory = document.getElementById("barStory");

  products.forEach(({ mainImageSrc }) => {
    const childHtmlStr = getChildHtml(mainImageSrc);

    barStory.insertAdjacentHTML("beforeend", childHtmlStr);
    // barStory.append(childHtmlStr);
    // $("#barStory").append(childHtmlStr);
  });
}

async function fetchBarDetails() {
  const barDetailsUrl =
    hostScheme +
    "://" +
    hostName +
    "/" +
    barDetailsEndPoint +
    "/" +
    storeId +
    "/";

  const method = "GET";

  // console.log("sending requst to url: " + barDetailsUrl);

  const response = await fetch(barDetailsUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const barDetails = await response.json();

    // console.log("barDetails: " + JSON.stringify(barDetails));

    return barDetails[0];
  } else {
    return undefined;
  }
}

const barDiv = document.createElement("div");
barDiv.setAttribute("class", "bar");

async function appendBarWithDetails(barDetails) {
  await checkJQuery();
  await checkCss();

  // get div with all the images
  // const barHtmlStr = `<div id=barStory class = bar> </div>`;
  barDiv.setAttribute("id", barDetails.barId);

  barDiv.style.backgroundColor = barDetails?.color || "grey";

  if (barDetails.text) {
    const barHeaderDiv = document.createElement("div");
    barHeaderDiv.setAttribute("id", "story-bar-header");
    barHeaderDiv.setAttribute("class", "bar-header");
    barHeaderDiv.innerHTML += barDetails.text;
    barDiv.appendChild(barHeaderDiv);
  }

  // let body = document.getElementsByTagName("body")[0];
  // body.prepend(barDiv);
}

async function fetchProductsBar() {
  const productsBarDetailsUrl =
    hostScheme +
    "://" +
    hostName +
    "/" +
    productsBarEndPoint +
    "/" +
    storeId +
    "/";

  const method = "GET";

  // console.log("sending requst to url: " + productsBarDetailsUrl);

  const response = await fetch(productsBarDetailsUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const productsBarDetails = await response.json();

    // console.log("productsBarDetails: " + JSON.stringify(productsBarDetails));

    return productsBarDetails;
  } else {
    return undefined;
  }
}

async function handleProductClick(barId, productId, productLink) {
  const barClickUrl =
    hostScheme +
    "://" +
    hostName +
    "/bars/product_click/" +
    barId +
    "&" +
    storeId +
    "&" +
    productId;

  const method = "POST";

  // console.log("clicked, sending requst to url: " + barClickUrl);

  // send a click update to server

  fetch(barClickUrl, {
    method,
  });

  // redirect to the product page
  // console.log("redirecting to " + productLink);
  // window.location.replace(productLink);
  window.location.href = productLink;
}

async function appendProductsToBar(productsBarDetails) {
  const barBody = document.createElement("div");
  barBody.setAttribute("class", "bar-products");

  productsBarDetails.forEach(({ mainImageSrc, link, productId }) => {
    // clean the product id
    const id =
      productId.indexOf("/") != -1
        ? productId.substring(productId.lastIndexOf("/") + 1)
        : productId;

    const childDiv = document.createElement("div");
    childDiv.setAttribute("id", id);
    childDiv.setAttribute("class", "bar-child");
    childDiv.onclick = function () {
      handleProductClick(barDiv.getAttribute("id"), id, link);
      // alert("clicked " + id);
    };

    // create the img under the child's div
    const childDivImg = document.createElement("img");
    childDivImg.setAttribute("class", "bar-child-img");
    childDivImg.setAttribute(
      "src",
      mainImageSrc ? mainImageSrc : EMPTY_PRODUCT_URL
    );
    childDivImg.setAttribute("width", PRODUCT_WIDTH);
    childDivImg.setAttribute("height", PRODUCT_HEIGHT);

    childDiv.appendChild(childDivImg);

    barBody.appendChild(childDiv);

    // const childHtmlStr = getChildHtml(mainImageSrc, link);

    // barBody.insertAdjacentHTML("beforeend", childHtmlStr);
  });

  // append the created div to the bar
  // const storyBar = document.getElementById("storyBar");
  const storyBar = barDiv;
  storyBar.appendChild(barBody);

  // append the bar to the page
  let body = document.getElementsByTagName("body")[0];
  body.prepend(barDiv);
}

fetchBarDetails()
  .then(appendBarWithDetails)
  .then(fetchProductsBar)
  .then(appendProductsToBar);
// .then(handleProductClick);
// fetchProducts().then(appendBar);
