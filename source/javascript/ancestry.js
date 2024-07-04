// source = ancestry.js
on('change:ancestry change:background', function () {
	getAttrs(['ancestry', 'background'], function (v) {
		const ancestry = v.ancestry;
		const background = v.background;
		const ancestryBackground = ancestry + ' - ' + background;

		setAttrs({
			'ancestry-background': ancestryBackground,
		});
	});
});
