import React, { useState } from 'react';
import Head from 'next/head'
import { withRouter } from 'next/router'
import Question from '../../components/Question';
import StatusBar from '../../components/StatusBar';
import ReportCard from '../../components/ReportCard';
import ExamProgress from '../../components/ExamProgress';
import { Sizing, Colors } from '../../style-vars';
import { getScoreData, getCategoryColor, useInterval, getTimeUntil } from '../../utils';
import moment from 'moment';
import DevTools from 'mobx-react-devtools';
const DAY_INDEX = 2;
const checkForCode = url => {
    console.log(url.substring(0, 6))
    if (url.substring(0, 6) === '?code=') {
      console.log(url.substring(6, url.length-2));
    }
}

UserPage.getInitialProps = async function(ctx) {
  const client = require('contentful').createClient({
    space: process.env.SU_CONTENTFUL_SPACE_ID,
    accessToken: process.env.SU_CONTENTFUL_API_TOKEN
  });

  let dailyQuestions;
  let scoreData;
  let allAnswers = [];
  let lessonTimes = [];

  await getScoreData(ctx.query.user).then((res) => {
    scoreData = res;
  });
  await client.getEntries({ content_type: 'dailyQuestions' }).then(async res => {
    dailyQuestions = [...res.items];

    for (var field in dailyQuestions[0].fields) {
      if (dailyQuestions[0].fields[field].fields) {
        lessonTimes.push(dailyQuestions[0].fields[field].fields.lessonTime);
      }
    };

    for (var a = 0; a < dailyQuestions.length; a++) {
      for (var field in dailyQuestions[a].fields) {
        if (field !== 'day') {
          const { answerOptions } = dailyQuestions[a].fields[field].fields;
          for (var option in answerOptions) {
            const { id } = answerOptions[option].sys;
            await client.getEntry(id)
            .then(entry => {
              allAnswers.push(entry.fields)
            });
          }
        }
      };
    }
  });

  return { scoreData, dailyQuestions, allAnswers, lessonTimes };
}

function UserPage(props) {
  useInterval(() => {
    var usaTime = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
    const now = new Date(usaTime);
    setTime(now.toISOString());
  }, 1000);

  const { router, allAnswers, scoreData, dailyQuestions, lessonTimes } = props;
  const username = props.router.query.user;

  const initState = {
    day: 2,
    lesson: '--',
    topic: '--',
    questionText: '',
  }

  var usaTime = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
  usaTime = new Date(usaTime);
  const [currQ, setCurrQ] = useState(initState);
  const [time, setTime] = useState(usaTime.toISOString());
  const reload = () => window.location.reload();
  const getAnswerOptions = (allAnswers, currQ) => {
    const { day, lesson } = currQ;
    return allAnswers.filter(answer => {
      return answer.day === day && answer.lessonNumberIndex == lesson;
    })
  }

  const showReportCard = () => {
    for (var a = 0; a < lessonTimes.length; a++) {
      const t = new Date(lessonTimes[a]);
      const currTimeObj = new Date(time);
      if (currTimeObj < t) {
        return false;
      };
    }
    return true;
  }

  const getNextTime = () => {
    for (var a = 0; a < lessonTimes.length; a++) {
      const t = new Date(lessonTimes[a]);
      const currTimeObj = new Date(time);
      return currTimeObj < t ? getTimeUntil(currTimeObj, t) : '--:--:--';
    }
  }
  console.log(showReportCard());
  const [showingReportCard, setShowingReportCard] = useState(showReportCard());
  const answerOptions = getAnswerOptions(allAnswers, currQ);

  return (
      <div className='UserPage'>
        <Head>
          <title> Welcome to School University </title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className='header'>
          <img onClick={reload} src='/img/logo-horizontal.png' alt='School University' />
          <h5 onClick={() => setShowingReportCard(!showingReportCard)}> InstaSCAN&trade; </h5>
        </div>

        { showingReportCard && (
          <ReportCard dailyQuestions={dailyQuestions[0].fields} today={DAY_INDEX} nextTime={getNextTime()} scoreData={scoreData} />
        )}

        { !showingReportCard && (
          <div>
            <StatusBar day='02' lesson={currQ.lesson} topic={currQ.topic} />
            <div className="body">
              { currQ.lesson != '--' && (
                <Question time={time} currQ={currQ} username={username} answerOptions={answerOptions} />
              )}
              { currQ.lesson === '--' && (
                <ExamProgress time={time} scoreData={scoreData} setQuestion={setCurrQ} dailyQuestions={dailyQuestions[0].fields} />
              )}
            </div>
          </div>
        )}

        <p className='timer'> {'Next Question: ' + getNextTime()}</p>
        <p className='id'> S@: {username} </p>

        <style jsx>{`

          .UserPage {
            display: flex;
            flex-direction: column;
            height: 100%;
            min-height: calc(100vh - 50px);
          }

          .header {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: ${Sizing.lg};
          }

          .header img {
            position: relative;
            left: -3px;
            width: 50%;
          }

          .header h5 {
            font-weight: bold;
            color: ${getCategoryColor(currQ.topic)};
            font-family: 'Arial';
          }

          .timer {
            margin-top: ${Sizing.xl};
          }

          .timer, .id {
            text-align: center;
          }
        `}</style>
      </div>
  );
}

export default withRouter(UserPage);
