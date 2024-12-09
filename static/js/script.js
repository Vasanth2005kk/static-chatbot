const menuBtn = document.getElementById("menuBTN");
const menuContiner = document.getElementById('active');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('opened');
    menuBtn.setAttribute('aria-expanded', menuBtn.classList.contains('opened'));

    // Toggle a class on the container instead of removing the 'id'
    menuContiner.classList.toggle('visible'); // Assume 'visible' shows/hides the container
});


// login show button

document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);

    // Toggle the button text
    this.textContent = type === 'password' ? 'Show' : 'Hide';
});

