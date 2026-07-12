import { htmlToElement } from '../utils.js';
import { store } from '../store.js';
import { renderSidebar } from '../components/Sidebar.js';
import { renderBreadcrumbs } from '../components/Breadcrumbs.js';

export function renderCreateInfo() {
  const { meetingDraft } = store.state;
  
  const html = `
    <div class="app-layout">
      <div id="sidebar-container"></div>
      
      <div class="main-content create-content">
        <div class="create-header" id="breadcrumbs-container"></div>
        
        <div class="t-title-1 create-title">회의 정보 입력</div>
        <div class="t-body-1 create-subtitle">회의 이름과 길이를 입력해 주세요.</div>
        
        <div class="card create-name-card">
          <div class="create-card-title t-body-1">회의 이름</div>
          <input type="text" class="create-input" placeholder="예: 주간 프로젝트 회의" id="title-input" />
        </div>
        
        <div class="card create-duration-card">
          <div class="create-card-title t-body-1">회의 길이</div>
          <div class="chip-group">
            <div class="chip" data-val="30분">30분</div>
            <div class="chip selected" data-val="1시간">1시간</div>
            <div class="chip" data-val="1시간 30분">1시간 30분</div>
            <div class="chip" data-val="2시간">2시간</div>
            <div class="chip dashed">직접 입력</div>
          </div>
        </div>
        
        <div class="bottom-action">
          <button class="btn-primary" id="next-btn">다음으로</button>
        </div>
      </div>
    </div>
  `;
  
  const element = htmlToElement(html);
  
  // Attach components
  element.querySelector('#sidebar-container').appendChild(renderSidebar());
  element.querySelector('#breadcrumbs-container').appendChild(renderBreadcrumbs(1));
  
  // Set initial state
  const titleInput = element.querySelector('#title-input');
  // From prompt: "회의 제목: 주간 프로젝트 회의". In figma it's empty but user might have typed it. 
  // Let's populate if store has it, else empty
  // Wait, in `info.png`, the input is empty with placeholder `예: 주간 프로젝트 회의`.
  // So I'll just leave it empty. But user prompt says "회의 제목: 주간 프로젝트 회의" as data.
  // I'll bind the value if the store has it. If store has default, I will set it to empty initially and let them type or just set it. 
  // I will just put the value "주간 프로젝트 회의" but gray it out if it's placeholder, or just fill it.
  titleInput.value = meetingDraft.title;

  const chips = element.querySelectorAll('.chip');
  chips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      chips.forEach(c => c.classList.remove('selected'));
      e.currentTarget.classList.add('selected');
      const val = e.currentTarget.dataset.val;
      if (val) {
        store.setState({
          meetingDraft: { ...store.state.meetingDraft, duration: val }
        });
      }
    });
  });

  titleInput.addEventListener('input', (e) => {
    store.setState({
      meetingDraft: { ...store.state.meetingDraft, title: e.target.value }
    });
  });
  
  element.querySelector('#next-btn').addEventListener('click', () => {
    store.navigate('/create/2');
  });
  
  return element;
}
