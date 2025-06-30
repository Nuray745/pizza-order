function toggleMenu(id) {
    const section = document.getElementById(id);
    section.classList.toggle("hidden");
}
function toggleMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    menu.classList.toggle("hidden");
}
function toggleMenu(id) {
    const menu = document.getElementById(id);
    menu.classList.toggle('hidden');
}
function navigate(url) {
    window.location.href = url
}
const sidemenu = document.getElementById('sidemenu')
async function ShowMenu() {
    let menu = await Menus()

    menu.forEach((item, i) => {
        sidemenu.innerHTML += `
      <div>
    <h2 class="hidden md:block md:text-2xl font-bold mb-4">${item.name}</h2>
    <ul id="${item.id}" class="hidden md:block md:space-y-4 text-[16px] text-gray-700"></ul>
</div>

        `
        showSubMenu(item.id, i)
    });
}

async function showSubMenu(itemId, i) {
    const menu = await Menus()
    const menuDiv = document.getElementById(`${itemId}`)
    menu[i].children.forEach(item => {
        menuDiv.innerHTML += `<li onclick="findType('${item.id}')" class = "cursor-pointer"> ${item.name}</li>`
    })

}


ShowMenu()

const mainmenu = document.getElementById('mainmenu')

async function MainMenu() {
    let menu = await Menus();

    mainmenu.innerHTML = '';


    menu.forEach(cat => {
        mainmenu.innerHTML += `
            <div class="col-span-full">
                <h2 class="text-2xl font-bold mt-6 mb-4 text-black border-b border-gray-300 pb-2">${cat.name}</h2>
            </div>
        `;

        cat.children.forEach(item => {
            mainmenu.innerHTML += `
                <div onclick="findType('${item.id}')" class="cursor-pointer flex items-center space-x-4">
                    <div class="w-[80px] h-[80px] mb-0 md:w-[140px] md:h-[140px] md:md:ml-[50px] md:gap-50 lg:grid-cols-4 gap-20  mb:mb-6 rounded-full overflow-hidden border-1 border-green-900">
                        <img src="${item.categoryImageURL}" alt="${item.name}" class="w-full h-full object-cover" />
                    </div>
                    <span class="text-lg font-medium">${item.name}</span>
                </div>
            `;
        });
    });
}



MainMenu()

async function findType(id) {
    const menu = await Menus();
    
    const container = document.getElementById("mainmenu");

    function findItemById(items, id) {
        for (let item of items) {
            if (item.id === id) return item;
            if (item.children && item.children.length > 0) {
                const found = findItemById(item.children, id);
                if (found) return found;
            }
        }
        return;
    }

    function renderCategory(item) {
        let html = `
            <div class="mb-8">
                <h2 class="text-[28px] font-bold text-black mb-3">${item.name}</h2>
        `;

        if (item.products && item.products.length > 0) {
            html += `
       <div class="grid grid-cols-2 md:grid-cols-3 md:ml-[50px] md:gap-50 lg:grid-cols-4 gap-20  mb-6 cursor-pointer ">
    ${item.products.map(prod =>

            ` <div onclick="navigate('../html/details.htm?id=${prod.uri}')" class="flex flex-col items-center text-center p-2 ">
            <div class="w-[120px] h-[120px] md:w-[140px] md:h-[140px] rounded-full overflow-hidden border-2 border-green-900">
                <img src="${prod.imageURL}" 
                     alt="${prod.name}"
                     class="w-full h-full object-cover" />
            </div>
            <span class="text-sm md:text-base font-medium text-gray-900 mt-2">${prod.name}</span>
        </div>
    `).join('')}
</div>


    `;
        }


        if (item.children && item.children.length > 0) {
            html += item.children.map(child => renderCategory(child)).join('');
        }

        html += `</div>`;
        return html;
    }

    const item = findItemById(menu, id);

    container.innerHTML = renderCategory(item);
}

 

