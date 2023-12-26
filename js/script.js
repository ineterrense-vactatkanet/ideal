let cart = [];

function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    displayCartItems();
}

function displayCartItems() {
    const cartItemsElement = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    const cartItemsPageElement = document.getElementById('cart-items-page');
    const cartTotalPageElement = document.getElementById('cart-total-page');

    cartItemsElement.innerHTML = '';
    cartItemsPageElement.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `<div>${item.name}</div><div>$${item.price}</div>`;
        cartItemsElement.appendChild(cartItemElement);

        const cartItemPageElement = document.createElement('div');
        cartItemPageElement.classList.add('cart-item');
        cartItemPageElement.innerHTML = `<div>${item.name}</div><div>$${item.price}</div>`;
        cartItemsPageElement.appendChild(cartItemPageElement);

        total += item.price;
    });

    cartTotalElement.textContent = total;
    cartTotalPageElement.textContent = total;
}

function showCart() {
    const cartElement = document.getElementById('cart');
    const cartPageElement = document.getElementById('cart-page');

    if (cartElement.style.display === 'none' || cartElement.style.display === '') {
        cartElement.style.display = 'block';
        cartPageElement.style.display = 'none';
    } else {
        cartElement.style.display = 'none';
        cartPageElement.style.display = 'block';
    }
}

function proceedToPayment() {
    const cartPageElement = document.getElementById('cart-page');
    const cartElement = document.getElementById('cart');

    cartPageElement.style.display = 'block';
    cartElement.style.display = 'none';

    // Ajoutez ici la logique pour traiter le paiement via PayPal
}

// Intégration de l'API PayPal
paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: cart.reduce((acc, item) => acc + item.price, 0)
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Transaction réussie. ID de commande : ' + details.id);
            cart = []; // Réinitialise le panier après la transaction réussie
            displayCartItems(); // Met à jour l'affichage du panier
        });
    }
}).render('#paypal-button-container');