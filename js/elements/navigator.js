export function initializeNav() {
    const navButtons = document.querySelectorAll('nav button');
    const sections = document.querySelectorAll('.section');

    for (const button of navButtons) {
        button.addEventListener('click', (event) => {
            // Ensure we always reference the button itself
            const clickedButton = event.currentTarget;

            // Remove active class from all buttons and sections
            for (const btn of navButtons) btn.classList.remove('active-btn');
            for (const section of sections) section.classList.remove('active');

            // Add active class to clicked button and corresponding section
            clickedButton.classList.add('active-btn');
            const sectionId = clickedButton.id.replace('btn-', 'section-');
            const targetSection = document.getElementById(sectionId);

            if (targetSection) targetSection.classList.add('active');
        });
    }
}