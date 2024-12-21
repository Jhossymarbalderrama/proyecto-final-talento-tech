
function getCart() {
    return JSON.parse(localStorage.getItem("productCart"));
}

function saveCart(cartProducts) {
    localStorage.setItem("productCart", JSON.stringify(cartProducts));
}

function drawCartList() {
    const sectionCartProducts = document.getElementById("product-cards");
    sectionCartProducts.innerHTML = ``;
    let productsCartHTML = [];
    let productsLocalStorage = getCart();


    if (productsLocalStorage.length > 0) {
        // ? Filtro repetidos
        let productsFiltRepeat = [];

        productsLocalStorage.forEach(pd => {
            if (!productsFiltRepeat.find(item => item.id === pd.id)) {
                let cant = getCantProduct(pd, productsLocalStorage);
                pd.cant = cant;
                productsFiltRepeat.push(pd);
            }
        });

        productsFiltRepeat.forEach(pd => {
            productsCartHTML.push(drawCartProduct(pd));
        });

        productsCartHTML.forEach(pd => {
            sectionCartProducts.innerHTML += pd;
        });
    } else {
        sectionCartProducts.innerHTML = getMessageCartEmpty();
    }
}

function getCantProduct(pdr, listProduc) {
    let resCant = 0;

    listProduc.forEach(pd => {
        if (pd.id === pdr.id) {
            resCant++;
        }
    })

    return resCant;
}

function drawCartProduct(pd) {
    return `
            <div class="product-card">
                <span class="product-cant">Cantidad: ${pd.cant}</span>
                <img src="../../assets/images/products/${pd.img}" alt="Product Image" class="product-img">
                <div class="product-details">
                    <h4 class="product-title">${pd.title}</h4>
                    <p class="product-price">Precio: <span>$${pd.price.toFixed(3)}</span> c/u</p>
                    <p class="product-size">Talle: ${pd.size[2]}</p>
                    <p class="product-description">${pd.description} ${pd.gender} ${pd.color[0]} ${pd.material}</p>
                    <button class="delete-btn" onclick="deleteProductCart(${pd.id})">
                        <i class="fas fa-trash"></i> Eliminar del carrito
                    </button>
                </div>
            </div>     
    `;
}


function deleteProductCart(idPd) {
    let productsLocalStorage = getCart();

    for (let i = 0; i < productsLocalStorage.length; i++) {
        if (productsLocalStorage[i].id === idPd) {
            productsLocalStorage.splice(i, 1);
            i--;
        }
    }

    if (productsLocalStorage.length == 0) {
        const sectionCartProducts = document.getElementById("product-cards");
        sectionCartProducts.innerHTML = getMessageCartEmpty();
    }

    saveCart(productsLocalStorage);
    drawCartList();
    checkCartList();

    Toastify({
        text: "Producto eliminado del carrito",
        className: "success",
        style: {
            background: "linear-gradient(to right, #fc7b02, #fc9c42)",
        }
    }).showToast();
}



function getMessageCartEmpty() {
    return `
            <div class="cartIsEmpty">
                <h2>Carrito Vacio 😢</h2>            
                <p>Agregue algun producto al carrito 🛒.</p>
                <a href="../store/store.html">ir a productos 👈</a>
            </div>
        `;
}
/**
 * Checkeo el listado de productos para setear la cantidad de productos en el carrito
 */
function checkCartList() {
    const listProductCart = localStorage.getItem("productCart");
    checkTotalPayProductCart(JSON.parse(listProductCart));
    let countProduct = (JSON.parse(listProductCart)).length;

    drawCountCartView(countProduct);
}

/**
 * Obtengo la cantidad de productos que se encuentran en el carrito
 * @param {*} countProduct 
 */
function drawCountCartView(countProduct) {
    const cartViewHtml = document.getElementById("cartViewCount");
    cartViewHtml.innerHTML = countProduct;
}


function payProducts() {
    setTimeout(() => {
        Toastify({
            text: "😀 Pago realizado con exito! 🎉",
            className: "success",
            style: {
                background: "linear-gradient(to right, #039c1d, #3fd86d)",
            }
        }).showToast();
    }, 300);

    setTimeout(() => {
        Toastify({
            text: "🚚 Ya estamos preparando su pedido 📦",
            className: "success",
            style: {
                background: "linear-gradient(to right, #0251fc, #3675fd)",
            }
        }).showToast();
    }, 3000);


    setTimeout(() => {
        saveCart([]);

        window.location.replace(window.location.href.split('/').slice(0, 3).join('/') + '/index.html');
    }, 6000);
}

function checkTotalPayProductCart(products) {
    if(products){
        const subTotal = document.getElementById("subtotal-cart");
        const total = document.getElementById("total-cart");
    
        let sumTotal = 0;
        let sumSubTotal = 0;
    
    
        products.forEach(pd => {
            sumTotal = sumSubTotal += pd.price;
        });
   
        total.innerHTML = '$' + sumTotal.toFixed(3);
        subTotal.innerHTML = '$' + sumSubTotal.toFixed(3);
    }
}

function main() {
    checkCartList();
    drawCartList();
}


main();