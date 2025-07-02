import React, { createContext, useEffect, useState } from "react";

// Define TimerGroup interface
interface TimerGroupElement {
  time: number;
  cartId: string;
  intervalId: any;
}

// Define the context shape
interface TimerContextType {
  timerGroup: TimerGroupElement[];
  startTimer: (cartId: string) => void;
  resetTimer: (intervalId: any) => void;
}

// Create the context with an initial tamice value
export const TimerContext = createContext<TimerContextType>({
  timerGroup: [],
  startTimer: (cartId: string) => {},
  resetTimer: (intervalId: any) => {},
});

interface TimerProviderProps {
  children: React.ReactNode;
}

// Create a provider component
const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
  const [timerGroup, setTimerGroup] = useState<TimerGroupElement[]>([]);

  // Load the timer group data from localStorage on component mount
  useEffect(() => {
    const storedTimerGroup = localStorage.getItem("timerGroup");
    if (storedTimerGroup) {
      setTimerGroup(JSON.parse(storedTimerGroup));
    }
  }, []);

  // Save the timer group data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("timerGroup", JSON.stringify(timerGroup));
  }, [timerGroup]);

  // Fix: Added a function to update the time for a specific timer
  const updateTimerTime = (intervalId: NodeJS.Timeout) => {
    setTimerGroup((prevTimers) =>
      prevTimers.map((timer) =>
        timer.intervalId === intervalId
          ? { ...timer, time: timer.time + 1 }
          : timer
      )
    );
  };

  const startTimer = (cartId: string) => {
    let newIntervalId = setInterval(() => {
      updateTimerTime(newIntervalId); // Call the update function with the current interval ID
    }, 1000); // Increment every second

    // Add the new timer to the timer group with an initial time of 0
    setTimerGroup((prev) => [
      ...prev,
      { intervalId: newIntervalId, time: 0, cartId },
    ]);
  };

  const resetTimer = (intervalId: any) => {
    if (intervalId) {
      clearInterval(intervalId);
      setTimerGroup((prev) => [
        ...prev.filter((item: any) => item.intervalId !== intervalId),
      ]);
    }
  };

  return (
    <TimerContext.Provider value={{ timerGroup, startTimer, resetTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export default TimerProvider;
