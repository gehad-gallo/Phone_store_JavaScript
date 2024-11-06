let name = document.getElementById('productName');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let submit = document.getElementById('submit');
let totalPrice = document.getElementById('totalPrice');
let amount = document.getElementById('amount');
let category = document.getElementById('category');


function getTotal(){
    let priceValue = parseInt(price.value) || 0;
    let taxesValue = parseInt(taxes.value) || 0;
    let adsValue = parseInt(ads.value) || 0;
    let discountValue = parseInt(discount.value) || 0;

    // Calculate total
    if(priceValue > 0){
        let result = (priceValue + taxesValue + adsValue) - discountValue;
        totalPrice.innerHTML = 'Total: ' + result + ' EGP';
        totalPrice.style.color = 'blue';
    }
    
}