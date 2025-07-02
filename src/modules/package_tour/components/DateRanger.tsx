import React, { useRef, useState } from 'react';
import { DateRangePicker, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './CustomCalendar.css'; // Custom CSS for styling and scrolling

const DateRanger: React.FC = () => {
  const availableDates = [new Date(), new Date('2023-07-15'), new Date('2023-07-20')];

  // Filter available dates
  const minDate = availableDates.reduce((min, date) => (date < min ? date : min));
  const maxDate = availableDates.reduce((max, date) => (date > max ? date : max));

  const [selectedRange, setSelectedRange] = useState<Range[]>([
    {
      startDate: minDate,
      endDate: minDate,
      key: 'selection',
    },
  ]);

  interface RangeKeyDict {
    [key: string]: Range;
  }

  const handleDateSelect = (rangesByKey: RangeKeyDict) => {
    const ranges = Object.values(rangesByKey); // Convert rangesByKey object to an array of ranges
    setSelectedRange(ranges);
  };

  const renderDayContents = (date: Date) => {
    const isAvailable = availableDates.some((d) => d.getTime() === date.getTime());

    return (
      <div className={`custom-day ${isAvailable ? 'available' : ''}`}>
        {date.getDate()}
      </div>
    );
  };
  const DateRangePickerRef = useRef(null)

  return (
    <div >
      <DateRangePicker
        ref={DateRangePickerRef}
        ranges={selectedRange}
        onChange={handleDateSelect}
        minDate={minDate}
        maxDate={maxDate}
      />
    </div>
  );
};

export default DateRanger;
