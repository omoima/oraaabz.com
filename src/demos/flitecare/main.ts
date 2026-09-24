import './style.css';

/**
 * Concept redesign for Flitecare Air Charters & Training.
 * Unlinked from the portfolio; notes live in demo-showcase.md at the repo root.
 */
const flitecare = {
  name: 'Flitecare',
  ato: 'SACAA/1100/ATO',
  office: { label: '+27 12 543 1415', tel: '+27125431415' },
  ops: { label: '+27 71 556 0480', tel: '+27715560480' },
  fax: '+27 86 276 4281',
  email: 'info@flitecare.co.za',
  hangar: ['Hangar 38', 'Wonderboom National Airport', 'Pretoria, South Africa'],
  postal: ['PO Box 11015', 'Hatfield', '0028'],
  maps: 'https://www.google.com/maps/search/?api=1&query=Wonderboom+National+Airport+Pretoria',
  instagram: 'https://www.instagram.com/flitecare/',
  facebook: 'https://www.facebook.com/flitecare/',
} as const;

const pathway = [
  {
    code: 'PPL',
    title: 'Private Pilot Licence',
    body: 'Your first licence. Ground school, circuits, your first solo and cross-country navigation. SACAA sets a minimum of 45 flight hours.',
  },
  {
    code: 'NIGHT',
    title: 'Night rating',
    body: 'Fly after sunset with confidence, and keep your options open when the Highveld days get short.',
  },
  {
    code: 'IR',
    title: 'Instrument rating',
    body: 'Fly by reference to the instruments, in cloud, on published approaches. Glass cockpits make the step up feel natural.',
  },
  {
    code: 'CPL',
    title: 'Commercial Pilot Licence',
    body: 'Get paid to fly. Build towards 200 hours, then pass the CPL theory exams and a skills test.',
  },
  {
    code: 'INSTR',
    title: 'Instructor rating',
    body: 'Teach the next generation, and build hours while you do it.',
  },
] as const;

const faqs = [
  {
    q: 'How old do I need to be?',
    a: 'You can start training young. SACAA allows a first solo from 16 and a PPL from 17. Adults of any age are welcome.',
  },
  {
    q: 'Do I need a medical?',
    a: 'Yes. A Class 2 aviation medical for the PPL, and a Class 1 if you plan to fly commercially. Get it done early, before you invest in lessons.',
  },
  {
    q: 'How long does a PPL take?',
    a: 'It depends mostly on how often you fly. Students who fly two or three times a week move fastest, because less is forgotten between lessons.',
  },
  {
    q: 'Is there an English requirement?',
    a: 'All pilots need an English Language Proficiency rating of level 4 or higher, which is tested before your licence is issued.',
  },
  {
    q: 'Can I try it before I commit?',
    a: 'That is what the discovery flight is for. You fly with an instructor, take the controls, and find out if flying is for you.',
  },
] as const;

type Choice = { value: string; label: string; hint?: string };
type Step = { id: 'goal' | 'experience' | 'timing'; question: string; choices: Choice[] };

const goalChoices: Choice[] = [
  { value: 'discovery', label: 'Try a discovery flight', hint: 'Take the controls with an instructor' },
  { value: 'ppl', label: 'Learn to fly for fun', hint: 'Private Pilot Licence' },
  { value: 'career', label: 'Become a professional pilot', hint: 'CPL pathway' },
  { value: 'rating', label: 'Add a rating', hint: 'Night, instrument or instructor' },
  { value: 'charter', label: 'Book a charter', hint: 'Fly from Wonderboom' },
];

const experienceChoices: Choice[] = [
  { value: 'none', label: 'I’ve never flown a plane' },
  { value: 'trial', label: 'I’ve had a trial flight' },
  { value: 'student', label: 'I’m a student pilot' },
  { value: 'licensed', label: 'I already hold a licence' },
];

const passengerChoices: Choice[] = [
  { value: '1', label: 'Just me' },
  { value: '2-3', label: '2 to 3 people' },
  { value: '4+', label: '4 or more people' },
  { value: 'unsure', label: 'Not sure yet' },
];

const timingChoices: Choice[] = [
  { value: 'now', label: 'This month' },
  { value: 'soon', label: 'In the next 3 months' },
  { value: 'later', label: 'Later this year' },
  { value: 'exploring', label: 'Just exploring' },
];

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (char) => `&#${char.charCodeAt(0)};`);

