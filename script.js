// Elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureBtn = document.getElementById('capture-btn');
const retakeBtn = document.getElementById('retake-btn');
const previewSection = document.getElementById('preview-section');
const previewCanvas = document.getElementById('preview-canvas');
const downloadBtn = document.getElementById('download-btn');
const newPhotoBtn = document.getElementById('new-photo-btn');
const imageUpload = document.getElementById('image-upload');
const uploadArea = document.querySelector('.upload-area');
const modeBtns = document.querySelectorAll('.mode-btn');
const modeContents = document.querySelectorAll('.mode-content');
const backgroundsContainer = document.getElementById('backgrounds-container');
const stickersPalette = document.getElementById('stickers-palette');
const stickerContainer = document.getElementById('stickers-container');
const backgroundOverlay = document.getElementById('background-overlay');

// State
let stream = null;
let currentImage = null;
let currentBackground = 'none';
let stickers = [];
let selectedStickerSize = 100;
let isDrawing = false;
let startX, startY;
let activeSticker = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Mode switching
    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => switchMode(btn.dataset.mode));
    });

    // Webcam controls
    captureBtn.addEventListener('click', capturePhoto);
    retakeBtn.addEventListener('click', retakePhoto);

    // Preview controls
    downloadBtn.addEventListener('click', downloadPhoto);
    newPhotoBtn.addEventListener('click', resetApp);

    // Upload controls
    imageUpload.addEventListener('change', handleImageUpload);
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        if (e.dataTransfer.files.length > 0) {
            imageUpload.files = e.dataTransfer.files;
            handleImageUpload();
        }
    });

    // Start webcam by default
    startWebcam();

    // Load custom assets
    loadCustomAssets();
}

