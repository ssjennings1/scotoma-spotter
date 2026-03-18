/* ═══════════════════════════════════════
   Scotoma Spotter™ — Results Content
   ═══════════════════════════════════════
   This file contains all the copy/messaging
   for the results pages. Edit this file to
   tweak headlines, narratives, and offers.
   ═══════════════════════════════════════ */

/* ── INDUSTRY-SPECIFIC LANGUAGE ── */
function indLang(industry){
  var map = {
    'Electrical / Trades': { team:'crew', workplace:'job sites', leader:'foreman', work:'jobs', org:'shop' },
    'Construction': { team:'crew', workplace:'job sites', leader:'superintendent', work:'projects', org:'operation' },
    'Manufacturing': { team:'floor team', workplace:'production floor', leader:'shift lead', work:'orders', org:'plant' },
    'Professional Services': { team:'team', workplace:'office', leader:'senior associate', work:'client work', org:'firm' },
    'Other': { team:'team', workplace:'operation', leader:'key manager', work:'work', org:'business' }
  };
  return map[industry] || map['Other'];
}

/* ═══════════════════════════════════════════
   CONTENT BY TIER × TYPE
   ═══════════════════════════════════════════ */

function getContent(tier, type, industry, name, q2score, orgSize, S){
  var ind = indLang(industry);
  var q2Narrative = '';
  if(q2score>=25) q2Narrative = 'You told me that feeling hits you weekly or more. That\'s not anxiety — that\'s pattern recognition. Your brain is detecting something your conscious mind hasn\'t caught up to yet.';
  else if(q2score>=15) q2Narrative = 'That feeling hitting you a couple times a month? It\'s not random. Your instinct is picking up a signal your daily routine keeps overriding.';
  else if(q2score>=5) q2Narrative = 'You mentioned it happens occasionally. That\'s actually the earliest stage of the signal — your instinct noticing before your calendar gives you space to think about it.';
  else q2Narrative = 'You said the 3AM feeling isn\'t hitting you yet. That\'s good news — it means you\'re still ahead of the pattern.';

  /* ── TYPE-SPECIFIC CONTENT ── */
  var typeContent = {
    optimizer: {
      typeName: 'The Optimizer Blind Spot',
      heroEmphasis: 'Built This Company',
      mirror: 'The speed, the decisiveness, the "I\'ll just handle it" reflex — that\'s what got you here. But here\'s what I see in '+ind.org+'s like yours: the thing that built the business becomes the thing that caps it. You\'re still the fastest problem-solver in the room. And that\'s exactly the problem.',
      whatsMissing: 'Your '+ind.team+' has quietly stopped bringing you problems — not because there aren\'t any, but because they assume you\'ll just solve them yourself. Decisions queue behind your calendar. The people who could step up don\'t, because there\'s no room. You\'ve trained the entire '+ind.org+' to wait for you.',
      cost: 'Every decision you make is one your '+ind.leader+' doesn\'t learn to make. You\'re trading long-term capability for short-term speed. And the ceiling you\'re feeling? It\'s your own capacity. Revenue can\'t outgrow the person everything runs through.',
      actions: [
        { title:'Map the decision queue.', text:'This week, write down every decision someone brought to you or waited on you for. Just list them. Don\'t judge, don\'t fix — just make the invisible queue visible. You\'ll be surprised how long the list is.', time:'30 minutes over 5 days' },
        { title:'Sort into three columns.', text:'Take your list and sort each decision: "Must stay with me" / "Could hand off with guardrails" / "Should have handed off months ago." That third column is your blind spot in writing.', time:'20 minutes' },
        { title:'Hand one off by Friday.', text:'Pick one item from column three. The easiest one. Tell the person it\'s theirs now, tell them the guardrails, and resist the urge to check on it for two weeks.', time:'One conversation' }
      ],
    },
    architectural: {
      typeName: 'The Architectural Blind Spot',
      heroEmphasis: 'Outgrown the Blueprint',
      mirror: 'You grew fast and you built on the fly — because that\'s what you had to do. But the way your '+ind.org+' runs today is still wired for when you had 12 people. The org chart says one thing. The actual workflow says something else. And the gap between those two is where your best people are getting stuck.',
      whatsMissing: 'Your '+ind.team+' doesn\'t need more effort. They need clarity — who owns what, who decides what, where information goes when it leaves someone\'s desk. Right now, that architecture is informal, unwritten, and mostly dependent on relationships that were formed when the '+ind.org+' was a fraction of its current size.',
      cost: 'Information gets trapped. Decisions take longer than they should. Your '+ind.leader+' is bridging gaps you don\'t know exist. And when people hit invisible walls — unclear authority, overlapping roles, bottlenecked communication — they don\'t complain. They just start looking elsewhere.',
      actions: [
        { title:'Draw the real org chart.', text:'Not the official one. The one that shows how decisions actually get made. Who do people actually go to when they need something? That\'s your real structure — and it probably looks nothing like the one on paper.', time:'45 minutes' },
        { title:'Find the three biggest gaps.', text:'Compare the real chart to the official one. Where are the mismatches? Where is someone doing a job their title doesn\'t describe? Where is a decision getting made two levels away from where it should be?', time:'30 minutes' },
        { title:'Pick one role and rewrite the handshake.', text:'Take the role with the biggest gap between what\'s on paper and what actually happens. Sit down with that person and rewrite the real deal: what they own, what they decide, what comes to you. Make the invisible structure visible.', time:'One conversation' }
      ],
    },
    relational: {
      typeName: 'The Relational Blind Spot',
      heroEmphasis: 'Can\'t Locate the Source',
      mirror: 'The energy shifted. You can feel it. Conversations are shorter than they used to be. People say "things are fine" when you ask, and you know they\'re not. But you can\'t point to the specific thing that changed — and that\'s what makes relational blind spots so dangerous. They\'re invisible until someone leaves.',
      whatsMissing: 'Somewhere in your '+ind.org+', there\'s a trust gap you can\'t see from where you sit. It might be between peers. It might be between a '+ind.leader+' and their '+ind.team+'. It might be between what you say the culture is and what people actually experience on the '+ind.workplace+'. The mismatch between the stated values and the lived reality is where engagement dies quietly.',
      cost: 'Your best people get quiet first. They don\'t complain — they disengage. By the time the relational fracture becomes visible to leadership, it\'s been spreading for months. And the usual fix — a team offsite, a survey, an "open door" announcement — bounces off because it doesn\'t address the actual rupture.',
      actions: [
        { title:'Name what shifted.', text:'Think back to when things felt different — when the energy was better. What changed? A hire? A departure? A decision that wasn\'t explained? A promise that didn\'t land? The shift usually traces back to one moment. Name it.', time:'15 minutes of honest reflection' },
        { title:'Ask one person the real question.', text:'Pick the person on your '+ind.team+' you trust most — the one who\'ll tell you the truth. Ask them: "What\'s the one thing people aren\'t saying out loud right now?" Then listen without defending.', time:'One conversation, full attention' },
        { title:'Close one loop.', text:'Whatever you hear, take one concrete action this week that demonstrates you heard it. Not a policy change. Not a grand announcement. One visible action that closes the gap between what you said and what people experienced.', time:'Depends on what you hear' }
      ],
    },
    velocity: {
      typeName: 'The Velocity Blind Spot',
      heroEmphasis: 'Moving Too Fast to See',
      mirror: 'Growth covered the cracks. When '+ind.work+' keeps coming in and the numbers look right, it\'s easy to tell yourself the system is working. But you\'re carrying a feeling that something underneath isn\'t keeping up — the '+ind.team+' is stretched, the processes are held together with duct tape and heroics, and the "we\'ll fix it later" list keeps growing.',
      whatsMissing: 'Speed creates compound invisibility. You don\'t have time to look back because you\'re sprinting forward. But the shortcuts your '+ind.org+' made at an earlier stage — the roles that were never properly defined, the processes that were "good enough," the communication that relied on proximity — those are now operating at a scale they were never designed for.',
      cost: 'You\'re accruing operational debt faster than you realize. Customer experience is starting to wobble. Your '+ind.leader+' is burning the kind of energy that doesn\'t regenerate. And the scariest part: you won\'t see the breaking point until you\'re past it.',
      actions: [
        { title:'List the duct tape.', text:'Every '+ind.org+' has systems held together by one person\'s heroics or a workaround that was supposed to be temporary. List them. The ones that make you wince are the ones that matter most.', time:'30 minutes' },
        { title:'Find the load-bearing person.', text:'Who on your '+ind.team+' is the one holding the most together with the least support? That person is your biggest vulnerability and your biggest asset. If they left tomorrow, what breaks?', time:'Honest gut check' },
        { title:'Fix one thing before you grow more.', text:'Pick one item from your duct tape list — the one with the highest risk. Fix it properly. Not a patch. An actual solution. Stabilize before you accelerate.', time:'This week' }
      ],
    }
  };

  var tc = typeContent[type] || typeContent.architectural;

  /* ── TIER-SPECIFIC WRAPPER ── */
  if(tier==='early'){
    return {
      eyebrow: 'Your Results — Early Scale',
      headline: 'Your Vision Is Still Clear.<br><em>Build the Habits That Keep It That Way.</em>',
      subhead: 'At your current scale, you can still see most of what\'s happening. That\'s your advantage. The work now is building the systems that protect it as you grow.',
      greeting: name+', here\'s what your answers tell me.',
      sections: [
        { label:'Your Profile', heading:'You\'re ahead of the curve.', text:q2Narrative+' At '+orgSize+' people, direct visibility is still working for you. That\'s not a consolation prize — it\'s a genuine advantage. The fact that you\'re thinking about organizational blind spots before they\'ve formed puts you ahead of most founders at your stage.' },
        { label:'What I\'d Watch For', heading:'The patterns that catch founders off guard.', text:'I\'ve worked with enough companies to tell you what happens next: somewhere between 25 employees and $5M, the leadership style that\'s working now starts creating friction. Not because you\'re doing anything wrong — because the business outgrows your span of control. Decisions start waiting on you. People stop bringing you bad news. Solutions that look right on paper don\'t change behavior. That\'s when the scotoma forms.' }
      ],
      actionsTitle: 'Build these habits now — while you still can.',
      actionsSub: 'The founders who navigate the next stage well are the ones who build intentional architecture before they need it.',
      actions: tc.actions,
      offer: {
        headline: 'Stay Ahead of It',
        bridge: 'You don\'t need a diagnostic yet. What you need is awareness of the patterns that trip founders up between here and 50 people.',
        price: 'Free',
        desc: 'Download "The Founder\'s Pre-Scotoma Checklist: 5 Systems to Build Before You Need Them"',
        items: ['Pre-scotoma checklist for early-stage founders','The 5 systems that prevent the most common blind spots','Early warning signs to watch as you scale'],
        cta: 'Download the Free Guide →',
        alt: null
      }
    };
  }

  if(tier==='builder'){
    return {
      eyebrow: 'Your Results — The Builder Stage',
      headline: 'You\'re Building Fast.<br><em>Let\'s Make Sure You\'re Building Right.</em>',
      subhead: 'You\'re in a critical window: big enough to need systems, small enough to build them right the first time.',
      greeting: name+', your answers tell me something important.',
      sections: [
        { label:'Your Profile', heading:'You\'re encoding patterns right now — whether you know it or not.', text:q2Narrative+' At '+orgSize+' people in '+industry+', the decisions you\'re making right now about who does what, how information flows, and how your '+ind.team+' operates — those are becoming the permanent architecture of your '+ind.org+'. The patterns you\'re building will either scale beautifully or become invisible bottlenecks.' },
        { label:'The Blind Spot Risk', heading: tc.typeName, text: tc.mirror }
      ],
      actionsTitle: 'Three things you can do this week.',
      actionsSub: 'These aren\'t generic advice. They\'re specific to the pattern your answers revealed.',
      actions: tc.actions,
      offer: {
        headline: 'Prevent the Blind Spot — Don\'t Just Find It Later',
        bridge: 'The actions above will give you real traction. But self-diagnosis has a ceiling — you can\'t see the system from inside the system. The Builder\'s Blind Spot Scan catches what proximity hides, while you\'re still small enough to fix it without disruption.',
        price: '$3,500',
        desc: 'A 2-hour intensive + follow-up. Executive brief with preventive recommendations.',
        items: ['Early-warning diagnosis of patterns that work now but break at scale','Decision-making audit: what to systematize vs. keep centralized','Leadership pipeline assessment','Cultural scaffolding review'],
        cta: 'Learn More About the Blind Spot Scan →',
        alt: 'Not ready? Download: "7 Decisions That Determine If You Scale or Stall"'
      }
    };
  }

  if(tier==='inflection'){
    return {
      eyebrow: 'Your Results — The Inflection Point',
      headline: 'You\'ve '+tc.heroEmphasis+'.<br><em>Now It\'s in the Way.</em>',
      subhead: 'The thing that got you here is creating the friction you\'re feeling. That\'s not failure — that\'s growth.',
      greeting: name+', I want to be straight with you.',
      sections: [
        { label:'What I See', heading: tc.typeName, text: q2Narrative+' '+tc.mirror },
        { label:'What You\'re Missing', heading:'The invisible friction.', text: tc.whatsMissing },
        { label:'What It\'s Costing You', heading:'More than you think.', text: tc.cost }
      ],
      actionsTitle: 'Three moves you can make this week.',
      actionsSub: 'I designed these for founders dealing with exactly the pattern your answers revealed. They won\'t solve everything — but they\'ll make the invisible thing visible.',
      actions: tc.actions,
      offer: {
        headline: 'See the Full Picture',
        bridge: 'The actions above will give you real traction. But here\'s what I know from doing this work: the pattern you\'re sensing has layers you can\'t reach on your own. The Blind Spot Scan maps what proximity hides — in 7-10 days, you\'ll know exactly what\'s off and what to do about it.',
        price: '$3,500',
        desc: 'Your '+tc.typeName+' diagnosis mapped across leadership, structure, and workflow. Prioritized recommendations. Self-implementation roadmap.',
        items: ['Your blind spot mapped across leadership, structure, and workflow','Prioritized recommendations on what to change first','Self-implementation roadmap with quick wins and long-term shifts','Optional 15-minute kickoff call to align on scope'],
        cta: 'Get the Blind Spot Scan →',
        alt: 'Not ready? Download: "5 Warning Signs Your Blind Spot Is Getting Worse"'
      }
    };
  }

  if(tier==='breaking'){
    return {
      eyebrow: 'Your Results — The Breaking Point',
      headline: 'This Isn\'t One Blind Spot.<br><em>It\'s Systemic.</em>',
      subhead: 'Your answers tell me you\'re dealing with something deeper than a single fix. The pattern has layers — and it\'s been building for a while.',
      greeting: name+', I\'m going to be direct with you.',
      sections: [
        { label:'What I See', heading: tc.typeName+' — Multi-Layered', text: q2Narrative+' '+tc.mirror },
        { label:'What You\'re Missing', heading:'It goes deeper than you think.', text: tc.whatsMissing+' And here\'s the harder truth: you\'ve probably tried to fix pieces of this before. Maybe a new hire, a restructure, a consultant. It didn\'t stick — not because the fix was wrong, but because it was treating a symptom of a pattern you couldn\'t fully see.' },
        { label:'What It\'s Costing You', heading:'The real number.', text: tc.cost }
      ],
      actionsTitle: 'Start here — even before we talk.',
      actionsSub: 'These won\'t solve the systemic issue. But they\'ll give you data and clarity that makes the next conversation more productive.',
      actions: tc.actions,
      offer: {
        headline: 'You Need the Complete Picture',
        bridge: 'At this stage, partial fixes create new problems. The Full Diagnostic maps every layer — business architecture, leadership capacity, and human dynamics — and gives you a time-phased roadmap so you know what to fix first and what to leave alone.',
        price: '$15,000',
        desc: 'A 2-3 week deep dive. Complete visibility. Phased intervention roadmap.',
        items: ['Complete blind spot report across all three layers','Intervention roadmap with phased implementation plan','Success metrics and risk mitigation strategy','Post-diagnostic consultation on next steps'],
        cta: 'Book a 15-Minute Scoping Call →',
        alt: null
      }
    };
  }

  // transformation
  return {
    eyebrow: 'Your Results — Transformation',
    headline: 'You Don\'t Need Another Report.<br><em>You Need a Partner.</em>',
    subhead: 'Your answers tell me this has been building for a long time. You\'ve tried things. They haven\'t stuck. That\'s not because you\'re doing it wrong — it\'s because the pattern is bigger than any single fix.',
    greeting: name+', I want you to hear something first: this isn\'t your fault.',
    sections: [
      { label:'What I See', heading:'Systemic invisibility across multiple dimensions.', text: q2Narrative+' You\'re not dealing with one blind spot. You\'re carrying the accumulated weight of patterns that have been building since your '+ind.org+' was a fraction of its current size. '+tc.mirror },
      { label:'Why Fixes Haven\'t Stuck', heading:'It\'s not the fixes. It\'s the sequence.', text:'You\'ve tried things — reorganizing, coaching, new hires, new tools. Some of them were probably the right moves. But without seeing the full system, you were treating symptoms out of order. The pattern underneath kept reasserting itself.' },
      { label:'What Needs to Happen', heading:'Diagnosis, roadmap, and someone in the room with you.', text:'You need someone who can see the whole picture — the business architecture, the leadership dynamics, and the human patterns underneath — and work alongside you to change them. Not a report. A partnership.' }
    ],
    actionsTitle: 'Even now — there are moves you can make.',
    actionsSub: 'These won\'t replace the deeper work. But they\'ll start building the muscle of seeing the system differently.',
    actions: tc.actions,
    offer: {
      headline: 'Full Transformation',
      bridge: 'This starts with the complete diagnostic — every layer mapped — then transitions into implementation partnership. I don\'t hand you a report and wish you luck. I work alongside you until the pattern shifts.',
      price: 'Starting at $30,000',
      desc: 'Scope-dependent. Custom engagement designed around your specific situation.',
      items: ['Complete diagnostic across all three layers','Custom intervention design','Implementation partnership — advisory, project-based, or hybrid','Ongoing strategic support until the pattern shifts'],
      cta: 'Book a 15-Minute Consultation →',
      alt: null
    }
  };
}
