const navToggler = document.querySelector('.nav-toggler');
const aside = document.querySelector('.aside');
const overlay = document.querySelector('.overlay');
const navLinks = document.querySelectorAll('.nav li a');
const sections = document.querySelectorAll('section');
const closeBtn = document.querySelector('.close-btn');
const mainContent = document.querySelector('.main-content'); // For potential main-content adjustments

navToggler.addEventListener('click', () => {
    aside.classList.toggle('active');
    overlay.classList.toggle('active');
    navToggler.classList.toggle('active'); // Toggle the active class for animation
    mainContent.classList.toggle('active'); // Optional: Shift main-content if desired
});

// Close Sidebar when clicking on the Close Button
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        aside.classList.remove('active');
        overlay.classList.remove('active');
        navToggler.classList.remove('active'); // Reset the toggle button
        mainContent.classList.remove('active'); // Optional
    });
}

// Close Sidebar when clicking on a nav link (on mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) { // Only apply on small screens
            aside.classList.remove('active');
            overlay.classList.remove('active');
            navToggler.classList.remove('active'); // Reset the toggle button
            mainContent.classList.remove('active'); // Optional
        }
    });
});

// Section Navigation Functionality for All Internal Links
const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior

        // Remove 'active' class from all nav links
        navLinks.forEach(navLink => navLink.classList.remove('active'));

        // Add 'active' class to the clicked nav link if it's part of the sidebar
        if (link.closest('.nav')) {
            link.classList.add('active');
        }

        // Hide all sections
        sections.forEach(section => section.classList.add('hidden'));

        // Get the target section ID from the href attribute
        const targetId = link.getAttribute('href').substring(1); // Remove the '#' character

        // Show the target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.remove('hidden');
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }

        // Close the sidebar if on small screens
        if (window.innerWidth <= 768) {
            aside.classList.remove('active');
            overlay.classList.remove('active');
            navToggler.classList.remove('active'); // Reset the toggle button
            mainContent.classList.remove('active'); // Optional
        }
    });
});

// Show Home section on initial load
window.addEventListener('DOMContentLoaded', () => {
    // Remove 'hidden' class from home section
    const homeSection = document.getElementById('home');
    homeSection.classList.remove('hidden');
});