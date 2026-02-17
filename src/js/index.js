document.getElementById("menu-collapse-btn").addEventListener("click", ()=>{
    document.querySelector("nav").classList.toggle("hidden");
})

document.getElementById("menu-close-btn").addEventListener('click', ()=>{
    document.querySelector("nav").classList.add("hidden");
})