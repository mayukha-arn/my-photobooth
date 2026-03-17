# How to Add Custom Images to Your PhotoBooth

## Overview

Your PhotoBooth automatically discovers and loads custom backgrounds and stickers from the `assets/` folder. This guide explains how to add them!

## Adding Backgrounds

### What You Need

- Image files (JPG, PNG recommended)
- Dimensions: 800x600 or 1920x1080 for best results
- Files in the `assets/backgrounds/` folder

### Steps

1. **Prepare Your Image**
   - Use any image editing tool (Photoshop, GIMP, Canva, etc.)
   - Recommended size: 1920x1080 pixels
   - Save as JPG (for photos) or PNG (for graphics)

2. **Save to Backgrounds Folder**
   ```
   my-photobooth/
   └── assets/
       └── backgrounds/
           ├── beach.jpg
           ├── forest.png
           └── your_background_here.jpg
   ```

3. **Refresh Your Browser**
   - F5 or Cmd+R to refresh
   - The background will appear in the "🎨 Backgrounds" panel

### Example File Names
- `beach.jpg`
- `forest_scene.png`
- `birthday_party.jpg`
- `office_meeting.jpg`

## Adding Stickers

### What You Need

- Image files with transparency (PNG recommended)
- Size: 100x100 to 500x500 pixels works best
- Transparent background (no white background)
- Files in the `assets/stickers/` folder

### Steps

1. **Prepare Your Sticker**
   - Create or find a sticker image
   - Remove the background (make it transparent)
   - Tools: Photoshop, GIMP, Canva, or removebg.com
   - Save as PNG (preserves transparency)
   - Recommended size: 200x200 pixels

2. **Save to Stickers Folder**
   ```
   my-photobooth/
   └── assets/
       └── stickers/
           ├── flowers.png
           ├── hearts.png
           ├── sunglasses.png
           └── your_sticker_here.png
   ```

3. **Refresh Your Browser**
   - F5 or Cmd+R to refresh
   - The sticker will appear in the "✨ Stickers" panel

### Example File Names
- `flowers.png`
- `hearts.png`
- `sunglasses.png`
- `party_hat.png`
- `crown.png`

## Tips for Best Results

### Backgrounds
✅ **Do:**
- Use high-quality images
- Test with different aspect ratios
- Use JPG for photos, PNG for graphics
- Ensure appropriate lighting/colors

❌ **Don't:**
- Use very small images (under 800px)
- Use overly complex backgrounds
- Make the background too busy

### Stickers
✅ **Do:**
- Remove all white/colored backgrounds
- Use PNG format (supports transparency)
- Test sticker visibility on photos
- Create stickers about 100x200 pixels

❌ **Don't:**
- Leave colored backgrounds
- Use JPG format (no transparency)
- Make stickers too small to see
- Make stickers too large

## Tools to Help You

### Free Background Resources
- Unsplash (unsplash.com) - Free high-quality photos
- Pexels (pexels.com) - Free stock photos
- Pixabay (pixabay.com) - Free images and backgrounds

### Free Sticker Resources
- Freepik (freepik.com) - Free graphics and stickers
- OpenMoji (openmoji.org) - Free emoji stickers
- Flaticon (flaticon.com) - Free icons

### Image Editing Tools
- Canva (canva.com) - Free online designer
- Pixlr (pixlr.com) - Free online image editor
- GIMP (gimp.org) - Free desktop app

### Remove Background Tools
- removebg.com - Remove backgrounds automatically
- PhotoScissors - Works offline
- GIMP - Open source editor

## Example Workflow

### Creating a Custom Background

1. Go to Unsplash.com
2. Search for "beach" (or any background you like)
3. Download a photo
4. Resize to 1920x1080 (optional)
5. Save as `beach.jpg` to `assets/backgrounds/`
6. Refresh PhotoBooth
7. Select "beach" background and test!

### Creating a Custom Sticker

1. Go to Canva.com
2. Create a new design
3. Search for stickers/elements
4. Add your sticker designs
5. Download as PNG with transparent background
6. Save to `assets/stickers/`
7. Refresh PhotoBooth
8. Click the sticker and test!

## Troubleshooting

### Sticker not showing
- Check file is PNG (not JPG)
- Verify file is in `assets/stickers/` folder
- Refresh browser (Ctrl+F5 or Cmd+Shift+R for hard refresh)
- Check browser console for URL errors

### Background not loading
- Verify file is in `assets/backgrounds/` folder
- Check file name matches exactly
- Refresh browser
- Try JPG if PNG doesn't work

### File name case matters
- `flower.png` ≠ `Flower.png` on Linux/Mac
- Keep file names lowercase and simple

## File Size Guidelines

| Type | Min Size | Max Size | Format |
|------|----------|----------|--------|
| Backgrounds | 800x600 | 2048x1536 | JPG/PNG |
| Stickers | 50x50 | 500x500 | PNG |
| File Size | - | 5MB each | Keep small |

## Need Help?

- Run PhotoBooth and check the browser console (F12) for error messages
- Verify files are in correct folders
- Make sure file extensions are correct (.jpg, .png)
- Try different sticker/background source

---

**Pro Tip:** Start with 1-2 backgrounds and 3-4 stickers, then expand based on what you like!

Happy customizing! 🎨✨