// Mode switching
function switchMode(mode) {
    // Update active button
    modeBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    // Update active content
    modeContents.forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${mode}-mode`).classList.add('active');

    // Start/stop webcam based on mode
    if (mode === 'take') {
        if (!stream) {
            startWebcam();
        }
    } else if (mode === 'upload') {
        stopWebcam();
    }
}

// Webcam functions
async function startWebcam() {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user' }
        });
        video.srcObject = stream;
        video.play();
        console.log('✅ Webcam started');
    } catch (err) {
        console.error('❌ Error accessing webcam:', err);
        alert('Unable to access webcam. Please check permissions.');
    }
}

function stopWebcam() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
}

function capturePhoto() {
    // Setup canvas
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');

    // Draw background if selected
    if (currentBackground !== 'none') {
        const bgCanvas = document.createElement('canvas');
        bgCanvas.width = canvas.width;
        bgCanvas.height = canvas.height;
        const bgCtx = bgCanvas.getContext('2d');

        const bgImg = new Image();
        bgImg.onload = () => {
            bgCtx.drawImage(bgImg, 0, 0, bgCanvas.width, bgCanvas.height);
            bgCtx.drawImage(video, 0, 0, canvas.width, canvas.height);
            drawStickersToCanvas(bgCtx, bgCanvas.width, bgCanvas.height);
            ctx.drawImage(bgCanvas, 0, 0);
            finalizeCapturedPhoto(ctx);
        };
        bgImg.src = currentBackground;
    } else {
        // Draw video frame
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        // Draw stickers
        drawStickersToCanvas(ctx, canvas.width, canvas.height);
        finalizeCapturedPhoto(ctx);
    }
}

function drawStickersToCanvas(ctx, canvasWidth, canvasHeight) {
    stickers.forEach(stickerData => {
        const img = new Image();
        img.onload = () => {
            ctx.save();
            ctx.globalAlpha = 1;
            ctx.drawImage(img, stickerData.x, stickerData.y, stickerData.width, stickerData.height);
            ctx.restore();
        };
        img.src = stickerData.src;
    });
}

function finalizeCapturedPhoto(ctx) {
    currentImage = canvas.toDataURL('image/png');
    
    // Show preview
    previewCanvas.width = canvas.width;
    previewCanvas.height = canvas.height;
    const previewCtx = previewCanvas.getContext('2d');
    previewCtx.drawImage(canvas, 0, 0);

    // Hide webcam, show preview
    video.style.display = 'none';
    canvas.style.display = 'none';
    captureBtn.style.display = 'none';
    retakeBtn.style.display = 'inline-block';
    previewSection.style.display = 'block';
    stickerContainer.style.display = 'none';
    backgroundOverlay.style.display = 'none';
}

function retakePhoto() {
    video.style.display = 'block';
    canvas.style.display = 'none';
    captureBtn.style.display = 'inline-block';
    retakeBtn.style.display = 'none';
    previewSection.style.display = 'none';
    stickerContainer.style.display = 'block';
    if (currentBackground !== 'none') {
        backgroundOverlay.style.display = 'block';
    }
    currentImage = null;
}

// Image upload
function handleImageUpload() {
    const file = imageUpload.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            // Create canvas with proper aspect ratio
            canvas.width = Math.min(img.width, 800);
            canvas.height = Math.min(img.height, 600);
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            currentImage = canvas.toDataURL('image/png');
            
            // Show preview
            previewCanvas.width = canvas.width;
            previewCanvas.height = canvas.height;
            const previewCtx = previewCanvas.getContext('2d');
            previewCtx.drawImage(canvas, 0, 0);

            // Show preview section
            previewSection.style.display = 'block';
        };
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}

// Download photo
function downloadPhoto() {
    const link = document.createElement('a');
    link.href = currentImage;
    link.download = `photobooth-${new Date().getTime()}.png`;
    link.click();
}

// Reset app
function resetApp() {
    currentImage = null;
    stickers = [];
    currentBackground = 'none';
    stickerContainer.innerHTML = '';
    backgroundOverlay.style.backgroundImage = 'none';
    backgroundOverlay.style.display = 'none';
    
    // Clear upload input
    imageUpload.value = '';
    
    // Reset background buttons
    document.querySelectorAll('.bg-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.bg === 'none' || !btn.dataset.bg) {
            btn.classList.add('active');
        }
    });

    // Hide preview, show mode selection
    previewSection.style.display = 'none';
    
    // Return to take mode and restart webcam
    switchMode('take');
}

// Background selection
function selectBackground(bgPath) {
    currentBackground = bgPath;
    
    // Update button states
    document.querySelectorAll('.bg-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Update overlay
    if (bgPath !== 'none') {
        backgroundOverlay.style.backgroundImage = `url('${bgPath}')`;
        backgroundOverlay.style.display = 'block';
    } else {
        backgroundOverlay.style.display = 'none';
    }
}

// Sticker selection
function addSticker(stickerPath) {
    const stickerId = `sticker-${Date.now()}`;
    const randomX = Math.random() * 200;
    const randomY = Math.random() * 200;

    const stickerDiv = document.createElement('div');
    stickerDiv.className = 'sticker';
    stickerDiv.id = stickerId;
    stickerDiv.style.left = randomX + 'px';
    stickerDiv.style.top = randomY + 'px';
    stickerDiv.style.width = selectedStickerSize + 'px';
    stickerDiv.style.height = 'auto';

    const img = document.createElement('img');
    img.className = 'sticker-img';
    img.src = stickerPath;
    img.onload = () => {
        stickerDiv.style.width = selectedStickerSize + 'px';
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
    };
    
    stickerDiv.appendChild(img);
    stickerContainer.appendChild(stickerDiv);

    // Store sticker data
    stickers.push({
        src: stickerPath,
        x: randomX,
        y: randomY,
        width: selectedStickerSize,
        height: selectedStickerSize
    });

    // Make sticker draggable
    makeStickerDraggable(stickerDiv, randomX, randomY);
}

function makeStickerDraggable(element, startX, startY) {
    let offsetX = 0;
    let offsetY = 0;

    element.addEventListener('mousedown', (e) => {
        if (e.button === 0) { // Left click only
            activeSticker = element;
            isDrawing = true;
            offsetX = e.clientX - element.offsetLeft;
            offsetY = e.clientY - element.offsetTop;
            element.classList.add('dragging');
        }
    });

    document.addEventListener('mousemove', (e) => {
        if (isDrawing && activeSticker === element) {
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;
            element.style.left = newX + 'px';
            element.style.top = newY + 'px';

            // Update sticker data
            const stickerData = stickers.find(s => s.src === element.querySelector('img').src);
            if (stickerData) {
                stickerData.x = newX;
                stickerData.y = newY;
            }
        }
    });

    document.addEventListener('mouseup', () => {
        if (activeSticker === element) {
            isDrawing = false;
            element.classList.remove('dragging');
            activeSticker = null;
        }
    });

    // Delete sticker on right-click
    element.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const index = stickers.findIndex(s => s.src === element.querySelector('img').src);
        if (index > -1) {
            stickers.splice(index, 1);
        }
        element.remove();
    });
}

// Load custom assets
async function loadCustomAssets() {
    try {
        // Load backgrounds from assets/backgrounds/
        const bgResponse = await fetch('assets/backgrounds/');
        if (bgResponse.ok) {
            // You'll need to implement a server endpoint or manually list backgrounds
            console.log('📁 Ready for custom backgrounds in assets/backgrounds/');
        }
    } catch (err) {
        console.log('📁 Custom assets directory not found yet');
    }

    // Dynamically load backgrounds if they exist
    setTimeout(() => {
        const backgroundImages = [
            'assets/backgrounds/bg1.jpg',
            'assets/backgrounds/bg2.jpg',
            'assets/backgrounds/bg3.jpg'
        ];

        backgroundImages.forEach(bgPath => {
            checkAndAddBackground(bgPath);
        });

        // Dynamically load stickers if they exist
        const stickerImages = [
            'assets/stickers/sticker1.png',
            'assets/stickers/sticker2.png',
            'assets/stickers/sticker3.png',
            'assets/stickers/sticker4.png'
        ];

        stickerImages.forEach(stickerPath => {
            checkAndAddSticker(stickerPath);
        });
    }, 100);
}

function checkAndAddBackground(bgPath) {
    const img = new Image();
    img.onload = () => {
        const btn = document.createElement('button');
        btn.className = 'bg-btn';
        btn.dataset.bg = bgPath;
        btn.textContent = bgPath.split('/').pop().split('.')[0];
        btn.addEventListener('click', () => selectBackground(bgPath));
        backgroundsContainer.appendChild(btn);
    };
    img.onerror = () => {
        // Background file doesn't exist yet
    };
    img.src = bgPath;
}

function checkAndAddSticker(stickerPath) {
    const img = new Image();
    img.onload = () => {
        const btn = document.createElement('button');
        btn.className = 'sticker-btn';
        btn.dataset.sticker = stickerPath;
        btn.textContent = '✨';
        btn.title = stickerPath.split('/').pop();
        btn.addEventListener('click', () => addSticker(stickerPath));
        stickersPalette.appendChild(btn);
    };
    img.onerror = () => {
        // Sticker file doesn't exist yet
    };
    img.src = stickerPath;
}

console.log('🎉 PhotoBooth Ready!');
console.log('📸 Instructions:');
console.log('1. Add backgrounds to: assets/backgrounds/ (jpg, png)');
console.log('2. Add stickers to: assets/stickers/ (png with transparency)');
console.log('3. Stickers can be dragged around and right-clicked to delete');
console.log('4. Backgrounds apply to the entire photo');
