// call this once DOM is ready
window.addEventListener('DOMContentLoaded', generateThemeImages);

function generateThemeImages() {
  // pick up all our canvases
  const canvases = document.querySelectorAll('.theme-canvas');
  canvases.forEach((canvas, idx) => {
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;

    // 1) draw a neon‑style radial gradient background
    const grad = ctx.createRadialGradient(
      w/2, h/2, Math.min(w,h)*0.1,
      w/2, h/2, Math.max(w,h)*0.8
    );
    // shift the gradient center slightly per canvas
    grad.addColorStop(0, `hsla(${(idx*50)%360}, 80%, 60%, 0.6)`);
    grad.addColorStop(1, `hsla(${(idx*50+120)%360}, 40%, 10%, 0.8)`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // 2) scatter some glowing circles
    const circles = 12;
    for (let i = 0; i < circles; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = 10 + Math.random()*40;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI*2);
      const hue = (idx*50 + i*20) % 360;
      ctx.fillStyle = `hsla(${hue}, 90%, 65%, 0.2)`;
      ctx.shadowColor = `hsla(${hue}, 90%, 65%, 0.8)`;
      ctx.shadowBlur = r * 0.8;
      ctx.fill();
    }

    // 3) optional: a slight noise overlay for texture
    const imgData = ctx.getImageData(0,0,w,h);
    const d = imgData.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = (Math.random()-0.5) * 20;
      d[i]   = d[i] + v;
      d[i+1] = d[i+1] + v;
      d[i+2] = d[i+2] + v;
      // leave alpha
    }
    ctx.putImageData(imgData, 0, 0);
  });
}
