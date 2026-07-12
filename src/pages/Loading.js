import { htmlToElement } from '../utils.js';
import { store } from '../store.js';
import { renderSidebar } from '../components/Sidebar.js';

export function renderLoading() {
  const html = `
    <div class="app-layout">
      <div class="main-content loading-content">
        <div class="loading-container">
          <div class="spinner"></div>
          <div class="loading-copy">
            <div class="loading-text">${store.state.loadingText.title}</div>
            <div class="t-body-1">${store.state.loadingText.subtitle}</div>
          </div>
        </div>
      </div>
    </div>
  `;
  
  const element = htmlToElement(html);
  return element;
}
