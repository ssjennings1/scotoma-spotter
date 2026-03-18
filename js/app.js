/* ═══════════════════════════════════════
   Scotoma Spotter™ — App Controller
   ═══════════════════════════════════════
   State management, navigation, UI handlers,
   email submission, and GHL webhook.
   ═══════════════════════════════════════ */

(function(){
'use strict';

/* ── STATE ── */
var S = {
  size:null, sizeLabel:'', role:null, industry:'', disq:false,
  q2:null,       // 3AM test (0-25)
  q3vis:null,    // Visibility loss (5-20)
  q4fails:null,  // Failed solutions (0-25)
  q5:null, q5type:'', // Scotoma type
  q6:null        // Readiness (0-30)
};
var screens = ['s-hero','s-q1','s-q2','s-q3','s-q4','s-q5','s-q6','s-email'];

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

/* ── OPTION SELECT (Screens 2-6) ── */
window.pick = function(label, key, pts, type){
  label.parentElement.querySelectorAll('.q-opt').forEach(function(o){o.classList.remove('selected');});
  label.classList.add('selected');
  S[key] = pts;
  if(type) S.q5type = type;
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

  // Calculate score (expanded: size + role + q2 + q3vis + q4fails + q6)
  var total = (S.size||0)+(S.role||0)+(S.q2||0)+(S.q3vis||0)+(S.q4fails||0)+(S.q6||0);
  var tier;
  if(total<=30) tier='early';
  else if(total<=60) tier='builder';
  else if(total<=95) tier='inflection';
  else if(total<=125) tier='breaking';
  else tier='transformation';

  var payload = {
    name:name, email:email, company:company,
    score:total, tier:tier, scotomaType:S.q5type,
    orgSize:S.sizeLabel, industry:S.industry,
    q2_3am:S.q2, q3_visibility:S.q3vis,
    q4_failedFixes:S.q4fails, q6_readiness:S.q6
  };

  /* ── GHL WEBHOOK ──
     Replace the URL below with your GHL Inbound Webhook URL.
     Go to: Automations > Workflows > + Create Workflow > Trigger: Inbound Webhook
     Copy the URL GHL gives you and paste it here.
  */
  var WEBHOOK_URL = 'https://services.leadconnectorhq.com/hooks/yCTzggMS1VT4xrqF3lML/webhook-trigger/886dcaa9-29bf-4567-be3b-69b503eed7d6';
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
    buildResults(name, total, tier, S.q5type, S.industry, S.q2, S.sizeLabel, S);
    go('s-results');
    document.getElementById('progress').style.width='100%';
    document.getElementById('progress').setAttribute('aria-valuenow','100');
    // Animate the radar chart
    setTimeout(function(){document.getElementById('rVisual').classList.add('animated');},200);
  },3800);
};

/* ── RESTART ASSESSMENT ── */
window.restartAssessment = function(){
  // Reset state
  S.size=null; S.sizeLabel=''; S.role=null; S.industry=''; S.disq=false;
  S.q2=null; S.q3vis=null; S.q4fails=null; S.q5=null; S.q5type=''; S.q6=null;
  // Clear all selections
  document.querySelectorAll('.q-chip.selected, .q-opt.selected').forEach(function(el){ el.classList.remove('selected'); });
  // Reset continue buttons
  document.querySelectorAll('.q-next').forEach(function(btn){ btn.classList.remove('ready'); });
  // Clear email form
  var inName = document.getElementById('inName'); if(inName) inName.value='';
  var inEmail = document.getElementById('inEmail'); if(inEmail) inEmail.value='';
  var inCompany = document.getElementById('inCompany'); if(inCompany) inCompany.value='';
  var inConsent = document.getElementById('inConsent'); if(inConsent) inConsent.checked=false;
  clearError();
  // Reset progress
  document.getElementById('progress').style.width='0%';
  document.getElementById('progress').setAttribute('aria-valuenow','0');
  // Reset radar animation
  document.getElementById('rVisual').classList.remove('animated');
  // Go to hero
  go('s-hero');
};

})();
