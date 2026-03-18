/* ═══════════════════════════════════════
   Scotoma Spotter™ — Results Engine
   ═══════════════════════════════════════
   Renders the results page: radar chart,
   body content, actions, and offer.
   Uses getContent() from results-content.js
   ═══════════════════════════════════════ */

/* ── SCOTOMA TYPE SCORES ── */
var scotomaTypeNames = {
  optimizer: 'Optimizer',
  architectural: 'Architectural',
  relational: 'Relational',
  velocity: 'Velocity'
};

function getScotomaScores(type, q2, q6, role, size){
  // q2: 0-25 (3AM test), q6: 0-30 (readiness), role: 0-25, size: 0-25
  var q2mod = Math.round((q2/25)*15);   // 0-15
  var q4mod = Math.round((q6/30)*10);   // 0-10
  var sizeMod = Math.round((size/25)*10); // 0-10
  var roleMod = Math.round((role/25)*10); // 0-10

  var types = ['optimizer','architectural','relational','velocity'];
  var scores = {};

  types.forEach(function(t){
    if(t === type){
      // Primary: high base + instinct and readiness modifiers
      scores[t] = Math.min(100, Math.max(15, 70 + q2mod + q4mod));
    } else {
      // Secondary: lower base + size and role modifiers + small instinct bump
      var base = 20;
      // Adjacent types score a bit higher for realism
      if(type==='optimizer' && t==='architectural') base = 35;
      if(type==='optimizer' && t==='velocity') base = 30;
      if(type==='architectural' && t==='optimizer') base = 30;
      if(type==='architectural' && t==='relational') base = 35;
      if(type==='relational' && t==='architectural') base = 30;
      if(type==='relational' && t==='velocity') base = 25;
      if(type==='velocity' && t==='optimizer') base = 35;
      if(type==='velocity' && t==='relational') base = 25;
      scores[t] = Math.min(100, Math.max(15, base + sizeMod + roleMod + Math.round(q2mod*0.3)));
    }
  });

  return scores;
}

