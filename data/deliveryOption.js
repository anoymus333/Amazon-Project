  export const deliveryOption = [
    {
id: '1',
deliveryDay: 7,
priceCents: 0,
    },
{
    id: '2',
    deliveryDay: 3,
    priceCents: 499,
},{
    id: '3',
    deliveryDay: 1,
    priceCents: 999,

}];
export function getDeliveryOptionById(deliveryOptionId) {
    
    let deliveryOptionMatching;
    
    deliveryOption.forEach((deliveryoption) => {
        if(deliveryoption.id === deliveryOptionId){
            deliveryOptionMatching = deliveryoption;
        }
    });
    return deliveryOptionMatching || deliveryOption[0];
}