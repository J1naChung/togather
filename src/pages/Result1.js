import { htmlToElement } from '../utils.js';
import { store } from '../store.js';
import { renderSidebar } from '../components/Sidebar.js';

const conditions = [
  { title: '점심 직후도 포함하기', tag: '영향 적음', tagLevel: 'low', desc: '가능한 시간을 더 찾을 수 있어요.' },
  { title: '집중 시간도 포함하기', tag: '영향 큼', tagLevel: 'high', desc: '집중 시간으로 설정된 시간대도 후보에 넣어요.' },
  { title: '회의실 없이도 찾기', tag: '영향 큼', tagLevel: 'high', desc: '회의실이 없는 시간도 후보에 넣어요.' }
];

export function renderResult1() {
  const html = `
    <div class="app-layout">
      <div id="sidebar-container"></div>
      <div class="main-content result-content">
        <div class="back-link" id="back-btn">
          <img src="public/icons/arrow-left-circle.svg" alt="" width="20" height="20" />
          회의 방식
        </div>
        <div class="result-heading">
          <div class="result-title">조건을 조정하면 가능한 시간이 생겨요</div>
          <div class="result-subtitle">조건을 조정하면 가능한 시간이 생겨요, 중복 선택도 가능해요</div>
        </div>
        <div class="cond-list">
          ${conditions.map((c, i) => `
            <div class="cond-card ${i === 0 ? 'selected' : ''}">
              <div class="cond-radio"></div>
              <div class="cond-info">
                <div class="cond-title-row">
                  <span class="cond-title">${c.title}</span>
                  <span class="cond-tag ${c.tagLevel}">${c.tag}</span>
                </div>
                <div class="cond-desc">${c.desc}</div>
              </div>
            </div>`).join('')}
        </div>
        <div class="cond-actions">
          <button class="btn-primary refind-btn" id="refind-btn">이 조건으로 다시 찾기</button>
        </div>
      </div>
    </div>`;

  const element = htmlToElement(html);
  element.querySelector('#sidebar-container').appendChild(renderSidebar());

  // 중복 선택 가능 — 카드별 토글
  element.querySelectorAll('.cond-card').forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('selected'));
  });

  element.querySelector('#back-btn').addEventListener('click', () => store.navigate('/create/4'));

  element.querySelector('#refind-btn').addEventListener('click', () => {
    store.navigate('/loading');
    setTimeout(() => store.navigate('/result'), 1500);
  });

  return element;
}
