<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 420" width="1200" height="420" role="img" aria-label="Neon Pulse Banner">
  <defs>
    <linearGradient id="np-bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0a0420"/>
      <stop offset="0.5" stop-color="#16082e"/>
      <stop offset="1" stop-color="#0a0420"/>
    </linearGradient>
    <linearGradient id="np-spectrum" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0"   stop-color="#ff00d9"/>
      <stop offset="0.5" stop-color="#7c5cff"/>
      <stop offset="1"   stop-color="#00d9ff"/>
      <animate attributeName="x1" values="0;-1;0" dur="9s" repeatCount="indefinite"/>
      <animate attributeName="x2" values="1;2;1" dur="9s" repeatCount="indefinite"/>
    </linearGradient>
    <linearGradient id="np-spectrum2" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0"   stop-color="#00d9ff"/>
      <stop offset="0.5" stop-color="#ff00d9"/>
      <stop offset="1"   stop-color="#7c5cff"/>
      <animate attributeName="x1" values="0;1;0" dur="11s" repeatCount="indefinite"/>
      <animate attributeName="x2" values="1;0;1" dur="11s" repeatCount="indefinite"/>
    </linearGradient>
    <filter id="np-glow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="6" result="b"/>
      <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
    <filter id="np-soft">
      <feGaussianBlur stdDeviation="1.4"/>
    </filter>
  </defs>

  <rect width="1200" height="420" fill="url(#np-bg)"/>

  <!-- Grid backdrop -->
  <g stroke="#1a0e3a" stroke-width="0.5">
    <line x1="0" y1="100" x2="1200" y2="100"/>
    <line x1="0" y1="200" x2="1200" y2="200"/>
    <line x1="0" y1="300" x2="1200" y2="300"/>
    <line x1="200" y1="0" x2="200" y2="420"/>
    <line x1="400" y1="0" x2="400" y2="420"/>
    <line x1="600" y1="0" x2="600" y2="420"/>
    <line x1="800" y1="0" x2="800" y2="420"/>
    <line x1="1000" y1="0" x2="1000" y2="420"/>
  </g>

  <!-- The three waves rise left-to-right rather than running level. Level
       waves sat in the bottom third and left the type stranded above them as
       a separate band; rising, they sweep up through the empty right half and
       the whole plate becomes one composition. They stay under the type on
       the left, where the headline and chips are. -->

  <!-- Far wave (slow, dim) -->
  <path fill="none" stroke="url(#np-spectrum2)" stroke-width="2" opacity="0.45">
    <animate attributeName="d"
      values="
        M -50 355 C 300 345 550 320 750 265 C 950 210 1120 130 1250 85;
        M -50 355 C 300 372 550 296 750 265 C 950 236 1120 106 1250 85;
        M -50 355 C 300 345 550 320 750 265 C 950 210 1120 130 1250 85"
      dur="14s" repeatCount="indefinite"/>
  </path>

  <!-- Mid wave (medium speed) -->
  <path fill="none" stroke="url(#np-spectrum)" stroke-width="2.5" opacity="0.7" filter="url(#np-soft)">
    <animate attributeName="d"
      values="
        M -50 400 C 300 392 550 370 750 315 C 950 260 1120 180 1250 135;
        M -50 400 C 300 418 550 344 750 315 C 950 286 1120 156 1250 135;
        M -50 400 C 300 392 550 370 750 315 C 950 260 1120 180 1250 135"
      dur="9s" repeatCount="indefinite"/>
  </path>

  <!-- Front wave (fast, glowing). Enters below the artboard so the status
       line at the bottom left keeps clear air. -->
  <path fill="none" stroke="url(#np-spectrum)" stroke-width="3" filter="url(#np-glow)">
    <animate attributeName="d"
      values="
        M -50 445 C 300 438 550 415 750 360 C 950 305 1120 225 1250 180;
        M -50 445 C 300 462 550 389 750 360 C 950 331 1120 201 1250 180;
        M -50 445 C 300 438 550 415 750 360 C 950 305 1120 225 1250 180"
      dur="6s" repeatCount="indefinite"/>
  </path>

  <!-- Headline -->
  <g font-family="'Space Grotesk', 'Neue Haas Grotesk', system-ui, sans-serif">
    <text x="80" y="180" font-size="76" font-weight="800" fill="#ffffff" letter-spacing="-2">JANE DOE</text>
    <text x="80" y="180" font-size="76" font-weight="800" fill="url(#np-spectrum)" letter-spacing="-2" filter="url(#np-glow)" opacity="0.8">JANE DOE</text>
  </g>

  <text x="82" y="214" font-family="'JetBrains Mono', monospace" font-size="13" fill="#00d9ff" letter-spacing="6">FRONTEND · MOTION · WEBGL</text>

  <!-- Tag chips. All four share one quiet border: four chips cycling three
       neon colours read as a carnival next to a spectrum that is already the
       loudest thing here, and this template's own advice is one focal motion,
       never a carnival. The colour belongs to the waves and the headline. -->
  <g font-family="'JetBrains Mono', monospace" font-size="11" letter-spacing="2">
    <g transform="translate(80,238)">
      <rect width="86" height="26" rx="13" fill="none" stroke="#4b3a8f" stroke-width="0.8"/>
      <text x="43" y="17" text-anchor="middle" fill="#c9b8ff">react</text>
    </g>
    <g transform="translate(176,238)">
      <rect width="86" height="26" rx="13" fill="none" stroke="#4b3a8f" stroke-width="0.8"/>
      <text x="43" y="17" text-anchor="middle" fill="#c9b8ff">typescript</text>
    </g>
    <g transform="translate(272,238)">
      <rect width="86" height="26" rx="13" fill="none" stroke="#4b3a8f" stroke-width="0.8"/>
      <text x="43" y="17" text-anchor="middle" fill="#c9b8ff">webgl</text>
    </g>
    <g transform="translate(368,238)">
      <rect width="86" height="26" rx="13" fill="none" stroke="#4b3a8f" stroke-width="0.8"/>
      <text x="43" y="17" text-anchor="middle" fill="#c9b8ff">motion</text>
    </g>
  </g>

  <!-- Status. The old line read "OSC 9Hz · LATENCY 12ms", which is instrument
       data this file does not have; it says what the template actually gives
       you instead. -->
  <g transform="translate(80,388)" font-family="'JetBrains Mono', monospace" font-size="10" letter-spacing="3" fill="#a78bfa">
    <circle cx="6" cy="-3" r="3.5" fill="#00d9ff">
      <animate attributeName="opacity" values="0.4;1;0.4" dur="1.4s" repeatCount="indefinite"/>
    </circle>
    <text x="20" y="0">ONE FILE · NO SERVICES · NOTHING TO RATE-LIMIT</text>
  </g>

  <!-- Top corner mark -->
  <g transform="translate(1120,40)" font-family="'JetBrains Mono', monospace" font-size="9" letter-spacing="3" fill="#7c5cff" text-anchor="end">
    <text x="-22" y="0">N° MMXXVI / PULSE.04</text>
    <line x1="-14" y1="-4" x2="0" y2="-4" stroke="#7c5cff" stroke-width="0.5"/>
  </g>
</svg>
