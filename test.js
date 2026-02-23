

var currentIndex = 0;
var Container = [];

if(localStorage.getItem("product") != null){
    Container = JSON.parse(localStorage.getItem("product"));
    displayProduct();
}
// select elements 
var proName = document.getElementById('proName');
var proPrice = document.getElementById('proPrice');
var proCategory = document.getElementById('proCategory');
var proDesc = document.getElementById('proDesc');
var btn = document.getElementById('btn');
var search = document.getElementById('search');


btn.onclick = function(e){
    var product = {
        name:proName.value,
        price:proPrice.value,
        category:proCategory.value,
        desc:proDesc.value,
    }

    if (btn.innerHTML == "Add Product")
    {
        addProduct(product);
    }else{
        updateProduct2(product);
    }
    localStorage.setItem("product", JSON.stringify(Container));
    displayProduct();
    e.preventDefault();
}

function addProduct(data){
    Container.push(data);
}

function displayProduct(){
    var allProduct = ``
    for (var i = 0; i <Container.length ; i++){
        allProduct+= `
        <tr>
            <td>${i+1}</td>
            <td>${Container[i].name}</td>
            <td>${Container[i].price}</td>
            <td>${Container[i].category}</td>
            <td>${Container[i].desc}</td>
            <td class="d-flex">
            <button onclick="deleteProduct(${i})" class="btn me-1 btn-outline-info rounded-5 ">Delete</button>
            <button onclick="updateProduct(${i})" class="btn btn-outline-info rounded-5 ">Update</button>
            </td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = allProduct;
}


function deleteProduct(index){
    Container.splice(index,1);
    localStorage.setItem("product", JSON.stringify(Container));
    displayProduct();
}


function updateProduct(index){
    proName.value = Container[index].name;
    proPrice.value = Container[index].price;
    proCategory.value = Container[index].category;
    proDesc.value = Container[index].desc;

    btn.innerHTML = "Update Product";

    currentIndex = index;
}

function updateProduct2(data){
    Container[currentIndex] = data;
    btn.innerHTML = "Add Product";
}

search.onkeyup = function(){
    searchByName(search.value);
}
function searchByName(term){
    var allProduct = ``;
    for (let i = 0; i < Container.length; i++) {
        if(Container[i].name.toLowerCase().includes(term.toLowerCase())){
             allProduct+= `
            <tr>
                <td>${i+1}</td>
                <td>${Container[i].name}</td>
                <td>${Container[i].price}</td>
                <td>${Container[i].category}</td>
                <td>${Container[i].desc}</td>
                <td class="d-flex">
                <button onclick="deleteProduct(${i})" class="btn me-1 btn-outline-info rounded-5 ">Delete</button>
                <button onclick="updateProduct(${i})" class="btn btn-outline-info rounded-5 ">Update</button>
                </td>
            </tr>
        `
        }
    }
    document.getElementById('tbody').innerHTML = allProduct;
}