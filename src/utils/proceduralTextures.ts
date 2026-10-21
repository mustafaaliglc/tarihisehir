import * as THREE from 'three';

/**
 * Procedural PBR Textures for Photorealistic Architectural 3D Models
 * 100% Canvas generated - Zero external image dependencies (Zero 404s)
 * Tuned to match authentic Galata Tower masonry and lead roof finishes.
 */

// Procedural Galata Ashlar Stone Masonry Texture
export function createStoneBlockTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Base warm limestone tone
  ctx.fillStyle = '#bda78a';
  ctx.fillRect(0, 0, 1024, 1024);

  const rowHeight = 24; // fine, authentic coursing
  const numRows = Math.ceil(1024 / rowHeight);

  // Generate ashlar masonry courses
  for (let r = 0; r < numRows; r++) {
    const y = r * rowHeight;
    const isOdd = r % 2 === 1;
    let x = isOdd ? -30 : 0;

    while (x < 1024 + 100) {
      // Vary block width between 48px and 90px
      const blockWidth = 48 + Math.floor(Math.random() * 42);

      // Warm Mediterranean limestone / travertine palette variation
      const baseTone = 175 + Math.floor(Math.random() * 32);
      const red = Math.min(240, baseTone + 22);
      const green = Math.min(230, baseTone + 8);
      const blue = Math.max(120, baseTone - 16);

      // Block fill
      ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
      ctx.fillRect(x + 1, y + 1, blockWidth - 2, rowHeight - 2);

      // Subtle top/left stone block chamfer highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.18)';
      ctx.fillRect(x + 1, y + 1, blockWidth - 2, 2);
      ctx.fillRect(x + 1, y + 1, 2, rowHeight - 2);

      // Subtle bottom/right bevel shadow
      ctx.fillStyle = 'rgba(60, 45, 30, 0.22)';
      ctx.fillRect(x + 1, y + rowHeight - 3, blockWidth - 2, 2);
      ctx.fillRect(x + blockWidth - 3, y + 1, 2, rowHeight - 2);

      // Natural weathered stone grain & chiseled tool marks
      for (let s = 0; s < 14; s++) {
        const nx = x + 3 + Math.random() * (blockWidth - 6);
        const ny = y + 2 + Math.random() * (rowHeight - 5);
        const w = 1.5 + Math.random() * 3;
        const h = 1.0 + Math.random() * 2;
        ctx.fillStyle = Math.random() > 0.45 ? 'rgba(70, 50, 35, 0.12)' : 'rgba(255, 255, 255, 0.16)';
        ctx.fillRect(nx, ny, w, h);
      }

      x += blockWidth;
    }
  }

  // Deep recessed mortar lines
  ctx.strokeStyle = '#5c4e40';
  ctx.lineWidth = 2.0;

  for (let r = 0; r <= numRows; r++) {
    const y = r * rowHeight;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1024, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 12);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Procedural Galata Meydanı Cobblestone Paving Texture
export function createCobblestoneTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#3a3834';
  ctx.fillRect(0, 0, 512, 512);

  const stoneSize = 24;
  for (let y = 0; y < 512; y += stoneSize) {
    const offset = (Math.floor(y / stoneSize) % 2) * (stoneSize / 2);
    for (let x = -stoneSize; x < 512 + stoneSize; x += stoneSize) {
      const shade = 110 + Math.floor(Math.random() * 40);
      ctx.fillStyle = `rgb(${shade + 4}, ${shade + 2}, ${shade})`;
      
      // Rounded cobblestone
      ctx.beginPath();
      ctx.roundRect(x + offset + 2, y + 2, stoneSize - 4, stoneSize - 4, 5);
      ctx.fill();

      // Stone highlight
      ctx.fillStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.beginPath();
      ctx.arc(x + offset + stoneSize * 0.4, y + stoneSize * 0.4, 4.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10, 10);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Procedural Conical Lead/Slate Tile Roof Texture for Galata Külah
export function createLeadRoofTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d')!;

  // Weathered zinc/lead tone matching the reference render
  ctx.fillStyle = '#a7a59b';
  ctx.fillRect(0, 0, 1024, 1024);

  // Horizontal lead plate coursing
  const plateHeight = 28;
  const numPlates = Math.ceil(1024 / plateHeight);

  for (let p = 0; p < numPlates; p++) {
    const y = p * plateHeight;
    const toneVal = 158 + Math.floor(Math.random() * 24);
    
    // Gradient across each horizontal sheet to simulate bevel & plate overlap
    const grad = ctx.createLinearGradient(0, y, 0, y + plateHeight);
    grad.addColorStop(0, `rgb(${toneVal + 18}, ${toneVal + 16}, ${toneVal + 10})`);
    grad.addColorStop(0.85, `rgb(${toneVal}, ${toneVal - 2}, ${toneVal - 6})`);
    grad.addColorStop(1, `rgb(${toneVal - 35}, ${toneVal - 38}, ${toneVal - 42})`);

    ctx.fillStyle = grad;
    ctx.fillRect(0, y, 1024, plateHeight);

    // Weathering stains / rain streaks
    for (let s = 0; s < 12; s++) {
      const sx = Math.random() * 1024;
      const sw = 1.5 + Math.random() * 2;
      ctx.fillStyle = 'rgba(40, 42, 45, 0.15)';
      ctx.fillRect(sx, y, sw, plateHeight);
    }
  }

  // Vertical standing seams (kurşun çıtaları)
  const seamCount = 32;
  const seamWidth = 1024 / seamCount;

  for (let i = 0; i < seamCount; i++) {
    const x = i * seamWidth;
    // Seam shadow
    ctx.fillStyle = 'rgba(30, 32, 35, 0.45)';
    ctx.fillRect(x, 0, 2.5, 1024);
    // Seam highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.fillRect(x + 2.5, 0, 2.0, 1024);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
