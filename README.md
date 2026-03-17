# 📸 My PhotoBooth

A fun, interactive web-based photobooth application that lets you take or upload photos and customize them with backgrounds and stickers!

## Features

✨ **Two Usage Modes:**
- **📷 Take Photo** - Use your webcam to capture photos
- **📁 Upload Photo** - Upload existing images from your device

🎨 **Customization Options:**
- **Custom Backgrounds** - Add custom background images to photos
- **Stickers** - Add and position custom sticker overlays on photos
- **Draggable Stickers** - Move stickers around freely on the photo
- **One-Click Download** - Save your final photo as PNG

## Getting Started

### Quick Start

1. Open `index.html` in a modern web browser
2. Allow camera permissions when prompted
3. Click "Capture Photo" or switch to "Upload Photo" mode
4. Customize with backgrounds and stickers
5. Download your final photo!

### Browser Requirements

- Modern browser with WebRTC support (Chrome, Firefox, Edge, Safari)
- Camera/Webcam access for photo capture mode
- JavaScript enabled

## How to Add Custom Images

### Adding Backgrounds

1. Prepare your background image (JPG, PNG recommended)
2. Place the image in the `assets/backgrounds/` folder
3. Refresh the browser - the background will automatically appear in the 🎨 Backgrounds panel

**Example file structure:**
```
assets/
  backgrounds/
    beach.jpg
    forest.png
    party.jpg
```

### Adding Stickers

1. Prepare your sticker image (PNG with transparency recommended)
2. Place the image in the `assets/stickers/` folder
3. Refresh the browser - the sticker will automatically appear in the ✨ Stickers panel

**Example file structure:**
```
assets/
  stickers/
    flowers.png
    hearts.png
    sunglasses.png
    emoji.png
```

## How to Use

### Taking a Photo

1. Click the **"📷 Take Photo"** button
2. Position yourself in front of the camera
3. (Optional) Select a background and add stickers
4. Click **"Capture Photo"** button
5. Click **"⬇️ Download"** to save, or **"➕ New Photo"** to take another

### Uploading a Photo

1. Click the **"📁 Upload Photo"** button
2. Click the upload area or drag & drop an image
3. (Optional) The uploaded image will be ready for download
4. Add stickers and backgrounds after capturing if desired

### Using Stickers

- Click a sticker button to add it to your photo
- **Drag** stickers to reposition them
- **Right-click** a sticker to delete it
- Stickers appear in the final downloaded photo

### Using Backgrounds

- Click a background button to apply it
- Click "None" to remove the background
- Backgrounds appear behind your photo in the final image

## Technical Details

### File Structure

```
my-photobooth/
├── index.html         # Main HTML file
├── style.css          # Styling and layout
├── script.js          # Application logic
├── assets/
│   ├── backgrounds/   # Place custom backgrounds here
│   └── stickers/      # Place custom stickers here
└── README.md          # This file
```

### How It Works

1. **Webcam Input**: Uses `getUserMedia()` API to access camera
2. **Canvas Rendering**: Draws video frames, overlays, and stickers to canvas
3. **Image Composition**: Combines background, photo, and stickers into final image
4. **Download Export**: Converts canvas to PNG for saving

## Tips & Tricks

💡 **For Best Results:**

- **Backgrounds**: Use high-quality images (1920x1080+ recommended)
- **Stickers**: Use PNG with transparent background for best appearance
- **Sticker Size**: Stickers are 100x100px by default, easily moveable
- **Photo Quality**: Higher resolution produces sharper final images
- **Lighting**: For webcam photos, ensure good lighting for best results

## Customization Guide

### Editing the UI

- Colors and gradients: Edit `style.css` (look for color codes like `#667eea`)
- Button styling: Modify `.btn-primary` and `.btn-secondary` classes
- Canvas size: Adjust `aspect-ratio: 4/3` in `.canvas-wrapper` class

### Editing Functionality

- Sticker size: Change `selectedStickerSize = 100` in `script.js`
- Canvas dimensions: Modify canvas width/height settings in capture functions
- Auto-load directories: Edit the backgroundImages and stickerImages arrays

## Troubleshooting

### Camera Not Working
- Check browser permissions for camera access
- Ensure no other app is using the camera
- Try a different browser
- Check browser console for error messages

### Images Not Showing
- Verify file names match exactly (case-sensitive on some systems)
- Ensure files are in correct directories
- Check browser console for "404" errors
- Supported formats: JPG, PNG, GIF

### Stickers Not Draggable
- Make sure you're clicking directly on the sticker
- Try using a different mouse/trackpad
- Check browser console for JavaScript errors
- Refresh the page

## Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome  | ✅ Full | Recommended |
| Firefox | ✅ Full | Excellent support |
| Safari  | ✅ Full | iOS 14.5+ for camera |
| Edge    | ✅ Full | Similar to Chrome |
| Opera   | ✅ Full | Good support |

## Privacy

- All processing happens locally in your browser
- No images are uploaded to any server
- No data collection or tracking
- Your photos remain on your device

## Future Enhancement Ideas

- 🎥 Video recording mode
- ✏️ Drawing tools
- 📐 Filters and effects
- 🎭 Face detection and AR features
- 👥 Multi-person cropping
- 🌈 Color adjustments
- 📸 Photo collage maker

## License

Feel free to use and modify this application freely!

## Support & Feedback

Have questions or suggestions? Feel free to experiment and customize!

---

**Happy photoboothing! 📸✨**
