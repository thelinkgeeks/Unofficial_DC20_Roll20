// STATS

// COMBAT MASTERY and HIT POINTS
// When the level is changed, set the combat mastery
// When the level or might is changed, set the hit points
on('change:might change:level', () => {
	getAttrs(['level', 'might'], (values) => {
		const level = +values.level || 0;
		const mastery = Math.ceil(level / 2);

		const might = +values.might || 0;
		const total = 6 + level + might;

		setAttrs({
			combatMastery: mastery,
			hitPoints_max: total,
		});
	});
});

// When the stats are changed, set the prime stat, physical check, and mystical check
on('change:might change:agility change:charisma change:intelligence', () => {
	getAttrs(['might', 'agility', 'charisma', 'intelligence'], (values) => {
		const might = +values.might || 0;
		const agility = +values.agility || 0;
		const charisma = +values.charisma || 0;
		const intelligence = +values.intelligence || 0;
		const max = Math.max(might, agility, charisma, intelligence);
		const physical = Math.max(might, agility);
		const mystical = Math.max(charisma, intelligence);

		setAttrs({
			prime: max,
			physicalCheck: physical,
			mysticalCheck: mystical,
		});
	});
});

// SAVES

// When the stats or save mastery is changed, set the save modifier
const stats = ['might', 'agility', 'charisma', 'intelligence'];
stats.forEach((stat) => {
	on(`change:${stat}SaveMastery change:${stat}`, () => {
		getAttrs([`${stat}`, 'combatMastery', `${stat}SaveMastery`], (values) => {
			const st = +values[stat] || 0;
			const cm = +values.combatMastery || 0;
			const sm = +values[`${stat}SaveMastery`] || 0;
			let total = st;

			if (sm == 1) {
				total = st + cm;
			}

			setAttrs({
				[`${stat}Save`]: total,
			});
		});
	});
});

// When the saves are changed, set the physical and mystical saves
on(
	'change:mightSave change:agilitySave change:charismaSave change:intelligenceSave',
	() => {
		getAttrs(
			['mightSave', 'agilitySave', 'charismaSave', 'intelligenceSave'],
			(values) => {
				const might = +values.mightSave || 0;
				const agility = +values.agilitySave || 0;
				const charisma = +values.charismaSave || 0;
				const intelligence = +values.intelligenceSave || 0;
				const physical = Math.max(might, agility);
				const mystical = Math.max(charisma, intelligence);

				setAttrs({
					physicalSave: physical,
					mysticalSave: mystical,
				});
			}
		);
	}
);

// SKILLS

// When the stats or skill mastery is changed, set the skill modifier
const skillsList = {
	prime: ['awareness'],
	might: ['athletics', 'intimidation'],
	agility: ['acrobatics', 'trickery', 'stealth'],
	charisma: ['animal', 'influence', 'insight'],
	intelligence: [
		'investigation',
		'medicine',
		'survival',
		'arcana',
		'history',
		'nature',
		'occultism',
		'religion',
	],
};
Object.keys(skillsList).forEach((key) => {
	skillsList[key].forEach((skill) => {
		on(`change:${skill}Mastery change:${key}`, () => {
			getAttrs([`${skill}Mastery`, `${key}`], (values) => {
				const stat = +values[`${key}`] || 0;
				const mastery = +values[`${skill}Mastery`] || 0;
				const total = stat + mastery;

				setAttrs({
					[`${skill}`]: total,
				});
			});
		});
	});
});

// When custom skill mastery or intelligence is changed, set the custom skill modifiers
