import React, { useState } from 'react';
import { Statistics } from './Statistics/Statistics';
import { FeedBackOptions } from './FeedbackOptions/FeedbackOptions';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleLeaveFeedback = option => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [option]: prevFeedback[option] + 1,
    }));
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const { good, neutral, bad } = feedback;
    const total = good + neutral + bad;
    return Math.round((good * 100) / total) || 0;
  };

  const total = countTotalFeedback();
  const positiveFeedback = countPositiveFeedbackPercentage();
  const options = Object.keys(feedback);

  return (
    <>
      <Section title="Please leave feedback">
        <FeedBackOptions options={options} onLeaveFeedback={handleLeaveFeedback} />
      </Section>

      {total > 0 ? (
        <Section title="Statistics">
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
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
