/* ═══════════════════════════════════════
   Scotoma Spotter™ — App Controller
   ═══════════════════════════════════════
   State management, navigation, UI handlers,
   email submission, and GHL webhook.
   ═══════════════════════════════════════ */

(function(){
'use strict';

/* ── STATE ── */
var S = { size:null, sizeLabel:'', role:null, industry:'', q2:null, q3:null, q3type:'', q4:null, disq:false };
var screens = ['s-hero','s-q1','s-q2','s-q3','s-q4','s-email'];

/* ── NAV ── */
function setProgress(id){
  var i = screens.indexOf(id);
  if(i<0)return;
  var bar = document.getElementById('progress');
  var pct = Math.round((i/(screens.length-1))*100);
  bar.style.width = pct+'%';
  bar.setAttribute('aria-valuenow', pct);
}

/* ── SCREEN TRANSITIONS ── */
window.go = function(id){
  var current = document.querySelector('.screen.active');
  if(current){
    current.classList.add('fade-out');
    setTimeout(function(){
      current.classList.remove('active','fade-out');
      showScreen(id);
    }, 250);
  } else {
    showScreen(id);
  }
};

function showScreen(id){
  var el = document.getElementById(id);
  if(el){
    el.classList.add('active');
    window.scrollTo(0,0);
    setProgress(id);
    // Focus management for accessibility
    var heading = el.querySelector('h1, h2, .q-title, .q-counter');
    if(heading){ heading.setAttribute('tabindex','-1'); heading.focus(); }
  }
}

/* ── CHIP SELECT (Screen 1) ── */
window.chip = function(label, key, pts, special){
  label.parentElement.querySelectorAll('.q-chip').forEach(function(c){c.classList.remove('selected');});
  label.classList.add('selected');
  if(key==='size'){ S.size=pts; S.sizeLabel=label.textContent.trim(); }
  else if(key==='role'){ S.role=pts; S.disq=(special==='disq'); }
  else if(key==='industry'){ S.industry=label.textContent.trim(); }
  // Enable continue when all three selected
  if(S.size!==null && S.role!==null && S.industry){
    document.getElementById('q1-btn').classList.add('ready');
  }
};

window.fromQ1 = function(){
  if(S.disq){ go('s-disq'); return; }
  go('s-q2');
};

/* ── OPTION SELECT (Screens 2-4) ── */
window.pick = function(label, key, pts, type){
  label.parentElement.querySelectorAll('.q-opt').forEach(function(o){o.classList.remove('selected');});
  label.classList.add('selected');
  S[key] = pts;
  if(type) S.q3type = type;
  document.getElementById(key+'-btn').classList.add('ready');
};

/* ── INLINE VALIDATION ── */
function showError(msg){
  var el = document.getElementById('emailError');
  el.textContent = msg;
  el.style.display = 'block';
}
function clearError(){
  var el = document.getElementById('emailError');
  el.style.display = 'none';
  document.querySelectorAll('.email-input').forEach(function(i){ i.classList.remove('input-error'); });
}

/* ── EMAIL SUBMIT ── */
window.submitEmail = function(){
  clearError();
  var nameEl = document.getElementById('inName');
  var emailEl = document.getElementById('inEmail');
  var name = nameEl.value.trim();
  var email = emailEl.value.trim();

  if(!name){
    nameEl.classList.add('input-error');
    showError('Please enter your first name.');
    nameEl.focus();
    return;
  }
  if(!email || email.indexOf('@')===-1){
    emailEl.classList.add('input-error');
    showError('Please enter a valid email address.');
    emailEl.focus();
    return;
  }
  if(!document.getElementById('inConsent').checked){
    showError('Please check the consent box to see your results.');
    return;
  }

  var company = document.getElementById('inCompany').value.trim();

  // Calculate
  var total = (S.size||0)+(S.role||0)+(S.q2||0)+(S.q4||0);
  var tier;
  if(total<=20) tier='early';
  else if(total<=45) tier='builder';
  else if(total<=70) tier='inflection';
  else if(total<=90) tier='breaking';
  else tier='transformation';

  var payload = {
    name:name, email:email, company:company,
    score:total, tier:tier, scotomaType:S.q3type,
    orgSize:S.sizeLabel, industry:S.industry,
    q2_3am:S.q2, q4_readiness:S.q4
  };

  /* ── GHL WEBHOOK ──
     Replace the URL below with your GHL Inbound Webhook URL.
     Go to: Automations > Workflows > + Create Workflow > Trigger: Inbound Webhook
     Copy the URL GHL gives you and paste it here.
  */
  var WEBHOOK_URL = ''; // ← PASTE YOUR GHL WEBHOOK URL HERE
  if(WEBHOOK_URL){
    fetch(WEBHOOK_URL, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body:JSON.stringify(payload)
    }).catch(function(e){ console.log('Webhook error:',e); });
  }

  // Show loading then results
  go('s-loading');
  var msgs = ['Mapping your blind spot profile...','Cross-referencing patterns...','Building your diagnosis...'];
  var mi = 0;
  var lt = document.getElementById('loadingText');
  var msgInterval = setInterval(function(){
    mi++;
    if(mi<msgs.length){ lt.style.opacity=0; setTimeout(function(){lt.textContent=msgs[mi];lt.style.opacity=1;},300); }
  },1200);

  setTimeout(function(){
    clearInterval(msgInterval);
    buildResults(name, total, tier, S.q3type, S.industry, S.q2, S.sizeLabel, S);
    go('s-results');
    document.getElementById('progress').style.width='100%';
    document.getElementById('progress').setAttribute('aria-valuenow','100');
    // Animate the dimension bars
    setTimeout(function(){document.getElementById('rVisual').classList.add('animated');},200);
  },3800);
};

})();
