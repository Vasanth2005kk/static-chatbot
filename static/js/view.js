document.addEventListener('DOMContentLoaded', function () {
    // View modal elements
    const viewModal = document.getElementById('view-modal');
    const viewCloseBtn = viewModal.querySelector('.close-btn');
    const viewQuestion = document.getElementById('view-question');
    const viewAnswer = document.getElementById('view-answer');
    const viewImage = document.getElementById('view-image');

    // Add event listeners to view buttons
    document.querySelectorAll('.btn-view').forEach((button) => {
        button.addEventListener('click', function () {
            const row = button.closest('tr'); // Get the corresponding row

            // Get data from the row (adjust indices based on your table)
            const question = row.cells[1].textContent;
            const answer = row.dataset.answer || "No answer available"; // Example for answer storage
            const imageSrc = row.dataset.image || ""; // Example for image storage

            // Populate the modal
            viewQuestion.textContent = question;
            viewAnswer.textContent = answer;
            if (imageSrc) {
                viewImage.src = imageSrc;
                viewImage.style.display = 'block';
            } else {
                viewImage.style.display = 'none';
            }

            // Show the modal
            viewModal.style.display = 'block';
        });
    });

    // Close the view modal
    viewCloseBtn.addEventListener('click', function () {
        viewModal.style.display = 'none';
    });
});