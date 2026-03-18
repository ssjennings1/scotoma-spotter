/* ═══════════════════════════════════════
   Scotoma Spotter™ — Results Engine
   ═══════════════════════════════════════
   Renders the results page: dimensions
   chart, body content, actions, and offer.
   Uses getContent() from results-content.js
   ═══════════════════════════════════════ */

/* ── DIMENSION SCORES ── */
function getDimensions(score, type, q2, role, size, S){
  // These create the visual "scotoma profile" radar
  // Normalized to percentages for the bar chart
  var instinct = Math.min(100, Math.round((q2/25)*100)); // 3AM test
  var scale = Math.min(100, Math.round((size/25)*100)); // Org complexity
  var authority = Math.min(100, Math.round((role/25)*100)); // Leadership position
  var readiness = Math.min(100, Math.round((S.q4/30)*100)); // Readiness to act

  // Type-driven dimension
  var typeScores = {optimizer:85, architectural:75, relational:70, velocity:80};
  var pattern = typeScores[type]||70;

  return [
    {label:'Instinct Signal', value:instinct},
    {label:'Scale Pressure', value:scale},
    {label:'Pattern Strength', value:pattern},
    {label:'Authority', value:authority},
    {label:'Readiness', value:readiness}
  ];
}

function renderDimensions(dims){
  var html = '';
  dims.forEach(function(d){
    html += '<div class="dimension-row">';
    html += '<div class="dimension-label">'+d.label+'</div>';
    html += '<div class="dimension-track"><div class="dimension-fill" style="width:'+d.value+'%"></div></div>';
    html += '<div class="dimension-val">'+d.value+'%</div>';
    html += '</div>';
  });
  document.getElementById('rDimensions').innerHTML = html;
}

/* ── BUILD RESULTS ── */
function buildResults(name, score, tier, type, industry, q2score, orgSize, S){

  // ── Dimension scores for the visual ──
  var dims = getDimensions(score, type, q2score, S.role, S.size, S);
  renderDimensions(dims);

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
  oHtml += '<a href="https://link.syncovatellc.com/widget/booking/29K6RwPvCIc2xOxgUVKo" class="btn-bronze" target="_blank" rel="noopener">'+content.offer.cta+'</a>';
  if(content.offer.alt){
    oHtml += '<div class="offer-alt"><a href="#">'+content.offer.alt+'</a></div>';
  }
  // Session bridge on all tiers
  oHtml += '<div class="offer-session"><p>Not ready for a full engagement? <strong>Book a single session — $750.</strong> Ninety minutes. Your results. What they mean for your business specifically.</p>';
  oHtml += '<a href="https://link.syncovatellc.com/widget/booking/29K6RwPvCIc2xOxgUVKo" target="_blank" rel="noopener" style="font-size:0.82rem;color:var(--bronze);text-decoration:none;border-bottom:1px solid var(--bronze);padding-bottom:2px;">Book a Single Session →</a></div>';
  document.getElementById('rOffer').innerHTML = oHtml;
}
