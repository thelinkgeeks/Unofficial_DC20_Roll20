// GENERAL
const buttonlist = ['character', 'journal', 'configuration'];

buttonlist.forEach((button) => {
	on(`clicked:${button}`, function () {
		setAttrs({
			tab: button,
		});
	});
});
