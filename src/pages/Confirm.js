import { htmlToElement } from '../utils.js';
import { store } from '../store.js';
import { renderSidebar } from '../components/Sidebar.js';

export function renderConfirm() {
  const { meetingDraft } = store.state;
  const selected = meetingDraft.selectedRecommendation;
  
  // Basic mock check: if id is res1-3 or res2-3 or res2-4, it has minji conflict.
  const hasConflict = Boolean(selected.conflict);
  
  // According to figma `confirm-exception.png`
  
  const html = `
    <div class="app-layout">
      <div id="sidebar-container"></div>
      
      <div class="main-content confirm-content">
        <div class="back-link" id="back-btn">
          <img src="public/icons/arrow-left-circle.svg" alt="" width="20" height="20" />
          추천 결과
        </div>
        
        <div class="t-title-1 result-title">이대로 회의를 만들까요?</div>
        <div class="t-body-1 result-subtitle" style="margin-bottom: 40px;">참석자와 회의 정보를 마지막으로 확인해 주세요.</div>
        
        <div class="confirm-card">
          <div class="confirm-row">
            <div class="confirm-label">회의 제목</div>
            <div class="confirm-value">${meetingDraft.title || '주간 프로젝트 회의'}</div>
            <div class="confirm-edit" data-edit="1">수정</div>
          </div>
          <div class="confirm-row">
            <div class="confirm-label">일시</div>
            <div class="confirm-value">${selected.dateTime} · ${meetingDraft.duration}</div>
            <div class="confirm-edit" data-edit="3">수정</div>
          </div>
        </div>
        
        <div class="confirm-card">
          <div class="confirm-row">
            <div class="confirm-label">참석자</div>
            <div class="confirm-value">참석자 ${meetingDraft.attendees.required.length + meetingDraft.attendees.optional.length}명</div>
            <div class="confirm-edit" data-edit="2">수정</div>
          </div>
          ${hasConflict ? `
            <div class="confirm-warning">
              선택 참석자인 김민지님은 이 시간에 다른 일정이 있어요. 참석할 수 있는지 먼저 물어볼 수 있어요.
            </div>
          ` : ''}
        </div>
        
        <div class="confirm-card">
          <div class="confirm-row">
            <div class="confirm-label">회의 방식</div>
            <div class="confirm-value">${meetingDraft.method || '하이브리드'}</div>
            <div class="confirm-edit" data-edit="4">수정</div>
          </div>
          <div class="confirm-row">
            <div class="confirm-label">회의실</div>
            <div class="confirm-value">${meetingDraft.room}</div>
            <div class="confirm-edit" data-edit="4">수정</div>
          </div>
        </div>

        <div class="confirm-process">
          <div class="confirm-process-title">회의를 만들 때 함께 처리돼요</div>
          <div class="confirm-process-items">
            <span>캘린더 초대</span><span class="dot"></span><span>회의실 예약</span><span class="dot"></span><span>Zoom 링크 생성</span>
          </div>
        </div>
        
        <div class="confirm-actions">
          ${hasConflict ? `
            <button class="btn-outline" id="create-without-btn">민지님 제외하고 만들기</button>
            <button class="btn-primary" id="ask-btn">참석 가능한지 물어보기</button>
          ` : `
            <button class="btn-primary" id="create-btn">회의 확정하기</button>
          `}
        </div>
      </div>
    </div>
  `;
  
  const element = htmlToElement(html);
  element.querySelector('#sidebar-container').appendChild(renderSidebar());
  
  element.querySelector('#back-btn').addEventListener('click', () => {
    store.navigate('/result');
  });
  
  element.querySelectorAll('.confirm-edit').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const step = e.target.dataset.edit;
      store.navigate('/create/' + step);
    });
  });
  
  if (hasConflict) {
    element.querySelector('#create-without-btn').addEventListener('click', () => {
      store.navigate('/created');
    });
    
    element.querySelector('#ask-btn').addEventListener('click', () => {
      store.navigate('/wait');
    });
  } else {
    element.querySelector('#create-btn').addEventListener('click', () => {
      store.navigate('/created');
    });
  }
  
  return element;
}
