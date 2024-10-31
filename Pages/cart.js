
        // Function to retrieve cart items from localStorage
        function getCart() {
            return JSON.parse(localStorage.getItem('cart')) || [];
        }

        // Function to save cart items to localStorage
        function saveCart(cart) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }

        // Function to display the cart
        function displayCart() {
            const cart = getCart();
            const productContainer = document.getElementById('cart-container');
            productContainer.innerHTML = ''; // Clear previous content

            if (cart.length === 0) {
                productContainer.innerHTML = '<p>Your cart is empty.</p>';
                return;
            }

            // Fetch product data (assuming we have a JSON or API)
            fetch('../Assets/shoes.json')
                .then(response => response.json())
                .then(data => {
                    const allProducts = data.products;
                    var subtotal=0;
                    // Display each item in the cart
                    cart.forEach(item => {
                        const product = allProducts.find(p => p.product_id === item.product_id);
                        
                        subtotal+=product.price;
                        if (product) {
                            const productDiv = document.createElement('div');
                            productDiv.classList.add('cart-item');
                            productDiv.innerHTML = `
                                <img src="${product.image_url}" alt="${product.name}">
                                
                                    <h4>${product.brand} ${product.name}</h4>
                                    
                                    <p>Price: ₹<br>${product.price}</p>
                                    <p>Quantity:<br> ${item.quantity}</p>
                                    
                                
                                <button onclick="removeFromCart('${item.product_id}')">Remove</button>
                            `;
                            productContainer.appendChild(productDiv);
                        }
                    });
                })
                .catch(error => {
                    console.error('Error loading product data:', error);
                    productContainer.innerHTML = '<p>Unable to load cart items. Please try again later.</p>';
                });
        }

        // Function to remove an item from the cart
        function removeFromCart(productId) {
            let cart = getCart();
            cart = cart.filter(item => item.product_id !== productId); // Remove the selected item
            saveCart(cart); // Update localStorage
            displayCart(); // Refresh cart display
        }

        // Load the cart when the page is ready
        document.addEventListener('DOMContentLoaded', () => {
            displayCart();
        });
  