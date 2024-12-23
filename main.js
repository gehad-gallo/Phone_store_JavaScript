// Count the total price
////////////////////////

let name = document.getElementById('productName');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let submit = document.getElementById('submit');
let totalPrice = document.getElementById('totalPrice');
let totalPriceForStore = '';
let amount = document.getElementById('amount');
let category = document.getElementById('category');

let mood = 'create';
let tmp;

let searchMood = 'name'; 

function getTotal(){
    let priceValue = parseInt(price.value) || 0;
    let taxesValue = parseInt(taxes.value) || 0;
    let adsValue = parseInt(ads.value) || 0;
    let discountValue = parseInt(discount.value) || 0;

    // Calculate total
    if(priceValue > 0){
        let result = (priceValue + taxesValue + adsValue) - discountValue;
        totalPriceForStore = result;
        totalPrice.innerHTML = 'Total: ' + result + ' EGP';
        totalPrice.style.color = 'blue';
    }
    
}



//Create products
/////////////////

let products;
if(localStorage.products != null){
    products = JSON.parse(localStorage.products);
}else{
    products = [];
}
submit.onclick = function () {
    // Create a new product object from the input values
    let productObject = {
        name: name.value.toLowerCase(),
        price: price.value,
        ads: ads.value,
        taxes: taxes.value,
        discount: discount.value,
        total: totalPriceForStore,
        amount: amount.value,
        category: category.value.toLowerCase(),
    };

    // Validation for required fields
    const isValid = name.value && price.value && category.value;

    if (isValid) {
        // Check for "create" mode
        if (mood === 'create') {
            if (productObject.amount > 1) {
                for (let i = 0; i < productObject.amount; i++) {
                    products.push({ ...productObject });
                }
            } else {
                products.push(productObject);
            }
        } else {
            // Update existing product in edit mode
            products[tmp] = productObject;
            mood = 'create';
            amount.style.display = "block";
        }

        // Save products array to localStorage
        localStorage.setItem('products', JSON.stringify(products));

        // Clear input fields only if the data was valid
        clearInputs();
        showAllProducts();
    } else {
        alert("name, price and category are required!");
    }
};





// clear inputs after submitting the product
////////////////////////////////////////////

function clearInputs(){
    name.value='',
    price.value='',
    ads.value='',
    taxes.value='',
    totalPrice.innerHTML='', 
    discount.value='',
    amount.value='',
    category.value='',
    totalPriceForStore=''
}




// Read all products stored in localStorage 
function showAllProducts(){
    let table = '';
    for(let i = 0; i < products.length; i++){
        table += `
        <tr>
            <td scope="row">${products[i].name}</td>
            <td>${products[i].price}</td>
            <td>${products[i].taxes}</td>
            <td>${products[i].ads}</td>
            <td>${products[i].discount}</td>
            <td>${products[i].total}</td>
            <td>${products[i].category}</td>
            <td>
                <button type="button" onclick="updateProduct(${i})" id="editBTN">Edit</button>
                <button type="button" onclick="deletProduct(${i})" id="removeBTN">Remove</button>
            </td>
        </tr>
        `;
    }
    let deleteAllDev = document.getElementById('deleteAllDev');

    if(products.length > 0){
        
        deleteAllDev.innerHTML = `<button type="button" id="removeAllBtn" onclick="deleteAllProducts()" >Delete all (${products.length})</button>`;
    }else{
        deleteAllDev.innerHTML = '';
    }
    document.getElementById('tbody').innerHTML = table;
}
showAllProducts();





// Delete specific product
///////////////////////////

function deletProduct(i) {
    if (window.confirm("Are you sure that you want to delete this item?")) {
        products.splice(i, 1);
        localStorage.products = JSON.stringify(products);
        showAllProducts();
    }
}



//Delete all products
///////////////////////

function deleteAllProducts(){
    if( window.confirm('Are You sure you want to delete all products!')){
        localStorage.clear();
        products.splice(0);
        showAllProducts();
    };
    
}



//Update product 
////////////////////

function updateProduct(i){
    name.value = products[i].name;
    price.value = products[i].price;
    ads.value = products[i].ads;
    taxes.value = products[i].taxes;
    discount.value = products[i].discount;
    getTotal();
    amount.style.display = "none";
    category.value = products[i].category;
    submit.innerHTML = 'Update';
    mood = 'update';
    tmp = i;
    scroll({
        top:0,
        behavior: 'smooth'
    })



}

// get search mood by product name or category
///////////////////////////////////////////////
function getSearchMood(id){
    let search = document.getElementById('seachInput');
    if(id == 'nameSearch'){
        searchMood = 'name';
    }else{
        searchMood = 'category';
    }
    search.placeholder = 'Search By ' + searchMood;
    search.focus();
    search.value = '';
    showAllProducts();
    
}

function searchData(value) {
    let table = '';
    value = value.toLowerCase();

    if (searchMood === 'name') {
        for (let i = 0; i < products.length; i++) {
            if (products[i].name.toLowerCase().includes(value)) {
                table += `
                <tr>
                    <td scope="row">${products[i].name}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].taxes}</td>
                    <td>${products[i].ads}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].total}</td>
                    <td>${products[i].category}</td>
                    <td>
                        <button type="button" onclick="updateProduct(${i})" id="editBTN">Edit</button>
                        <button type="button" onclick="deletProduct(${i})" id="removeBTN">Remove</button>
                    </td>
                </tr>
                `;
            }
        }
    } else {
        for (let i = 0; i < products.length; i++) {
            if (products[i].category.toLowerCase().includes(value)) {
                table += `
                <tr>
                    <td scope="row">${products[i].name}</td>
                    <td>${products[i].price}</td>
                    <td>${products[i].taxes}</td>
                    <td>${products[i].ads}</td>
                    <td>${products[i].discount}</td>
                    <td>${products[i].total}</td>
                    <td>${products[i].category}</td>
                    <td>
                        <button type="button" onclick="updateProduct(${i})" id="editBTN">Edit</button>
                        <button type="button" onclick="deletProduct(${i})" id="removeBTN">Remove</button>
                    </td>
                </tr>
                `;
            }
        }
    }

    document.getElementById('tbody').innerHTML = table;
}
