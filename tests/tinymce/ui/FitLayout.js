(function() {
	var panel;

	module("tinymce.ui.FitLayout", {
		setup: function() {
			document.getElementById('view').innerHTML = '';
		},

		teardown: function() {
			//document.getElementById('view').innerHTML = '';
		}
	});

	if (window.callPhantom) {
		test("PhantomJS dummy test", function() {
			ok(true, "UI tests are disabled on PhantomJS since it doesn't support layout as normal browsers.");
		});

		return;
	}

	function createFitPanel(settings) {
		return tinymce.ui.Factory.create(tinymce.extend({
			type: 'panel',
			layout: 'fit',
			width: 200,
			height: 200,
			border: 1
		}, settings)).renderTo(document.getElementById('view')).reflow();
	}

	test("fit with spacer inside", function() {
		panel = createFitPanel({
			items: [
				{type: 'spacer', classes: 'red'}
			]
		});

		deepEqual(Utils.rect(panel), [0, 0, 200, 200]);
		deepEqual(Utils.rect(panel.find('spacer')[0]), [1, 1, 198, 198]);
	});

	test("fit with padding and spacer inside", function() {
		panel = createFitPanel({
			padding: 3,
			items: [
				{type: 'spacer', classes: 'red'}
			]
		});

		deepEqual(Utils.rect(panel), [0, 0, 200, 200]);
		deepEqual(Utils.rect(panel.find('spacer')[0]), [4, 4, 192, 192]);
	});

	test("fit with panel inside", function() {
		panel = createFitPanel({
			items: [
				{type: 'panel', border: 1}
			]
		});

		deepEqual(Utils.rect(panel), [0, 0, 200, 200]);
		deepEqual(Utils.rect(panel.find('panel')[0]), [1, 1, 198, 198]);
	});
})();