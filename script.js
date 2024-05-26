document.addEventListener("DOMContentLoaded", function () {
    // Typing effect
    new Typed(".typing", {
        strings: ["FULL STACK DEVELOPER", "VIDEO EDITOR", "CYBER SECURITY ENTHUSIAST", "CONSTRUCT2 GAME DEV","REACT-NATIVE APP DEV","FINTECH ENTHUSIAST"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });

    // Dark mode toggle
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        if (document.body.classList.contains("dark-mode")) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Parallax effect
    gsap.to(".parallax", {
        scrollTrigger: {
            trigger: ".parallax",
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        backgroundPosition: "50% 100%",
    });

    // Animate on scroll
    AOS.init();

    // Fade in animation on load
    gsap.from("body", { opacity: 0, duration: 1 });

    // Contact form submission
    const contactForm = document.getElementById("contact-form");
    
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = contactForm.querySelector("input[type='text']").value;
        const email = contactForm.querySelector("input[type='email']").value;
        const message = contactForm.querySelector("textarea").value;

        fetch('http://localhost:3000/submit', {
            method: 'POST',
            body: JSON.stringify({ name, email, message }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(data => {
            if (data.success) {
                alert('Message sent successfully!');
                contactForm.reset();
            } else {
                alert('Error sending message.');
            }
        }).catch(error => {
            alert('Error sending message.');
            console.error(error);
        });

        // name='';
        // email="";
        
    });
    const name= contactForm.querySelector("input[type='text']").value="";
    const email= contactForm.querySelector("input[type='email']").value="";
    const message = contactForm.querySelector("textarea").value="";
});
