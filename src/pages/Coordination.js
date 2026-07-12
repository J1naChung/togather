import { htmlToElement } from '../utils.js';
import { store } from '../store.js';
import { renderSidebar } from '../components/Sidebar.js';

const chevron = `<span class="list-chevron"><svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 4.9L11.1 9L7 13.1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;

export function renderCoordination() {
  const { meetingDraft } = store.state;
  const rec = meetingDraft.selectedRecommendation || store.state.recommendations[0];
  const total = meetingDraft.attendees.required.length + meetingDraft.attendees.optional.length;

  const html = `
    <div class="app-layout">
      <div id="sidebar-container"></div>
      <div class="main-content">
        <div class="page-title">진행 중인 조율</div>
        <div class="list-group">
          <div class="list-row coord">
            <div class="list-row-main">
              <div class="list-row-title">Q3 전략 논의</div>
              <div class="list-row-sub">7월 21일 화요일~25일 토요일 중 조율 · 참석자 5명</div>
            </div>
            <span class="status-pill blue">시간 선택 필요</span>
            ${chevron}
          </div>
          <div class="list-row coord">
            <div class="list-row-main">
              <div class="list-row-title">신규 파트너 온보딩 킥오프</div>
              <div class="list-row-sub">7월 23일 목요일 · 오전 10:30~11:30 · 참석자 4명</div>
            </div>
            <span class="status-pill blue">회의 생성 필요</span>
            ${chevron}
          </div>
          <div class="list-row coord clickable" id="weekly-meeting">
            <div class="list-row-main">
              <div class="list-row-title">${meetingDraft.title || '주간 프로젝트 회의'}</div>
              <div class="list-row-sub">${rec.displayTime} · 참석자 ${total}명</div>
            </div>
            <span class="status-pill orange">답변 대기</span>
            ${chevron}
          </div>
        </div>
      </div>
    </div>`;

  const element = htmlToElement(html);
  element.querySelector('#sidebar-container').appendChild(renderSidebar());
  element.querySelector('#weekly-meeting').addEventListener('click', () => store.navigate('/wait'));
  return element;
}
