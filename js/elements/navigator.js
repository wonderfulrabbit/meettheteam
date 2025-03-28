export function initializeNav() {
    const navButtons = document.querySelectorAll('nav button');
    const sections = document.querySelectorAll('.section');  

    // Retrieve last saved section from localStorage or default to the first section
    const savedSectionId = localStorage.getItem('activeSection') || sections[0]?.id;

    function setActiveSection(sectionId) {
        // Remove active class from all buttons and sections
        for (const btn of navButtons) btn.classList.remove('active-btn');
        for (const section of sections) section.classList.remove('active');

        // Add active class to the matching button and section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            const matchingButton = document.querySelector(`#btn-${sectionId.replace('section-', '')}`);
            if (matchingButton) matchingButton.classList.add('active-btn');

            // Save active section in localStorage
            localStorage.setItem('activeSection', sectionId);
        }
    }

    // Attach click event listeners to buttons
    for (const button of navButtons) {
        button.addEventListener('click', (event) => {
            const clickedButton = event.currentTarget;
            const sectionId = clickedButton.id.replace('btn-', 'section-');
            setActiveSection(sectionId);
        });
    }

    // Set initial active section based on saved value
    setActiveSection(savedSectionId);
}