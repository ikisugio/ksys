import React, { useState, useEffect } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import format from 'date-fns/format';
import { ja } from 'date-fns/locale';

function App() {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);

  function handleSelect(ranges) {
    setState([ranges.selection]);
  }

  useEffect(() => {
    // ボタンのテキストを日本語に変更
    const buttons = document.querySelectorAll(".rdrStaticRangeLabel");
    if (buttons.length >= 6) {
      buttons[2].textContent = '今週';
      buttons[3].textContent = '先週';
      buttons[4].textContent = '今月';
      buttons[5].textContent = '先月';
    }

    // 不要なボタンと領域を非表示にする
    buttons[0].style.display = 'none'; // 今日
    buttons[1].style.display = 'none'; // 昨日
    const inputRanges = document.querySelector(".rdrInputRanges");
    if (inputRanges) {
      inputRanges.style.display = 'none';
    }

    // ボタンのスタイルをカスタマイズ
    document.querySelectorAll('.rdrStaticRange').forEach(button => {
      button.style.fontSize = '16px'; // フォントサイズ
      button.style.width = '100px'; // ボタンの幅
    });
    
  }, []);

  return (
    <div>
      <DateRangePicker
        onChange={handleSelect}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
        locale={ja}
      />
      <p>開始日: {state[0].startDate && format(state[0].startDate, 'yyyy/MM/dd', { locale: ja })}</p>
      <p>終了日: {state[0].endDate && format(state[0].endDate, 'yyyy/MM/dd', { locale: ja })}</p>
    </div>
  );
}

export default App;
