import { htmlToElement } from '../utils.js';
import { renderSidebar } from '../components/Sidebar.js';

const unread = [
  { title: '민지님이 참석할 수 있다고 답했어요', sub: '주간 프로젝트 회의 · 7월 16일 오후 2시', time: '10분 전' },
  { title: '회의실 A 예약이 취소됐어요', sub: '주간 프로젝트 회의 · 7월 16일 오후 2시', time: '1시간 전' },
  { title: '수아님이 참석 어렵다고 답했어요', sub: '신규 기능 기획 검토 · 7월 10일 오전 11시', time: '어제' }
];

const read = [
  { title: '수현님에게 참석 확인 요청을 보냈어요', sub: '제품 로드맵 리뷰 · 7월 17일 오전 10시', time: '2시간 전' },
  { title: '회의가 확정됐어요', sub: '상반기 전체 회고 · 7월 9일 오후 4시', time: '2일 전' },
  { title: 'Zoom 링크를 만들었어요', sub: '상반기 전체 회고 · 7월 9일 오후 4시', time: '2일 전' },
  { title: '회의실이 변경됐어요', sub: '디자인 시스템 정기 싱크 · 7월 7일 오후 1시', time: '1주 전' }
];

const row = (n, isUnread) => `
  <div class="list-row notif ${isUnread ? '' : 'read'}">
    ${isUnread ? '<span class="notif-dot"></span>' : ''}
    <div class="list-row-main">
      <div class="list-row-title">${n.title}</div>
      <div class="list-row-sub">${n.sub}</div>
    </div>
    <span class="notif-time">${n.time}</span>
  </div>`;

export function renderNotifications() {
  const html = `
    <div class="app-layout">
      <div id="sidebar-container"></div>
      <div class="main-content">
        <div class="page-title">알림함</div>
        <div class="tab-sections" style="gap: 24px;">
          <div class="tab-section">
            <div class="tab-section-title">처리 필요</div>
            <div class="list-group">${unread.map(n => row(n, true)).join('')}</div>
          </div>
          <div class="tab-section">
            <div class="tab-section-title">이전 알림</div>
            <div class="list-group">${read.map(n => row(n, false)).join('')}</div>
          </div>
        </div>
      </div>
    </div>`;

  const element = htmlToElement(html);
  element.querySelector('#sidebar-container').appendChild(renderSidebar());
  return element;
}
