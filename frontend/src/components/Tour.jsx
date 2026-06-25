import { useState, useEffect } from 'react';
import { Joyride, STATUS } from 'react-joyride';
import { useGame } from '../utils/GameContext';

const Tour = () => {
  const [run, setRun] = useState(false);
  const { isHost } = useGame(); // Might need to check if user is host or not

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      setRun(true);
    }
  }, []);

  const handleJoyrideCallback = (data) => {
    const { status, type, action } = data;
    console.log('Joyride callback:', data);
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status) || action === 'close' || action === 'skip' || type === 'tour:end') {
      setRun(false);
      localStorage.setItem('hasSeenTour', 'true');
    }
  };

  const steps = [
    {
      target: 'body',
      content: 'Welcome to Code Arena! 🚀 This quick tour will show you how to get started.',
      placement: 'center',
    },
    {
      target: '.tour-step-stats',
      content: 'Here you can see your personal bests, win rate, and current streak. Keep fixing bugs to climb the ranks!',
      placement: 'bottom',
    },
    {
      target: '.tour-step-theme',
      content: 'Toggle between dark and light themes here.',
      placement: 'left',
    },
    {
      target: '.tour-step-topic',
      content: 'Select the programming language or framework you want to practice.',
      placement: 'top',
    },
    {
      target: '.tour-step-ai',
      content: 'Ready to race? Start an instant match against our AI bots. Choose your difficulty level from Chill to Godlike!',
      placement: 'top',
    },
    {
      target: '.tour-step-multiplayer',
      content: 'Want to challenge a friend? Create a room and share the code, or join an existing room here.',
      placement: 'top',
    }
  ];

  return (
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      run={run}
      scrollToFirstStep
      showProgress
      showSkipButton
      steps={steps}
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: '#8a2be2', // Purple accent
          backgroundColor: '#1a1f2e',
          textColor: '#e2e8f0',
          arrowColor: '#1a1f2e',
        },
        tooltipContainer: {
          textAlign: 'left'
        },
        buttonNext: {
          backgroundColor: '#22c55e', // Green accent
        },
        buttonBack: {
          marginRight: 10,
          color: '#e2e8f0'
        },
        buttonSkip: {
          color: '#94a3b8'
        }
      }}
    />
  );
};

export default Tour;
