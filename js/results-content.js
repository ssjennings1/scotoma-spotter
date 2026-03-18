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
    'Construction & Trades':              { team:'crew',       workplace:'job sites',        leader:'superintendent',      work:'projects',     org:'operation' },
    'Manufacturing & Industrial':         { team:'floor team', workplace:'production floor',  leader:'shift lead',          work:'orders',       org:'plant' },
    'Transportation & Logistics':         { team:'team',       workplace:'the floor',         leader:'dispatcher',          work:'shipments',    org:'operation' },
    'Healthcare & Medical':               { team:'care team',  workplace:'the clinic',        leader:'office manager',      work:'patient load', org:'practice' },
    'Professional & Business Services':   { team:'team',       workplace:'the office',        leader:'senior associate',    work:'client work',  org:'firm' },
    'Retail, Hospitality & Service':      { team:'staff',      workplace:'the floor',         leader:'store manager',       work:'the day-to-day', org:'business' },
    'Other':                              { team:'team',       workplace:'the operation',     leader:'key manager',         work:'work',         org:'business' }
  };
  return map[industry] || map['Other'];
}

/* ── INDUSTRY-SPECIFIC BLIND SPOT COLOR ──
   1-2 sentences about how this type manifests in this industry.
   Keyed by industry, then by scotoma type.
*/
var industryColor = {
  'Construction & Trades': {
    optimizer: 'In the trades, this usually shows up as the owner still personally bidding every job, walking every site, and approving every change order — even with a superintendent who could handle 80% of it.',
    architectural: 'In construction, the architectural blind spot hides in the gap between your office and the field. Job costing says one thing, the crew is doing another, and nobody has a single version of the truth until something blows up.',
    relational: 'On crew-based job sites, relational fractures spread fast. One foreman with bad energy can poison a whole crew\'s output — and you won\'t hear about it because the guys just put their heads down and stop caring.',
    velocity: 'In the trades, velocity blind spots show up when you\'re booking more work than your crew capacity can absorb — and the first sign is usually callbacks, punch-list problems, or your best guys burning out.'
  },
  'Manufacturing & Industrial': {
    optimizer: 'On the production floor, the optimizer blind spot shows up when every schedule change, supplier issue, or quality call still routes through one person. The line doesn\'t stop because of equipment — it stops because of a decision bottleneck.',
    architectural: 'In manufacturing, the architectural blind spot lives in the handoff between shifts, between departments, and between the floor and the front office. Information that should flow automatically gets carried by one or two people who\'ve been there the longest.',
    relational: 'In a plant environment, relational blind spots hide behind high turnover that leadership writes off as "the labor market." It\'s usually not the market. It\'s the gap between the culture leadership believes they\'ve built and what people actually experience shift to shift.',
    velocity: 'In manufacturing, velocity blind spots emerge when you\'re adding capacity — new lines, new shifts, new products — faster than your quality systems and training processes can keep up. Scrap rates and rework are the early warning signs.'
  },
  'Transportation & Logistics': {
    optimizer: 'In logistics, the optimizer blind spot shows up when every exception — a delayed shipment, a driver issue, a routing change — still escalates to the owner instead of being handled at the dispatch level.',
    architectural: 'In transportation, the architectural blind spot lives between dispatch, the drivers, and the customers. Roles that made sense with 10 trucks don\'t scale to 50. Who owns the customer relationship? Who handles exceptions? The answer is usually "whoever picks up the phone first."',
    relational: 'In logistics, relational blind spots hide in the isolation of the work itself — drivers on the road, warehouse workers on the dock, dispatch in the office. When these groups stop communicating directly, problems get discovered at delivery instead of at origin.',
    velocity: 'In logistics, velocity blind spots show up when you\'re adding routes and capacity faster than your dispatch process can scale — and the first sign is usually missed deliveries, compliance gaps, or driver turnover that keeps climbing.'
  },
  'Healthcare & Medical': {
    optimizer: 'In healthcare, the optimizer blind spot shows up as the founding physician or practice owner still seeing every complex case, approving every hire, and handling every patient complaint personally — while the rest of the team waits for direction.',
    architectural: 'In a medical practice, the architectural blind spot lives in the gap between clinical operations and business operations. The providers focus on patient care, the admin side runs on informal processes, and nobody owns the space in between where the real friction builds.',
    relational: 'In healthcare, the relational blind spot often hides in the gap between what leadership calls "patient-centered culture" and what the care team actually experiences shift to shift. Burnout and turnover in clinical settings are almost always relational before they become operational.',
    velocity: 'In healthcare, velocity blind spots emerge when you\'re adding providers, locations, or service lines faster than your administrative infrastructure and clinical workflows can scale. Patient experience starts to wobble before the numbers do.'
  },
  'Professional & Business Services': {
    optimizer: 'In professional services, the optimizer blind spot shows up as the senior partner or founder who still touches every proposal, reviews every deliverable, and manages every key client relationship. The firm can\'t grow past one person\'s calendar.',
    architectural: 'In a professional services firm, the architectural blind spot hides in the transition from "everyone does everything" to specialized roles. Who owns business development vs. delivery vs. client management? Without clear lanes, your best people spend half their time on work that isn\'t their highest value.',
    relational: 'In professional services, relational blind spots live in the unspoken hierarchy between partners, associates, and support staff. The culture deck says "collaborative" — but the actual experience of junior team members often tells a different story.',
    velocity: 'In professional services, velocity blind spots emerge when you\'re saying yes to more client work than your bench can deliver at quality. Scope creep becomes the norm, margins compress, and your team starts making quiet trade-offs between clients.'
  },
  'Retail, Hospitality & Service': {
    optimizer: 'In retail and service businesses, the optimizer blind spot shows up as the owner who still opens and closes, handles every vendor call, and jumps behind the counter when it gets busy. Your best asset — your judgment — is being spent on tasks a trained manager could own.',
    architectural: 'In hospitality and service, the architectural blind spot hides in the gap between your location managers and headquarters. Standards exist on paper but execution varies wildly by location because the reporting structure, communication cadence, and accountability systems weren\'t built to scale.',
    relational: 'In customer-facing businesses, relational blind spots spread from the back of house to the front. If your staff doesn\'t feel respected and supported, your customers will feel the difference — even if they can\'t name it. Every service recovery problem has a team culture problem underneath it.',
    velocity: 'In retail and hospitality, velocity blind spots show up when you\'re adding locations, services, or menu items faster than your hiring, training, and operational playbook can absorb — and the customer experience becomes inconsistent before you realize it.'
  },
  'Other': {
    optimizer: 'This pattern shows up in every industry the same way: the leader who built the business becomes the bottleneck that caps it. The habits that made you successful at 10 people become the constraints that hold you back at 50.',
    architectural: 'Regardless of industry, the architectural blind spot lives in the gap between how your business actually runs and how you think it runs. The informal systems that worked when everyone sat in one room don\'t survive growth.',
    relational: 'In any organization, relational blind spots hide in plain sight. The energy shift, the conversations that got shorter, the meetings that feel different — those aren\'t random. They\'re symptoms of a trust gap that leadership is the last to see.',
    velocity: 'In any growing business, velocity blind spots emerge when the systems and people that got you here can\'t keep up with where you\'re going. The "fix it later" list grows faster than the "fixed" list, and the cracks compound quietly.'
  }
};

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
      /* ── THREE LENSES ── */
      opsView: 'Your decision queue has more items in it than you think. Last week, count how many things waited on you — not because they were hard, but because nobody had permission to move without you. That number is your capacity tax. Every one of those items cost your '+ind.org+' hours of waiting time, and your '+ind.leader+' hours of learned helplessness. Multiply that across a year and you\'re looking at the real cost of being the fastest person in the room.',
      deeperPattern: 'This isn\'t a delegation problem. If it were, you would have solved it by now — you solve everything. The pattern runs deeper: your identity is fused with being the person who handles things. Letting go doesn\'t just feel inefficient — it feels like abandoning the thing that made you successful. So you hold on, not because your '+ind.team+' can\'t handle it, but because the last time you let go of something, it didn\'t go well. And you made a quiet decision: <em>never again.</em> That decision is now running your entire '+ind.org+'.',
      honestTruth: 'You already know you\'re the bottleneck. You\'ve known for a while. You\'ve even told yourself you\'d start delegating more — after this project, after this quarter, after things settle down. But things never settle down when everything runs through one person. The question isn\'t whether you need to let go. It\'s whether you\'ll do it on your terms, or wait until your body, your family, or your best employee forces the issue.',
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
      /* ── THREE LENSES ── */
      opsView: 'Map how a single decision actually travels through your '+ind.org+' — from when someone first identifies a problem to when something changes. Count the handoffs, the meetings, the "let me check with..." conversations. In most '+ind.org+'s at your size, that number is 3-5x what it should be. Each unnecessary handoff adds a day of latency and a layer of interpretation. Your structure isn\'t failing because people aren\'t working hard. It\'s failing because the wiring was designed for a '+ind.org+' one-third your current size, and nobody ever redrew it.',
      deeperPattern: 'There\'s a reason you haven\'t restructured, even though you know you should. Rewriting the architecture means confronting the fact that some of the relationships, roles, and loyalties that built this '+ind.org+' no longer fit it. That person who\'s been with you since the beginning? Their role has outgrown them — or they\'ve outgrown their role — and naming that feels like betrayal. So the informal architecture persists, not because it works, but because changing it means having conversations you\'ve been avoiding.',
      honestTruth: 'You can feel people working around each other instead of with each other. You\'ve watched decisions take a week that should take an hour. And you\'ve probably reorganized parts of this before — new titles, new reporting lines — but the actual behavior didn\'t change. That\'s because the real structure of your '+ind.org+' isn\'t the org chart. It\'s the unwritten rules about who\'s allowed to decide, who gets heard, and whose territory can\'t be touched. Until you name those, every restructure is just rearranging furniture.',
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
      whatsMissing: 'Somewhere in your '+ind.org+', there\'s a trust gap you can\'t see from where you sit. It might be between peers. It might be between a '+ind.leader+' and their '+ind.team+'. It might be between what you say the culture is and what people actually experience on '+ind.workplace+'. The mismatch between the stated values and the lived reality is where engagement dies quietly.',
      cost: 'Your best people get quiet first. They don\'t complain — they disengage. By the time the relational fracture becomes visible to leadership, it\'s been spreading for months. And the usual fix — a team offsite, a survey, an "open door" announcement — bounces off because it doesn\'t address the actual rupture.',
      /* ── THREE LENSES ── */
      opsView: 'Relational fractures have a measurable cost, even when they feel intangible. Track your voluntary turnover over the last 18 months — not just who left, but who left that you didn\'t expect. Now estimate what each departure cost: recruiting, onboarding, lost productivity, the knowledge that walked out the door. In most '+ind.org+'s at this stage, the number is between 1.5x and 3x that person\'s salary. Then ask: how many of those departures were preceded by a period where the person got quieter, less engaged, less likely to push back? That silence was the signal. The resignation was the symptom.',
      deeperPattern: 'You\'re not missing the relational signal because you don\'t care. You\'re missing it because your role has structurally isolated you from it. The higher you go, the more filtered the information becomes. People perform "fine" for leadership. They save the real conversation for each other — or for their next employer. The harder truth is this: the relational fracture might trace back to something you did or didn\'t do. A promise that was heard differently than it was meant. A decision that made sense on paper but landed as a betrayal to someone who\'d been loyal. These aren\'t malicious — but they accumulate. And you can\'t repair what you won\'t name.',
      honestTruth: 'You feel it most in the moments that used to be easy. The hallway conversations that don\'t happen anymore. The meeting where someone used to challenge you and now they just nod. The person who used to stay late because they wanted to, not because they had to. Something broke and you can\'t find the seam. Maybe you\'re afraid that finding it means discovering it was something you did. Maybe it was. That doesn\'t make you a bad leader. It makes you a human one. But the longer you wait to look, the more it costs — and the people paying that cost are the ones who are still showing up.',
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
      /* ── THREE LENSES ── */
      opsView: 'Your '+ind.org+' is carrying operational debt in every system that was "good enough" at a smaller scale. Count the workarounds: the spreadsheet that should be a system, the person doing three jobs because the role was never split, the process that only works because one person remembers how. Each one is a load-bearing shortcut. At your current growth rate, you\'re adding weight to a foundation that wasn\'t engineered for it. The question isn\'t whether something will break — it\'s which thing breaks first, and whether it happens in front of a customer.',
      deeperPattern: 'Speed is intoxicating. When the numbers are climbing, it feels like validation — proof that you\'re doing something right. But speed also serves a psychological function: it lets you avoid looking at the things that are harder to fix. Slowing down to rebuild a process or restructure a role feels like stalling when you should be scaling. So you don\'t. You add another workaround, promote someone who isn\'t quite ready, say yes to work you\'re not sure you can deliver. Not because you don\'t know the risk — but because momentum feels safer than pausing. The velocity itself becomes the blind spot: you can\'t see what\'s breaking because you\'re moving too fast to look.',
      honestTruth: 'You have a list — maybe in your head, maybe on paper — of things you know are held together with duct tape. You know who on your '+ind.team+' is carrying too much. You know which system is going to fail next. You know that the pace you\'re running isn\'t sustainable, not for them and not for you. And you keep going, because slowing down feels like losing ground you fought hard to gain. But here\'s what you already know at 3AM: you\'re not actually choosing between speed and stability. You\'re choosing between fixing it now while it\'s manageable, or fixing it later when it\'s an emergency. And emergencies cost ten times more.',
      actions: [
        { title:'List the duct tape.', text:'Every '+ind.org+' has systems held together by one person\'s heroics or a workaround that was supposed to be temporary. List them. The ones that make you wince are the ones that matter most.', time:'30 minutes' },
        { title:'Find the load-bearing person.', text:'Who on your '+ind.team+' is the one holding the most together with the least support? That person is your biggest vulnerability and your biggest asset. If they left tomorrow, what breaks?', time:'Honest gut check' },
        { title:'Fix one thing before you grow more.', text:'Pick one item from your duct tape list — the one with the highest risk. Fix it properly. Not a patch. An actual solution. Stabilize before you accelerate.', time:'This week' }
      ],
    }
  };

  var tc = typeContent[type] || typeContent.architectural;

  // Get industry-specific color for this type
  var colorMap = industryColor[industry] || industryColor['Other'];
  var iColor = colorMap[type] || colorMap['optimizer'] || '';
  // Append industry color to the mirror text
  var mirrorFull = tc.mirror + (iColor ? ' '+iColor : '');

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
        { label:'The Blind Spot Risk', heading: tc.typeName, text: mirrorFull }
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

  /* ═══════════════════════════════════════════════
     INFLECTION + TIERS: THREE-LENS FORMAT
     Three perspectives on the same blind spot —
     the operations advisor, the psychologist,
     and the founder on an honest day.
     ═══════════════════════════════════════════════ */

  if(tier==='inflection'){
    return {
      eyebrow: 'Your Results — The Inflection Point',
      headline: 'You\'ve '+tc.heroEmphasis+'.<br><em>Now It\'s in the Way.</em>',
      subhead: 'The thing that got you here is creating the friction you\'re feeling. That\'s not failure — that\'s growth.',
      greeting: name+', I want to be straight with you. '+q2Narrative,
      sections: [
        { label: tc.typeName, heading:'The Pattern', text: mirrorFull },
        { label:'The Operations View', heading:'What it\'s costing you in hours and dollars.', text: tc.opsView },
        { label:'The Deeper Pattern', heading:'Why this persists — even when you know better.', text: tc.deeperPattern },
        { label:'The Honest Truth', heading:'What you already know.', text: tc.honestTruth }
      ],
      actionsTitle: 'Three moves you can make this week.',
      actionsSub: 'I designed these for leaders dealing with exactly the pattern your answers revealed. They won\'t solve everything — but they\'ll make the invisible thing visible.',
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
      greeting: name+', I\'m going to be direct with you. '+q2Narrative,
      sections: [
        { label: tc.typeName+' — Multi-Layered', heading:'The Pattern', text: mirrorFull },
        { label:'The Operations View', heading:'What an advisor would see in the first 48 hours.', text: tc.opsView+' And here\'s the harder reality: you\'ve probably tried to fix pieces of this before. A new hire, a restructure, a consultant. It didn\'t stick — not because the fix was wrong, but because it was treating a symptom of a pattern you couldn\'t fully see.' },
        { label:'The Deeper Pattern', heading:'Why the fixes haven\'t stuck.', text: tc.deeperPattern },
        { label:'The Honest Truth', heading:'What you know but haven\'t said out loud.', text: tc.honestTruth }
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
    greeting: name+', I want you to hear something first: this isn\'t your fault. '+q2Narrative+' You\'re not dealing with one blind spot. You\'re carrying the accumulated weight of patterns that have been building since your '+ind.org+' was a fraction of its current size.',
    sections: [
      { label: tc.typeName+' — Systemic', heading:'The Pattern', text: mirrorFull },
      { label:'The Operations View', heading:'What the numbers would tell a stranger.', text: tc.opsView },
      { label:'The Deeper Pattern', heading:'Why you — specifically you — couldn\'t see this.', text: tc.deeperPattern+' You\'ve tried things — reorganizing, coaching, new hires, new tools. Some of them were probably the right moves. But without seeing the full system, you were treating symptoms out of order. The pattern underneath kept reasserting itself.' },
      { label:'The Honest Truth', heading:'What you\'d say if no one was listening.', text: tc.honestTruth }
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
