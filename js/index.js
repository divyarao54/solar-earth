var cursor = document.querySelector('.cursor');
var cursor2 = document.querySelector('.cursor2');
var posX = 0, posY = 0;
var mouseX = 0, mouseY = 0;

        TweenMax.to({}, 0.016, {
            repeat: -1,
            onRepeat: function () {
                posX += (mouseX - posX) / 9;
                posY += (mouseY - posY) / 9;

                TweenMax.set(cursor, {
                    css: {
                        left: mouseX,
                        top: mouseY
                    }
                });
                TweenMax.set(cursor2, {
                    css: {
                        left: mouseX,
                        top: mouseY
                    }
                });
            }
        });

        document.addEventListener('mousemove', function (e) {
            mouseX = e.pageX;
            mouseY = e.pageY;
        });

        document.querySelector('.hero-section').addEventListener('mouseenter', function () {
            cursor.classList.add('active');
        });

        document.querySelector('.hero-section').addEventListener('mouseleave', function () {
            cursor.classList.remove('active');
        });

        // locomotive-scroll setup
        const scrollContainer = document.querySelector('[data-scroll-container]');

        const scroll = new LocomotiveScroll({
            el: scrollContainer,
            smooth: true,
            getDirection: true,
            multiplier: 1,
        });

        gsap.registerPlugin(ScrollTrigger);

        // ✅ Sync Locomotive Scroll with ScrollTrigger
        ScrollTrigger.scrollerProxy(scrollContainer, {
            scrollTop(value) {
                return arguments.length
                    ? scroll.scrollTo(value, 0, 0)
                    : scroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return {
                    top: 0,
                    left: 0,
                    width: window.innerWidth,
                    height: window.innerHeight
                };
            },
            pinType: "transform"
        });

        // ✅ Refresh ScrollTrigger after Locomotive is ready
        scroll.on("scroll", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", () => scroll.update());
        ScrollTrigger.refresh();

        // ✅ GSAP animation
        gsap.to('.locomotive-scroll-text', {
            scrollTrigger: {
                trigger: '.pin-wrapper',
                scroller: scrollContainer, // Important!
                start: 'top top',
                end: "+=200",
                pin: true,
                //markers: true,
            },
            rotation: 0,
            duration: 3,
            ease: "none"
        });
        //gsap animation for about section
        const cardWidth = 500;
        const gap = 50;
        const cardCount = document.getElementsByClassName('about-card').length;
        const totalWidth = cardCount * cardWidth + (cardCount - 1) * gap;
        const visibleWidth = window.innerWidth;
        const buffer = 150;
        const scrollAmount = -(totalWidth - visibleWidth + buffer);
        gsap.to('.about-cards', {
            scrollTrigger: {
                trigger: '.about-scroll-wrapper',
                scroller: scrollContainer, // Important!
                pin: true,
                pinSpacing: false,
                start: 'top top',
                end: `+=${totalWidth + 500}`,
                scrub: 1,
                //markers: true,
            },
            x: scrollAmount,
            ease: "none"
        })
        //showing navbar menu items on active ...
        document.getElementsByClassName('navbar-menu')[0].addEventListener('click', function() {
            var targetElement = document.getElementsByClassName('navbar-menu-items')[0];
            targetElement.classList.add('active');
            scroll.stop();
            document.getElementsByClassName("c-scrollbar")[0].style.display = "none";
        });

        document.getElementsByClassName('navbar-menu-section-1-item')[3].addEventListener('click', function(){
            var targetElement = document.getElementsByClassName('navbar-menu-items')[0];
            targetElement.classList.remove('active');
            scroll.start();
            document.getElementsByClassName("c-scrollbar")[0].style.display = "block";
        })

//Draggable carousel for navbar-menu-section-2


let container = document.querySelector('.navbar-menu-section-2-container');
let innerContainer = document.querySelector('.navbar-menu-section-2');

let pressed = false;
let startX;
let currentX = 0;
let targetX = 0;
let animationFrameId;

// LERP Function
function lerp(start, end, amt) {
    return start + (end - start) * amt;
}

// Animation loop
function animate() {
    currentX = lerp(currentX, targetX, 0.1); // Adjust 0.1 for smoother/faster effect
    innerContainer.style.left = `${currentX}px`;
    checkBoundary();
    animationFrameId = requestAnimationFrame(animate);
}

container.addEventListener("mousedown", (e) => {
    pressed = true;
    startX = e.pageX - targetX;
    container.style.cursor = "none";
    cursor2.classList.add('active3');
    cursor2.classList.remove('active2');
});

container.addEventListener("mousemove", (e) => {
    if (!pressed) return;
    e.preventDefault();

    // Update target position, not the actual position
    targetX = e.pageX - startX;
});

container.addEventListener("mouseup", () => {
    pressed = false;
    container.style.cursor = "none";
    cursor2.classList.add('active2');
    cursor2.classList.remove('active3');
});

container.addEventListener("mouseleave", () => {
    pressed = false;
    container.style.cursor = "default";
    cursor2.classList.remove('active2');
    cursor2.classList.remove('active3');
});

container.addEventListener("mouseenter", () => {
    container.style.cursor = "none";
    cursor2.classList.add('active2');
    cursor2.classList.remove('active3');
});

// Start animation
animate();

// Check boundaries after every lerped frame
function checkBoundary() {
    let outer = container.getBoundingClientRect();
    let inner = innerContainer.getBoundingClientRect();
    let maxLeft = 0;
    let maxRight = outer.width - inner.width;

    if (targetX > maxLeft) {
        targetX = maxLeft;
    }
    if (targetX < maxRight) {
        targetX = maxRight;
    }
}

//Making classlist active for .navbar-menu-text and .menu-description on hover over .menu-img
var menuImg = document.querySelectorAll('.menu-img');
var menuText = document.querySelectorAll('.navbar-menu-text');
var menuDesc = document.querySelectorAll('.menu-description');

menuImg.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
        menuText[index].classList.add('active');
        menuDesc[index].classList.add('active');
    });
    item.addEventListener('mouseleave', () => {
        menuText[index].classList.remove('active');
        menuDesc[index].classList.remove('active');
    });
    menuText[index].addEventListener('mouseenter', () => {
        menuText[index].classList.add('active');
        menuDesc[index].classList.add('active');
    });
    menuText[index].addEventListener('mouseleave', () => {
        menuText[index].classList.remove('active');
        menuDesc[index].classList.remove('active');
    });
});


// Reinitialize LocomotiveScroll and ScrollTrigger to account for changes

ScrollTrigger.addEventListener("refresh", () => scroll.update());
ScrollTrigger.refresh();


