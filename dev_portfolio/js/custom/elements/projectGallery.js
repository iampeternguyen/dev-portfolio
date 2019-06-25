document.addEventListener('DOMContentLoaded', function() {
	new Vue({
		el: '#projectGallery__projects',
		// define data - initial display text
		data: {
			projects: [
				{
					id: '1',
					title: 'Project 1',
					summary: 'This is project 1. It was made with...',
					highlights: ['Uses nodejs', 'built in vanilla js', 'scss infused'],
				},
				{
					id: '2',
					title: 'Project 1',
					summary: 'This is project 1. It was made with...',
					highlights: ['Uses nodejs', 'built in vanilla js', 'scss infused'],
				},
				{
					id: '3',
					title: 'Project 1',
					summary: 'This is project 1. It was made with...',
					highlights: ['Uses nodejs', 'built in vanilla js', 'scss infused'],
				},
				{
					id: '4',
					title: 'Project 1',
					summary: 'This is project 1. It was made with...',
					highlights: ['Uses nodejs', 'built in vanilla js', 'scss infused'],
				},
				{
					id: '5',
					title: 'Project 1',
					summary: 'This is project 1. It was made with...',
					highlights: ['Uses nodejs', 'built in vanilla js', 'scss infused'],
				},
				{
					id: '6',
					title: 'Project 1',
					summary: 'This is project 1. It was made with...',
					highlights: ['Uses nodejs', 'built in vanilla js', 'scss infused'],
				},
			],
		},
		methods: {
			showBack: function(id) {
				document.getElementById(id).classList.add('show');
			},
			hideBack: function(id) {
				document.getElementById(id).classList.remove('show');
			},
		},
	});
});

function testClick(id) {
	console.log(id);
}
