import React, { useState } from 'react';
import Statistics from './Statistics/Statistics';
import FeedBackOptions from './FeedbackOptions/FeedbackOptions';
import Section from './Section/Section';
import Notification from './Notification/Notification';

const App = () => {
  const [goodFeedback, setGoodFeedback] = useState(0);
  const [neutralFeedback, setNeutralFeedback] = useState(0);
  const [badFeedback, setBadFeedback] = useState(0);

  const handleLeaveFeedback = (option) => {
    switch (option) {
      case 'good':
        setGoodFeedback((prevGoodFeedback) => prevGoodFeedback + 1);
        break;
      case 'neutral':
        setNeutralFeedback((prevNeutralFeedback) => prevNeutralFeedback + 1);
        break;
      case 'bad':
        setBadFeedback((prevBadFeedback) => prevBadFeedback + 1);
        break;
      default:
        break;
    }
  };

  const countTotalFeedback = () => {
    return goodFeedback + neutralFeedback + badFeedback;
  };

  const countPositiveFeedbackPercentage = () => {
    const total = goodFeedback + neutralFeedback + badFeedback;
    return Math.round((goodFeedback * 100) / total) || 0;
  };

  const total = countTotalFeedback();
  const positiveFeedback = countPositiveFeedbackPercentage();

  return (
    <>
      <Section title="Please leave feedback">
        <FeedBackOptions options={['good', 'neutral', 'bad']} onLeaveFeedback={handleLeaveFeedback} />
      </Section>

      {total > 0 ? (
        <Section title="Statistics">
          <Statistics
            good={goodFeedback}
            neutral={neutralFeedback}
            bad={badFeedback}
            total={total}
            positivePercentage={positiveFeedback}
          />
        </Section>
      ) : (
        <Notification message="There is no feedback" />
      )}
    </>
  );
};

export default App;
