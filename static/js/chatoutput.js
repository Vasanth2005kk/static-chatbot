let responses = {};

// Load data from Data.json
async function loadData() {
    try {
        const response = await fetch('http://localhost:5000/Datajson'); // Update the path if necessary
        const data = await response.json();

        // Populate the responses object
        data.forEach(item => {
            responses[item.question] = {
                answer: item.answer || "No answer available",
                image: item.image || ""
            };
        });

        // Render questions in the UI
        renderQuestions(data);
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function renderQuestions(data) {
    const questionsContainer = document.querySelector('.chat-questions ul');
    questionsContainer.innerHTML = ''; // Clear existing questions

    data.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${item.question}`;
        li.onclick = () => handleQuestionClick(item.question);
        questionsContainer.appendChild(li);
    });
}

function handleQuestionClick(question) {
    addMessage(question, 'user');
    const botResponse = responses[question];
    if (botResponse) {
        setTimeout(() => addMessage(botResponse.answer, 'bot', botResponse.image), 500);
    } else {
        setTimeout(() => addMessage("I'm sorry, I don't have an answer for that.", 'bot'), 500);
    }
}

function addMessage(text, type, image = "") {
    const chatOutput = document.getElementById('chatOutput');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', type);

    // Replace newlines with <br> for HTML rendering
    const formattedText = text.replace(/\r?\n/g, '<br>');

    // Add text content
    const textSpan = document.createElement('span');
    textSpan.innerHTML = formattedText; // Use innerHTML to render <br>
    messageDiv.appendChild(textSpan);

    // Check if an image is provided and add it to the message
    if (image) {
        const img = document.createElement('img');
        img.src = image;
        img.alt = "Response Image";
        img.style.maxWidth = "100%";
        img.style.borderRadius = "8px";

        // Handle image load error
        img.onerror = () => {
            console.warn(`Image not found: ${image}`);
            img.remove(); // Remove the image element if it fails to load
        };

        messageDiv.appendChild(img);
    }

    const li = document.createElement('li');
    li.appendChild(messageDiv);
    chatOutput.appendChild(li);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}


// Initialize data loading
loadData();
