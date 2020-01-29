import fetch from 'isomorphic-unfetch';
import firebase from './firebase';
import { Colors } from './style-vars';
import React, { useState, useEffect, useRef } from 'react';

export function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export function getQs(questions) {
  let allQs = [];
  for (var field in questions) {
    if (questions[field].fields) {
      allQs.push(questions[field]);
    }
  }
  return allQs;
}

// Returns a formatted string of the hours, minutes, and seconds between two times.
export function getTimeUntil(currTime, scheduledTime) {
  const timeUntil = Math.round((scheduledTime - currTime) / 1000);
  const seconds = timeUntil % 60;
  const minutes = Math.floor((timeUntil / 60) % 60);
  const hours = Math.floor(timeUntil / 3600);
  const hrStr = hours < 10 ? '0'+hours : hours;
  const minStr = minutes < 10 ? '0'+minutes : minutes;
  const secStr = seconds < 10 ? '0'+seconds : seconds;
  return hrStr + ':' + minStr + ':' + secStr;
}

export function getCategoryColor(topic) {
  return topic === 'Music' ? Colors.gold :
  topic === 'Art' ? Colors.blue :
  topic === 'Science' ? Colors.green :
  topic === 'Geography' ? Colors.pink :
  topic === 'Vocabulary' ? Colors.purple :
  topic === 'History' ? Colors.red :
  topic === 'Film' ? Colors.black :
  topic === 'Math' ? Colors.gray :
  '#000000';
}

export function getAnswersByDay(dayIndex, answers) {
  let todaysAnswers = [];
  const hashes = Object.keys(answers);
  for (var a = 0; a < hashes.length; a++) {
    const { answerData } = answers[hashes[a]];
    if (answerData.day === dayIndex) {
      todaysAnswers.push(answerData);
    }
  }
  return todaysAnswers
}

export function getTodaysScore(today, answers) {
  var correctAnswers = 0;
  const todaysAnswers = getAnswersByDay(today, answers);
  if (todaysAnswers.length === 0) {
    return '--'
  }

  for (var a = 0; a < todaysAnswers.length; a++) {
    if (todaysAnswers[a].correct) {
      correctAnswers++;
    }
  }
  return (correctAnswers / 8) * 100;
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

export async function postAnswer(answerData) {
  var database = firebase.database();
  const formattedUser = answerData.username.replace(".", "_");
  var userRef = database.ref('/users/' + formattedUser);
  let newPostKey = userRef.child('answers').push().key;
  var updates = {};
  updates['/answers/' + newPostKey] = answerData;
  return userRef.update(updates);
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
