import { gsap } from "gsap";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";
import { scrollToSection } from './utils.js';

gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

// Token Validation
let token = "your_token_value";
if (!token) {
    console.error("Empty token!");
} else {
    console.log("Token value:", token);
}

document.addEventListener("DOMContentLoaded", () => {
    initScrollToTop();
    initFAQToggle();
    initAnimations();
    initSmoothScroll();
    initAlbums();
});

/**
 * Initializes the "Back to Top" button functionality.
 */
function initScrollToTop() {
    const backToTopButton = document.getElementById('backToTop');

    if (!backToTopButton) return;

    // Show/Hide "Back to Top" Button on Scroll
    window.addEventListener('scroll', () => {
        backToTopButton.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    // Smooth Scroll to Top
    backToTopButton.addEventListener('click', () => {
        gsap.to(window, { duration: 1, scrollTo: 0 });
    });
}

/**
 * Initializes FAQ toggle functionality.
 */
function initFAQToggle() {
    const faqToggle = document.querySelector(".faq-toggle");
    const faqContent = document.getElementById("faq-content");

    if (faqToggle && faqContent) {
        faqToggle.addEventListener('click', () => {
            faqContent.classList.toggle('hidden');
        });
    }
}

/**
 * Initializes animations for various elements on the page.
 */
function initAnimations() {
    // Header Animation
    gsap.from('header', {
        duration: 1.5,
        opacity: 0,
        y: -50,
        ease: 'power2.out',
    });

    // Benefits Section Animation
    gsap.from('.benefit-item', {
        scrollTrigger: {
            trigger: '.benefits',
            start: 'top 80%',
        },
        duration: 1,
        opacity: 0,
        y: 50,
        stagger: 0.3,
    });

    // Testimonials Section Animation
    gsap.from('.testimonial-item', {
        scrollTrigger: {
            trigger: '#depoimentos',
            start: 'top 80%',
        },
        duration: 1,
        opacity: 0,
        y: 50,
        stagger: 0.2,
    });

    // Albums Section Animation
    gsap.from('.album', {
        scrollTrigger: {
            trigger: '.albums',
            start: 'top 80%',
        },
        duration: 1,
        opacity: 0,
        y: 50,
        stagger: 0.2,
    });

    // Fade-In Animation Using IntersectionObserver
    const fadeInElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeInElements.forEach(element => observer.observe(element));

    // Expand Image on Click
    const allImages = document.querySelectorAll('img');
    allImages.forEach(image => {
        image.addEventListener('click', () => {
            document.querySelectorAll('img.expanded').forEach(expandedImage => {
                expandedImage.classList.remove('expanded');
            });
            image.classList.toggle('expanded');
        });
    });
}

/**
 * Initializes smooth scrolling for anchor links.
 */
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            scrollToSection(target);
        });
    });
}

/**
 * Initializes album switching functionality.
 */
function initAlbums() {
    const albumButtons = document.querySelectorAll(".album-buttons button");
    const albums = document.querySelectorAll(".album");

    albumButtons.forEach(button => {
        button.addEventListener("click", () => {
            const albumId = button.getAttribute("data-album");
            albums.forEach(album => {
                album.classList.add('hidden');
            });
            const selectedAlbum = document.getElementById(albumId);
            if (selectedAlbum) {
                selectedAlbum.classList.remove('hidden');
                gsap.from(selectedAlbum, { duration: 0.5, opacity: 0, y: 20 });
            }
        });
    });

    if (albums.length > 0) {
        albums[0].classList.remove('hidden');
    }
}
