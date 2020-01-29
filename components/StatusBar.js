import React from 'react';
import { Sizing, Colors } from '../style-vars';
import { getCategoryColor } from '../utils';

const StatusBar = props => {
  const { color } = props;
  return (
    <div className='StatusBar'>
      <div className='day'>
        <p> Day: {props.day} </p>
      </div>

      <div className='lesson'>
        <p> Lesson: {props.lesson} </p>
      </div>

      <div className='topic'>
        <p> {props.topic} </p>
      </div>

      <style jsx> {`
        .StatusBar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid ${getCategoryColor(color)};
          border-bottom: 1px solid ${getCategoryColor(color)};
          border-right: 1px solid ${getCategoryColor(color)};
          margin: ${Sizing.xl} 0px;
          color: ${getCategoryColor(color)};
        }

        .StatusBar div {
          border-left: 1px solid ${getCategoryColor(color)};
          text-align: center;
        }

        .topic p, .day p, .lesson p {
          padding: 10px;
        }

        .topic {
          background: ${props.topic === '--' ? 'transparent' : getCategoryColor(color)};
          color: ${props.topic === '--' ? 'black' : 'white'};
        }

        .day {
          width: 27.5%;
        }

        .lesson {
          width: 45%;
        }

        .topic {
          width: 27.5%;
        }
      `}</style>
    </div>
  );
}

export default StatusBar;
