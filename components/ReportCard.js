import React, { useState } from 'react';
import { Sizing, Colors } from '../style-vars';
import { getAnswersByDay, getTodaysScore, getCategoryColor, getQs } from '../utils';

const ReportCard = props => {
  if (!props.scoreData) {
    return null;
  }

  const { answers } = props.scoreData;
  const { today } = props;
  getTodaysScore(2, answers);
  const allQuestions = getQs(props.dailyQuestions);
  return (
    <div className='ReportCard'>
      <h1> Report Card </h1>
      <div className='ReportCard-body'>
        <DayCell allQuestions={allQuestions} answers={answers} today={today} day={1} />
        <DayCell allQuestions={allQuestions} answers={answers} today={today} day={2} />
        <DayCell allQuestions={allQuestions} answers={answers} today={today} day={3} />
        <DayCell allQuestions={allQuestions} answers={answers} today={today} day={4} />
        <DayCell allQuestions={allQuestions} answers={answers} today={today} day={5} />
      </div>
      <style jsx> {`
        .ReportCard h1 {
          font-family: "Windsor";
          font-size: 3.3rem;
          margin: ${Sizing.lg};
          text-align: center;
        }

        .ReportCard-body {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          min-height: 400px;
          border-top: 1px solid black;
        }
      `}</style>
    </div>
  );
}

const DayCell = props => {
  const { today, day, answers, allQuestions } = props;
  const score = getTodaysScore(day, answers);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const rankText = score === '--' || today < day ? '--/--' : 'Calculating...';
  const processAnswers = answers => {
    let trueAnswers = [];
    for (var a in answers) {
      trueAnswers.push(answers[a].answerData);
    }
    return trueAnswers;
  }

  const checkAnswers = day => {
    const trueAnswers = processAnswers(answers);
    const results = [];

    for (var a = 0; a < allQuestions.length; a++) {
      results.push(false);
    }

    for (var a = 0; a < trueAnswers.length; a++) {
      const { correct, lessonNumberIndex } = trueAnswers[a];
      if (correct) {
        const i = lessonNumberIndex - 1;
        results[i] = true;
      }
    }

    return results;
  }

  const handleOpening = () => {
    if (props.today >= props.day) {
      setDrawerOpen(!drawerOpen)
    }
  }

  return (
    <div className='DayCell'>
      <div className='DayCell-handle' onClick={handleOpening}>
        <div className='left'>
          <p> {'Day 0' + props.day} </p>
          <p> {rankText} </p>
        </div>
        <div className='right'>
          <p> -- </p>
          <p> {"Grade: " + score + "%"} </p>
        </div>
      </div>
      { drawerOpen && (
        <div className='resultsDrawer'>
        { allQuestions.map((q, i) => {

          const currQ = allQuestions[i];
          const { lesson, topic, day } = currQ.fields;
          const results = checkAnswers(day);
          const backgroundStyles = {
            background: getCategoryColor(topic)
          }
          const answerStatus = results[i] ? 'CORRECT' : 'INCORRECT';

          return (
            <div className='questionCell' key={i} onClick={() => handleClick(currQ, q.fields)}>
              <div style={backgroundStyles} className='category'> {topic.substring(0,3)}</div>
              <div className='index'> Q-0{lesson} </div>
              <div className='status'> {answerStatus} </div>
            </div>
          );
        })}
        </div>
      )}

      <style jsx> {`
        .DayCell {
          background: ${ props.day % 2 != 0 ? '#f2f2f2' : '#ffffff' };
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          height: 20%;
          width: 100%;
          border: 1px solid black;
          border-top: none;
          flex: 1;
          padding: 10px 20px;
        }

        .DayCell-handle {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin: ${Sizing.sm} 0px;
        }

        .left, .right {
          width: 50%;
        }

        .left p, .right p {
          margin: ${Sizing.sm} 0px;
        }

        .left {
          text-align: left;
        }

        .right {
          text-align: right;
        }

        .resultsDrawer {
          width: 100%;
        }

        .questionCell {
          display: flex;
          width: 100%;
          border: 1px solid black;
          height: 55px;
        }

        .category, .index {
          width: 25%;
          border-right: 1px solid black;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .status {
          width: 50%;
          text-align: center;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .category {
          color: white;
        }

      `}</style>
    </div>
  )
}

export default ReportCard;
