import { htmlToElement } from '../utils.js';
import { store } from '../store.js';
import { renderSidebar } from '../components/Sidebar.js';
import { renderBreadcrumbs } from '../components/Breadcrumbs.js';

export function renderCreateRange() {
  const { range } = store.state.meetingDraft;
  
  // Convert YYYY-MM-DD to formatted string
  const formatDate = (dateStr) => {
    if (dateStr === '2026-07-14') return '2026년 7월 14일 (화)';
    if (dateStr === '2026-07-17') return '2026년 7월 17일 (금)';
    if (dateStr === '2026-07-21') return '2026년 7월 21일 (화)';
    return dateStr;
  };

  const formatTime = (timeStr) => {
    if (timeStr === '09:00') return '오전 9:00';
    if (timeStr === '18:00') return '오후 6:00';
    return timeStr;
  };
  
  const html = `
    <div class="app-layout">
      <div id="sidebar-container"></div>
      
      <div class="main-content create-content">
        <div class="create-header" id="breadcrumbs-container"></div>
        
        <div class="t-title-1 create-title">날짜·시간 범위 설정</div>
        <div class="t-body-1 create-subtitle">회의 시간을 찾을 날짜와 시간 범위를 정해요.</div>
        
        <div class="range-card">
          <div class="range-card-title">날짜 범위</div>
          <div class="range-row">
            <div class="range-col">
              <div class="range-label">회의 시작 날짜</div>
              <div class="range-box">
                <span class="range-value">${formatDate(range.start)}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="#B0B8C1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <div class="range-col">
              <div class="range-label">회의 종료 날짜</div>
              <div class="range-box" id="end-date-box" style="cursor:pointer;">
                <span class="range-value">${formatDate(range.end)}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="#B0B8C1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div class="range-card">
          <div class="range-card-title">시간 범위</div>
          <div class="range-row">
            <div class="range-col">
              <div class="range-label">회의 시작 시간</div>
              <div class="range-box">
                <span class="range-value">${formatTime(range.startTime)}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="#B0B8C1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
            <div class="range-col">
              <div class="range-label">회의 종료 시간</div>
              <div class="range-box">
                <span class="range-value">${formatTime(range.endTime)}</span>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6L8 10L12 6" stroke="#B0B8C1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div class="bottom-actions">
          <button class="btn-outline" id="prev-btn">이전</button>
          <button class="btn-primary" id="next-btn">다음으로</button>
        </div>
      </div>
    </div>
  `;
  
  const element = htmlToElement(html);
  
  element.querySelector('#sidebar-container').appendChild(renderSidebar());
  element.querySelector('#breadcrumbs-container').appendChild(renderBreadcrumbs(3));
  
  element.querySelector('#end-date-box').addEventListener('click', () => {
    const isCurrently17 = store.state.meetingDraft.range.end === '2026-07-17';
    const nextVal = isCurrently17 ? '2026-07-21' : '2026-07-17';
    
    store.setState({
      meetingDraft: {
        ...store.state.meetingDraft,
        range: { ...store.state.meetingDraft.range, end: nextVal }
      }
    });
  });
  
  element.querySelector('#prev-btn').addEventListener('click', () => {
    store.navigate('/create/2');
  });
  
  element.querySelector('#next-btn').addEventListener('click', () => {
    // 결과 화면 3의 "다른 날짜에서 찾기"로 진입한 경우: 바로 로딩 → 결과 화면 2
    if (store.state.rangeSearchFromResult3) {
      store.setState({ rangeSearchFromResult3: false });
      store.navigate('/loading');
      setTimeout(() => store.navigate('/result'), 1500);
      return;
    }
    store.navigate('/create/4');
  });
  
  return element;
}
