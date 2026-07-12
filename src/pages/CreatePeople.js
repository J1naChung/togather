import { htmlToElement } from '../utils.js';
import { store } from '../store.js';
import { renderSidebar } from '../components/Sidebar.js';
import { renderBreadcrumbs } from '../components/Breadcrumbs.js';

function getAvatarColor(name) {
  if (name.includes('정지')) return '#A3C8FC';
  if (name.includes('이지')) return '#8CE0A7';
  if (name.includes('정다')) return '#F9C38B';
  if (name.includes('박수')) return '#A3C8FC'; // actually it looks blue-ish or purple-ish in figma. I'll use blue.
  if (name.includes('김민')) return '#F8B3C0';
  if (name.includes('박현')) return '#D1D6DB'; // grey
  return '#A3C8FC';
}

function renderPerson(person, isRequired) {
  const avatarColor = getAvatarColor(person.name);
  const letter = person.name.charAt(1); // '정지나' -> '지'? No, usually last name is 1st char, so '지' or '정'. In figma: 정지나 -> 정, 이지은 -> 이, 정다은 -> 다, 박수현 -> 수, 김민지 -> 민, 박현우 -> 현
  const char = person.name.charAt(0) === '김' && person.name === '김민지' ? '민' : 
               person.name.charAt(0) === '박' && person.name === '박현우' ? '현' : 
               person.name.charAt(0);
  
  // Wait, looking at figma `people.png`:
  // 정지나 -> 정, 이지은 -> 이, 정다은 -> 다, 박수현 -> 수, 김민지 -> 민, 박현우 -> 현
  let displayChar = person.name.charAt(0);
  if (person.name === '정다은') displayChar = '다';
  if (person.name === '박수현') displayChar = '수';
  if (person.name === '김민지') displayChar = '민';
  if (person.name === '박현우') displayChar = '현';

  return `
    <div class="person-item" data-name="${person.name}">
      <div class="person-left">
        <div class="person-avatar" style="background-color: ${avatarColor}">${displayChar}</div>
        <div class="person-info">
          <div class="person-name t-body-1">${person.name}</div>
          <div class="person-role t-caption">${person.role}</div>
        </div>
      </div>
      <div class="person-right">
        ${person.host ? 
          `<span class="person-host-text t-caption">주최자는 항상 필수예요</span>` : 
          `<span class="person-action t-body-3 change-role-btn">${isRequired ? '선택으로 변경' : '필수로 변경'}</span>
           <span class="person-remove">
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
               <path d="M18 6L6 18M6 6L18 18" stroke="#B0B8C1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
             </svg>
           </span>`
        }
      </div>
    </div>
  `;
}

export function renderCreatePeople() {
  const { attendees } = store.state.meetingDraft;
  
  const html = `
    <div class="app-layout">
      <div id="sidebar-container"></div>
      
      <div class="main-content create-content">
        <div class="create-header" id="breadcrumbs-container"></div>
        
        <div class="t-title-1 create-title">참석자 추가와 역할 설정</div>
        <div class="t-body-1 create-subtitle">참석자를 추가하고 필수·선택 여부를 정해요.</div>
        
        <div class="people-search">
          <svg class="people-search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#8B95A1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <input type="text" class="create-input" placeholder="이름 또는 이메일로 참석자 추가" />
        </div>
        
        <div class="people-columns">
          <div class="people-column card">
            <div class="t-subtitle-1">필수 참석자</div>
            <div class="t-caption people-column-subtitle">여기 있는 모두가 가능한 시간만 찾아요.</div>
            <div id="required-list">
              ${attendees.required.map(p => renderPerson(p, true)).join('')}
            </div>
          </div>
          
          <div class="people-column card">
            <div class="t-subtitle-1">선택 참석자</div>
            <div class="t-caption people-column-subtitle">가능하면 함께할 수 있는 시간을 우선으로 찾아요.</div>
            <div id="optional-list">
              ${attendees.optional.map(p => renderPerson(p, false)).join('')}
            </div>
          </div>
        </div>
        
        <div class="bottom-actions">
          <button class="btn-outline" id="prev-btn">이전</button>
          <button class="btn-primary" id="next-btn">다음으로</button>
        </div>
      </div>
    </div>
  `;
  
  const element = htmlToElement(html);
  
  element.querySelector('#sidebar-container').appendChild(renderSidebar());
  element.querySelector('#breadcrumbs-container').appendChild(renderBreadcrumbs(2));
  
  // Interactions: we can make "선택으로 변경" / "필수로 변경" work.
  // The prompt doesn't strictly say it must be interactive, but standard prototype implies it.
  element.querySelectorAll('.change-role-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const item = e.target.closest('.person-item');
      const name = item.dataset.name;
      let req = store.state.meetingDraft.attendees.required;
      let opt = store.state.meetingDraft.attendees.optional;
      
      const reqIndex = req.findIndex(p => p.name === name);
      if (reqIndex >= 0) {
        const p = req.splice(reqIndex, 1)[0];
        opt.push(p);
      } else {
        const optIndex = opt.findIndex(p => p.name === name);
        if (optIndex >= 0) {
          const p = opt.splice(optIndex, 1)[0];
          req.push(p);
        }
      }
      
      store.setState({
        meetingDraft: {
          ...store.state.meetingDraft,
          attendees: { required: req, optional: opt }
        }
      });
      // Store notify will re-render
    });
  });
  
  element.querySelector('#prev-btn').addEventListener('click', () => {
    store.navigate('/create/1');
  });
  
  element.querySelector('#next-btn').addEventListener('click', () => {
    store.navigate('/create/3');
  });
  
  return element;
}
