document.addEventListener("DOMContentLoaded", function () {
    const envelopeOverlay = document.getElementById('envelope-overlay');
    const openEnvelopeBtn = document.getElementById('open-envelope-btn');
    const mainContent = document.getElementById('main-content');

    // Handle Envelope Open Actions
    if (openEnvelopeBtn && envelopeOverlay) {
        openEnvelopeBtn.addEventListener('click', function () {
            // 1. Add class to initiate CSS opacity transition fadeout
            envelopeOverlay.classList.add('fade-out-overlay');
            
            // 2. Remove utility hiding styles on the main pipeline structure
            if(mainContent) {
                mainContent.style.visibility = "visible";
                mainContent.style.opacity = "1";
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    
    // ==========================================
    // 1. ENVELOPE OVERLAY LOGIC
    // ==========================================
    const envelopeOverlay = document.getElementById('envelope-overlay');
    const openEnvelopeBtn = document.getElementById('open-envelope-btn');
    const mainContent = document.getElementById('main-content');
    const bgMusic = document.getElementById('bg-music');

    if (openEnvelopeBtn && envelopeOverlay) {
        openEnvelopeBtn.addEventListener('click', function () {
            // 1. PRIORITIZE MUSIC: Play immediately on the raw click event
            if (bgMusic) {
                bgMusic.volume = 0.25; // Gentle 25% background volume
                
                let playPromise = bgMusic.play();
                
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log("Audio started successfully!");
                    }).catch(error => {
                        // This will print the exact reason to your browser console if it fails
                        console.error("Audio playback failed: ", error);
                    });
                }
            }
            
            // 1. Fade out the invitation envelope cover
            envelopeOverlay.classList.add('fade-out-overlay');
            
            if(mainContent) {
                mainContent.style.visibility = "visible";
                mainContent.style.opacity = "1";
            }
            
            // Start the 30-second stagger countdown for the scratch card
            if (typeof queueNextScratchCard === "function") {
                queueNextScratchCard();
            }
        });
    }

    // ==========================================
    // 2. REAL-TIME ANNIVERSARY COUNTER LOGIC
    // ==========================================
    // Set your anniversary target date: June 17, 2025 at 00:00:00
    const startDate = new Date("2025-06-17T00:00:00");

    function updateLiveCounter() {
        const now = new Date();
        
        // Cumulative difference calculations handling actual calendar month/year boundaries
        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();

        // If the current month day is less than the start month day, adjust the month wrap
        if (days < 0) {
            months--;
            // Find total days in the previous month to accurately borrow days
            const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
            days += previousMonth;
        }

        // If months turn negative, adjust the calendar year wrap
        if (months < 0) {
            years--;
            months += 12;
        }

        // Track sub-day time components smoothly (Hours, Minutes, Seconds)
        let hours = now.getHours() - startDate.getHours();
        let minutes = now.getMinutes() - startDate.getMinutes();
        let seconds = now.getSeconds() - startDate.getSeconds();

        if (seconds < 0) {
            seconds += 60;
            minutes--;
        }
        if (minutes < 0) {
            minutes += 60;
            hours--;
        }
        if (hours < 0) {
            hours += 24;
            days--; // Re-verify day boundary drops if hour subtraction pulls back
            if (days < 0) {
                months--;
                const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
                days += prevMonth;
                if (months < 0) {
                    years--;
                    months += 12;
                }
            }
        }

        // Pad single digits with a leading zero for cleaner dashboard symmetry
        const displayHours = String(hours).padStart(2, '0');
        const displayMinutes = String(minutes).padStart(2, '0');
        const displaySeconds = String(seconds).padStart(2, '0');

        // Inject individual values directly into their respective DOM nodes
        document.getElementById("count-years").innerText = years;
        document.getElementById("count-months").innerText = months;
        document.getElementById("count-days").innerText = days;
        document.getElementById("count-hours").innerText = displayHours;
        document.getElementById("count-minutes").innerText = displayMinutes;
        document.getElementById("count-seconds").innerText = displaySeconds;
    }

    // Run the engine immediately so the page doesn't look blank on load
    updateLiveCounter();
    
    // Request the browser to re-run the engine every single second (1000 milliseconds)
    setInterval(updateLiveCounter, 1000);
});

// ==========================================
    // 3. GLOBAL SCROLL ENTRANCE REVEAL ENGINE
    // ==========================================
    // Select all timeline rows, carousel containers, and polaroid elements
    const elementsToReveal = document.querySelectorAll('.reveal-row, .reveal-carousel, .reveal-polaroid');
    
    const revealOptions = {
        root: null,
        threshold: 0.1, /* Triggers cleanly when 10% of the element hits the screen */
        rootMargin: "0px 0px -20px 0px"
    };

    const globalEntranceObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Inject the active CSS class to execute the transition animation sequence
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Kill the tracker so it stays fixed in place
            }
        });
    }, revealOptions);

    // Bind all targeted content elements to the engine
    elementsToReveal.forEach(element => {
        globalEntranceObserver.observe(element);
    });

    // ==========================================
    // 4. DYNAMIC SCROLL-DRAWN SVG PATH LOGIC
    // ==========================================
    const timelineSection = document.getElementById('timeline-section');
    const drawPath = document.getElementById('draw-path');
    
    if (drawPath && timelineSection) {
        const pathLength = drawPath.getTotalLength();
        
        // Hide the line initially by offsetting its dash array
        drawPath.style.strokeDasharray = pathLength + ' ' + pathLength;
        drawPath.style.strokeDashoffset = pathLength;

        function scrollDrawLine() {
            const sectionRect = timelineSection.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            // We change the divisor slightly to make the line stop drawing right as it touches the envelope wrapper
            let scrollProgress = (viewportHeight / 1.6 - sectionRect.top) / (sectionRect.height - 200);
            scrollProgress = Math.max(0, Math.min(1, scrollProgress)); // Clamp strictly between 0 and 1

            // Reveal the path based on scroll depth
            drawPath.style.strokeDashoffset = pathLength - (scrollProgress * pathLength);
        }

        window.addEventListener('scroll', scrollDrawLine);
        window.addEventListener('resize', scrollDrawLine);
    }

