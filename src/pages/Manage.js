import { htmlToElement } from '../utils.js';
import { store } from '../store.js';
import { renderSidebar } from '../components/Sidebar.js';

const chevron = (size = 18) => `<span class="list-chevron"><svg width="${size}" height="${size}" viewBox="0 0 18 18" fill="none"><path d="M7 4.9L11.1 9L7 13.1" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;

export function renderManage() {
  const { meetingDraft } = store.state;
  const rec = meetingDraft.selectedRecommendation || store.state.recommendations[0];

  const html = `
    <div class="app-layout">
      <div id="sidebar-container"></div>
      <div class="main-content">
        <div class="page-title">회의 관리</div>
        <div class="tab-sections">
          <div class="tab-section">
            <div class="tab-section-title">다가오는 회의</div>
            <div class="list-group">
              <div class="list-row clickable" id="first-meeting">
                <div class="list-row-main">
                  <div class="list-row-title">${meetingDraft.title || '주간 프로젝트 회의'}</div>
                  <div class="list-row-sub">${rec.displayTime} · ${meetingDraft.method} · ${meetingDraft.room}</div>
                </div>
                ${chevron()}
              </div>
              <div class="list-row">
                <div class="list-row-main">
                  <div class="list-row-title">디자인 팀 주간 리뷰</div>
                  <div class="list-row-sub">7월 16일 목요일 · 오후 4:00~5:00 · 화상</div>
                </div>
                ${chevron()}
              </div>
              <div class="list-row">
                <div class="list-row-main">
                  <div class="list-row-title">마케팅 브리핑</div>
                  <div class="list-row-sub">7월 17일 금요일 · 오후 1:00~2:00 · 회의실 B</div>
                </div>
                ${chevron()}
              </div>
            </div>
          </div>
          <div class="tab-section">
            <div class="tab-section-title">지난 회의</div>
            <div class="list-group">
              <div class="list-row past">
                <div class="list-row-main">
                  <div class="list-row-title">분기 전략 회의</div>
                  <div class="list-row-sub">7월 13일 월요일 · 오후 2:00~3:00</div>
                </div>
                ${chevron()}
              </div>
              <div class="list-row past">
                <div class="list-row-main">
                  <div class="list-row-title">마케팅 브리핑</div>
                  <div class="list-row-sub">7월 8일 수요일 · 오전 9:00~10:00</div>
                </div>
                ${chevron()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  const element = htmlToElement(html);
  element.querySelector('#sidebar-container').appendChild(renderSidebar());
  element.querySelector('#first-meeting').addEventListener('click', () => store.navigate('/manage/detail'));
  return element;
}
