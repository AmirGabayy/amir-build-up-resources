import fetch from "node-fetch";

const method = "GET";
const hostScheme = "https";
const hostName = "590b-2a0d-6fc0-2803-6000-c002-c60f-e32f-913.ngrok.io";
const endPoint = "bars/retrieve";
const storeName = "amir-test-store-app.myshopify.com";

const url =
  hostScheme + "://" + hostName + "/" + endPoint + "/" + storeName + "/";

async function fetchProducts() {
  console.log("sending requst to url: " + url);

  const response = await fetch(url, {
    method,
    headers: {
      // Accept: "text/html",
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const products = await response.json();

    return products;

    // products.forEach(({ mainImageSrc }) => {
    //   console.log(mainImageSrc);
    // });

    // console.log("response from request: " + JSON.stringify(products));
  } else {
    return undefined;
  }
}

fetchProducts().then((products) => {
  if (products) {
    products.forEach(({ mainImageSrc }) => {
      console.log(mainImageSrc);
    });
  }
});
