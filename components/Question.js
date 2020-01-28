import React, { useState } from 'react';
import { Sizing, Colors } from '../style-vars';

const Question = props => {
  const [ showChoices, setShowChoices ] = useState(false);
  const [ answerSelected, setAnswerSelected ] = useState(false);
  const handleClick = (showChoices, answerSelected) => {
      if (!showChoices) {
        setShowChoices(true);
      } else {
        console.log('submitting answer');
      }
  }
  const btnText = !showChoices ? 'Answer' : showChoices && !answerSelected ? 'Select An Answer' : 'Submit';
  return (
    <div className='Question'>
      { !showChoices && (
        <h1 className='question-text'> What 1920 artwork is featured in the lesson video? </h1>
      )}
      { showChoices && (
        <div>
          <div className='choices'>
            <div className='choice'>
              <div className='letter'> A </div>
              <div className='option'> Option 1 </div>
            </div>
            <div className='choice'>
              <div className='letter'> B </div>
              <div className='option'> Option 2 </div>
            </div>
            <div className='choice'>
              <div className='letter'> C </div>
              <div className='option'> Option 3 </div>
            </div>
            <div className='choice'>
              <div className='letter'> D </div>
              <div className='option'> Option 4 </div>
            </div>
          </div>
          <div className='select-choice'>
            <div className='individual-selection'> A </div>
            <div className='individual-selection'> B </div>
            <div className='individual-selection'> C </div>
            <div className='individual-selection'> D </div>
          </div>
        </div>
      )}
      <button className='grant' onClick={() => handleClick(showChoices, answerSelected)}> {btnText} </button>
      <p className='timer'> Time Remaining: 00:22:51 </p>
      <p className='id'> S@: {props.username} </p>

      <style jsx> {`
        .question-text {
          font-family: "Windsor";
          text-align: center;
          font-size: 3.5rem;
          margin: ${Sizing.md} 0px;
        }

        .grant {
          width: 100%;
          padding: ${Sizing.md};
          background: ${Colors.blue};
          color: white;
          font-size: 16px;
          margin: ${Sizing.xl} 0px;
          margin-bottom: ${Sizing.xxl};
          border: none;
          outline: none;
        }

        .Question p {
          text-align: center;
        }

        .choices {
          border: 1px solid ${Colors.blue};
          width: 100%;
        }

        .choice {
          display: flex;
          width: 100%;
          height: 75px;
        }

        .letter, .option {
          padding: 10px;
          border: 1px solid ${Colors.blue};
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .letter {
          width: 15%;
        }

        .option {
          width: 85%;
          justify-content: flex-start;
        }

        .select-choice {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: ${Sizing.lg};
        }

        .select-choice .individual-selection {
          padding: 10px 15px;
          border: 1px solid ${props.color};
          border-radius: 100%;
        }
      `} </style>
    </div>
  );
}

export default Question;
