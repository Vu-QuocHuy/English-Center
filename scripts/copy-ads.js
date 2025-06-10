const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../src/assets/ads');
const targetDir = path.join(__dirname, '../public/ads');

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy advertisement images
const images = [
  {
    source: 'basic-english.jpg',
    target: 'basic-english.jpg'
  },
  {
    source: 'online-course.jpg',
    target: 'online-course.jpg'
  },
  {
    source: 'beginner-course.jpg',
    target: 'beginner-course.jpg'
  }
];

images.forEach(image => {
  const sourcePath = path.join(sourceDir, image.source);
  const targetPath = path.join(targetDir, image.target);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Copied ${image.source} to ${targetPath}`);
  } else {
    console.log(`Source image ${image.source} not found`);
  }
}); 