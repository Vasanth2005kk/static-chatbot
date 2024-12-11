document.addEventListener('DOMContentLoaded', function () {
    // Edit modal elements
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');
    const editCloseBtn = editModal.querySelector('.close-btn');

    // Show the edit modal when an edit button is clicked
    document.querySelectorAll('.btn-edit').forEach((button, index) => {
        button.addEventListener('click', function () {
            const row = button.closest('tr');
            const question = row.cells[1].textContent;

            // Populate the edit form with existing data
            document.getElementById('edit-question').value = question;
            document.getElementById('edit-answer').value = ""; // Update with existing answer if stored

            editModal.style.display = 'block';

            // Save changes on form submit
            editForm.onsubmit = function (e) {
                e.preventDefault();

                const updatedQuestion = document.getElementById('edit-question').value;
                const updatedAnswer = document.getElementById('edit-answer').value;
                const updatedImage = document.getElementById('edit-image').files[0];

                if (updatedQuestion && updatedAnswer) {
                    console.log('Updated Question:', updatedQuestion);
                    console.log('Updated Answer:', updatedAnswer);
                    console.log('Updated Image:', updatedImage);

                    // Update the table row
                    row.cells[1].textContent = updatedQuestion;

                    // Close the modal
                    editForm.reset();
                    editModal.style.display = 'none';
                } else {
                    alert('Please fill in all fields.');
                }
            };
        });
    });

    // Close the edit modal
    editCloseBtn.addEventListener('click', function () {
        editModal.style.display = 'none';
    });
});