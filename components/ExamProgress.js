import React from 'react';
import { getCategoryColor } from '../utils';
import { getAnswersByDay, getTodaysScore, getTimeUntil } from '../utils';

const ExamProgress = props => {
  const DAY_INDEX = 2;
  const getQs = questions => {
    let allQs = [];
    for (var field in questions) {
      if (questions[field].fields) {
        allQs.push(questions[field]);
      }
    }
    return allQs;
  }

  const allQuestions = getQs(props.dailyQuestions);
  const answerSubmitted = (day, lesson) => {
    const { answers } = props.scoreData;
    for (var key in answers) {
      const { day, lessonNumberIndex } = answers[key].answerData;
      if (day === DAY_INDEX && lessonNumberIndex === lesson) {
        return true; // Answer already submitted
      }
    }
    return false; // No answer submitted yet
  }

  const getStatus = currQ => {
    const { lesson, lessonTime } = currQ.fields;
    const { time } = props;

    const currTime = new Date(time);
    const questionTime = new Date(lessonTime);
    const isBefore = currTime < questionTime;
    return answerSubmitted(DAY_INDEX, lesson) || !isBefore ? 'COMPLETED' : getTimeUntil(currTime, questionTime);
  }

  const handleClick = (currQ, fields) => {
    if (getStatus(currQ) !== 'COMPLETED') {
      props.setQuestion(fields);
    }
  }

  return (
    <div className='ExamProgress'>
      { allQuestions.map((q, i) => {
        const currQ = allQuestions[i];
        const { lesson, topic } = currQ.fields;
        const backgroundStyles = {
          background: getCategoryColor(topic)
        }

        return (
          <div className='questionCell' key={i} onClick={() => handleClick(currQ, q.fields)}>
            <div style={backgroundStyles} className='category'> {topic.substring(0,3)}</div>
            <div className='index'> Q-0{lesson} </div>
            <div className='status'> {getStatus(currQ)} </div>
          </div>
        );
      })}
      <style jsx> {`
        .ExamProgress {
          display: flex;
          flex-direction: column;
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
  );
}

export default ExamProgress;
