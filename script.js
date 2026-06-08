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