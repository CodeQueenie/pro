// JavaScript for form submission and interactivity

// Form submission handler
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission
    alert('Thank you for your message!');
});

// Chatbot functionality
document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('chatToggle');
    const chatContainer = document.getElementById('chatContainer');
    const closeChat = document.getElementById('closeChat');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendMessageBtn = document.getElementById('sendMessage');
    const quickQuestions = document.getElementById('quickQuestions');

    // Chat responses database
    const responses = {
        "background": "I graduated with honors in Computer Science and have 5+ years of experience in software development. I specialize in web development and AI applications.",
        "skills": "My core skills include: \n- Frontend: React, Vue.js, JavaScript\n- Backend: Node.js, Python\n- Database: MongoDB, PostgreSQL\n- Cloud: AWS, Azure",
        "contact": "You can reach me through:\n- Email: [Your email]\n- LinkedIn: [Your LinkedIn]\n- Or use the contact form above!",
        "projects": "I've worked on several exciting projects including:\n- AI-powered chatbot systems\n- E-commerce platforms\n- Data visualization dashboards",
        "hello": "Hi there! How can I help you today?",
        "hi": "Hello! What would you like to know about Nicole?",
        "who are you": "I'm Nicole's chatbot assistant. I can tell you about her background, experience, and interests!",
        "default": "I'm not sure about that. Would you like to know about Nicole's background, skills, projects, or how to contact her?"
    };

    // Auto-open chat after 2 seconds
    setTimeout(() => {
        chatContainer.style.display = 'block';
        chatToggle.style.display = 'none';
    }, 2000);

    // Toggle chat window
    chatToggle.addEventListener('click', () => {
        chatContainer.style.display = 'block';
        chatToggle.style.display = 'none';
    });

    // Close chat window
    closeChat.addEventListener('click', () => {
        chatContainer.style.display = 'none';
        chatToggle.style.display = 'block';
    });

    // Handle quick question buttons
    quickQuestions.addEventListener('click', (e) => {
        if (e.target.classList.contains('quick-btn')) {
            const question = e.target.dataset.question;
            handleUserMessage(question);
        }
    });

    // Send message function
    function handleSendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        handleUserMessage(message);
    }

    // Handle user message
    function handleUserMessage(message) {
        // Add user message
        addMessage(message, 'user-message');

        // Get and add bot response
        const response = getBotResponse(message);
        setTimeout(() => {
            addMessage(response, 'bot-message');
        }, 500);

        // Clear input if it's from the text input
        if (userInput.value) {
            userInput.value = '';
        }
    }

    // Add message to chat
    function addMessage(message, className) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${className}`;
        
        if (className === 'bot-message') {
            const img = document.createElement('img');
            img.src = 'images/profile.jpg';
            img.alt = 'Nicole LeGuern';
            img.className = 'message-profile-pic';
            messageDiv.appendChild(img);
        }
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = message.replace(/\n/g, '<br>');
        messageDiv.appendChild(contentDiv);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Get bot response based on user input
    function getBotResponse(message) {
        message = message.toLowerCase();
        
        // Check for exact matches first
        for (const [key, value] of Object.entries(responses)) {
            if (message.includes(key)) {
                return value;
            }
        }
        
        // Check for topic-based matches
        if (message.includes('tell me about') || message.includes('what is')) {
            for (const topic of ['background', 'skills', 'projects']) {
                if (message.includes(topic)) {
                    return responses[topic];
                }
            }
        }
        
        return responses.default;
    }

    // Event listeners for sending messages
    sendMessageBtn.addEventListener('click', handleSendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });
});
