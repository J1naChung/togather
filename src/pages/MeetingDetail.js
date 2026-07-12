import { htmlToElement } from '../utils.js';
import { store } from '../store.js';
import { renderSidebar } from '../components/Sidebar.js';

// Figma 13:277 참석자 아바타 색
const AVATAR_COLORS = { '정지나': '#8aa9db', '이지은': '#7fc4a6', '정다은': '#ddb273', '박수현': '#93a8d6', '김민지': '#de9ca2', '박현우': '#9aa3ae' };
const AVATAR_CHARS = { '정지나': '정', '이지은': '이', '정다은': '다', '박수현': '수', '김민지': '민', '박현우': '현' };

export function renderMeetingDetail() {
  const { meetingDraft } = store.state;
  const rec = meetingDraft.selectedRecommendation || store.state.recommendations[0];
  const { attendees } = meetingDraft;

  const people = [
    ...attendees.required.map(p => ({ ...p, role2: p.host ? '주최자' : '필수' })),
    ...attendees.optional.map(p => ({ ...p, role2: '선택' }))
  ];

  const attendeeRows = people.map(p => {
    const noAnswer = p.name === '박현우';
    return `
      <div class="attendee-row">
        <div class="attendee-avatar" style="background:${AVATAR_COLORS[p.name] || '#9aa3ae'}">${AVATAR_CHARS[p.name] || p.name.charAt(0)}</div>
        <div class="attendee-main">
          <span class="attendee-name">${p.name}</span>
          <span class="attendee-role">${p.role2}</span>
        </div>
        <span class="status-pill ${noAnswer ? 'grey' : 'green'}">${noAnswer ? '미응답' : '수락'}</span>
      </div>`;
  }).join('');

  const html = `
    <div class="app-layout">
      <div id="sidebar-container"></div>
      <div class="main-content mdetail-content">
        <div class="back-link" id="back-btn">
          <img src="public/icons/arrow-left-circle.svg" alt="" width="20" height="20" />
          회의 관리
        </div>
        <div class="mdetail-body">
          <div class="mdetail-header">
            <div class="mdetail-heading">
              <div class="mdetail-title-row">
                <span class="page-title">${meetingDraft.title || '주간 프로젝트 회의'}</span>
                <span class="status-pill green">확정</span>
              </div>
              <div class="mdetail-subtitle">${rec.dateTime} · ${meetingDraft.duration}</div>
            </div>
            <button class="btn-m">회의 수정</button>
          </div>
          <div class="mdetail-columns">
            <div class="mdetail-column">
              <div class="tab-section-title">기본 정보</div>
              <div class="info-card">
                <div class="info-row">
                  <span class="info-label">회의 방식</span>
                  <span class="info-value">${meetingDraft.method}</span>
                </div>
                <div class="info-row">
                  <span class="info-label">회의실</span>
                  <span class="info-value">${meetingDraft.room} (수용 인원 8명)</span>
                </div>
                <div class="info-row">
                  <span class="info-label">Zoom 링크</span>
                  <span class="info-link"><span>${meetingDraft.zoomLink}</span><span>복사</span></span>
                </div>
              </div>
            </div>
            <div class="mdetail-column">
              <div class="tab-section-title">참석자</div>
              <div class="info-card">
                ${attendeeRows}
              </div>
            </div>
          </div>
          <div class="cancel-card">
            <div class="cancel-main">
              <div class="cancel-title">회의 취소</div>
              <div class="cancel-desc">참석자에게 취소 알림을 보내고, 회의실 예약과 Zoom 링크도 함께 취소해요.</div>
            </div>
            <span class="cancel-action">회의 취소</span>
          </div>
        </div>
      </div>
    </div>`;

  const element = htmlToElement(html);
  element.querySelector('#sidebar-container').appendChild(renderSidebar());
  element.querySelector('#back-btn').addEventListener('click', () => store.navigate('/manage'));
  return element;
}