const planeSvg = `
  <svg class="plane" viewBox="0 0 480 200" aria-hidden="true" focusable="false">
    <path d="M26 42h30l40 48-44 4z" fill="#e9eff6" />
    <path d="M26 42h30l6 8H30z" fill="#f5a524" />
    <ellipse cx="74" cy="98" rx="38" ry="5" fill="#c9d6e6" />
    <path d="M40 92c80-8 210-12 290-8 50 3 86 12 102 24-16 12-52 20-102 21-80 2-210-8-290-27z" fill="#f7fafd" />
    <path d="M252 86c14-30 72-32 100 2z" fill="#8fb4d9" />
    <path d="M300 60v27" stroke="#f7fafd" stroke-width="3" />
    <path d="M120 106c90 4 190 4 300 2" stroke="#f5a524" stroke-width="4" stroke-linecap="round" fill="none" />
    <ellipse cx="270" cy="124" rx="128" ry="7" fill="#dbe5f0" />
    <path d="M292 128l6 24M408 118l4 30" stroke="#8a9bb0" stroke-width="4" stroke-linecap="round" />
    <circle cx="299" cy="156" r="8" fill="#12304f" />
    <circle cx="413" cy="152" r="7" fill="#12304f" />
    <path d="M432 102c12 1 20 5 20 6s-8 5-20 6z" fill="#f5a524" />
    <path d="M454 74v68" stroke="#dbe5f0" stroke-width="3" stroke-linecap="round" opacity=".6" />
  </svg>
`;

const renderChoices = (step: Step, selected: string | undefined): string => `
  <fieldset class="choices">
    <legend>${escapeHtml(step.question)}</legend>
    ${step.choices
      .map(
        (choice) => `
          <label class="choice">
            <input type="radio" name="${step.id}" value="${escapeHtml(choice.value)}" ${selected === choice.value ? 'checked' : ''} />
            <span class="choice-body">
              <span class="choice-label">${escapeHtml(choice.label)}</span>
              ${choice.hint ? `<span class="choice-hint">${escapeHtml(choice.hint)}</span>` : ''}
            </span>
          </label>
        `,
      )
      .join('')}
  </fieldset>
`;

const app = document.querySelector<HTMLDivElement>('#app');
if (!app) throw new Error('App root not found.');

