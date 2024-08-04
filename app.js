const translate = document.querySelectorAll(".translate");
const big_title = document.querySelector(".big-title");
const header = document.querySelector("header");
const shadow = document.querySelector(".shadow");
const content = document.querySelector(".content");
const section = document.querySelector("section");
const image_container = document.querySelector(".imgContainer");
const opacity = document.querySelectorAll(".opacity");
const border = document.querySelector(".border");

let header_height = header.offsetHeight;
let section_height = section.offsetHeight;

document.addEventListener('DOMContentLoaded', function () {
    const splashScreen = document.querySelector('.splash-screen');
    const imagesToPreload = [
        'https://images.pexels.com/photos/3727262/pexels-photo-3727262.jpeg',
        'https://images.pexels.com/photos/3873672/pexels-photo-3873672.jpeg',
        'https://images.pexels.com/photos/17346705/pexels-photo-17346705/free-photo-of-sea-coast-of-monaco.jpeg',
        'https://images.pexels.com/photos/2086765/pexels-photo-2086765.jpeg'
    ];

    let imagesLoaded = 0;

    function preloadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                imagesLoaded++;
                updateLoadingProgress();
                resolve();
            };
            img.onerror = reject;
            img.src = url;
        });
    }

    function updateLoadingProgress() {
        const progress = (imagesLoaded / imagesToPreload.length) * 100;
        // You can update a progress bar here if you want to show loading progress
        console.log(`Loading progress: ${progress}%`);
    }

    function preloadImages() {
        return Promise.all(imagesToPreload.map(preloadImage));
    }

    preloadImages()
        .then(() => {
            console.log('All images preloaded');
            // Hide splash screen after all images are loaded
            setTimeout(() => {
                splashScreen.classList.add('hide-splash');
            }, 500); // Short delay for smooth transition
        })
        .catch(error => {
            console.error('Error preloading images:', error);
            // Hide splash screen even if there's an error
            splashScreen.classList.add('hide-splash');
        });
});


const counters = document.querySelectorAll('.count');
const speed = 200; // The lower the slower

const updateCount = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;

    // Lower inc to slow and higher to slow
    const inc = target / speed;

    // Check if target is reached
    if (count < target) {
        // Add inc to count and output in counter
        counter.innerText = Math.ceil(count + inc);
        // Call function every ms
        setTimeout(() => updateCount(counter), 1);
    } else {
        counter.innerText = target;
    }
};

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1 // Adjust threshold as needed
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            updateCount(counter);
            observer.unobserve(counter); // Stop observing once the animation starts
        }
    });
};

const observer = new IntersectionObserver(observerCallback, observerOptions);

counters.forEach(counter => {
    observer.observe(counter);
});


document.addEventListener('DOMContentLoaded', function () {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const handleIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    const elements = document.querySelectorAll('.fade-in, .fade-in-from-bottom, .fade-in-from-right, .fade-in-from-left');
    elements.forEach(element => {
        observer.observe(element);
    });
});








window.addEventListener('scroll', () => {
    let scroll = window.pageYOffset;
    let sectionY = section.getBoundingClientRect();
    
    translate.forEach(element => {
        let speed = element.dataset.speed;
        element.style.transform = `translateY(${scroll * speed}px)`;
    });

    opacity.forEach(element => {
        element.style.opacity = scroll / (sectionY.top + section_height);
    })

    big_title.style.opacity = - scroll / (header_height / 2) + 1;
    shadow.style.height = `${scroll * 0.5 + 300}px`;

    content.style.transform = `translateY(${scroll / (section_height + sectionY.top) * 50 - 50}px)`;
    image_container.style.transform = `translateY(${scroll / (section_height + sectionY.top) * -50 + 50}px)`;

    border.style.width = `${scroll / (sectionY.top + section_height) * 30}%`;
})

// ... (previous scroll animation code remains the same)

// Hamburger menu functionality
const hamburger = document.querySelector('.hamburger-menu');
const navList = document.querySelector('.nav-list');

hamburger.addEventListener('click', () => {
    navList.classList.toggle('active');
    document.body.classList.toggle('menu-open');
    
    // Animate hamburger menu
    hamburger.classList.toggle('active');
    const bars = hamburger.querySelectorAll('.bar');
    bars[0].classList.toggle('animate-bar-1');
    bars[1].classList.toggle('animate-bar-2');
    bars[2].classList.toggle('animate-bar-3');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        document.body.classList.remove('menu-open');
        hamburger.classList.remove('active');
        const bars = hamburger.querySelectorAll('.bar');
        bars[0].classList.remove('animate-bar-1');
        bars[1].classList.remove('animate-bar-2');
        bars[2].classList.remove('animate-bar-3');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 70; // Adjust this value based on your fixed header height
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// ... (rest of the JavaScript code remains the same)

// Animate elements on scroll


// Form submission
const form = document.getElementById('contact-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Here you would typically send the form data to a server
    // For this example, we'll just log it to the console
    const formData = new FormData(form);
    console.log('Form submitted with the following data:');
    for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
    
    // Clear the form
    form.reset();
    
    // Show a success message (you can replace this with a more user-friendly notification)
    alert('Thank you for your message. We will get back to you soon!');
});
