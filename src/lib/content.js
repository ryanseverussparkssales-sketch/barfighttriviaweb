// ─────────────────────────────────────────────────────────────
//  BAR FIGHT TRIVIA — all site copy and data lives here.
//  Edit this file to update venues, nights, champs, contact.
//  Anything marked  // TODO  is a placeholder to replace with real info.
// ─────────────────────────────────────────────────────────────

export const site = {
	name: 'Bar Fight Trivia',
	city: 'Nashville',
	tagline: 'Pub trivia with the gloves off.',
	pitch:
		'Six rounds. One mic. Every team in the bar swinging for the belt. Free to play, bragging rights guaranteed, bar tabs on the line.',
	email: 'bookings@barfighttrivia.com', // TODO real inbox
	phone: '', // TODO optional, e.g. '(615) 555-0100'
	instagram: 'https://instagram.com/barfighttrivia', // TODO confirm handle
	facebook: '', // TODO optional
	url: 'https://barfighttrivia.com' // TODO real domain
};

// The weekly fight card. Day order controls display order.
export const schedule = [
	{
		day: 'Tue',
		time: '7:00 PM',
		venue: 'Venue Name', // TODO
		neighborhood: 'East Nashville', // TODO
		address: '123 Example St, Nashville, TN', // TODO
		host: 'Host Name' // TODO
	},
	{
		day: 'Wed',
		time: '7:30 PM',
		venue: 'Venue Name', // TODO
		neighborhood: 'The Nations', // TODO
		address: '456 Example Ave, Nashville, TN', // TODO
		host: 'Host Name' // TODO
	},
	{
		day: 'Thu',
		time: '8:00 PM',
		venue: 'Venue Name', // TODO
		neighborhood: 'Germantown', // TODO
		address: '789 Example Blvd, Nashville, TN', // TODO
		host: 'Host Name' // TODO
	}
];

// How a night runs. Keep to ~6 for the grid.
export const rounds = [
	{ n: '01', name: 'The Weigh-In', body: 'General knowledge warm-up. Ten questions to see who showed up hungry.' },
	{ n: '02', name: 'Picture Round', body: 'Faces, logos, album covers. Pass the sheet, squint hard.' },
	{ n: '03', name: 'Music City', body: 'We play it, you name it. Nashville teams get no mercy here.' },
	{ n: '04', name: 'Wager Round', body: 'Bet your points on what you know. Big swings, bigger collapses.' },
	{ n: '05', name: 'Lightning', body: 'Rapid fire. No phones, no lifelines, no excuses.' },
	{ n: '06', name: 'The Final Bell', body: 'One question. Wager it all. Belt goes home with the last team standing.' }
];

// House rules ("the rules of engagement").
export const rules = [
	'Teams of up to 6. Show up solo and we’ll find you a corner.',
	'Free to play. Always.',
	'Phones down during rounds. Get caught, get disqualified.',
	'Host’s call is final. Heckling is encouraged. Throwing hands is not.',
	'Top teams take home bar tabs and the title.' // TODO confirm prizes
];

// Current titleholders — swap out weekly or remove the section.
export const champs = [
	{ team: 'Team Name', venue: 'Venue Name', streak: 3 }, // TODO
	{ team: 'Team Name', venue: 'Venue Name', streak: 2 }, // TODO
	{ team: 'Team Name', venue: 'Venue Name', streak: 1 } // TODO
];

export const faqs = [
	{ q: 'Does it cost anything?', a: 'No. Trivia is free. Just order something from the bar and tip your bartender.' },
	{ q: 'How big can a team be?', a: 'Up to six. Bigger crews can split into rival teams, which is honestly more fun.' },
	{ q: 'Do I need to reserve a table?', a: 'Not usually, but busy nights fill up. Get there 20 minutes early to claim a spot.' },
	{ q: 'Can you run trivia at my bar or event?', a: 'Yes. We run weekly nights for venues plus private events, corporate parties, and fundraisers. Hit the booking form.' }
];
