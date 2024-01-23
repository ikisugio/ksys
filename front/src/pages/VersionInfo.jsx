import React, { useState } from 'react';
import 'react-date-range/dist/styles.css'; // スタイルシート
import 'react-date-range/dist/theme/default.css'; // テーマCSS
import { DateRangePicker } from 'react-date-range';
import format from 'date-fns/format';

function App() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);

  function handleSelect(ranges) {
    console.log(ranges); // { selection: { startDate: [native Date Object], endDate: [native Date Object] } }
    setState([ranges.selection]);
  }

  return (
    <div>
      <DateRangePicker
        onChange={handleSelect}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
      />
      <p>開始日: {state[0].startDate && format(state[0].startDate, 'yyyy/MM/dd')}</p>
      <p>終了日: {state[0].endDate && format(state[0].endDate, 'yyyy/MM/dd')}</p>
    </div>
  );
}

export default App;