app.innerHTML = `
  <div class="concept-bar" role="note">
    <span>Concept redesign by <a href="../../">Oarabile Moima</a>. This is not the official Flitecare website.</span>
  </div>

  <header class="site-header" data-header>
    <div class="wrap header-inner">
      <a class="brand" href="#top" aria-label="Flitecare home">
        <span class="brand-mark" aria-hidden="true"></span>
        <span class="brand-name">flitecare</span>
      </a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" data-menu-toggle>
        <span class="sr-only">Menu</span><span aria-hidden="true"></span>
      </button>
      <nav class="site-nav" id="site-nav" aria-label="Main">
        <a href="#training">Training</a>
        <a href="#fleet">Fleet</a>
        <a href="#charter">Charter</a>
        <a href="#faq">FAQ</a>
        <a href="#contact">Contact</a>
        <a class="btn btn-small" href="#plan">Book a flight</a>
      </nav>
    </div>
  </header>

  <main id="top">
    <section class="hero">
      <div class="wrap hero-grid">
        <div class="hero-copy">
          <p class="eyebrow">Flight training &amp; air charter · Pretoria</p>
          <h1>Learn to fly at&nbsp;Wonderboom.</h1>
          <p class="lede">From your first discovery flight to a commercial licence, trained on a modern fleet of glass-cockpit Sling&nbsp;2s at Hangar&nbsp;38.</p>
          <div class="hero-actions">
            <a class="btn" href="#plan">Book a discovery flight</a>
            <a class="btn btn-ghost" href="tel:${flitecare.ops.tel}">Call operations</a>
          </div>
          <ul class="trust" aria-label="Credentials">
            <li><strong>SACAA</strong> Approved Training Organisation<br /><span>${flitecare.ato}</span></li>
            <li><strong>4</strong> Sling&nbsp;2 trainers<br /><span>Garmin G3X glass cockpits</span></li>
            <li><strong>24/7</strong> operations desk<br /><span>${flitecare.ops.label}</span></li>
          </ul>
        </div>
        <div class="hero-visual" aria-hidden="true">
          <div class="sky">
            <span class="cloud c1"></span><span class="cloud c2"></span><span class="cloud c3"></span>
            ${planeSvg}
          </div>
          <div class="metar">
            <div><span>Airfield</span><strong>FAWB</strong></div>
            <div><span>Runway</span><strong>11/29</strong></div>
            <div><span>Elevation</span><strong>4095 ft</strong></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="training">
      <div class="wrap">
        <div class="section-head">
          <p class="eyebrow">Training</p>
          <h2>One airfield, your whole path to the right-hand seat.</h2>
          <p>Start with a single flight and keep going as far as you want. Every stage is taught at Wonderboom by the same team.</p>
        </div>
        <ol class="pathway">
          ${pathway
            .map(
              (stage, index) => `
                <li class="stage">
                  <span class="stage-num">${String(index + 1).padStart(2, '0')}</span>
                  <span class="stage-code">${stage.code}</span>
                  <h3>${stage.title}</h3>
                  <p>${stage.body}</p>
                </li>
              `,
            )
            .join('')}
        </ol>
        <p class="placeholder-note">Placeholder: the exact course list will be confirmed with Flitecare.</p>
      </div>
    </section>

    <section class="section section-dark" id="fleet">
      <div class="wrap fleet-grid">
        <div>
          <p class="eyebrow">Fleet</p>
          <h2>Train on the aircraft of today.</h2>
          <p>Flitecare’s training fleet is four new Sling&nbsp;2s. The Sling is a two-seat trainer built in South Africa, and its Garmin G3X glass cockpit is the kind of avionics you’ll meet later in your flying career.</p>
          <ul class="spec-list">
            <li><span>Aircraft</span><strong>Sling 2 ×4</strong></li>
            <li><span>Avionics</span><strong>Garmin G3X</strong></li>
            <li><span>Seats</span><strong>2, side by side</strong></li>
            <li><span>Built</span><strong>Johannesburg, SA</strong></li>
          </ul>
        </div>
        <figure class="fleet-card">
          ${planeSvg}
          <figcaption>Illustration. Real photography of the Flitecare fleet goes here.</figcaption>
        </figure>
      </div>
    </section>

    <section class="section" id="charter">
      <div class="wrap charter">
        <div>
          <p class="eyebrow">Air charter</p>
          <h2>Somewhere to be? Fly there.</h2>
          <p>Point-to-point charter from Wonderboom, arranged by an operations desk that answers at any hour. Tell them where, when and how many, and they’ll come back with a quote.</p>
        </div>
        <div class="charter-actions">
          <a class="btn" href="tel:${flitecare.ops.tel}">Call ops · ${flitecare.ops.label}</a>
          <a class="btn btn-ghost" href="#plan" data-goal-link="charter">Request a charter quote</a>
        </div>
      </div>
    </section>

    <section class="section section-tint" id="wonderboom">
      <div class="wrap airfield">
        <div>
          <p class="eyebrow">Why Wonderboom</p>
          <h2>A training airfield on Pretoria’s doorstep.</h2>
          <p>Wonderboom National Airport sits on the northern edge of Pretoria. It has two runways and a steady mix of traffic that teaches good radio work and airmanship from your first lesson.</p>
          <a class="text-link" href="${flitecare.maps}" target="_blank" rel="noopener">Directions to Wonderboom →</a>
        </div>
        <dl class="airfield-facts">
          <div><dt>ICAO</dt><dd>FAWB</dd></div>
          <div><dt>Find us</dt><dd>Hangar 38</dd></div>
          <div><dt>Runways</dt><dd>11/29 · 06/24</dd></div>
          <div><dt>City</dt><dd>Pretoria</dd></div>
        </dl>
      </div>
    </section>

    <section class="section" id="plan">
      <div class="wrap plan-grid">
        <div class="plan-intro">
          <p class="eyebrow">Plan your first flight</p>
          <h2>Four quick questions, then we’ll call you.</h2>
          <p>Tell us what you want from flying. The team replies with the right next step, whether that’s a discovery flight, a course or a charter quote.</p>
          <p class="plan-alt">Rather talk now? <a href="tel:${flitecare.office.tel}">${flitecare.office.label}</a></p>
        </div>
        <form class="planner" data-planner novalidate>
          <div class="planner-progress" aria-hidden="true"><span data-progress></span></div>
          <p class="planner-step" tabindex="-1" aria-live="polite" data-step-label></p>
          <div data-step-body></div>
          <p class="planner-error" role="alert" data-error></p>
          <div class="planner-nav">
            <button class="btn btn-ghost" type="button" data-back>Back</button>
            <button class="btn" type="submit" data-next>Next</button>
          </div>
        </form>
      </div>
    </section>

    <section class="section section-tint" id="faq">
      <div class="wrap faq-wrap">
        <div class="section-head">
          <p class="eyebrow">FAQ</p>
          <h2>Before your first lesson.</h2>
        </div>
        <div class="faq">
          ${faqs
            .map(
              (item) => `
                <details>
                  <summary>${item.q}</summary>
                  <p>${item.a}</p>
                </details>
              `,
            )
            .join('')}
        </div>
      </div>
    </section>
  </main>

  <footer class="site-footer" id="contact">
    <div class="wrap footer-grid">
      <div>
        <a class="brand" href="#top"><span class="brand-mark" aria-hidden="true"></span><span class="brand-name">flitecare</span></a>
        <p class="footer-tag">Air Charters &amp; Training<br />${flitecare.ato}</p>
      </div>
      <div>
        <h3>Call</h3>
        <p>Office hours<br /><a href="tel:${flitecare.office.tel}">${flitecare.office.label}</a></p>
        <p>Operations, all hours<br /><a href="tel:${flitecare.ops.tel}">${flitecare.ops.label}</a></p>
        <p>Fax ${flitecare.fax}</p>
      </div>
      <div>
        <h3>Write</h3>
        <p><a href="mailto:${flitecare.email}">${flitecare.email}</a></p>
        <p>${flitecare.postal.join('<br />')}</p>
      </div>
      <div>
        <h3>Visit</h3>
        <p><a href="${flitecare.maps}" target="_blank" rel="noopener">${flitecare.hangar.join('<br />')}</a></p>
        <p class="socials"><a href="${flitecare.instagram}" target="_blank" rel="noopener">Instagram</a> · <a href="${flitecare.facebook}" target="_blank" rel="noopener">Facebook</a></p>
      </div>
    </div>
    <div class="wrap footer-base">
      <span>© ${new Date().getFullYear()} Flitecare</span>
      <span>Concept by <a href="../../">Oarabile Moima</a></span>
    </div>
  </footer>
`;

