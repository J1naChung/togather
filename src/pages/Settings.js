import { htmlToElement } from '../utils.js';
import { renderSidebar } from '../components/Sidebar.js';

export function renderSettings() {
  const html = `
    <div class="app-layout">
      <div id="sidebar-container"></div>
      <div class="main-content">
        <div>
          <div class="page-title">설정</div>
          <div class="page-subtitle">동료가 회의 시간을 찾을 때, 내 일정과 아래 설정을 함께 반영해요.</div>
        </div>
        <div class="settings-sections">
          <div class="tab-section">
            <div class="tab-section-title">연결</div>
            <div class="setting-card">
              <div class="setting-row">
                <div class="setting-left">
                  <div class="setting-name-row">
                    <span class="setting-name">Google Calendar</span>
                    <span class="status-pill green">연결됨</span>
                  </div>
                  <span class="setting-sub">jina.chung@toss.com</span>
                </div>
                <span class="setting-link">연결 관리</span>
              </div>
            </div>
          </div>
          <div class="tab-section">
            <div class="tab-section-title">회의 가능 시간</div>
            <div class="setting-card">
              <div class="setting-row">
                <div class="setting-left">
                  <span class="setting-name">근무시간</span>
                  <span class="setting-sub">월~금 · 오전 9:00~오후 6:00</span>
                </div>
                <span class="setting-link">수정</span>
              </div>
              <div class="setting-row">
                <div class="setting-left">
                  <span class="setting-name">시간대</span>
                  <span class="setting-sub">서울 · GMT+9</span>
                </div>
                <span class="setting-link">수정</span>
              </div>
            </div>
          </div>
          <div class="tab-section">
            <div class="tab-section-title">선호 시간</div>
            <div class="setting-card">
              <div class="setting-row">
                <div class="setting-pref">
                  <span class="setting-name">가능하면 피하고 싶은 시간</span>
                  <span class="pref-time-chip">점심 직후</span>
                  <span class="pref-time-chip">집중 시간</span>
                </div>
                <span class="setting-link">수정</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  const element = htmlToElement(html);
  element.querySelector('#sidebar-container').appendChild(renderSidebar());
  return element;
}
