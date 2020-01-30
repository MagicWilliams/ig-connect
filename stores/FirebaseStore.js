import { action, observable, computed } from 'mobx';
import firebase from '../firebase';

class FirebaseStore {
	constructor(_rootStore) {
		this.rootStore = _rootStore;
	}

	@observable scoreData = [];

  @action.bound
  async fetchScoreData(username) {
		console.log('50');
		console.log('50');
		console.log('50');
		console.log('50');
		console.log('50');
		console.log('50');
		console.log('50');
		console.log('50');
		console.log('50');
		console.log('50');
		var database = firebase.database();
	  const formattedUser = username.replace(".", "_");
	  var userRef = firebase.database().ref('/users/' + formattedUser);
		let res;

	  userRef.once("value", function(snapshot) {
	    if (snapshot.val() === null) {
				console.log('NO USER FOUND. ADDING NEW USER TO FIREBASE.');
	      const setData = {
	        username: username,
	      }
	      userRef.set(setData);
	      res = setData;
	    } else if (snapshot.val() === undefined) {
				console.log('firebase value undefined');
			} else {
				console.log('success!');
				res = snapshot.val();
	    }
	  }, function (errorObject) {
	    console.log("The read failed: " + errorObject.code);
	  });

		this.scoreData = res;
		console.log(res)

	  if (res != undefined) {
	    console.log('rip');
	  }
	}
}

export default FirebaseStore;
