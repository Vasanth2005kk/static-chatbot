document.addEventListener('DOMContentLoaded', function () {
  const addQDiv = document.getElementById('add-q');
  const modal = document.getElementById('add-modal');
  const closeBtn = modal.querySelector('.close-btn');
  const form = document.getElementById('add-form');

  addQDiv.addEventListener('click', function () {
    modal.style.display = 'block';
  });

  closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.reset();
    location.reload();
    modal.style.display = 'none';
  });
});

document.getElementById('add-form').onsubmit = function (e) {
  e.preventDefault(); // Prevent the default form submission behavior

  const formData = new FormData(this);

  fetch('/addData', {
    method: 'POST',
    body: formData
  })
    .then(response => response.text())
    .then(data => { console.log(data) })
    .catch(error => console.error('Error:', error));
};
