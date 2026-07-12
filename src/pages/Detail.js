import { htmlToElement } from '../utils.js';
import { store } from '../store.js';
import { renderSidebar } from '../components/Sidebar.js';

export function renderDetail() {
  const { selectedResultId } = store.state;
  const { avoidLunchTextHidden, includeAfterLunch, avoidFocusTime } = store.state.flags;
  const { attendees } = store.state.meetingDraft;
  const selected = store.state.meetingDraft.selectedRecommendation;
  
  // Just mock data for the selected result.
  // The selectedResultId tells us which one it is. For now we just show a generic view based on figma.
  
  const allPeople = [...attendees.required, ...attendees.optional];
  
  function getAvatarColor(name) {
    if (name.includes('정지')) return '#A3C8FC';
    if (name.includes('이지')) return '#8CE0A7';
    if (name.includes('정다')) return '#F9C38B';
    if (name.includes('박수')) return '#A3C8FC'; 
    if (name.includes('김민')) return '#F8B3C0';
    if (name.includes('박현')) return '#D1D6DB'; 
    return '#A3C8FC';
  }

  function getDisplayChar(name) {
    let displayChar = name.charAt(0);
    if (name === '정다은') displayChar = '다';
    if (name === '박수현') displayChar = '수';
    if (name === '김민지') displayChar = '민';
    if (name === '박현우') displayChar = '현';
    return displayChar;
  }

  const html = `
    <div class="app-layout">
      <div id="sidebar-container"></div>
      
      <div class="main-content detail-content">
        <div class="back-link" id="back-btn">
          <img src="public/icons/arrow-left-circle.svg" alt="" width="20" height="20" />
          추천 결과
        </div>
        
        <div class="t-title-1 result-title" style="margin-bottom:32px;">일정 자세히 보기</div>
        
        <div class="detail-banner">
          <div>
            <div class="detail-banner-label">선택한 추천 시간</div>
            <div class="detail-banner-time">${selected.dateTime}</div>
          </div>
          <div class="detail-banner-status">필수 4명 · 선택 2명 참석 가능</div>
        </div>
        
        <div class="detail-timeline-card">
          <div class="detail-timeline-header">
            <div>
              <div class="detail-timeline-title">참석자 일정 현황</div>
              <div class="detail-timeline-subtitle">결정에 필요한 참석 상태만 보여드려요. 일정 제목이나 사유는 표시하지 않아요.</div>
            </div>
            <div class="date-nav">
              <button class="date-nav-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8L10 4" stroke="#8B95A1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              <span class="date-nav-text">${selected.displayTime.split(' · ')[0]}</span>
              <button class="date-nav-btn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 12L10 8L6 4" stroke="#8B95A1" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
            </div>
          </div>
          
          <div class="timeline-grid">
            <div class="timeline-row">
              <div class="timeline-row-header" style="color: var(--toss-grey-500); font-size: 13px;">참석자</div>
              <div class="timeline-time-header">
                <div class="timeline-time-label">오후 12:00</div>
                <div class="timeline-time-label">오후 1:00</div>
                <div class="timeline-time-label selected-col">오후 2:00</div>
                <div class="timeline-time-label">오후 3:00</div>
                <div class="timeline-time-label">오후 4:00</div>
                <div class="timeline-time-label">오후 5:00</div>
              </div>
            </div>
            
            ${allPeople.map((p, personIndex) => {
              const isRequired = attendees.required.some(req => req.name === p.name);
              const patterns = [
                ['unavailable','available','available selected-col','available','unavailable','unavailable'],
                ['available','unavailable','available selected-col','available','available','available'],
                ['available','available','available selected-col','unavailable','available','unavailable'],
                ['unavailable','available','available selected-col','available','available','available'],
                ['available','unavailable','available selected-col','unavailable','available','unavailable'],
                ['available','available','available selected-col','available','unavailable','unavailable']
              ];
              const cells = patterns[personIndex];
              
              return `
              <div class="timeline-row">
                <div class="timeline-row-header">
                  <div class="person-avatar" style="background-color: ${getAvatarColor(p.name)}">${getDisplayChar(p.name)}</div>
                  <div style="display:flex; flex-direction:column; gap:2px;">
                    <span class="timeline-person-name">${p.name}</span>
                    <span class="timeline-person-role">${p.host ? '주최자' : (isRequired ? '필수' : '선택')}</span>
                  </div>
                </div>
                <div class="timeline-cells">
                  ${cells.map(c => `<div class="timeline-cell ${c}"></div>`).join('')}
                </div>
              </div>
              `;
            }).join('')}
            
          </div>
          
          <div class="detail-footer">
            <div class="prefs-applied">
              <span class="prefs-label">반영된 선호</span>
              ${!avoidLunchTextHidden && !includeAfterLunch ? `<span class="pref-chip">점심 직후 피하기</span>` : ''}
              <span class="pref-chip">집중 시간 피하기</span>
            </div>
            <div class="legend">
              <div class="legend-item"><div class="legend-box avail"></div> 참석 가능</div>
              <div class="legend-item"><div class="legend-box unavail"></div> 참석 불가</div>
            </div>
          </div>
        </div>
        
        <div class="detail-actions">
          <button class="btn-primary" id="confirm-btn">이 시간으로 선택</button>
        </div>
      </div>
    </div>
  `;
  
  const element = htmlToElement(html);
  element.querySelector('#sidebar-container').appendChild(renderSidebar());
  
  element.querySelector('#back-btn').addEventListener('click', () => {
    store.navigate('/result');
  });
  
  element.querySelector('#confirm-btn').addEventListener('click', () => {
    store.navigate('/result');
  });
  
  return element;
}
