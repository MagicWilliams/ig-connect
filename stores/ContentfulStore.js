import { action, observable, computed } from 'mobx';

const client = require('contentful').createClient({
	space: process.env.SU_CONTENTFUL_SPACE_ID,
	accessToken: process.env.SU_CONTENTFUL_API_TOKEN
});

class ContentfulStore {
	constructor(_rootStore) {
		this.rootStore = _rootStore;
	}

	@observable dailyQuestions = [];
	@observable allAnswers = [];
	@observable lessonTimes = [];

	@action.bound
	async fetchQuestions() {
		this.dailyQuestions = [];
		await client.getEntries({ content_type: 'dailyQuestions' }).then(async res => {
			this.dailyQuestions = [...res.items];

			for (var field in this.dailyQuestions[0].fields) {
				if (this.dailyQuestions[0].fields[field].fields) {
					this.lessonTimes.push(this.dailyQuestions[0].fields[field].fields.lessonTime);
				}
			};

			for (var a = 0; a < this.dailyQuestions.length; a++) {
				for (var field in this.dailyQuestions[a].fields) {
					if (field !== 'day') {
						const { answerOptions } = this.dailyQuestions[a].fields[field].fields;
						for (var option in answerOptions) {
							const { id } = answerOptions[option].sys;
							await client.getEntry(id)
							.then(entry => {
								this.allAnswers.push(entry.fields)
							});
						}
					}
				};
			}

			console.log(this.dailyQuestions);
		});
	}
}

export default ContentfulStore;
