const images = [
     // Replace these with the actual image URLs
    './Images/banner2.png',
    './Images/banner3.png',
    './Images/banner1.png'
];
document.addEventListener('DOMContentLoaded', () => {
const navbar = document.querySelector('.header');
let top = navbar.offsetTop;
function stickynavbar() {
  if (window.scrollY >= top) {    
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');    
  }
}
window.addEventListener('scroll', stickynavbar);
});

let currentIndex = 0; // Track the current image index
const bannerImg = document.getElementById('banner-img');

// Function to change the banner image
const changeBannerImage = () => {
    currentIndex = (currentIndex + 1) % images.length; // Move to the next image, looping back to the start
    bannerImg.src = images[currentIndex]; // Update the image source
};

// Change the image every 4 seconds (4000 milliseconds)
setInterval(changeBannerImage, 10000);


function redirectToCategory(category) {
  localStorage.setItem('selectedFilter', category); // Store selected category in local storage
  localStorage.setItem('Filter','Category');
  window.location.href = './Pages/products.html'; // Redirect to products page
}

function redirectToBrand(brand) {
  localStorage.setItem('selectedFilter',brand);
  localStorage.setItem('Filter','Brand');
  window.location.href='./Pages/products.html';
}

function redirectToCart(){
  window.location.href='./Pages/cart.html';
}