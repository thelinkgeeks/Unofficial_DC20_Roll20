// source = stats.js
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
