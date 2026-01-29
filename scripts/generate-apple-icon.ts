import { Resvg } from '@resvg/resvg-js';
import { writeFileSync } from 'node:fs';

// Read the existing SVG icon
// const svg = readFileSync('public/icon.svg', 'utf-8');

// Create a proper 180x180 apple touch icon with dark background
const appleIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#09090b"/>
  <g transform="translate(30, 30) scale(5)">
    <path d="M11.264 2.205A4 4 0 0 0 6.42 4.211l-4 8a4 4 0 0 0 1.359 5.117l6 4a4 4 0 0 0 4.438 0l6-4a4 4 0 0 0 1.576-4.592l-2-6a4 4 0 0 0-2.53-2.53z" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M11.99 22 14 12l7.822 3.184" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14 12 8.47 2.302" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;

const resvg = new Resvg(appleIconSvg, {
  fitTo: { mode: 'width', value: 180 }
});
const pngData = resvg.render();
writeFileSync('public/apple-touch-icon.png', pngData.asPng());
console.log('Created apple-touch-icon.png (180x180)');
