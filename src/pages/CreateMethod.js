import { htmlToElement } from '../utils.js';
import { store } from '../store.js';
import { renderSidebar } from '../components/Sidebar.js';
import { renderBreadcrumbs } from '../components/Breadcrumbs.js';

export function renderCreateMethod() {
  const { method } = store.state.meetingDraft;
  
  const html = `
    <div class="app-layout">
      <div id="sidebar-container"></div>
      
      <div class="main-content create-content">
        <div class="create-header" id="breadcrumbs-container"></div>
        
        <div class="t-title-1 create-title">회의 방식 선택</div>
        <div class="t-body-1 create-subtitle">회의 방식을 선택해 주세요.</div>
        
        <div class="method-card ${method === '대면' ? 'selected' : ''}" data-val="대면">
          <div class="method-radio"><div class="method-radio-inner"></div></div>
          <div class="method-info">
            <div class="method-title">대면</div>
            <div class="method-desc">한곳에 모여 진행해요. 가능한 회의실도 함께 찾아요.</div>
          </div>
        </div>
        
        <div class="method-card ${method === '화상' ? 'selected' : ''}" data-val="화상">
          <div class="method-radio"><div class="method-radio-inner"></div></div>
          <div class="method-info">
            <div class="method-title">화상</div>
            <div class="method-desc">Zoom으로 진행해요. 회의를 만들 때 링크도 함께 준비해요.</div>
          </div>
        </div>
        
        <div class="method-card ${method === '하이브리드' ? 'selected' : ''}" data-val="하이브리드">
          <div class="method-radio"><div class="method-radio-inner"></div></div>
          <div class="method-info">
            <div class="method-title">하이브리드</div>
            <div class="method-desc">회의실과 Zoom 링크를 함께 준비해요.</div>
          </div>
        </div>
        
        <div class="bottom-actions">
          <button class="btn-outline" id="prev-btn">이전</button>
          <button class="btn-primary" id="recommend-btn">시간 추천받기</button>
        </div>
      </div>
    </div>
  `;
  
  const element = htmlToElement(html);
  
  element.querySelector('#sidebar-container').appendChild(renderSidebar());
  element.querySelector('#breadcrumbs-container').appendChild(renderBreadcrumbs(4));
  
  const cards = element.querySelectorAll('.method-card');
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      const val = e.currentTarget.dataset.val;
      store.setState({
        meetingDraft: { ...store.state.meetingDraft, method: val }
      });
    });
  });
  
  element.querySelector('#prev-btn').addEventListener('click', () => {
    store.navigate('/create/3');
  });
  
  element.querySelector('#recommend-btn').addEventListener('click', () => {
    store.setState({
      loadingText: {
        title: '참석자가 모두 가능한 시간을 찾고 있어요',
        subtitle: '참석 가능 여부와 회의실 현황을 함께 확인하고 있어요.'
      }
    });
    // Show loading
    store.navigate('/loading');

    // 프로토타입 고정 분기: 대면 → 결과 1, 화상 → 결과 3, 하이브리드 → 결과 2
    const method = store.state.meetingDraft.method;
    const dest = method === '대면' ? '/result1' : method === '화상' ? '/result3' : '/result';
    setTimeout(() => {
      store.navigate(dest);
    }, 1500);
  });
  
  return element;
}