/* ── RADAR CHART (SVG) ── */
function renderRadarChart(scores, primaryType){
  var types = ['optimizer','architectural','relational','velocity'];
  var labels = ['Optimizer','Architectural','Relational','Velocity'];

  // SVG dimensions
  var cx = 160, cy = 160, maxR = 120;
  // 4 axes: top, right, bottom, left
  var angles = [-90, 0, 90, 180]; // degrees

  function polarToXY(angleDeg, radius){
    var rad = angleDeg * Math.PI / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  // Grid rings
  var gridRings = [0.25, 0.5, 0.75, 1.0];
  var gridHtml = '';
  gridRings.forEach(function(pct){
    var r = maxR * pct;
    var pts = angles.map(function(a){ var p = polarToXY(a, r); return p.x+','+p.y; }).join(' ');
    gridHtml += '<polygon points="'+pts+'" fill="none" stroke="rgba(250,248,245,0.08)" stroke-width="1"/>';
  });

  // Axis lines
  var axisHtml = '';
  angles.forEach(function(a){
    var p = polarToXY(a, maxR);
    axisHtml += '<line x1="'+cx+'" y1="'+cy+'" x2="'+p.x+'" y2="'+p.y+'" stroke="rgba(250,248,245,0.1)" stroke-width="1"/>';
  });

  // Score polygon
  var scorePoints = [];
  types.forEach(function(t, i){
    var val = scores[t] / 100;
    var p = polarToXY(angles[i], maxR * val);
    scorePoints.push(p.x+','+p.y);
  });
  var scoreHtml = '<polygon class="radar-polygon" points="'+scorePoints.join(' ')+'" fill="rgba(196,147,90,0.15)" stroke="var(--bronze)" stroke-width="2"/>';

  // Score dots
  var dotsHtml = '';
  types.forEach(function(t, i){
    var val = scores[t] / 100;
    var p = polarToXY(angles[i], maxR * val);
    dotsHtml += '<circle cx="'+p.x+'" cy="'+p.y+'" r="4" fill="var(--bronze)" class="radar-dot"/>';
  });

  // Labels
  var labelOffsets = [
    { dx: 0, dy: -14, anchor: 'middle' },  // top
    { dx: 14, dy: 5, anchor: 'start' },     // right
    { dx: 0, dy: 18, anchor: 'middle' },    // bottom
    { dx: -14, dy: 5, anchor: 'end' }       // left
  ];
  var labelHtml = '';
  types.forEach(function(t, i){
    var p = polarToXY(angles[i], maxR + 4);
    var off = labelOffsets[i];
    var isPrimary = (t === primaryType);
    var cls = isPrimary ? 'radar-label radar-label-primary' : 'radar-label';
    var scoreTxt = scores[t]+'%';
    labelHtml += '<text x="'+(p.x+off.dx)+'" y="'+(p.y+off.dy)+'" text-anchor="'+off.anchor+'" class="'+cls+'">'+labels[i]+'</text>';
    labelHtml += '<text x="'+(p.x+off.dx)+'" y="'+(p.y+off.dy+13)+'" text-anchor="'+off.anchor+'" class="radar-score'+(isPrimary?' radar-score-primary':'')+'">'+scoreTxt+'</text>';
  });

  var svg = '<svg viewBox="0 0 320 320" class="radar-svg" xmlns="http://www.w3.org/2000/svg">';
  svg += gridHtml + axisHtml + scoreHtml + dotsHtml + labelHtml;
  svg += '</svg>';

  // Interpretation line
  var typeName = scotomaTypeNames[primaryType] || 'Architectural';
  var interp = '<div class="radar-interpretation">Your strongest pattern: <strong>The '+typeName+' Blind Spot</strong></div>';

  document.getElementById('rDimensions').innerHTML = svg + interp;
}

/* ── BUILD RESULTS ── */
function buildResults(name, score, tier, type, industry, q2score, orgSize, S){

  // ── Radar chart scores ──
  var scores = getScotomaScores(type, q2score, S.q6, S.role, S.size);
  renderRadarChart(scores, type);

  // ── Content by tier × type ──
  var content = getContent(tier, type, industry, name, q2score, orgSize, S);

  document.getElementById('rEyebrow').textContent = content.eyebrow;
  document.getElementById('rHeadline').innerHTML = content.headline;
  document.getElementById('rSubhead').innerHTML = content.subhead;

  // Body
  var bHtml = '<p class="r-greeting">'+content.greeting+'</p>';
  content.sections.forEach(function(s){
    bHtml += '<div class="r-section"><div class="r-label">'+s.label+'</div><div class="r-heading">'+s.heading+'</div><div class="r-text">'+s.text+'</div></div>';
  });
  document.getElementById('rBody').innerHTML = bHtml;

  // Actions
  var aHtml = '<div class="r-actions-title">'+content.actionsTitle+'</div><p class="r-actions-sub">'+content.actionsSub+'</p>';
  content.actions.forEach(function(a,i){
    aHtml += '<div class="action-card"><div class="action-num">Action '+(i+1)+'</div><div class="action-title">'+a.title+'</div><div class="action-text">'+a.text+'</div><div class="action-time">'+a.time+'</div></div>';
  });
  document.getElementById('rActions').innerHTML = aHtml;

  // Offer
  var oHtml = '<h3>'+content.offer.headline+'</h3><p class="r-text">'+content.offer.bridge+'</p>';
  oHtml += '<div class="offer-price">'+content.offer.price+'</div><p class="r-text">'+content.offer.desc+'</p>';
  oHtml += '<div class="offer-box"><ul>';
  content.offer.items.forEach(function(it){ oHtml+='<li>'+it+'</li>'; });
  oHtml += '</ul></div>';
  var ctaHref = content.offer.ctaHref || 'https://link.syncovatellc.com/widget/booking/29K6RwPvCIc2xOxgUVKo';
  var ctaDl = content.offer.ctaDownload ? ' download' : '';
  var ctaTarget = content.offer.ctaDownload ? '' : ' target="_blank" rel="noopener"';
  oHtml += '<a href="'+ctaHref+'" class="btn-bronze"'+ctaTarget+ctaDl+'>'+content.offer.cta+'</a>';
  if(content.offer.alt){
    // Check if alt starts with "Not ready?" — render as link; otherwise as plain triage text
    if(content.offer.alt.indexOf('Not ready')===0){
      var altHref = content.offer.altHref || '#';
      var altDl = content.offer.altDownload ? ' download' : '';
      oHtml += '<div class="offer-alt"><a href="'+altHref+'"'+altDl+'>'+content.offer.alt+'</a></div>';
    } else {
      oHtml += '<div class="offer-alt" style="border-bottom:none;"><span style="font-size:0.82rem;color:var(--text-muted);line-height:1.6;">'+content.offer.alt+'</span></div>';
    }
  }
  // Session bridge on all tiers
  oHtml += '<div class="offer-session"><p>Not ready for a full engagement? <strong>Book a single session — $750.</strong> Ninety minutes. Your results. What they mean for your business specifically.</p>';
  oHtml += '<a href="https://link.syncovatellc.com/widget/bookings/on-demand-advisor" target="_blank" rel="noopener" style="font-size:0.82rem;color:var(--bronze);text-decoration:none;border-bottom:1px solid var(--bronze);padding-bottom:2px;">Book a Single Session →</a></div>';
  document.getElementById('rOffer').innerHTML = oHtml;
}
