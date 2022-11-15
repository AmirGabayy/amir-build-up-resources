import { ImageMajor } from "@shopify/polaris-icons";
import { Thumbnail } from "@shopify/polaris";

import '../style/style.css';


export function Bar({productsList, withLinks}){

    const EMPTY_PRODUCT_URL = "//cdn.shopify.com/s/files/1/0222/9076/t/10/assets/logo.png?796";
    const PRODUCT_WIDTH = 50;
    const PRODUCT_HEIGHT = 50;

    const showProducts = productsList?.map((product) => {
        return (
            <div class = "bar-child">
                <img class = "bar-child-img" src={product?.images?.length > 0 ? product.images[0].originalSrc : EMPTY_PRODUCT_URL}
                 alt={product.title} width={PRODUCT_WIDTH} height={PRODUCT_HEIGHT}></img>
            </div>
        )
    });


    return (
        <div class = "bar">
            {showProducts}
            {/* {productsList ? showProducts : "None"} */}
        </div>
    );
}