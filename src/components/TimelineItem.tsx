import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Activity } from './TimelineContext';

interface TimelineItemProps {
  activity: Activity;
  isLast: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ activity, isLast }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="relative flex items-start space-x-4 md:space-x-6 pb-6 md:pb-8 group">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-2 md:left-3 top-6 w-0.5 h-full bg-gray-200 group-hover:bg-blue-200 transition-colors"></div>
      )}
      
      {/* Timeline dot */}
      <div className="relative z-10 w-4 h-4 md:w-6 md:h-6 bg-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors shadow-md">
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex-1 min-w-0 mb-1 md:mb-0">
            {activity.link ? (
              <a
                href={activity.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 font-medium hover:text-blue-600 transition-colors inline-flex items-center group/link"
              >
                <span className="truncate">{activity.title}</span>
                <ExternalLink size={14} className="ml-1 opacity-0 group-hover/link:opacity-100 transition-opacity flex-shrink-0" />
              </a>
            ) : (
              <span className="text-gray-900 font-medium block truncate">{activity.title}</span>
            )}
          </div>
          <div className="text-sm text-gray-500 flex-shrink-0">
            {formatDate(activity.date)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;