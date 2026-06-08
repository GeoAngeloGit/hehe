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

    if (openEnvelopeBtn && envelopeOverlay) {
        openEnvelopeBtn.addEventListener('click', function () {
            envelopeOverlay.classList.add('fade-out-overlay');
            if(mainContent) {
                mainContent.style.visibility = "visible";
                mainContent.style.opacity = "1";
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