/* Header: solid background after scrolling, collapsible menu on small screens. */
const header = document.querySelector<HTMLElement>('[data-header]');
const menuToggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const setMenu = (open: boolean): void => {
  header?.classList.toggle('menu-open', open);
  menuToggle?.setAttribute('aria-expanded', String(open));
};

menuToggle?.addEventListener('click', () => setMenu(!header?.classList.contains('menu-open')));
document.querySelectorAll('.site-nav a').forEach((link) => link.addEventListener('click', () => setMenu(false)));

const onScroll = (): void => {
  header?.classList.toggle('scrolled', window.scrollY > 8);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* Planner: a four-step enquiry. The demo shows the summary instead of sending it. */
const form = document.querySelector<HTMLFormElement>('[data-planner]');
const stepLabel = document.querySelector<HTMLElement>('[data-step-label]');
const stepBody = document.querySelector<HTMLElement>('[data-step-body]');
const errorText = document.querySelector<HTMLElement>('[data-error]');
const progress = document.querySelector<HTMLElement>('[data-progress]');
const backButton = document.querySelector<HTMLButtonElement>('[data-back]');
const nextButton = document.querySelector<HTMLButtonElement>('[data-next]');

const answers: Record<string, string> = {};
const details = { name: '', phone: '', email: '', notes: '' };
let stepIndex = 0;
const totalSteps = 4;

const choiceSteps = (): Step[] => [
  { id: 'goal', question: 'What would you like to do?', choices: goalChoices },
  answers.goal === 'charter'
    ? { id: 'experience', question: 'How many passengers?', choices: passengerChoices }
    : { id: 'experience', question: 'How much flying have you done?', choices: experienceChoices },
  { id: 'timing', question: 'When would you like to start?', choices: timingChoices },
];

const labelFor = (step: Step): string => step.choices.find((choice) => choice.value === answers[step.id])?.label ?? '';

const renderDetails = (): string => `
  <fieldset class="fields">
    <legend>How should Flitecare reach you?</legend>
    <label>Name<input name="name" autocomplete="name" value="${escapeHtml(details.name)}" required /></label>
    <label>Phone<input name="phone" type="tel" autocomplete="tel" value="${escapeHtml(details.phone)}" /></label>
    <label>Email<input name="email" type="email" autocomplete="email" value="${escapeHtml(details.email)}" /></label>
    <label>Anything else? <span class="optional">(optional)</span><textarea name="notes" rows="3">${escapeHtml(details.notes)}</textarea></label>
  </fieldset>
`;

const renderSummary = (): string => {
  const rows = choiceSteps()
    .map((step) => `<div><dt>${escapeHtml(step.question)}</dt><dd>${escapeHtml(labelFor(step))}</dd></div>`)
    .join('');
  const contact = [details.phone, details.email].filter(Boolean).map(escapeHtml).join(' · ');

  return `
    <div class="summary">
      <p class="summary-badge">Enquiry ready</p>
      <h3>Thanks, ${escapeHtml(details.name.split(' ')[0] ?? '')}.</h3>
      <dl>${rows}<div><dt>Contact</dt><dd>${contact}</dd></div></dl>
      <p class="demo-note">This is a demo, so nothing was sent. On the live site this enquiry would go straight to ${flitecare.email} and the team would call you back.</p>
      <button class="text-link" type="button" data-restart>Start again</button>
    </div>
  `;
};

const render = (moveFocus = true): void => {
  if (!form || !stepBody || !stepLabel || !progress || !backButton || !nextButton || !errorText) return;

  const done = stepIndex >= totalSteps;
  errorText.textContent = '';
  progress.style.width = `${(Math.min(stepIndex + 1, totalSteps) / totalSteps) * 100}%`;
  stepLabel.textContent = done ? 'All done' : `Step ${stepIndex + 1} of ${totalSteps}`;
  stepBody.innerHTML = done ? renderSummary() : stepIndex < 3 ? renderChoices(choiceSteps()[stepIndex], answers[choiceSteps()[stepIndex].id]) : renderDetails();
  backButton.hidden = stepIndex === 0 || done;
  nextButton.hidden = done;
  nextButton.textContent = stepIndex === totalSteps - 1 ? 'Send enquiry' : 'Next';
  form.classList.toggle('is-done', done);
  if (moveFocus) stepLabel.focus({ preventScroll: true });

  stepBody.querySelector<HTMLButtonElement>('[data-restart]')?.addEventListener('click', () => {
    Object.keys(answers).forEach((key) => delete answers[key]);
    Object.assign(details, { name: '', phone: '', email: '', notes: '' });
    stepIndex = 0;
    render();
  });
};

form?.addEventListener('change', (event) => {
  const input = event.target as HTMLInputElement;
  if (input.type !== 'radio') return;
  if (input.name === 'goal' && answers.goal !== input.value) delete answers.experience;
  answers[input.name] = input.value;
  if (errorText) errorText.textContent = '';
});

form?.addEventListener('input', (event) => {
  const field = event.target as HTMLInputElement | HTMLTextAreaElement;
  if (field.name in details) details[field.name as keyof typeof details] = field.value;
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!errorText) return;

  if (stepIndex < 3) {
    const step = choiceSteps()[stepIndex];
    if (!answers[step.id]) {
      errorText.textContent = 'Choose an option to continue.';
      return;
    }
  } else if (!details.name.trim()) {
    errorText.textContent = 'Please add your name.';
    return;
  } else if (!details.phone.trim() && !/^\S+@\S+\.\S+$/.test(details.email)) {
    errorText.textContent = 'Add a phone number or a valid email so the team can reach you.';
    return;
  }

  stepIndex += 1;
  render();
});

backButton?.addEventListener('click', () => {
  stepIndex = Math.max(0, stepIndex - 1);
  render();
});

/* Deep links like "Request a charter quote" pre-select the goal. */
document.querySelectorAll<HTMLAnchorElement>('[data-goal-link]').forEach((link) => {
  link.addEventListener('click', () => {
    const goal = link.dataset.goalLink ?? '';
    if (answers.goal !== goal) delete answers.experience;
    answers.goal = goal;
    stepIndex = 1;
    render();
  });
});

render(false);