// ==========================================
    // 5. FINAL MODAL POP-UP & TYPEWRITER ENGINE
    // ==========================================
    const finalTrigger = document.getElementById('final-envelope-trigger');
    const letterModal = document.getElementById('letter-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const typingContainer = document.getElementById('typing-letter');

    // Write your custom anniversary letter message here. 
    // You can use \n to create clean new line paragraph blocks!
    const anniversaryMessageText = "Hi, medj marami na akong letter, well dito palang ilan nang dati kaya iksian ko nalang. Mahirap talaga isipin na 1 year na tayu, time flies so fast talaga, and sa bilis ng panahon, napakarami rin tayong pinagsamahan, magkalayo man o magkalapit. Pero imagine mo, 2 school years na tayung ldr, pero ganito parin katatag relationship natin. Pareho naman tayong nahirapan at napagod dahil nga malayo. Like may mga times na gustong-gusto ko na kasama ka or gusto ko sinasamahan kita lalo na during small wins and losses natin, pero hindi natin magawa-gawa. Pero it is one of the many sacrifices we have to make for each other. \n\n Another thing, medyo palagi ko na man den sinasabi, is how grateful I am to you. Isa ka talaga sa pinakamagandang nangyare saakin, not exaggerating, medyo cringe pero it is true. Hindi ko na maimagine mga araw ko kung hindi kita kausap, and I don't want that to happen. I'm thankful for your love, patience, kindness, presence, sincerity, trust, and support, and I hope I am giving it all back to you just enough for you to feel all the things you give me. Isa rin sa natutunan ko nung camp is how to find my safe space to be vulnerable, to be who i really am, and you, nicole, are my safest space, and sana you feel the same way too. You bring out the best in me, you make me do the things I thought I can’t, and you fill me. \n\n This anniversary will be the first of many more to come. I may not be the best boyfriend out there, but I hope you feel that what I only want is the best for you, because you, indeed, deserve only the best in this world. Hindi man madali pinagdaanan natin pero have come this far and proud ako sa ating dalawa. \n\nI love you Nicole \n\n - your IT boy";

    let textCharacterIndex = 0;
    const mechanicalTypingSpeed = 65; // Miliseconds per letter (lower numbers make it faster!)
    let typewriterStartedFlag = false;

    function typewriterOutputEngine() {
        if (textCharacterIndex < anniversaryMessageText.length) {
            typingContainer.innerHTML += anniversaryMessageText.charAt(textCharacterIndex);
            textCharacterIndex++;
            typingContainer.scrollTop = typingContainer.scrollHeight;
            setTimeout(typewriterOutputEngine, mechanicalTypingSpeed);
        }
    }

    if (finalTrigger && letterModal && closeModalBtn) {
        // Listen for the final envelope click
        finalTrigger.addEventListener('click', function() {
            typingContainer.scrollTop = 0;
            letterModal.classList.remove('d-none'); // Unhide structure
            
            // Allow DOM breathing room to apply smooth entry transition class
            setTimeout(() => {
                letterModal.classList.add('show');
            }, 15);

            // Execute the live typing engine only once upon initial launch
            if (!typewriterStartedFlag) {
                typewriterStartedFlag = true;
                setTimeout(typewriterOutputEngine, 700); // Small romantic pause before text starts writing
            }
        });

        // Listen for the close button click
        closeModalBtn.addEventListener('click', function() {
            letterModal.classList.remove('show');
            // Re-apply d-none layout lock after the smooth fade transition finishes completely
            setTimeout(() => {
                letterModal.classList.add('d-none');
            }, 400);
        });
    }

    const polaroidWrappers = document.querySelectorAll('.polaroid-wrapper');
    
    polaroidWrappers.forEach(wrapper => {
        wrapper.addEventListener('click', function(e) {
            // Find the inner chassis that contains the actual 3D rotation styles
            const innerCard = this.querySelector('.polaroid-inner');
            if (innerCard) {
                innerCard.classList.toggle('flipped');
            }
        });
    });

// ==========================================
    // 7. STAGGERED SCRATCH-CARD CORE LOGIC
    // ==========================================
    const scratchFab = document.getElementById('scratch-widget-btn');
    const scratchModal = document.getElementById('scratch-modal');
    const closeScratchBtn = document.getElementById('close-scratch-modal');
    const canvas = document.getElementById('scratch-canvas');
    const ctx = canvas.getContext('2d');

    // Queue data package for rewards (Images + Captions)
    const scratchRewards = [
        { img: "images/ffc508d4-b3c9-45f5-8607-3e7236e42f06.jpg", caption: "✨ hihi first time kitang bigyan ng flowers face-to-face nito." },
        { img: "images/e021410e-69f7-4489-a51c-dbf2395881d7.jpg", caption: "📸 puro talikod ka sa mga candid mo saakin, sure kase akong tatakpan mo or maga pose ka pag harapann" },
        { img: "images/44e87f3e-09e7-4261-b32e-98b8672fecfa.jpg", caption: "💐 hindi ako magsasawang bigyan ka ng flowers, nawawala ka nga pagnaga selfie ka kasama yung bouquett" }
    ];

    let currentRewardIndex = 0;
    let isDrawing = false;

    // A. Time Orchestration: Show the FAB widget 30 seconds after previous event triggers
    function queueNextScratchCard() {
        if (currentRewardIndex < scratchRewards.length) {
            setTimeout(() => {
                // Update badge and pop button widget into view
                document.querySelector('.fab-badge').innerText = 1;
                scratchFab.classList.remove('d-none');
                
                // Set content hooks for the upcoming reveal card ahead of click
                document.getElementById('scratch-reveal-img').src = scratchRewards[currentRewardIndex].img;
                document.getElementById('scratch-reveal-caption').innerText = scratchRewards[currentRewardIndex].caption;
                
                // Initialize the canvas texture skin layering definitions
                initScratchCanvas();
            }, 30000); // 30,000 milliseconds = 30 seconds
        }
    }

    // Initialize/Reset the Canvas texture masking blocks
    function initScratchCanvas() {
        // Set canvas resolutions to match CSS boundaries inside the frame
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        
        // Fill the mask skin block using Soft Rose color layer profile
        ctx.fillStyle = '#E06B80';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add metallic text element detailing the hidden reward
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 16px Montserrat';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('SCRATCH ME OUT!', canvas.width / 2, canvas.height / 2);
    }

    // B. Scratch Mechanics: Listen for touch/mouse vectors over canvas plane
    function scratch(e) {
        if (!isDrawing) return;
        
        // Find click coordinate offset map matching container bounds
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        
        // Use standard clear mode composition path strings to wipe paint away
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2); // 25 pixel brush brush radius
        ctx.fill();
    }

    // Event Bindings for Scratch interaction hooks
    canvas.addEventListener('mousedown', () => isDrawing = true);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseleave', () => isDrawing = false);
    canvas.addEventListener('mousemove', scratch);

    canvas.addEventListener('touchstart', () => isDrawing = true);
    canvas.addEventListener('touchend', () => isDrawing = false);
    canvas.addEventListener('touchmove', scratch);

    // Open Pop-up Actions for Modal popup layers
    if (scratchFab && scratchModal && closeScratchBtn) {
        scratchFab.addEventListener('click', () => {
            const underContent = document.querySelector('.scratch-under-content');
            
            // 1. Force the inner hidden image content to stay completely invisible at first
            if (underContent) {
                underContent.classList.remove('ready');
            }

            scratchModal.classList.remove('d-none');
            
            setTimeout(() => {
                scratchModal.classList.add('show');
            }, 15);

            // 2. Wait for the modal transition to finish, draw the mask, 
            // and THEN toggle visibility on the background layer safely covered!
            setTimeout(() => {
                initScratchCanvas();
                
                if (underContent) {
                    underContent.classList.add('ready');
                }
            }, 400); 
        });

        closeScratchBtn.addEventListener('click', () => {
            scratchModal.classList.remove('show');
            setTimeout(() => {
                scratchModal.classList.add('d-none');
                
                if (!scratchFab.classList.contains('d-none')) {
                    scratchFab.classList.add('d-none');
                    currentRewardIndex++;
                    queueNextScratchCard(); 
                }
            }, 400);
        });
    }

    // C. The Trigger: To make it completely seamless, modify your initial Envelope Open Click 
    // down in your script to call queueNextScratchCard() right away when the page starts!
    const originalEnvelopeBtn = document.getElementById('open-envelope-btn');
    if (originalEnvelopeBtn) {
        originalEnvelopeBtn.addEventListener('click', function() {
            // Start the 30-second stagger countdown calculation sequence the moment the landing page reveals itself!
            queueNextScratchCard();
        });
    }

// ==========================================
    // 9. NAVBAR ACTIVE SECTIONS TRACKING TRACKER
    // ==========================================
    const navLinks = document.querySelectorAll('.custom-pill-nav .nav-link');
    const scrollSections = document.querySelectorAll('#main-content, #counter-section, #moments-section, #polaroid-section, #timeline-section');

    function highlightNavbarOnScroll() {
        let currentActiveId = "";
        const scrollPosition = window.scrollY + 120; // 120px cushion tracking space offset

        scrollSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentActiveId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active-pill');
            // If the anchor matches the current active section ID on screen
            if (link.getAttribute('href') === `#${currentActiveId}` || (currentActiveId === "main-content" && link.getAttribute('href') === "#main-content")) {
                link.classList.add('active-pill');
            }
        });
    }

    window.addEventListener('scroll', highlightNavbarOnScroll);

