window.addEventListener('DOMContentLoaded',()=>{
  const headerNav = document.querySelector("header nav");
  document.querySelector("header #menu-close-btn").addEventListener('click', ()=>{
    headerNav.classList.add("hidden");
  })

  document.querySelector("header #menu-collapse-btn").addEventListener('click',()=>{
    headerNav.classList.remove('hidden');
  })
})