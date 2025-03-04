document.addEventListener('DOMContentLoaded', () => {
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const closeChat = document.querySelector('.close-chat');
    const chatInput = document.querySelector('.chatbot-input input');
    const messagesContainer = document.querySelector('.chatbot-messages');

    // Auto-open chatbot after 2 seconds
    setTimeout(() => {
        chatbotContainer.classList.add('show');
        chatbotToggle.style.display = 'none';
    }, 2000);

    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.add('show');
        chatbotToggle.style.display = 'none';
    });

    closeChat.addEventListener('click', () => {
        chatbotContainer.classList.remove('show');
        chatbotToggle.style.display = 'flex';
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.target.value.trim() !== '') {
            const userMessage = e.target.value;
            
            // Add user message
            const userDiv = document.createElement('div');
            userDiv.className = 'message user-message';
            userDiv.textContent = userMessage;
            messagesContainer.appendChild(userDiv);
            
            // Clear input
            e.target.value = '';
            
            // Auto scroll to bottom
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            // Simulate bot response
            setTimeout(() => {
                const botDiv = document.createElement('div');
                botDiv.className = 'message bot-message';
                botDiv.textContent = "I'm a demo chatbot. In the full version, I'll provide detailed information about Nicole's experience and skills!";
                messagesContainer.appendChild(botDiv);
                messagesContainer.scrollTop = messagesContainer.scrollHeight;
            }, 1000);
        }
    });
});
