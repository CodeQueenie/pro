document.addEventListener('DOMContentLoaded', () => {
    // Updated Typing Animation for Hero Subtitle with more AI flair (for the main hero)
    const typingElement = document.getElementById('typing-subtitle');
    if (typingElement) {
        const phrases = [
            "Accelerating innovation with generative AI.",
            "Empowering businesses with intelligent automation.",
            "Deploying multi-agent systems for real-world impact.",
            "Transforming data into actionable insights."
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const delayBetweenPhrases = 1500;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            let displayText = '';

            if (isDeleting) {
                displayText = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                displayText = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            typingElement.textContent = displayText;

            let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = delayBetweenPhrases;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = typingSpeed;
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, delayBetweenPhrases / 2);
    }

    // Tab Navigation Logic
    const tabs = document.querySelectorAll('.tabs a');
    const tabContents = document.querySelectorAll('.tab-content');

    if (tabs.length > 0 && tabContents.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                const targetId = this.getAttribute('data-tab');
                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.classList.add('active');
                } else {
                    console.error(`Tab content with ID '${targetId}' not found.`);
                }
            });
        });

        const activeTab = document.querySelector('.tabs a.active');
        if (!activeTab && tabs.length > 0) {
            tabs[0].classList.add('active');
            const firstTargetId = tabs[0].getAttribute('data-tab');
            const firstTargetContent = document.getElementById(firstTargetId);
            if (firstTargetContent) {
                firstTargetContent.classList.add('active');
            }
        } else if (activeTab) {
            const activeTargetId = activeTab.getAttribute('data-tab');
            const activeTargetContent = document.getElementById(activeTargetId);
            tabContents.forEach(c => c.classList.remove('active'));
            if (activeTargetContent) {
                activeTargetContent.classList.add('active');
            }
        }
    }

    // Handle "Explore My Work" buttons
    const exploreWorkButtons = document.querySelectorAll('a[href="#projects"]');
    exploreWorkButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectsTab = document.querySelector('a[data-tab="projects"]');
            const projectsContent = document.getElementById('projects');
            if (projectsTab && projectsContent) {
                tabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                projectsTab.classList.add('active');
                projectsContent.classList.add('active');
                projectsContent.scrollIntoView({ behavior: 'smooth' });
            } else {
                console.error('Projects tab or content not found for Explore button.');
            }
        });
    });
});
