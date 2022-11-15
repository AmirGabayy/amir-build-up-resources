const method = "GET";
const hostScheme = "https";
const hostName = "590b-2a0d-6fc0-2803-6000-c002-c60f-e32f-913.ngrok.io";
const endPoint = "/bars/retrieve/amir-test-store-app.myshopify.com";

const url = hostScheme + "://" + hostName + endPoint + "/";

async function fetchProducts() {
  console.log("sending requst to url: " + url);

  const response = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
  });

  console.log("response from request: " + response);
}

fetchProducts();
