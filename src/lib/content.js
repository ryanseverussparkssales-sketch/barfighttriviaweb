// ─────────────────────────────────────────────────────────────
//  BAR FIGHT TRIVIA — all site copy and data lives here.
//  Edit this file to update venues, nights, rounds, rules, contact.
//  Anything marked  // TODO  is a placeholder to replace with real info.
// ─────────────────────────────────────────────────────────────

export const site = {
	name: 'Bar Fight Trivia',
	city: 'Nashville',
	tagline: 'Brains, beers & bragging rights.',
	pitch:
		'Weekly trivia at your favorite Nashville bars. Grab your crew, put your phones away, and swing for the belt.',
	email: 'Barfighttrivia@gmail.com',
	phone: '', // TODO optional, e.g. '(615) 555-0100'
	instagram: 'https://www.instagram.com/barfight_trivia/',
	facebook: '', // TODO optional
	url: 'https://www.barfighttrivia.com'
};

// The weekly fight card. Day order controls display order.
export const schedule = [
	{
		day: 'Thu', // TODO confirm night (the Mar 12 "tonight" post was a Thursday)
		time: '7:00 PM',
		venue: 'The Back Bar at Verna',
		neighborhood: 'East Nashville',
		address: 'Verna, East Nashville, TN', // TODO street address
		host: 'Host Name' // TODO
	}
	// Add more nights here as { day, time, venue, neighborhood, address, host }
];

// How a night runs: 9 rounds. The last one is highlighted on the page.
export const rounds = [
	{ n: '01', name: 'General Trivia', body: 'A little bit of everything to get the brains warmed up.' },
	{ n: '02', name: 'Superlatives', body: 'The most, the fastest, the slowest, the tallest, the shortest. You know, a superlative.' },
	{ n: '03', name: 'Line ’Em Up', body: 'Three nouns, you put them in order. Cities by population, lowest to highest: Nashville, Atlanta, New York.' },
	{ n: '04', name: 'Pop Culture', body: 'Movies, music, TV and whatever the internet is yelling about this week.' },
	{ n: '05', name: 'Celebrity Who Am I?', body: 'Three hints, each one easier than the last. Once you turn in an answer, no second guesses.' },
	{ n: '06', name: 'General Trivia', body: 'Back to a little bit of everything. Halfway home.' },
	{ n: '07', name: 'Three to One', body: 'Three prompts, one thing in common. Name the state by its cities: Nashville, Knoxville, Memphis.' },
	{ n: '08', name: 'Other Than This', body: 'Round seven flipped. We give you one example, you name three more. Other than Nashville, name three Tennessee cities.' },
	{ n: '09', name: 'Final Trivia', body: 'Hear the category, then bet up to half your points. Belt goes home with the last team standing.' }
];

// House rules ("the rules of engagement").
export const rules = [
	'Teams of up to 6. Show up solo and we’ll find you a corner.',
	'Free to play. Always.', // TODO confirm
	'Phones down during rounds. Get caught, get disqualified.',
	'Host’s call is final. Heckling is encouraged. Throwing hands is not.',
	'Prizes for the top teams. New ones announced at the mic.' // TODO confirm prizes
];


export const faqs = [
	{ q: 'Does it cost anything?', a: 'No. Trivia is free. Just order something from the bar and tip your bartender.' },
	{ q: 'How big can a team be?', a: 'Up to six. Bigger crews can split into rival teams, which is honestly more fun.' },
	{ q: 'Do I need to reserve a table?', a: 'Not usually, but busy nights fill up. Get there 20 minutes early to claim a spot.' },
	{ q: 'Can you run trivia at my bar or event?', a: 'Yes. We run weekly nights for venues plus private events, corporate parties, and fundraisers. Hit the booking form.' }
];
