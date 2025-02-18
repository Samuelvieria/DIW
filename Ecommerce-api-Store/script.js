document.addEventListener('DOMContentLoaded', function() {
    let products = document.querySelector('.products');
    let url = `https://api.escuelajs.co/api/v1/products?offset=0&limit=5`;
    let opset = 0;
    let cartItems = []; // Array para armazenar os itens do carrinho

    // Função para adicionar um item ao carrinho
    function addToCart(productId) {
        // Verifica se o item já existe no carrinho
        const existingItem = cartItems.find(item => item.productId === productId);

        if (existingItem) {
            existingItem.quantity++; // Incrementa a quantidade do item
        } else {
            cartItems.push({ productId, quantity: 1 }); // Adiciona um novo item ao carrinho
        }

        console.log('Item adicionado ao carrinho:', cartItems);
    }

    async function fetchProducts(url) {
        try {
            let data = await fetch(url);
            opset = opset + 5;
            if (data.ok) {
                let response = await data.json();

                for (let i = 0; i < response.length; i++) {
                    let description = response[i].description;
                    let title = response[i].title;
                    products.innerHTML += `
                        <div class="product">
                            <img src="${response[i].images[1]}" alt="${response[i].category.name}" class="product-img">
                            <div class="product-content">
                                <h2 class="product-title">${title.length > 18 ? title.substring(0, 18).concat(' ...') : title}</h2>
                                <h4 class="product-category">${response[i].category.name}</h4>
                                <p class="product-description">${description.length > 80 ? description.substring(0, 80).concat(' ...more') : description}</p>
                                <div class="product-price-container">
                                    <h3 class="product-price">$${response[i].price}</h3>
                                    <a href="#!" data-productId="${response[i].id}" class="add-to-cart"><ion-icon name="cart-outline"></ion-icon></a>
                                </div>
                            </div>
                        </div>
                    `;
                }
            }
        } catch (err) {
            console.log(err);
        }
    }
    fetchProducts(url);

    // Evento de clique no botão "Adicionar ao carrinho"
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart')) {
            event.preventDefault();
            const productId = event.target.getAttribute('data-productId');
            addToCart(productId);
        }
    });

    // Função para exibir o conteúdo do carrinho no console
    function showCart() {
        console.log('Itens do carrinho:', cartItems);
    }

    // Fazer a chamada para a nova API
    fetch('https://fakestoreapi.com/carts')
        .then(response => response.json())
        .then(data => {
            cartItems = data[0].products;
            showCart();
        })
        .catch(error => console.log('Erro ao obter o carrinho:', error));
});
