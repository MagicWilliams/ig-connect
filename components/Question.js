import React, { useState } from 'react';
import { Sizing, Colors } from '../style-vars';
import { postAnswer, getCategoryColor } from '../utils';

const Question = props => {
  const [ showChoices, setShowChoices ] = useState(false);
  const [ selection, setSelection ] = useState('');
  const answerSelected = selection !== '';
  const { answerOptions, user } = props;
  const filtered = answerOptions.filter((a, i) => answerOptions.indexOf(a) === i);
  console.log(filtered);
  const { topic, lesson, questionText } = props.currQ;
  const color = getCategoryColor(topic);
  const letterOptions = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const btnText = !showChoices ? 'Answer' : showChoices && !answerSelected ? 'Select An Answer' : 'Submit';

  const handleClick = (showChoices, answerSelected) => {
      if (!showChoices) {
        setShowChoices(true);
      } else {
        handleSubmit();
      }
  }

  const handleSubmit = async () => {
    const selectionIndex = letterOptions.indexOf(selection);
    const answerData = filtered[selectionIndex];
    await postAnswer({answerData: {...answerData}, user}).then(() => {
      window.location.reload();
    });
  }

  const getLetterOption = index => letterOptions[index];

  return (
    <div className='Question'>
      { !showChoices && (
        <h1 className='question-text'> {questionText} </h1>
      )}

      { showChoices && (
        <div>
          <div className='answerOptions'>
            { filtered.map((answer, i) => {
              return (
                <div className='choice'>
                  <div className='letter'> {getLetterOption(i)} </div>
                  <div className='option'> {answer.text} </div>
                </div>
              )
            })}
          </div>
          <div className='optionSelection'>
            { filtered.map((answer, i) => {
              const highlightStyling = {
                background: selection === getLetterOption(i) ? color : 'white',
                color: selection === getLetterOption(i) ? 'white' : 'black',
              }
              return (
                <div style={highlightStyling} onClick={() => setSelection(getLetterOption(i))}className='individual-selection'>
                  {getLetterOption(i)}
                </div>
              )
            })}
          </div>
        </div>
      )}

      <button className='grant' onClick={() => handleClick(showChoices, answerSelected)}> {btnText} </button>

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
          background: ${color};
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

        .answerOptions {
          border: 1px solid ${color};
          width: 100%;
        }

        .choice {
          display: flex;
          width: 100%;
          height: 75px;
        }

        .letter, .option {
          padding: 10px;
          border: 1px solid ${color};
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

        .optionSelection {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: ${Sizing.lg};
        }

        .optionSelection .individual-selection {
          padding: 10px 15px;
          border: 1px solid ${color};
          border-radius: 100%;
        }
      `} </style>
    </div>
  );
}

export default Question;
