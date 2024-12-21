
var products = [];
const urlDataProduct = './data/products.json';


async function getProducts(){
    try {
        const res = await fetch(urlDataProduct);

        const data = await res.json();
        products = data.products;
        // console.log(products);
        
    } catch (error) {
        console.error(error);        
    }

    return products;
}

async function buildProductSection(){
    const sectionProducts = document.getElementById('products');

    let productsHTML = [];
    products = await getProducts();


    if(products){
        products.forEach( pd => {
            productsHTML.push(buildProduct(pd));
        });


        productsHTML.forEach( pd => {
            sectionProducts.innerHTML += pd;
        });
    }
}


function buildProduct(product){
    return `
            <div class="card">
                <div class="card-img">
                    <img src="${product.img}" alt="" />
                    <div class="card-info">

                    <p class="card-category">Categoria ${product.category}</p>
                    <p class="card-description">${product.title}</p>
                    <p class="card-price">$${product.price.toFixed(3)}</p>

                    </div>
                </div>
                <button onclick="viewProductDetail(${product.id})">Ver Producto</button>
            </div>     
    `;
}


/**
 * Guardo el idProducto en el Localstorage y redirijo la pagina de producto Details
 * @param {*} idProduct 
 */
function viewProductDetail(idProduct){
    localStorage.setItem("idProductView", idProduct);  
    window.location.replace(window.location.href.split('/').slice(0, 3).join('/') + './pages/productDetail/productDetail.html');
}


function checkCartList(){
    const listProductCart = localStorage.getItem("productCart");
    if(listProductCart){
        let countProduct = (JSON.parse(listProductCart)).length;    
    
        drawCountCartView(countProduct);     
    }
}


function drawCountCartView(countProduct){
    const cartViewHtml = document.getElementById("cartViewCount");
    cartViewHtml.innerHTML += countProduct;
}

function main(){
    buildProductSection();
    checkCartList();
}


main();







