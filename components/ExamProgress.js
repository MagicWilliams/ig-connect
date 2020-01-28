import React from 'react';
import { getCategoryColor } from '../utils';

const ExamProgress = props => {
  console.log('Start');

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

  return (
    <div className='ExamProgress'>
      { allQuestions.map((q, i) => {
        const currQ = allQuestions[i];
        const { lesson, topic } = currQ.fields;
        const backgroundStyles = {
          background: getCategoryColor(topic)
        }

        return (
          <div className='questionCell' key={i} onClick={() => props.setQuestion(q.fields)}>
            <div style={backgroundStyles} className='category'> {topic.substring(0,3)}</div>
            <div className='index'> Q-0{lesson} </div>
            <div className='status'> COMPLETE </div>
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
