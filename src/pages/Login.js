import { htmlToElement } from '../utils.js';
import { store } from '../store.js';

export function renderLogin() {
  const html = `
    <div class="login-page">
      <nav class="p-navbar">
        <div class="p-navbar__logo-container">
          <img src="public/logo.svg" alt="Togather Logo" style="height: 30px;" />
        </div>
      </nav>
      
      <div class="login-left">
        <div class="login-form-container">
          
          <div class="input-section">
            <div class="input-group">
              <label>이메일</label>
              <input type="text" class="toss-input login-input" placeholder="jina.chung@toss.com" />
            </div>
            
            <div class="input-group">
              <label>비밀번호</label>
              <input type="password" class="toss-input login-input" placeholder="••••••••••" />
            </div>
            
            <div class="checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" checked />
                <span class="t-body-2">자동 로그인</span>
              </label>
            </div>
          </div>
          
          <div class="btn-section">
            <button class="btn-primary login-btn" id="login-btn">로그인</button>
            <button class="sso-btn" id="sso-btn">SSO로 로그인</button>
            
            <div class="login-links">
              <span>비밀번호 찾기</span>
              <span class="divider"></span>
              <span>이메일 찾기</span>
              <span class="divider"></span>
              <span>회원가입</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="login-right">
        <div id="tgHero" style="position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; background: linear-gradient(160deg, #FCFDFF 0%, #F5F8FF 60%, #F0F4FE 100%); cursor: crosshair; touch-action: none;">
          <svg style="position: absolute; inset: 0; pointer-events: none;" width="100%" height="100%" viewBox="0 0 960 430" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="hgG" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#9AC4FF"/>
                <stop offset="0.55" stop-color="#3E86F4"/>
                <stop offset="1" stop-color="#0064FF"/>
              </linearGradient>
              <filter id="hgFlute" filterUnits="userSpaceOnUse" x="-800" y="-800" width="2560" height="2030">
                <feGaussianBlur in="SourceGraphic" stdDeviation="36" result="soft"/>
                <feTurbulence type="fractalNoise" baseFrequency="0.032 0.0006" numOctaves="1" seed="11" result="ribs"/>
                <feDisplacementMap id="hgDisp" in="soft" in2="ribs" scale="14" xChannelSelector="R" yChannelSelector="G"/>
              </filter>
              <filter id="hgHalo" filterUnits="userSpaceOnUse" x="-800" y="-800" width="2560" height="2030">
                <feGaussianBlur stdDeviation="85"/>
              </filter>
              <filter id="hgSoft" filterUnits="userSpaceOnUse" x="-800" y="-800" width="2560" height="2030">
                <feGaussianBlur stdDeviation="40"/>
              </filter>
              <pattern id="hgRibs" width="20" height="10" patternUnits="userSpaceOnUse">
                <rect width="20" height="10" fill="rgba(255,255,255,0)"/>
                <rect x="0" width="10" height="10" fill="url(#hgRibGradW)"/>
                <rect x="10" width="10" height="10" fill="url(#hgRibGradD)"/>
              </pattern>
              <linearGradient id="hgRibGradW" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stop-color="#FFFFFF" stop-opacity="0.8"/>
                <stop offset="0.5" stop-color="#FFFFFF" stop-opacity="0.2"/>
                <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
              </linearGradient>
              <linearGradient id="hgRibGradD" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stop-color="#0A2C66" stop-opacity="0.08"/>
                <stop offset="0.6" stop-color="#0A2C66" stop-opacity="0.02"/>
                <stop offset="1" stop-color="#0A2C66" stop-opacity="0"/>
              </linearGradient>
              <mask id="hgMask" maskUnits="userSpaceOnUse" x="-800" y="-800" width="2560" height="2030">
                <path id="hgMaskShape" fill="#FFFFFF" filter="url(#hgSoft)"/>
              </mask>
            </defs>
            <path id="hgHaloShape" fill="url(#hgG)" opacity="0.4" filter="url(#hgHalo)"/>
            <path id="hgShape" fill="url(#hgG)" opacity="0.9" filter="url(#hgFlute)"/>
            <g id="hgRibsLayer" mask="url(#hgMask)" opacity="0.6">
              <rect x="-800" y="-800" width="2560" height="2030" fill="url(#hgRibs)"/>
            </g>
          </svg>
        </div>
      </div>
    </div>
  `;
  
  const element = htmlToElement(html);
  
  element.querySelector('#login-btn').addEventListener('click', () => {
    store.navigate('/home');
  });

  element.querySelector('#sso-btn').addEventListener('click', () => {
    store.navigate('/home');
  });

  // Initialize hero motion
  setTimeout(() => {
    const box = element.querySelector('.login-right');
    const shape = element.querySelector('#hgShape');
    const halo = element.querySelector('#hgHaloShape');
    const maskShape = element.querySelector('#hgMaskShape');
    const disp = element.querySelector('#hgDisp');
    const ribsLayer = element.querySelector('#hgRibsLayer');
    if (!box || !shape) return;
    
    // Decrease radii roughly by factor of sqrt(10) ≈ 3.16 to make area 10 times smaller
    const N=9, RX=82, RY=52;
    let mx=560, my=215, inside=false, agit=0;
    let cx=560, cy=215, vx=0, vy=0;
    
    function onMove(e){
      const r = box.getBoundingClientRect();
      const x = (e.clientX - r.left) * 960 / r.width;
      const y = (e.clientY - r.top) * 430 / r.height;
      inside = x >= -40 && x <= 1000 && y >= -40 && y <= 470;
      if(inside){ mx=x; my=y; }
    }
    document.addEventListener('pointermove', onMove, {passive: true});
    
    function tick(t){
      if (!document.body.contains(box)) {
        document.removeEventListener('pointermove', onMove);
        return;
      }
      
      const T = t * 0.00012;
      const hx = inside ? mx : 560 + Math.sin(T * 0.6) * 140;
      const hy = inside ? my : 215 + Math.sin(T * 1.1 + 1.7) * 60;
      vx = (vx + (hx - cx) * 0.0028) * 0.90; 
      vy = (vy + (hy - cy) * 0.0028) * 0.90;
      cx += vx; cy += vy;
      
      const speed = Math.hypot(vx, vy);
      // Increased idle target to 0.25 (was 0) so glass effect persists, and active target to 0.6 (was 0.35)
      const target = Math.min(1, (inside ? 0.6 : 0.25) + speed * 0.45);
      agit += (target - agit) * 0.03;
      
      // Increased base scale and ribs opacity for stronger glass feel
      disp.setAttribute('scale', 25 + agit * 55);
      ribsLayer.setAttribute('opacity', (0.35 + agit * 0.55).toFixed(3));
      
      // Runway-like Feature 1: Internal gradient rotation over time
      const grad = element.querySelector('#hgG');
      if (grad) {
        const angle = T * 0.5; // Rotate gradient
        const cx_g = 0.5, cy_g = 0.5;
        const r_g = 0.7;
        grad.setAttribute('x1', cx_g + Math.cos(angle) * r_g);
        grad.setAttribute('y1', cy_g + Math.sin(angle) * r_g);
        grad.setAttribute('x2', cx_g - Math.cos(angle) * r_g);
        grad.setAttribute('y2', cy_g - Math.sin(angle) * r_g);
      }
      
      // Runway-like Feature 2: Velocity-based squash and stretch
      const moveAngle = Math.atan2(vy, vx);
      const stretch = 1 + Math.min(1.5, speed * 0.08); // Stretch along velocity
      const squash = 1 / Math.max(1.0, stretch * 0.8); // Compress perpendicular
      
      const pts = [];
      for(let i=0; i<N; i++){
        const a = i / N * Math.PI * 2;
        const bulge = 1 + 0.45 * Math.sin(a * 1.5 + T * 0.7);
        const wob = 0.22 * Math.sin(T * (1.2 + i * 0.33) + i * 2.1) + (0.08 + agit * 0.15) * Math.sin(T * 3.2 + i * 3.3);
        
        // Base shape radius
        let rx = RX * bulge * (1 + wob);
        let ry = RY * bulge * (1 + wob * 0.8);
        
        // Apply stretch and squash locally
        rx *= stretch;
        ry *= squash;
        
        // Rotate the point by the movement angle to align stretch with velocity
        const base_x = Math.cos(a) * rx;
        const base_y = Math.sin(a) * ry;
        
        const rot_x = base_x * Math.cos(moveAngle) - base_y * Math.sin(moveAngle);
        const rot_y = base_x * Math.sin(moveAngle) + base_y * Math.cos(moveAngle);
        
        pts.push([cx + rot_x, cy + rot_y]);
      }
      
      let d = 'M' + pts[0][0].toFixed(1) + ',' + pts[0][1].toFixed(1);
      for(let i=0; i<N; i++){
        const p0 = pts[(i - 1 + N) % N], p1 = pts[i], p2 = pts[(i + 1) % N], p3 = pts[(i + 2) % N];
        const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
        const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
        d += 'C' + c1[0].toFixed(1) + ',' + c1[1].toFixed(1) + ' ' + c2[0].toFixed(1) + ',' + c2[1].toFixed(1) + ' ' + p2[0].toFixed(1) + ',' + p2[1].toFixed(1);
      }
      d += 'Z';
      
      shape.setAttribute('d', d);
      halo.setAttribute('d', d);
      maskShape.setAttribute('d', d);
      
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, 0);
  
  return element;
}
