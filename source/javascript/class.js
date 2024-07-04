// source = class.js
on('change:class change:subclass', function () {
	getAttrs(['class', 'subclass'], function (v) {
		const characterClass = v.class;
		const subclass = v.subclass;
		const classSubclass = characterClass + ' - ' + subclass;

		setAttrs({
			'class-subclass': classSubclass,
		});
	});
});
