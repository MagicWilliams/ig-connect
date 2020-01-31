import React, { useState } from 'react';
import Head from 'next/head'
import { withRouter } from 'next/router'
import Question from '../../components/Question';
import StatusBar from '../../components/StatusBar';
import ReportCard from '../../components/ReportCard';
import ExamProgress from '../../components/ExamProgress';
import { Sizing, Colors } from '../../style-vars';
import { getScoreData, getCategoryColor, useInterval, getTimeUntil, fetchInitialData } from '../../utils';
import firebase from '../../firebase';
import moment from 'moment';
import DevTools from 'mobx-react-devtools';
import { Provider } from 'mobx-react';
import RootStore from '../../stores/RootStore';
import {inject, observer} from 'mobx-react';

const DAY_INDEX = 3;
const checkForCode = url => {
    console.log(url.substring(0, 6))
    if (url.substring(0, 6) === '?code=') {
      console.log(url.substring(6, url.length-2));
    }
}

Page.getInitialProps = async function(ctx) {
  const { user } = ctx.query;
  if (user !== undefined) {
    return { username: ctx.query.user }
  }
}

function Page(props) {
  useInterval(() => {
    var usaTime = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
    const now = new Date(usaTime);
    setTime(now.toISOString());
  }, 1000);

  var usaTime = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});
  usaTime = new Date(usaTime);
  const [time, setTime] = useState(usaTime.toISOString());

  return (
    <Provider store={RootStore}>
      <UserPage time={time} data={props} user={props.username} />
    </Provider>
  )
}

@inject("store") @observer
class UserPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: -1,
      currQ: {
        day: 2,
        lesson: '--',
        topic: '--',
        questionText: '',
      },
      showingReportCard: false,
      dataLoaded: false,
      scoreData: null,
    }
  }

  async componentDidMount() {
    this.setState({
      showReportCard: this.showReportCard(),
    });

    const { fetchQuestions, dailyQuestions, allAnswers, lessonTimes } = this.props.store.contentfulStore;
    const { fetchScoreData, scoreData } = this.props.store.firebaseStore;
    await Promise.all([fetchScoreData(this.props.user), fetchQuestions(DAY_INDEX)]).then((values) => {
      this.setState({
        scoreData: scoreData,
        dataLoaded: true,
      });
    });
  }

  showReportCard = () => {
    const { lessonTimes } = this.props.store.contentfulStore;
    const { time } = this.props;

    if (!lessonTimes) {
      return false;
    }

    for (var a = 0; a < lessonTimes.length; a++) {
      const t = new Date(lessonTimes[a]);
      const currTimeObj = new Date(time);
      if (currTimeObj < t) {
        return false;
      };
    }
    return true;
  }

  getNextTime = () => {
    const { lessonTimes } = this.props.store.contentfulStore;

    const sortedTimes = lessonTimes.sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return a > b;
    })

    const { time } = this.props;
    for (var a = 0; a < lessonTimes.length; a++) {
      const t = new Date(lessonTimes[a]);
      const currTimeObj = new Date(time);
      return currTimeObj < t ? getTimeUntil(currTimeObj, t) : '--:--:--';
    }
  }

  getAnswerOptions = (allAnswers, currQ) => {
    const { day, lesson } = currQ;
    const todaysAnswers = allAnswers.filter(answer => {
      return answer.fields.day === day && answer.fields.lessonNumberIndex == lesson;
    });
    const trueAnswers = [];
    for (var a = 0; a < todaysAnswers.length; a++) {
      const { text } = todaysAnswers[a].fields;
      if (trueAnswers.indexOf(todaysAnswers[a]) === -1) {
        trueAnswers.push(todaysAnswers[a]);
      }
    }

    return trueAnswers.filter((a, i) => todaysAnswers.indexOf(a) === i)
  }

  setCurrQ = q => {
    this.setState({
      currQ: q,
    });
  }

  render() {
    const { showingReportCard, currQ, dataLoaded } = this.state;
    if (!dataLoaded) {
      return null;
    } else {
      const { lessonTimes, dailyQuestions, allAnswers } = this.props.store.contentfulStore;
      const { scoreData } = this.props.store.firebaseStore;
      const { time, router, user } = this.props;
      const reload = () => window.location.reload();
      const answerOptions = this.getAnswerOptions(allAnswers, currQ);

      return (
          <div className='UserPage'>
            <Head>
              <title> Welcome to School University </title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='header'>
              <img onClick={reload} src='/img/logo-horizontal.png' alt='School University' />
              <h5 onClick={() => this.setState({ showingReportCard: !showingReportCard})}> InstaSCAN&trade; </h5>
            </div>

            { showingReportCard && (
              <ReportCard dailyQuestions={dailyQuestions[0].fields} today={DAY_INDEX} nextTime={this.getNextTime()} scoreData={scoreData} />
            )}

            { !showingReportCard && (
              <div>
                <StatusBar day={DAY_INDEX} lesson={currQ.lesson} topic={currQ.topic} />
                <div className="body">
                  { currQ.lesson != '--' && (
                    <Question time={time} currQ={currQ} user={user} answerOptions={answerOptions} />
                  )}
                  { currQ.lesson === '--' && (
                    <ExamProgress today={DAY_INDEX} time={time} scoreData={scoreData} setQuestion={this.setCurrQ} dailyQuestions={dailyQuestions.fields} />
                  )}
                </div>
              </div>
            )}

            <p className='timer'> {'Next Question: ' + this.getNextTime()}</p>
            <p className='id'> S@: {user} </p>
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
  }
}

export default withRouter(Page);
