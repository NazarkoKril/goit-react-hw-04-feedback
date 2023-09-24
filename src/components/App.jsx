import React, { useState } from 'react';
import Feedback from './Feedback';
import Statistics from './Statistics';
import { Section } from './ui/Section.jsx';
import { Container } from './app.styled.js';
import { Notification } from './Notification';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const countTotalFeedback = () => {
    const totalValue = good + neutral + bad;
    return totalValue;
  };

  const handleClick = e => {
    const currentValue = e.target.id;
    switch (currentValue) {
      case 'good':
        return setGood(prevState => prevState + 1);
      case 'bad':
        return setBad(prevState => prevState + 1);
      case 'neutral':
        return setNeutral(prevState => prevState + 1);
      default:
        return;
    }
  };

  const countPositiveFeedbackPercentage = () => {
    let positivePercentage = 0;
    if (good > 0) {
      positivePercentage = (100 / countTotalFeedback()) * good;
      const numberedPositivePersatage = Number(positivePercentage);
      const roundedPositivePersatage = Math.ceil(numberedPositivePersatage);
      return roundedPositivePersatage;
    }
    return positivePercentage;
  };

  return (
    <Container>
      <Section title={`Please leave feedback`}>
        <Feedback handleFunc={handleClick} />
      </Section>
      <Section title={`Statistics`}>
        {countTotalFeedback() > 0 ? (
          <Statistics
            stats={{ good, neutral, bad }}
            sum={countTotalFeedback()}
            positivePercantage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification massage={`There is no feedback`} />
        )}
      </Section>
    </Container>
  );
};
