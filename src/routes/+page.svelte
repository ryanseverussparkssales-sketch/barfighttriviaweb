<script>
	import { onMount } from 'svelte';
	import { site, schedule, rounds, rules, champs, faqs } from '#lib/content.js';

	const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const FULL = { Sun: 'Sunday', Mon: 'Monday', Tue: 'Tuesday', Wed: 'Wednesday', Thu: 'Thursday', Fri: 'Friday', Sat: 'Saturday' };

	// Which night is next, computed in the browser (prerendered HTML shows the first night).
	let today = $state(null);
	let menuOpen = $state(false);

	onMount(() => {
		today = DAYS[new Date().getDay()];
	});

	let next = $derived.by(() => {
		if (!today) return schedule[0];
		const t = DAYS.indexOf(today);
		return [...schedule].sort(
			(a, b) => ((DAYS.indexOf(a.day) - t + 7) % 7) - ((DAYS.indexOf(b.day) - t + 7) % 7)
		)[0];
	});
	let nextLabel = $derived(today && next?.day === today ? 'Tonight' : `Next up · ${FULL[next?.day] ?? ''}`);

	const ticker = ['Free to play', 'Teams of up to 6', 'Phones down', 'Belt on the line', 'Heckling encouraged', 'Bar tabs to the winners'];

	// Booking form → opens the visitor's email app with everything filled in. No backend needed.
	let form = $state({ name: '', email: '', kind: 'Weekly trivia at my bar', venue: '', date: '', size: '', notes: '' });
	let sent = $state(false);

	function submit(e) {
		e.preventDefault();
		const subject = `Booking request: ${form.kind}${form.venue ? ` · ${form.venue}` : ''}`;
		const body = [
			`Name: ${form.name}`,
			`Email: ${form.email}`,
			`Looking for: ${form.kind}`,
			`Venue / event: ${form.venue}`,
			`Date(s): ${form.date}`,
			`Headcount: ${form.size}`,
			'',
			form.notes
		].join('\n');
		window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
		sent = true;
	}

	const nav = [
		['#card', 'Fight card'],
		['#rounds', 'How it works'],
		['#champs', 'Champs'],
		['#faq', 'FAQ']
	];
</script>

<svelte:head>
	<title>{site.name} · {site.city} pub trivia</title>
	<meta name="description" content="{site.name}: free weekly pub trivia across {site.city}. {site.pitch}" />
	<meta property="og:title" content="{site.name} · {site.city}" />
	<meta property="og:description" content={site.tagline} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={site.url} />
</svelte:head>

<a class="skip sr-only" href="#main">Skip to content</a>

