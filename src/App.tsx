import React from 'react';
import { TimelineProvider } from './components/TimelineContext';
import Timeline from './components/Timeline';

function App() {
  return (
    <TimelineProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto py-8">
          <Timeline />
        </div>
      </div>
    </TimelineProvider>
  );
}


export default App;