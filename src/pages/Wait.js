import { htmlToElement } from '../utils.js';
import { store } from '../store.js';
import { renderSidebar } from '../components/Sidebar.js';

export function renderWait() {
  const { meetingDraft } = store.state;
  const rec = meetingDraft.selectedRecommendation || store.state.recommendations[0];
  const total = meetingDraft.attendees.required.length + meetingDraft.attendees.optional.length;

  const html = `
    <div class="app-layout">
      <div id="sidebar-container"></div>
      <div class="main-content wait-content">
        <div class="back-link" id="back-btn">
          <img src="public/icons/arrow-left-circle.svg" alt="" width="20" height="20" />
          진행 중인 조율
        </div>
        <div class="wait-body">
          <div class="page-title">민지님의 답변을 기다리고 있어요</div>
          <div class="wait-cards">
            <div class="wait-notice">
              <img src="public/icons/clock-orange.svg" alt="" width="16" height="16" />
              <div class="wait-notice-texts">
                <div class="wait-notice-title">선택한 시간은 답변 전까지 임시로 유지돼요.</div>
                <div class="wait-notice-sub">민지님에게 참석 확인을 요청했어요.</div>
              </div>
            </div>
            <div class="wait-card">
              <div class="wait-card-title">참석 확인 현황</div>
              <div class="wait-status-row">
                <div class="wait-avatar">민</div>
                <div class="wait-person-info">
                  <div class="wait-person-name">김민지</div>
                  <div class="wait-person-role">Product Manager</div>
                </div>
                <span class="status-pill orange">답변 대기</span>
              </div>
            </div>
            <div class="wait-card">
              <div class="wait-card-title">선택한 일정 정보</div>
              <div class="wait-info-grid">
                <div class="wait-info-col">
                  <div class="wait-info-label">회의 제목</div>
                  <div class="wait-info-value">${meetingDraft.title || '주간 프로젝트 회의'}</div>
                </div>
                <div class="wait-info-col">
                  <div class="wait-info-label">일시</div>
                  <div class="wait-info-value">${rec.displayTime}</div>
                </div>
                <div class="wait-info-col">
                  <div class="wait-info-label">참석 가능</div>
                  <div class="wait-info-value green">${total}명 중 ${total - 1}명 가능</div>
                </div>
              </div>
            </div>
          </div>
          <div class="wait-actions">
            <button class="wait-text-btn" id="other-recs-btn">다른 추천 시간 보기</button>
            <button class="btn-outline" id="create-without-btn">민지님 제외하고 만들기</button>
            <button class="btn-primary" id="resend-btn">다시 알림 보내기</button>
          </div>
        </div>
      </div>
    </div>`;

  const element = htmlToElement(html);
  element.querySelector('#sidebar-container').appendChild(renderSidebar());

  element.querySelector('#back-btn').addEventListener('click', () => store.navigate('/coordination'));
  element.querySelector('#other-recs-btn').addEventListener('click', () => store.navigate('/result'));
  element.querySelector('#create-without-btn').addEventListener('click', () => store.navigate('/created'));

  return element;
}
