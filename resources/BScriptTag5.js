// import fetch from "node-fetch";

const method = "GET";
const hostScheme = "https";
const hostName = "590b-2a0d-6fc0-2803-6000-c002-c60f-e32f-913.ngrok.io";
const endPoint = "bars/retrieve";
const storeName = "amir-test-store-app.myshopify.com";
const EMPTY_PRODUCT_URL =
  "https://static.vecteezy.com/system/resources/previews/002/916/029/original/realistic-white-round-podium-illuminated-by-spotlight-empty-winner-stage-product-pedestal-exhibition-platform-vector.jpg";
const PRODUCT_WIDTH = 50;
const PRODUCT_HEIGHT = 50;
const CSS_URL =
  "https://cdn.statically.io/gh/AmirGabayy/amir-build-up-resources/main/resources/style4.css";

const url =
  hostScheme + "://" + hostName + "/" + endPoint + "/" + storeName + "/";

window.onload = function () {
  let head = document.getElementsByTagName("head")[0];

  console.log("starting window.load");

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

    return products;
  } else {
    return undefined;
  }
}

function getChildHtml(imageSrc) {
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
  body.insertAdjacentHTML("beforebegin", barHtmlStr);
  let barStory = document.getElementById("barStory");

  products.forEach(({ mainImageSrc }) => {
    const childHtmlStr = getChildHtml(mainImageSrc);

    barStory.insertAdjacentHTML("beforeend", childHtmlStr);
    // barStory.append(childHtmlStr);
    // $("#barStory").append(childHtmlStr);
  });
}

fetchProducts().then(appendBar);
