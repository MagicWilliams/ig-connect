import React, { useState } from 'react';
import { Sizing, Colors } from '../style-vars';
import { getAnswersByDay, getTodaysScore } from '../utils';

const ReportCard = props => {
  const { answers } = props.scoreData;
  getTodaysScore(2, answers);
  return (
    <div className='ReportCard'>
      <h1> Report Card </h1>
      <div className='ReportCard-body'>
        <DayCell day={1} score={getTodaysScore(1, answers)}/>
        <DayCell day={2} score={getTodaysScore(2, answers)}/>
        <DayCell day={3} score={getTodaysScore(3, answers)}/>
        <DayCell day={4} score={getTodaysScore(4, answers)}/>
        <DayCell day={5} score={getTodaysScore(5, answers)}/>
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
  const TODAY = 2;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const rankText = props.score != '--' ? '--/--' : 'Calculating...';
  return (
    <div className='DayCell'>
      <div className='DayCell-handle' onClick={() => setDrawerOpen(!drawerOpen)}>
        <div className='left'>
          <p> {'Day 0' + props.day} </p>
          <p> {rankText} </p>
        </div>
        <div className='right'>
          <p> -- </p>
          <p> {"Grade: " + props.score + "%"} </p>
        </div>
      </div>
      { drawerOpen && (
        <div>
          Show the completed results here
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

      `}</style>
    </div>
  )
}

export default ReportCard;
