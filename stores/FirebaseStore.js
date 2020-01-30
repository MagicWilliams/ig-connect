import { action, observable, computed } from 'mobx';
import firebase from '../firebase';

class FirebaseStore {
	constructor(_rootStore) {
		this.rootStore = _rootStore;
	}

	@observable scoreData;

  @action.bound
  async fetchScoreData(username) {
		var database = firebase.database();
	  const formattedUser = username.replace(".", "_");
	  var userRef = firebase.database().ref('/users/' + formattedUser);
		let res;

	  userRef.once("value", function(snapshot) {
	    if (snapshot.val() === null) {
				console.log('NO USER FOUND. ADDING NEW USER TO FIREBASE.');
	      const setData = {
	        username: username,
					answers: [],
	      }
	      userRef.set(setData);
				res = setData;
	    } else {
				res = snapshot.val();
	    }
	  }, function (errorObject) {
	    console.log("The read failed: " + errorObject.code);
	  }).then(() => {
			this.scoreData = res;
		});
	}
}

export default FirebaseStore;
