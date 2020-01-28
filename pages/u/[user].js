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
  const scoreData = await getScoreData(ctx.query.user);
  await client.getEntries({ content_type: 'dailyQuestions' }).then((res) => {
    dailyQuestions = [...res.items];
  });

  return { scoreData, dailyQuestions };
}

function UserPage(props) {
  const { router } = props;
  const username = props.router.query.user;
  const [lesson, setLesson] = useState('--');
  const [topic, setTopic] = useState('--');
  const [currQ, setCurrQ] = useState({});
  const setQuestion = (lesson, topic) => {
    let filteredQs = props.dailyQuestions.filter(q => q.fields.lesson === lesson && q.fields.topic === topic);

    setLesson(lesson);
    setTopic(topic);
    setCurrQ(filteredQs[0]);
    console.log(props.dailyQuestions);

  }

  return (
    <div>
      <Head>
        <title> Welcome to School University </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='header'>
        <img src='/img/logo-horizontal.png' alt='School University' />
        <h5> InstaSCAN&trade; </h5>
      </div>

      <StatusBar day='02' lesson={lesson} topic={topic} color={getCategoryColor(topic)} />

      <div className="body">
      { lesson != '--' && (
        <Question username={username} day='02' lesson={lesson} topic={topic} color={getCategoryColor(topic)} />
      )}
      { lesson === '--' && (
        <ExamProgress setQuestion={setQuestion} dailyQuestions={props.dailyQuestions} />
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
          color: ${getCategoryColor(topic)};
          font-family: 'Arial';
        }
      `}</style>
    </div>
  );
}

export default withRouter(UserPage);