<!-- ───────── NAV ───────── -->
<header class="nav">
	<div class="wrap nav-in">
		<a href="#top" class="mark" aria-label="{site.name} home">
			<span class="mark-bf">BF</span>
			<span class="mark-name">Bar Fight<br />Trivia</span>
		</a>
		<nav class:open={menuOpen} aria-label="Main">
			{#each nav as [href, label]}
				<a {href} onclick={() => (menuOpen = false)}>{label}</a>
			{/each}
			<a href="#book" class="btn primary nav-cta" onclick={() => (menuOpen = false)}>Book us</a>
		</nav>
		<button class="burger" aria-expanded={menuOpen} aria-label="Menu" onclick={() => (menuOpen = !menuOpen)}>
			<span></span><span></span><span></span>
		</button>
	</div>
</header>

<main id="main">
	<!-- ───────── HERO / POSTER ───────── -->
	<section class="hero" id="top">
		<div class="spot" aria-hidden="true"></div>
		<div class="wrap hero-in">
			<p class="eyebrow">{site.city}, Tennessee · Weekly pub trivia</p>
			<h1 class="poster">
				<span class="l1">Bar</span>
				<span class="l2">Fight</span>
				<span class="l3">Trivia</span>
			</h1>
			<p class="tag">{site.tagline}</p>
			<p class="pitch">{site.pitch}</p>
			<div class="ctas">
				<a href="#card" class="btn primary">Find a fight</a>
				<a href="#book" class="btn">Bring it to your bar</a>
			</div>

			{#if next}
				<a class="bout" href="#card">
					<span class="bout-k">{nextLabel}</span>
					<span class="bout-v">{next.venue}</span>
					<span class="bout-s">{next.time} · {next.neighborhood}</span>
				</a>
			{/if}
		</div>

		<div class="ticker" aria-hidden="true">
			<div class="ticker-track">
				{#each [0, 1] as _}
					{#each ticker as t}
						<span>{t}</span><i>★</i>
					{/each}
				{/each}
			</div>
		</div>
	</section>

	<!-- ───────── FIGHT CARD (schedule) ───────── -->
	<section class="section card" id="card">
		<div class="wrap">
			<p class="eyebrow">The weekly fight card</p>
			<div class="head-row">
				<h2>Pick your<br /><em>corner.</em></h2>
				<p class="lede">Every week, every venue, same rules. Free to play, show up 20 minutes early to claim a table.</p>
			</div>

			<ol class="stubs">
				{#each schedule as s}
					{@const live = today === s.day}
					<li class="stub" class:live>
						<div class="stub-day">
							<span class="d">{s.day}</span>
							<span class="t">{s.time}</span>
						</div>
						<div class="stub-body">
							{#if live}<span class="live-tag">Tonight</span>{/if}
							<h3>{s.venue}</h3>
							<p class="hood">{s.neighborhood}</p>
							<p class="addr">
								<a href="https://maps.google.com/?q={encodeURIComponent(`${s.venue} ${s.address}`)}" target="_blank" rel="noopener">{s.address}</a>
							</p>
							<p class="host"><span>Ref</span> {s.host}</p>
						</div>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<!-- ───────── ROUNDS ───────── -->
	<section class="section rounds" id="rounds">
		<div class="wrap">
			<p class="eyebrow">How a night goes down</p>
			<div class="head-row">
				<h2>Six rounds.<br /><em>No mercy.</em></h2>
				<p class="lede">About two hours start to finish. Scores read out between rounds so you always know who to trash-talk.</p>
			</div>
			<ol class="round-grid">
				{#each rounds as r}
					<li>
						<span class="rd">Rd {r.n}</span>
						<h3>{r.name}</h3>
						<p>{r.body}</p>
					</li>
				{/each}
			</ol>
		</div>
	</section>

	<!-- ───────── RULES + CHAMPS ───────── -->
	<section class="section split" id="champs">
		<div class="wrap split-in">
			<div class="rules">
				<p class="eyebrow">Rules of engagement</p>
				<h2>Fight<br /><em>fair.</em></h2>
				<ol>
					{#each rules as r, i}
						<li><span>{String(i + 1).padStart(2, '0')}</span>{r}</li>
					{/each}
				</ol>
			</div>

			<div class="belt">
				<p class="eyebrow">Current belt holders</p>
				<div class="belt-plate">
					<div class="belt-strap" aria-hidden="true"></div>
					<ul>
						{#each champs as c, i}
							<li class:top={i === 0}>
								<span class="rank">{i === 0 ? 'Champ' : `#${i + 1}`}</span>
								<span class="team">{c.team}</span>
								<span class="meta">{c.venue} · {c.streak}-week streak</span>
							</li>
						{/each}
					</ul>
				</div>
				<p class="fine">Updated weekly. Think you can take the belt? Prove it.</p>
			</div>
		</div>
	</section>

	<!-- ───────── FAQ ───────── -->
	<section class="section faq" id="faq">
		<div class="wrap faq-in">
			<div>
				<p class="eyebrow">Questions from the crowd</p>
				<h2>Before<br /><em>the bell.</em></h2>
			</div>
			<div class="qs">
				{#each faqs as f}
					<details>
						<summary>{f.q}</summary>
						<p>{f.a}</p>
					</details>
				{/each}
			</div>
		</div>
	</section>

	<!-- ───────── BOOK ───────── -->
	<section class="section book" id="book">
		<div class="wrap book-in">
			<div class="book-copy">
				<p class="eyebrow">Book a fight</p>
				<h2>Bring the<br /><em>brawl</em> to<br />your bar.</h2>
				<p class="lede">
					Slow weeknight? We pack the room. Weekly residencies for bars and breweries, plus private rounds for
					birthdays, office parties and fundraisers.
				</p>
				<ul class="perks">
					<li>Host, questions, scoring and sound handled</li>
					<li>Promo graphics for your socials</li>
					<li>Custom rounds for private events</li>
				</ul>
				<p class="direct">Or email straight up: <a href="mailto:{site.email}">{site.email}</a></p>
			</div>

			<form class="book-form" onsubmit={submit}>
				<label>
					<span>Your name</span>
					<input required autocomplete="name" bind:value={form.name} />
				</label>
				<label>
					<span>Email</span>
					<input required type="email" autocomplete="email" bind:value={form.email} />
				</label>
				<label class="full">
					<span>What are you after?</span>
					<select bind:value={form.kind}>
						<option>Weekly trivia at my bar</option>
						<option>Private party</option>
						<option>Corporate / team event</option>
						<option>Fundraiser</option>
						<option>Something else</option>
					</select>
				</label>
				<label>
					<span>Venue or event</span>
					<input bind:value={form.venue} />
				</label>
				<label>
					<span>Date(s)</span>
					<input bind:value={form.date} placeholder="e.g. Fridays, or Nov 14" />
				</label>
				<label class="full">
					<span>Expected headcount</span>
					<input inputmode="numeric" bind:value={form.size} />
				</label>
				<label class="full">
					<span>Anything else</span>
					<textarea rows="4" bind:value={form.notes}></textarea>
				</label>
				<button class="btn primary full" type="submit">Send it</button>
				{#if sent}
					<p class="sent full" role="status">Your email app should be open with everything filled in. Hit send and we’ll get back to you.</p>
				{/if}
			</form>
		</div>
	</section>
</main>

<!-- ───────── FOOTER ───────── -->
<footer class="foot">
	<div class="wrap foot-in">
		<div class="foot-mark">Bar Fight<br />Trivia</div>
		<div class="foot-links">
			<a href="mailto:{site.email}">{site.email}</a>
			{#if site.phone}<a href="tel:{site.phone.replace(/[^\d+]/g, '')}">{site.phone}</a>{/if}
			{#if site.instagram}<a href={site.instagram} target="_blank" rel="noopener">Instagram</a>{/if}
			{#if site.facebook}<a href={site.facebook} target="_blank" rel="noopener">Facebook</a>{/if}
		</div>
		<p class="foot-fine">© {new Date().getFullYear()} {site.name} · {site.city}, TN · Please drink responsibly. No actual fighting.</p>
	</div>
</footer>

<style>
	em { font-style: normal; color: var(--blood); }

	/* ── nav ── */
	.nav {
		position: sticky; top: 0; z-index: 50;
		background: rgba(18, 17, 16, 0.88);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--line);
	}
	.nav-in { display: flex; align-items: center; justify-content: space-between; height: 70px; }
	.mark { display: flex; align-items: center; gap: 12px; text-decoration: none; }
	.mark-bf {
		font-family: var(--display); font-size: 22px; width: 44px; height: 44px;
		display: grid; place-items: center; background: var(--blood); color: #fff;
		transform: rotate(-4deg);
	}
	.mark-name { font-family: var(--label); font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; font-size: 14px; line-height: 1.05; }
	nav { display: flex; align-items: center; gap: 28px; }
	nav a:not(.btn) {
		font-family: var(--label); font-weight: 600; text-transform: uppercase; letter-spacing: 0.14em;
		font-size: 15px; text-decoration: none; color: var(--bone-dim); transition: color 0.15s;
	}
	nav a:not(.btn):hover { color: var(--bone); }
	.nav-cta { min-height: 42px; font-size: 15px; padding: 0 18px; }
	.burger { display: none; background: none; border: 0; padding: 10px; cursor: pointer; }
	.burger span { display: block; width: 24px; height: 2px; background: var(--bone); margin: 5px 0; }

	@media (max-width: 820px) {
		.burger { display: block; }
		nav {
			position: fixed; inset: 70px 0 auto 0; flex-direction: column; align-items: stretch; gap: 0;
			background: var(--ink); border-bottom: 1px solid var(--line); padding: 8px var(--pad) 24px;
			transform: translateY(-120%); transition: transform 0.25s; z-index: -1;
		}
		nav.open { transform: none; }
		nav a:not(.btn) { padding: 16px 0; border-bottom: 1px solid var(--line); font-size: 18px; }
		.nav-cta { margin-top: 18px; min-height: 52px; }
	}

	/* ── hero ── */
	.hero { min-height: calc(100svh - 70px); display: flex; flex-direction: column; overflow: hidden; }
	.hero-in { flex: 1; display: flex; flex-direction: column; justify-content: center; padding-top: 48px; padding-bottom: 56px; position: relative; z-index: 2; width: 100%; }
	.spot {
		position: absolute; right: -18vw; top: -10vh; width: 80vw; height: 80vw; max-width: 1000px; max-height: 1000px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(232, 197, 71, 0.18) 1.4px, transparent 1.6px) 0 0 / 12px 12px;
		mask-image: radial-gradient(circle, #000 20%, transparent 68%);
	}
	.poster { display: flex; flex-direction: column; margin: 6px 0 22px; }
	.poster span { display: block; }
	.l1 { font-size: clamp(64px, 13vw, 168px); color: var(--bone); }
	.l2 {
		font-size: clamp(110px, 25vw, 330px); color: var(--gold); line-height: 0.82;
		text-shadow: 6px 6px 0 var(--ink), 9px 9px 0 var(--blood);
		margin-left: -0.04em;
	}
	.l3 {
		position: relative; align-self: flex-start;
		font-size: clamp(52px, 10.5vw, 136px);
		-webkit-text-stroke: 2px var(--bone); color: transparent; margin-top: 10px;
	}
	/* red slash band running edge to edge behind TRIVIA */
	.l3::before {
		content: ''; position: absolute; z-index: -1; left: -100vw; right: -100vw; top: 8%; bottom: 2%;
		background: var(--blood); transform: rotate(-3deg);
		box-shadow: 0 0 0 5px var(--ink), 0 0 0 8px var(--gold);
	}
	.poster { isolation: isolate; }
	.tag { font-family: var(--label); font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; font-size: clamp(22px, 3vw, 30px); margin: 0 0 10px; }
	.pitch { max-width: 520px; color: var(--bone-dim); margin: 0 0 28px; }
	.ctas { display: flex; flex-wrap: wrap; gap: 14px; }

	.bout {
		position: absolute; right: var(--pad); bottom: 64px; z-index: 3;
		display: flex; flex-direction: column; gap: 2px; text-decoration: none;
		background: var(--bone); color: var(--ink); padding: 18px 22px 16px;
		transform: rotate(3deg); box-shadow: 8px 8px 0 var(--ink-3); min-width: 230px;
		border: 2px dashed var(--ink);
		transition: transform 0.2s;
	}
	.bout:hover { transform: rotate(0deg) translateY(-4px); }
	.bout-k { font-family: var(--label); font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; font-size: 13px; color: var(--blood-deep); }
	.bout-v { font-family: var(--display); font-size: 30px; text-transform: uppercase; line-height: 1.05; }
	.bout-s { font-family: var(--label); font-weight: 600; font-size: 16px; letter-spacing: 0.06em; text-transform: uppercase; }

	@media (max-width: 900px) {
		.bout { position: static; align-self: flex-start; margin-top: 36px; transform: rotate(-2deg); }
	}

	.ticker { position: relative; z-index: 2; background: var(--gold); color: var(--ink); overflow: hidden; border-top: 3px solid var(--ink); }
	.ticker-track { display: flex; width: max-content; animation: tick 34s linear infinite; padding: 12px 0; }
	.ticker span, .ticker i { font-family: var(--display); font-size: 22px; text-transform: uppercase; padding: 0 18px; font-style: normal; white-space: nowrap; }
	.ticker i { color: var(--blood); }
	@keyframes tick { to { transform: translateX(-50%); } }

	/* ── shared section heads ── */
	.head-row { display: grid; grid-template-columns: 1.1fr 1fr; gap: 32px; align-items: end; margin-bottom: 52px; }
	h2 { font-size: clamp(54px, 8.5vw, 104px); }
	.lede { color: var(--bone-dim); max-width: 440px; margin: 0; font-size: 18px; }
	@media (max-width: 820px) { .head-row { grid-template-columns: 1fr; gap: 18px; margin-bottom: 36px; } }

	/* ── fight card ── */
	.card { background: var(--ink-2); }
	.stubs { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 22px; }
	.stub {
		display: grid; grid-template-columns: 104px 1fr; background: var(--bone); color: var(--ink);
		position: relative; transition: transform 0.2s;
	}
	.stub:hover { transform: translateY(-4px) rotate(-0.6deg); }
	.stub-day {
		background: var(--ink-3); color: var(--bone); display: flex; flex-direction: column; align-items: center; justify-content: center;
		border-right: 3px dashed var(--ink-2); padding: 18px 8px;
	}
	.stub.live .stub-day { background: var(--blood); }
	.d { font-family: var(--display); font-size: 46px; text-transform: uppercase; line-height: 1; }
	.t { font-family: var(--label); font-weight: 700; letter-spacing: 0.08em; font-size: 16px; margin-top: 4px; }
	.stub-body { padding: 22px 22px 20px; }
	.stub h3 { font-size: 32px; margin-bottom: 4px; }
	.hood { font-family: var(--label); font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; font-size: 14px; color: var(--blood-deep); margin: 0 0 12px; }
	.addr { margin: 0 0 10px; font-size: 15px; }
	.addr a { text-decoration-color: rgba(18, 17, 16, 0.3); text-underline-offset: 3px; }
	.host { margin: 0; font-size: 15px; font-weight: 600; }
	.host span { font-family: var(--label); text-transform: uppercase; letter-spacing: 0.16em; font-size: 12px; background: var(--ink); color: var(--bone); padding: 2px 7px; margin-right: 6px; }
	.live-tag {
		position: absolute; top: -12px; right: 16px; background: var(--gold); color: var(--ink);
		font-family: var(--label); font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; font-size: 13px; padding: 4px 10px;
		transform: rotate(3deg);
	}
	@media (max-width: 420px) { .stub { grid-template-columns: 84px 1fr; } .d { font-size: 38px; } }

	/* ── rounds ── */
	.round-grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--line); border-left: 1px solid var(--line); }
	.round-grid li { padding: 30px 28px 32px; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); position: relative; transition: background 0.2s; }
	.round-grid li:hover { background: var(--ink-2); }
	.round-grid li:last-child { background: var(--blood); }
	.round-grid li:last-child .rd { color: var(--gold); }
	.round-grid li:last-child p { color: rgba(255, 255, 255, 0.85); }
	.rd { font-family: var(--label); font-weight: 700; letter-spacing: 0.24em; text-transform: uppercase; font-size: 14px; color: var(--blood); }
	.round-grid h3 { font-size: 34px; margin: 10px 0 10px; }
	.round-grid p { margin: 0; color: var(--bone-dim); }
	@media (max-width: 900px) { .round-grid { grid-template-columns: 1fr 1fr; } }
	@media (max-width: 560px) { .round-grid { grid-template-columns: 1fr; } }

	/* ── rules + champs ── */
	.split { background: var(--ink-2); }
	.split-in { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(40px, 7vw, 96px); }
	.rules ol { list-style: none; padding: 0; margin: 36px 0 0; }
	.rules li { display: flex; gap: 18px; padding: 16px 0; border-bottom: 1px solid var(--line); font-size: 18px; }
	.rules li span { font-family: var(--display); color: var(--gold); font-size: 22px; line-height: 1.3; }
	.belt-plate { position: relative; margin-top: 10px; padding: 34px 26px 26px; background: linear-gradient(160deg, #3a2a10, #1d150a); border: 3px solid var(--gold); box-shadow: inset 0 0 0 6px #1d150a, inset 0 0 0 8px rgba(232, 197, 71, 0.5); }
	.belt-strap { position: absolute; left: -2px; right: -2px; top: 50%; height: 60%; transform: translateY(-50%); background: repeating-linear-gradient(90deg, rgba(232, 197, 71, 0.06) 0 2px, transparent 2px 14px); pointer-events: none; }
	.belt ul { list-style: none; margin: 0; padding: 0; position: relative; }
	.belt li { display: grid; grid-template-columns: 76px 1fr; column-gap: 14px; padding: 14px 0; border-bottom: 1px solid rgba(232, 197, 71, 0.25); }
	.belt li:last-child { border-bottom: 0; }
	.rank { grid-row: span 2; font-family: var(--label); font-weight: 700; text-transform: uppercase; letter-spacing: 0.14em; font-size: 14px; color: var(--gold); align-self: center; }
	.team { font-family: var(--display); font-size: 28px; text-transform: uppercase; line-height: 1.05; }
	.belt li.top .team { font-size: 40px; color: var(--gold); }
	.meta { font-size: 14px; color: var(--bone-dim); }
	.fine { color: var(--bone-dim); font-size: 15px; margin-top: 16px; }
	@media (max-width: 900px) { .split-in { grid-template-columns: 1fr; } }

	/* ── faq ── */
	.faq-in { display: grid; grid-template-columns: 1fr 1.3fr; gap: 48px; }
	.qs details { border-bottom: 1px solid var(--line); }
	.qs summary {
		list-style: none; cursor: pointer; padding: 22px 40px 22px 0; position: relative;
		font-family: var(--label); font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; font-size: 22px;
	}
	.qs summary::-webkit-details-marker { display: none; }
	.qs summary::after { content: '+'; position: absolute; right: 4px; top: 16px; font-family: var(--display); font-size: 30px; color: var(--blood); transition: transform 0.2s; }
	.qs details[open] summary::after { transform: rotate(45deg); }
	.qs p { margin: 0 0 22px; color: var(--bone-dim); max-width: 560px; }
	@media (max-width: 820px) { .faq-in { grid-template-columns: 1fr; gap: 24px; } }

	/* ── book ── */
	.book { background: var(--blood); color: #fff; overflow: hidden; }
	.book::before {
		content: ''; position: absolute; inset: 0; pointer-events: none;
		background: radial-gradient(circle, rgba(0, 0, 0, 0.16) 1.4px, transparent 1.6px) 0 0 / 11px 11px;
		mask-image: linear-gradient(115deg, transparent 30%, #000 90%);
	}
	.book .eyebrow { color: var(--ink); }
	.book .eyebrow::before { background: var(--gold); }
	.book em { color: var(--gold); }
	.book .lede { color: rgba(255, 255, 255, 0.86); margin-top: 22px; }
	.book-in { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(40px, 6vw, 80px); position: relative; }
	.perks { list-style: none; padding: 0; margin: 24px 0; }
	.perks li { padding: 8px 0 8px 28px; position: relative; font-weight: 500; }
	.perks li::before { content: '★'; position: absolute; left: 0; color: var(--gold); }
	.direct { font-size: 15px; }
	.direct a { color: #fff; font-weight: 600; }

	.book-form {
		background: var(--ink); color: var(--bone); padding: clamp(22px, 4vw, 36px);
		display: grid; grid-template-columns: 1fr 1fr; gap: 16px 16px; align-self: start;
		box-shadow: 10px 10px 0 var(--ink-3);
	}
	.book-form label { display: flex; flex-direction: column; gap: 6px; }
	.book-form .full { grid-column: 1 / -1; }
	.book-form label span { font-family: var(--label); font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; font-size: 13px; color: var(--bone-dim); }
	input, select, textarea {
		font: inherit; color: var(--bone); background: var(--ink-2); border: 1px solid var(--line);
		padding: 12px 14px; min-height: 48px; border-radius: 0; width: 100%;
	}
	select { appearance: none; background-image: linear-gradient(45deg, transparent 50%, var(--gold) 50%), linear-gradient(135deg, var(--gold) 50%, transparent 50%); background-position: calc(100% - 20px) 21px, calc(100% - 14px) 21px; background-size: 6px 6px; background-repeat: no-repeat; }
	input:focus, select:focus, textarea:focus { outline: none; border-color: var(--gold); }
	textarea { resize: vertical; }
	.sent { margin: 0; color: var(--gold); font-size: 15px; }
	@media (max-width: 900px) { .book-in { grid-template-columns: 1fr; } }
	@media (max-width: 480px) { .book-form { grid-template-columns: 1fr; } }

	/* ── footer ── */
	.foot { border-top: 1px solid var(--line); padding: 48px 0 40px; }
	.foot-in { display: grid; grid-template-columns: auto 1fr; gap: 20px 40px; align-items: center; }
	.foot-mark { font-family: var(--display); font-size: 40px; text-transform: uppercase; line-height: 0.9; color: var(--gold); }
	.foot-links { display: flex; flex-wrap: wrap; gap: 10px 28px; justify-content: flex-end; }
	.foot-links a { font-family: var(--label); font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; text-decoration: none; color: var(--bone-dim); }
	.foot-links a:hover { color: var(--bone); }
	.foot-fine { grid-column: 1 / -1; margin: 12px 0 0; color: var(--bone-dim); font-size: 14px; }
	@media (max-width: 640px) { .foot-in { grid-template-columns: 1fr; } .foot-links { justify-content: flex-start; } }

	.skip:focus { position: fixed; top: 10px; left: 10px; width: auto; height: auto; clip: auto; z-index: 100; background: var(--gold); color: var(--ink); padding: 10px 14px; }
</style>
