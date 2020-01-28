import fetch from 'isomorphic-unfetch';
import firebase from './firebase';
import { Colors } from './style-vars';

export function getCategoryColor(topic) {
  return topic === 'Music' ? Colors.gold :
  topic === 'Art' ? Colors.blue :
  topic === 'Science' ? Colors.green :
  topic === 'Geography' ? Colors.pink :
  topic === 'Vocab' ? Colors.purple :
  topic === 'History' ? Colors.red :
  topic === 'Film' ? Colors.black :
  topic === 'Math' ? Colors.gray :
  '#000000';
}

export async function getScoreData(username) {
  var database = firebase.database();
  const formattedUser = username.replace(".", "_");
  var userRef = firebase.database().ref('/users/' + formattedUser);
  let data;

  userRef.on("value", function(snapshot) {
    if (snapshot.val() === null) {
      const setData = {
        username: username,
        answers: [],
        totalScore: 0,
      }

      userRef.set(setData);
      console.log(snapshot.val());
      data = setData;
    } else {
      data = snapshot.val();
    }
  }, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
  });

  return data;
}

export async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return await response.json(); // parses JSON response into native JavaScript objects
}
