import { htmlToElement } from '../utils.js';
import { store } from '../store.js';
import { renderSidebar } from '../components/Sidebar.js';

function selectRecommendation(id, path) {
  const selectedRecommendation = store.state.recommendations.find(item => item.id === id);
  store.setState({
    selectedResultId: id,
    meetingDraft: {
      ...store.state.meetingDraft,
      room: selectedRecommendation.room,
      selectedRecommendation
    }
  });
  store.navigate(path);
}

export function renderResult() {
  const { recommendations } = store.state;
  const html = `
    <div class="app-layout">
      <div id="sidebar-container"></div>
      <div class="main-content result-content">
        <div class="back-link" id="back-btn">
          <img src="public/icons/arrow-left-circle.svg" alt="" width="20" height="20" />
          회의 방식
        </div>
        <div class="result-heading">
          <div class="result-title">추천 결과</div>
          <div class="result-subtitle">필수 참석자 4명이 모두 가능한 시간을 먼저 보여드려요. 선택 참석자와 선호 조건도 함께 반영했어요.</div>
        </div>
        <div class="result-list">
          ${recommendations.map((item, index) => `
            <div class="result-card ${index === 0 ? 'selected' : ''}">
              <div class="result-info">
                <div class="result-time">${item.displayTime}</div>
                <div class="result-meta">${item.availability}${item.conflict ? ` · ${item.conflict}` : ''} · ${item.room} 예약 가능</div>
              </div>
              <div class="result-actions">
                <button class="detail-link" data-id="${item.id}">일정 자세히 보기</button>
                <button class="select-btn" data-id="${item.id}">이 시간으로 선택</button>
              </div>
            </div>`).join('')}
        </div>
      </div>
    </div>`;

  const element = htmlToElement(html);
  element.querySelector('#sidebar-container').appendChild(renderSidebar());
  element.querySelector('#back-btn').addEventListener('click', () => store.navigate('/create/4'));
  element.querySelectorAll('.detail-link').forEach(button => button.addEventListener('click', event => selectRecommendation(event.currentTarget.dataset.id, '/detail')));
  element.querySelectorAll('.select-btn').forEach(button => button.addEventListener('click', event => selectRecommendation(event.currentTarget.dataset.id, '/confirm')));
  return element;
}
