import React, { useState } from 'react';
import Head from 'next/head'
import { withRouter } from 'next/router'
import Question from '../../components/Question';
import StatusBar from '../../components/StatusBar';
import ExamProgress from '../../components/ExamProgress';
import { Sizing, Colors } from '../../style-vars';
import { getScoreData, getCategoryColor } from '../../utils';

const checkForCode = url => {
    console.log(url.substring(0, 6))
    if (url.substring(0, 6) === '?code=') {
      console.log(url.substring(6, url.length-2));
    }
}

UserPage.getInitialProps = async function(ctx) {
  const client = require('contentful').createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_API_TOKEN
  });

  let dailyQuestions;
  let scoreData;
  let allAnswers = [];

  await getScoreData(ctx.query.user).then((res) => {
    scoreData = res;
  });
  await client.getEntries({ content_type: 'dailyQuestions' }).then(async res => {
    dailyQuestions = [...res.items];

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

  return { scoreData, dailyQuestions, allAnswers };
}

function UserPage(props) {
  const { router, allAnswers, scoreData } = props;
  const username = props.router.query.user;
  const initState = {
    day: 2,
    lesson: '--',
    topic: '--',
    questionText: '',
  }
  const [currQ, setCurrQ] = useState(initState);
  const reload = () => window.location.reload();
  const getAnswerOptions = (allAnswers, day, lesson) => {
    return allAnswers.filter(answer => {
      return answer.day === day && answer.lessonNumberIndex == lesson;
    })
  }
  const answerOptions = getAnswerOptions(allAnswers, currQ.day, currQ.lesson);

  return (
    <div>
      <Head>
        <title> Welcome to School University </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='header'>
        <img onClick={reload} src='/img/logo-horizontal.png' alt='School University' />
        <h5> InstaSCAN&trade; </h5>
      </div>

      <StatusBar day='02' lesson={currQ.lesson} topic={currQ.topic} color={getCategoryColor(currQ.topic)} />

      <div className="body">
      { currQ.lesson != '--' && (
        <Question currQ={currQ} username={username} getCategoryColor={getCategoryColor} answerOptions={answerOptions} />
      )}
      { currQ.lesson === '--' && (
        <ExamProgress setQuestion={setCurrQ} dailyQuestions={props.dailyQuestions[0].fields} />
      )}
      </div>

      <style jsx>{`
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
      `}</style>
    </div>
  );
}

export default withRouter(UserPage);
