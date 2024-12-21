const urlDataProduct = '../../data/products.json';
idProductView = 0;
productView = {};


/**
 * ? Armo la seccion del producto a ver segun el id guardado en el localstorage
 */
async function main(){
    
    let product;
    idProductView = localStorage.getItem("idProductView");

    product = await getProductById(idProductView);  

    drawSectionProduct(product);
    checkCartList();
}

/**
 * ? Obtengo un producto por ID
 */
async function getProductById(idProduct){
    let product;

    try {
        const res = await fetch(urlDataProduct);
        const data = await res.json();
        product = data.products.filter( pd => pd.id == idProduct)[0];
    } catch (error) {
        console.error(error);        
    }

    return product;
}

/**
 * ? Armo seccion donde muestro la descripcion del producto que se solicito ver
 * @param {*} product 
 */
function drawSectionProduct(product){
    const sectionProductView = document.getElementById('content-product-detail');
    productView = product;    
    sectionProductView.innerHTML += `
        <div class="product-section">

            <div class="product-image">
            <img src="../${product.img}" alt="Product Image">
            </div>

            <div class="product-details">
            <h2 class="product-title">${product.title}</h2>
            
            <p class="product-description">${product.description}</p>
            <p class="product-category"><strong>Categoria: </strong>${product.category}</p>
                <p class="product-material"><strong>Material:</strong> ${product.material}</p>
                <p class="product-size"><strong>Tamaños:</strong> ${product.size[2]}</p>
                <p class="product-color"><strong>Color:</strong> ${product.color[0]}</p>
                <p class="product-gender"><strong>Genero:</strong> ${product.gender}</p>
                <p class="product-stock"><strong>Stock:</strong> ${product.stockAvailability}</p>
                <p class="product-price-discount">
                    <strong>Precio:</strong> $${product.price.toFixed(3)} 
                    <span class="product-discount">(${product.discount} OFF)</span>
                </p>
                
                <p><strong>Cantidad:</strong>  <input type="number" placeholder="unidades" id="cantUnidadProduct" value="1" min="1" pattern="^[0-9]+"></p>
                
                <button onclick="addProductToCart()" class="btn btn-add-cart" title="Agregar a carrito">
                <i class="fa-solid fa-plus"></i>
                Agregar al carrito
                </button>
                
            </div>
        </div>
    `;
}

/**
 * ? Obtengo el carrito de productos del localstorage
 * @returns 
 */
function getCart(){
    const cart = localStorage.getItem("productCart");

    return cart ? JSON.parse(cart) : [];
}

/**
 * ? Guardo el carrito con los productos en el localstorage
 * @param {*} cart 
 */
function saveCart(cart){
    localStorage.setItem('productCart',JSON.stringify(cart));
}


/**
 * ? Agrego productos al carrito
 */
function addProductToCart(){
    const cantProduct = document.getElementById("cantUnidadProduct").value;    
    const cart = getCart();
   
    for (let i = 0; i < cantProduct; i++) {
        cart.push(productView);        
    }
    
    saveCart(cart);
    checkCartList();
    document.getElementById("cantUnidadProduct").value = 1;
    
    Toastify({
        text: "Producto agregado al carrito",
        className: "success",
        style: {
          background: "linear-gradient(to right,#00b09b,#96c93d)",
        }
      }).showToast();      
}


/**
 * Checkeo el listado de productos para setear la cantidad de productos en el carrito
 */
function checkCartList(){
    const listProductCart = localStorage.getItem("productCart");
     if(listProductCart){
        let countProduct = (JSON.parse(listProductCart)).length;
        
        drawCountCartView(countProduct);
     }
}

/**
 * Obtengo la cantidad de productos que se encuentran en el carrito
 * @param {*} countProduct 
 */
function drawCountCartView(countProduct){
    const cartViewHtml = document.getElementById("cartViewCount");
    cartViewHtml.innerHTML = countProduct;
}


main();