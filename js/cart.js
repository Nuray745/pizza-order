let basket = JSON.parse(localStorage.getItem("basket")) || [];
let cartItems = document.getElementById("cart-items");

function renderCart() {
    if (basket.length === 0) {
        cartItems.innerHTML = `
            <img src="../img/cart logo.webp" alt="Order Icon" class="w-40 md:w-48 mx-auto mb-6 opacity-80" />
            <h2 class="text-2xl font-bold mb-2">Start your next order</h2>
            <p class="text-gray-600 mb-6">As you add menu items, they'll appear here. You'll have a chance to review before placing your order.</p>
            <button class="px-6 py-2 mb-[20px] border border-green-700 text-green-700 rounded-full hover:bg-green-50 transition">Add items</button>
        `;
    } else {
        cartItems.innerHTML = "";  
        basket.forEach((item, index) => {
            cartItems.innerHTML += `
             <div>
                       <div class="flex gap-4 items-start">
                    <img src="${item.imageURL}" alt="${item.name}" class="w-16 h-16 rounded-full object-cover" />
                    <div>
                        <h2 class="text-lg font-semibold text-gray-900">${item.name}</h2>
                        <p class="text-sm text-gray-700 mt-1">${item.sizes}</p>
                    </div>
                </div>

                <div class="flex justify-start gap-4 text-gray-500">
                    <button class="hover:text-black" title="Edit">✏️</button>
                    <button onclick="addSameItem(${index})" class="hover:text-black" title="Add">➕</button>
                    <button onclick="deleteItems(${index})" class="hover:text-black" title="Delete">🗑️</button>
                </div>
                <hr class="my-4"/>
             </div>
            `;
        });
    }
}


function deleteItems(index) {
    basket.splice(index, 1); 
    localStorage.setItem("basket", JSON.stringify(basket)); 
    renderCart(); 
}

renderCart();

function addSameItem(index) {
    const item = basket[index];
    const newItem = { ...item }; 
    basket.push(newItem);        
    localStorage.setItem("basket", JSON.stringify(basket)); 
    renderCart();            
}