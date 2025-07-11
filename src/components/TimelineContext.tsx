import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

export interface Activity {
  id: string;
  title: string;
  date: string;
  link?: string;
}

interface TimelineState {
  activities: Activity[];
}

type TimelineAction = 
  | { type: 'ADD_ACTIVITY'; payload: Activity }
  | { type: 'LOAD_ACTIVITIES'; payload: Activity[] };

const TimelineContext = createContext<{
  state: TimelineState;
  dispatch: React.Dispatch<TimelineAction>;
} | undefined>(undefined);

const timelineReducer = (state: TimelineState, action: TimelineAction): TimelineState => {
  switch (action.type) {
    case 'ADD_ACTIVITY':
      const newActivities = [...state.activities, action.payload].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      return { ...state, activities: newActivities };
    case 'LOAD_ACTIVITIES':
      return { ...state, activities: action.payload };
    default:
      return state;
  }
};

export const TimelineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(timelineReducer, { activities: [] });

  useEffect(() => {
    const savedActivities = localStorage.getItem('timeline-activities');
    if (savedActivities) {
      try {
        const activities = JSON.parse(savedActivities);
        dispatch({ type: 'LOAD_ACTIVITIES', payload: activities });
      } catch (error) {
        console.error('Failed to load activities from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('timeline-activities', JSON.stringify(state.activities));
  }, [state.activities]);

  return (
    <TimelineContext.Provider value={{ state, dispatch }}>
      {children}
    </TimelineContext.Provider>
  );
};

export const useTimeline = () => {
  const context = useContext(TimelineContext);
  if (context === undefined) {
    throw new Error('useTimeline must be used within a TimelineProvider');
  }
  return context;
};