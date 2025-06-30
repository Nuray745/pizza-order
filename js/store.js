/* const loader = document.getElementById('loader')
 */async function Menus() {
/*     loader.classList.remove('hidden')
 */    let res = await fetch('https://starbucks-data-nine.vercel.app/menus')
    let data = await res.json()
    
/*     loader.classList.add('hidden')
 */    return data;
}
Menus()

async function Details() {
    let res = await fetch('https://starbucks-data-nine.vercel.app/details')
    let data = await res.json()
    console.log(data);
    return data;
}
Details()

