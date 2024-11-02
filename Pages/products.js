async function loadProducts() {
    try {
        const response = await fetch('../Assets/shoes.json'); 
        const data = await response.json();
        const selectedFilter = localStorage.getItem('selectedFilter'); //stores the filter chosen by the user
        const Filter=localStorage.getItem('Filter'); //stores the type of filter
        console.log(selectedFilter);
        console.log(Filter);
        var filteredProducts;// Filter products based on selected category
        if(Filter === 'Category')
         filteredProducts= data.products.filter(product => product.category === selectedFilter);
        if(Filter === 'Brand')
         filteredProducts= data.products.filter(product => product.brand === selectedFilter);
        if(Filter === '')
            filteredProducts=data.products;
        console.log(filteredProducts);
        
        displayProducts(filteredProducts, selectedFilter);
    } catch (error) {
        console.error('Error loading the JSON data:', error);
    }
}

function displayProducts(products, category) {
    const productContainer = document.getElementById('product-container');
    const categoryTitle = document.getElementById('category-title');
    if(category==='none')
        categoryTitle.textContent = `All Products`;
    else
    categoryTitle.textContent = `${category} Products`;

    if (products.length > 0) {
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image_url}" alt="${product.name}">
                <div>
                <h3>${product.name}</h3>
                <p>Brand: ${product.brand}</p>
                <p>Price: ₹${product.price}</p>
                <button class="add-to-cart"> Add to Cart</button>
                <button class="buy-now"> Buy Now</button>
                </div>
            `;
            productContainer.appendChild(productDiv);

            const addToCartButton =productDiv.querySelector('.add-to-cart');
            if(addToCartButton)
                addToCartButton.addEventListener('click',()=>addToCart(product.product_id));
            else
                console.error(`Add to cart button not found for the product ${product.name}`);
        });
    } else {
        productContainer.innerHTML = '<p>No products available in this category.</p>';
    }
}

function getCart(){
    return JSON.parse(localStorage.getItem('cart'))|| [];
}
function saveCart(cart){
    localStorage.setItem('cart',JSON.stringify(cart));
}
function addToCart(productId){
    const cart=getCart();
    const productInCart=cart.find(item=>item.product_id===productId);

    if(productInCart){
        productInCart.quantity+=1;
    }
    else{
        cart.push({product_id:productId,quantity:1});
    }
    saveCart(cart);
    updateCartCount();
    console.log("Added to cart:",productId);
}   

function updateCartCount(){
    const cart=getCart();
    const cartCount=cart.reduce((total,item)=>total + item.quantity,0);
    const cartCountElement=document.getElementById('cart-count');

    if(cartCountElement){
        cartCountElement.textcontent=cartCount;
    }
}

// Load products on page load
loadProducts();
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});
function redirectToCart(){
    window.location.href="./cart.html";
}