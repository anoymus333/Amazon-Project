class Cart {
    cartItems;
    #localStorageKey ;
    constructor(localStorageKey  ){
this.#localStorageKey = localStorageKey;


this.#loadFromStorage();


    }
 #loadFromStorage() {
        this.cartItems = localStorage.getItem(this.#localStorageKey)
            ? JSON.parse(localStorage.getItem(this.#localStorageKey))
            : [
                {
                    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                    quantity: 2,
                    deliveryOptionId: "1",
                },
                {
                    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                    quantity: 1,
                    deliveryOptionId: "2",
                }
            ];
    }
    saveToStorage() {
        localStorage.setItem(
            this.#localStorageKey,
            JSON.stringify(this.cartItems)
        );
    }
     addToCart(productId, quantity) {
        let itemMatching;

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                itemMatching = cartItem;
            }
        });

        if (itemMatching) {
            itemMatching.quantity += quantity;
        } else {
            this.cartItems.push({
                productId: productId,
                quantity: quantity,
                deliveryOptionId: "1",
            });
        }

        this.saveToStorage();
    }
 removeFromCart(productId) {
        const newCart = [];

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        });

        this.cartItems = newCart;
        this.saveToStorage();
    }

    updateQuantity(productId, quantity) {
        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                cartItem.quantity = quantity;
            }
        });

        this.saveToStorage();
    }
   updateDeliveryOption(productId, deliveryOptionId) {
        let itemMatching;

        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId === productId) {
                itemMatching = cartItem;
            }
        });

        if (itemMatching) {
            itemMatching.deliveryOptionId = deliveryOptionId;
            this.saveToStorage();
        }
    }
}


const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');


console.log(cart);
console.log(businessCart);
