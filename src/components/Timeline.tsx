import React, { useState } from 'react';
import { Plus, Clock, Activity as ActivityIcon } from 'lucide-react';
import { useTimeline } from './TimelineContext';
import TimelineItem from './TimelineItem';
import ActivityForm from './ActivityForm';

const Timeline: React.FC = () => {
  const { state } = useTimeline();
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                <Clock size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Recent Activities</h1>
                <p className="text-blue-100 text-sm">
                  {state.activities.length} {state.activities.length === 1 ? 'activity' : 'activities'} tracked
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors backdrop-blur-sm"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Add Activity</span>
            </button>
          </div>
        </div>

        {/* Timeline Content */}
        <div className="p-6">
          {state.activities.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ActivityIcon size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No activities yet</h3>
              <p className="text-gray-500 mb-6">Start tracking your activities by adding your first entry.</p>
              <button
                onClick={() => setIsFormOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 mx-auto transition-colors"
              >
                <Plus size={18} />
                <span>Add Your First Activity</span>
              </button>
            </div>
          ) : (
            <div className="space-y-0">
              {state.activities.map((activity, index) => (
                <TimelineItem
                  key={activity.id}
                  activity={activity}
                  isLast={index === state.activities.length - 1}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ActivityForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
};

export default Timeline;