let url = new URLSearchParams(window.location.search);
let id = url.get('id');
console.log(id);

let foundProduct =[]


let count = Number(localStorage.getItem('cartCount')) || 0;
document.getElementById('cart-count').textContent = count;




async function showProducts() {
    const prodMenu = document.getElementById('prodMenu')
    const size = document.getElementById('size')

    let data = await Menus()

   // let foundProduct = null

    data.forEach(category => {
        category.children.forEach(subCategory => {
            subCategory.children.forEach(drinkGroup => {
                drinkGroup.products.forEach(product => {
                    if(product.uri === id){
                        foundProduct = product
                    }
                })
            })
        })
    });


    prodMenu.innerHTML += `
        <div>
            <img class="w-[200px] m-auto md:w-[300px]" src="${foundProduct.imageURL}" alt="">
        </div>
        <div>
            <p class="text-[36px] font-bold text-white">${foundProduct.name}</p>
        </div>
    `
    let bottle = {
        Short:'<i class="bi bi-cup-straw text-[24px]"></i>',
        Tall:'<i class="bi bi-cup-straw text-[28px]"></i>',
        Grande:'<i class="bi bi-cup-straw text-[32px]"></i>',
        Venti:'<i class="bi bi-cup-straw text-[36px]"></i>'
    }

    foundProduct.sizes.forEach(item => {
         size.innerHTML += `
    <div onclick= "chooseSize('${item.sizeCode}')" class="w-[90px] h-[90px] rounded-full p-3 transition-all duration-300 hover:bg-green-300/20 cursor-pointer">
        <div class="h-[40px] flex items-end justify-center">
        ${bottle[item.sizeCode]}
        </div>
        <p class="font-bold">${item.sizeCode}</p>
    </div>
    `
    })
}


showProducts()

function addToCart() {
    let count = Number(localStorage.getItem('cartCount')) || 0;
    let basket = JSON.parse(localStorage.getItem("basket")) || [];

    basket.push({
        ...foundProduct,
        sizes: sizeChosen
    });

    localStorage.setItem("basket", JSON.stringify(basket));

    count++;
    localStorage.setItem('cartCount', count);
    document.getElementById('cart-count').textContent = count;
}


let sizeChosen = ''
function chooseSize(size){
    console.log(size);
    sizeChosen = size
    
}

