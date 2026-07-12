import { htmlToElement } from '../utils.js';
import { store } from '../store.js';
import { renderSidebar } from '../components/Sidebar.js';

export function renderCreated() {
  const { meetingDraft } = store.state;
  
  const titleStr = meetingDraft.title || '주간 프로젝트 회의';
  
  const html = `
    <div class="app-layout">
      <div id="sidebar-container"></div>
      
      <div class="main-content created-content">
        <div class="created-container">
          <div class="success-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12L10 17L20 7" stroke="#00A660" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          
          <div class="created-title">회의를 만들었어요</div>
          <div class="created-subtitle">${titleStr}</div>
          
          <div class="created-card created-check-card">
            <div class="check-list">
              <div class="check-item">
                <div class="check-circle">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12L10 17L20 7" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                참석자에게 초대를 보냈어요
              </div>
              <div class="check-item">
                <div class="check-circle">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12L10 17L20 7" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                Google Calendar 동기화 완료
              </div>
              <div class="check-item">
                <div class="check-circle">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12L10 17L20 7" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                ${meetingDraft.room}를 예약했어요
              </div>
              <div class="check-item">
                <div class="check-circle">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12L10 17L20 7" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                Zoom 링크를 만들었어요
              </div>
            </div>
          </div>
          
          <div class="created-card created-info-card">
            <div class="created-info-row">
              <div class="created-info-label">일시</div>
              <div class="created-info-value">${meetingDraft.selectedRecommendation.displayTime}</div>
            </div>
            <div class="created-info-row">
              <div class="created-info-label">방식 · 장소</div>
              <div class="created-info-value">${meetingDraft.method} · ${meetingDraft.room}</div>
            </div>
            <div class="created-info-row">
              <div class="created-info-label">Zoom 링크</div>
              <div class="created-info-value">
                <span class="link-value">${meetingDraft.zoomLink}</span>
                <span class="copy-link">링크 복사</span>
              </div>
            </div>
          </div>
          
          <div class="created-actions">
            <button class="btn-created" id="view-meeting-btn">회의 보기</button>
            <button class="link-btn" id="home-btn" style="color:var(--toss-grey-600);font-weight:600;font-size:14px;background:none;border:none;cursor:pointer;">홈으로</button>
          </div>
          
        </div>
      </div>
    </div>
  `;
  
  const element = htmlToElement(html);
  element.querySelector('#sidebar-container').appendChild(renderSidebar());
  
  element.querySelector('#home-btn').addEventListener('click', () => {
    store.navigate('/home');
  });

  element.querySelector('#view-meeting-btn').addEventListener('click', () => {
    store.navigate('/manage/detail');
  });
  
  return element;
}
