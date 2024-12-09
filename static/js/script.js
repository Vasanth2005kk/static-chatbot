const menuBtn = document.getElementById("menuBTN");
const menuContiner = document.getElementById('active');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('opened');
    menuBtn.setAttribute('aria-expanded', menuBtn.classList.contains('opened'));

    // Toggle a class on the container instead of removing the 'id'
    menuContiner.classList.toggle('visible'); // Assume 'visible' shows/hides the container
});
