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
	@observable nextQuestion = {};

	@action.bound
	async fetchQuestions(today) {
		this.dailyQuestions = [];
		Promise.all([
			await client.getEntries({ content_type: 'dailyQuestions' }).then(async res => {
				let todaysQuestions;
				this.dailyQuestions = [...res.items];
				for (var a = 0; a < this.dailyQuestions.length; a++) {
					const currentQ = this.dailyQuestions[a];
					if (currentQ.fields.day === today) {
						this.dailyQuestions = currentQ;
						if (currentQ.fields.day === today) {
							for (var field in currentQ.fields) {
								if (currentQ.fields[field].fields) {
									this.lessonTimes.push(currentQ.fields[field].fields.lessonTime);
								}
							};
						}
					}
				}
			}),
			await client.getEntries({ content_type: 'answer' }).then(async res => {
				this.allAnswers = [...res.items];
				let todaysAnswers = [];
				for (var a = 0; a < this.allAnswers.length; a++) {
					if (this.allAnswers[a].fields.day === today) {
						todaysAnswers.push(this.allAnswers[a]);
					}
				}
			})
		]);
	}
}

export default ContentfulStore;
