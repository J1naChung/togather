import { htmlToElement } from '../utils.js';
import { store } from '../store.js';
import { renderSidebar } from '../components/Sidebar.js';

function formatMonthDay(iso) {
  const [, m, d] = iso.split('-').map(Number);
  return `${m}월 ${d}일`;
}

function formatTime(t) {
  const [h, min] = t.split(':').map(Number);
  const ampm = h < 12 ? '오전' : '오후';
  const h12 = h % 12 || 12;
  return `${ampm} ${h12}:${String(min).padStart(2, '0')}`;
}

export function renderResult3() {
  const { range, duration } = store.state.meetingDraft;
  // 같은 달이면 종료일은 일자만 표기 (Figma: "7월 14일~17일")
  const endText = range.start.slice(0, 7) === range.end.slice(0, 7)
    ? `${Number(range.end.split('-')[2])}일`
    : formatMonthDay(range.end);
  const rangeText = `${formatMonthDay(range.start)}~${endText} · ${formatTime(range.startTime)}~${formatTime(range.endTime)} · ${duration} 회의`;

  const html = `
    <div class="app-layout">
      <div id="sidebar-container"></div>
      <div class="main-content result3-content">
        <div class="result3-container">
          <div class="result3-icon">
            <img src="public/icons/calendar-x.svg" alt="" width="23" height="25" />
          </div>
          <div class="result3-title">현재 날짜 범위에는<br>가능한 시간이 없어요</div>
          <div class="result3-subtitle">날짜 범위를 넓히면 가능한 시간이 더 많아져요.</div>
          <div class="result3-range-pill">
            <span class="result3-range-label">현재 범위</span>
            <span class="result3-range-value">${rangeText}</span>
          </div>
          <div class="result3-actions">
            <button class="btn-outline" id="change-cond-btn">회의 조건 변경</button>
            <button class="btn-primary" id="other-date-btn">다른 날짜에서 찾기</button>
          </div>
        </div>
      </div>
    </div>`;

  const element = htmlToElement(html);
  element.querySelector('#sidebar-container').appendChild(renderSidebar());

  element.querySelector('#change-cond-btn').addEventListener('click', () => store.navigate('/result1'));

  element.querySelector('#other-date-btn').addEventListener('click', () => {
    store.setState({ rangeSearchFromResult3: true });
    store.navigate('/create/3');
  });

  return element;
}
