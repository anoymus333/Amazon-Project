import {cart,removeFromCart,updateQuantity,updateDeliveryOption} from "../data/cart.js";
import {products} from "../data/products.js";
import {formatCurrency} from "./utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOption} from "../data/deliveryOption.js";   
const today = dayjs();
const deliveryDate = today.add(7, 'day');
const formattedDeliveryDate = deliveryDate.format('dddd, MMMM D');
function renderOrderSummary() {
let cartSummaryHtml = "";
cart.forEach((cartItem) => {
    const productId = cartItem.productId;

   
        let matchingProduct;

        products.forEach((product) => {
            if(product.id === productId){
            
                matchingProduct = product;
            }
        });

    const deliveryOptionId = cartItem.deliveryOptionId;
    let deliveryOptionMatching;
    deliveryOption.forEach((deliveryoption) => {
        if(deliveryoption.id === deliveryOptionId){
            deliveryOptionMatching = deliveryoption;
        }
    });
    const today = dayjs();
        const deliveryDate = today.add(deliveryOptionMatching.deliveryDay, 'day');
        const formattedDeliveryDate = deliveryDate.format('dddd, MMMM D');
                        cartSummaryHtml += `
        
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                Delivery date: ${formattedDeliveryDate}
            </div>

            <div class="cart-item-details-grid">
                <img class="product-image"
                src="${matchingProduct.image}">

                <div class="cart-item-details">
                <div class="product-name">
                    ${matchingProduct.name}
                </div>
                <div class="product-price">
                    $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                    <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <input class="quantity-input" type="number" min="1" value="${cartItem.quantity}">
                    <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">
                    Save
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                    Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                    Delete
                    </span>
                </div>
                </div>

                <div class="delivery-options ">
                <div class="delivery-options-title">
                    Choose a delivery option:
                </div>
            
                ${deliveryOptionHtml(matchingProduct)}
                </div>
            </div>
            </div>`;
    });
        function deliveryOptionHtml(matchingProduct) {
            let html = "";
            deliveryOption.forEach((deliveryoption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryoption.deliveryDay, 'day');
        const formattedDeliveryDate = deliveryDate.format('dddd, MMMM D');
        const priceString = deliveryoption.priceCents === 0 ? "FREE Shipping" : `$${formatCurrency(deliveryoption.priceCents)}`;
        const isChecked = cart.find((cartItem) => cartItem.productId === matchingProduct.id && cartItem.deliveryOptionId === deliveryoption.id) 
        ? "checked" : "";
        html +=
    `<div class="delivery-option js-delivery-options" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryoption.id}">
                    <input type="radio" ${isChecked} class="delivery-option-input"  name="delivery-option-${matchingProduct.id} - ">
                    <div>
                    <div class="delivery-option-date">
                        ${formattedDeliveryDate}
                    </div>
                    <div class="delivery-option-price">
                    ${priceString} Shipping
                    </div>
                    </div>
                </div>`

            
    });
    return html;
    }
    document.querySelector(".js-order-summary").innerHTML = cartSummaryHtml;

    document.querySelectorAll(".js-delete-link").forEach((link) => {
        link.addEventListener("click", () => {

            const productId = link.dataset.productId;
            removeFromCart(productId);
            document.querySelector(`.js-cart-item-container-${productId}`).remove();

        });
    });
    let cartQuantity = 0;

    cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
    });

    const checkoutButton = document.querySelector(".js-checkout-item-link");

    checkoutButton.innerHTML = ` ${cartQuantity} items`;

    document.querySelectorAll(".js-update-link").forEach((link) => {
        link.addEventListener("click", () => {
            const productId = link.dataset.productId;
            
            const container = document.querySelector(
            `.js-cart-item-container-${productId}`
        );
        container.classList.add('is-editing-quantity');
        });
    });

    document.querySelectorAll(".js-delivery-options").forEach((element) => {
        element.addEventListener("click", () => {
            const { productId, deliveryOptionId } = element.dataset;
            updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
        });
    });
}
    renderOrderSummary();
