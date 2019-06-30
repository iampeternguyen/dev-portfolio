document.addEventListener('DOMContentLoaded', function() {
	new Vue({
		el: '#projectGallery__projects',
		// define data - initial display text
		data: {
			responseData: [],
		},
		computed: {
			projects: function() {
				if (this.responseData.length !== 0) {
					const processed = this.responseData.map(project => this.filterProjectData(project));
					console.log(processed);
					return processed;
				}
			},
		},
		methods: {
			showBack: function(id) {
				document.getElementById(id).classList.add('show');
			},
			hideBack: function(id) {
				document.getElementById(id).classList.remove('show');
			},
			filterProjectData: function(project) {
				return {
					id: project.id,
					title: project.title.rendered,
					summary: project.summary,
					highlights: project.highlights.split(',').filter(el => {
						return el.trim() != '';
					}),
					demo_link: project.demo_link,
					github_link: project.github_link,
					image: project.featured_image,
				};
			},
		},

		async mounted() {
			const response = await axios.get('http://localhost:8000/wp-json/wp/v2/project/');
			this.responseData = response.data;
		},
	});
});
