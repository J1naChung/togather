import { htmlToElement } from '../utils.js';
import { store } from '../store.js';
import { renderSidebar } from '../components/Sidebar.js';

export function renderHome() {
  const html = `
    <div class="app-layout">
      <!-- Sidebar container -->
      <div id="sidebar-container"></div>
      
      <div class="main-content">
        <div class="home-header">
          <div class="home-heading">
            <div class="home-greeting">
              좋은 아침이에요, 지나님 <img src="public/icons/sun.svg" alt="sun" />
            </div>
            <div class="home-summary">오늘 회의 2건 · 진행 중인 조율 3건이 있어요.</div>
          </div>
          <button class="btn-primary" id="new-meeting-btn">새 회의 만들기</button>
        </div>
        
        <div class="section-container">
          <div class="t-subtitle-1 section-title">진행 중인 조율</div>
          
          <div class="meeting-list">
            <div class="list-item">
              <div class="item-left">
                <div class="item-title">Q3 전략 논의</div>
                <div class="item-meta">
                  <span>7월 21일 화요일~25일 토요일</span>
                  <div class="avatar-group">
                    <div class="avatar pink">민</div>
                    <div class="avatar orange">다</div>
                    <div class="avatar grey">+3</div>
                  </div>
                </div>
              </div>
              <div class="item-right">
                <img src="public/icons/arrow-right.svg" alt="arrow" width="24" height="24" />
              </div>
            </div>
            
            <div class="list-item">
              <div class="item-left">
                <div class="item-title">신규 파트너 온보딩 킥오프</div>
                <div class="item-meta">
                  <span>7월 23일 목요일 · 오전 10:30~11:30</span>
                  <div class="avatar-group">
                    <div class="avatar green">이</div>
                    <div class="avatar grey" style="background: #90A4AE">현</div>
                    <div class="avatar grey">+2</div>
                  </div>
                </div>
              </div>
              <div class="item-right">
                <img src="public/icons/arrow-right.svg" alt="arrow" width="24" height="24" />
              </div>
            </div>
            
            <div class="list-item">
              <div class="item-left">
                <div class="item-title">디자인 프로세스 회의</div>
                <div class="item-meta">
                  <span>7월 16일 목요일 · 오후 2:00~3:00</span>
                  <div class="avatar-group">
                    <div class="avatar pink">민</div>
                    <div class="avatar green">이</div>
                    <div class="avatar grey">+3</div>
                  </div>
                </div>
              </div>
              <div class="item-right">
                <img src="public/icons/arrow-right.svg" alt="arrow" width="24" height="24" />
              </div>
            </div>
          </div>
        </div>
        
        <div class="section-container today-section">
          <div class="section-title">오늘 회의</div>
          <div class="card">
            <div class="today-meeting">
              <div class="today-time t-body-2">오전 10:30</div>
              <div class="today-title t-body-2">채용 인터뷰</div>
              <div class="today-meta t-body-2">회의실 A</div>
            </div>
            <div class="today-meeting">
              <div class="today-time t-body-2">오후 4:00</div>
              <div class="today-title t-body-2">디자인 팀 리뷰</div>
              <div class="today-meta t-body-2">
                <span>회의실 B · 하이브리드</span>
                <a href="#" class="zoom-link">Zoom 링크</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  const element = htmlToElement(html);
  
  // Attach sidebar
  element.querySelector('#sidebar-container').appendChild(renderSidebar());
  
  // Event Listeners
  element.querySelector('#new-meeting-btn').addEventListener('click', () => {
    store.navigate('/create/1');
  });

  return element;
}
