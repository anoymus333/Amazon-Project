 export const cart = [];
 export function addToCart(productId,quantity) {   
                let itemMatching;

                cart.forEach((cartItem) => {
                    if(cartItem.productId === productId){
                        
                        itemMatching = cartItem;
                    }
                });
                  if (itemMatching) {
    itemMatching.quantity += quantity;
} else {
    cart.push({
        productId: productId,
        quantity: quantity
    });
}
}
