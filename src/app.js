import { store } from './store.js';
import { renderLogin } from './pages/Login.js';
import { renderHome } from './pages/Home.js';
import { renderCreateInfo } from './pages/CreateInfo.js?v=3';
import { renderCreatePeople } from './pages/CreatePeople.js?v=3';
import { renderCreateRange } from './pages/CreateRange.js?v=3';
import { renderCreateMethod } from './pages/CreateMethod.js?v=3';
import { renderLoading } from './pages/Loading.js?v=3';
import { renderResult } from './pages/Result.js?v=3';
import { renderResult1 } from './pages/Result1.js';
import { renderResult3 } from './pages/Result3.js';
import { renderDetail } from './pages/Detail.js?v=3';
import { renderConfirm } from './pages/Confirm.js?v=3';
import { renderWait } from './pages/Wait.js';
import { renderManage } from './pages/Manage.js';
import { renderMeetingDetail } from './pages/MeetingDetail.js';
import { renderCoordination } from './pages/Coordination.js';
import { renderNotifications } from './pages/Notifications.js';
import { renderSettings } from './pages/Settings.js';
import { renderCreated } from './pages/Created.js?v=3';
import { renderFlowGuide } from './components/FlowGuide.js';

function renderApp() {
  const appContainer = document.getElementById('app');
  appContainer.innerHTML = ''; // Clear current view
  
  const { currentPath } = store.state;
  
  if (currentPath === '/login') {
    appContainer.appendChild(renderLogin());
  } else if (currentPath === '/home') {
    appContainer.appendChild(renderHome());
  } else if (currentPath === '/create/1') {
    appContainer.appendChild(renderCreateInfo());
  } else if (currentPath === '/create/2') {
    appContainer.appendChild(renderCreatePeople());
  } else if (currentPath === '/create/3') {
    appContainer.appendChild(renderCreateRange());
  } else if (currentPath === '/create/4') {
    appContainer.appendChild(renderCreateMethod());
  } else if (currentPath === '/loading') {
    appContainer.appendChild(renderLoading());
  } else if (currentPath === '/result') {
    appContainer.appendChild(renderResult());
  } else if (currentPath === '/result1') {
    appContainer.appendChild(renderResult1());
  } else if (currentPath === '/result3') {
    appContainer.appendChild(renderResult3());
  } else if (currentPath === '/detail') {
    appContainer.appendChild(renderDetail());
  } else if (currentPath === '/confirm') {
    appContainer.appendChild(renderConfirm());
  } else if (currentPath === '/wait') {
    appContainer.appendChild(renderWait());
  } else if (currentPath === '/manage') {
    appContainer.appendChild(renderManage());
  } else if (currentPath === '/manage/detail') {
    appContainer.appendChild(renderMeetingDetail());
  } else if (currentPath === '/coordination') {
    appContainer.appendChild(renderCoordination());
  } else if (currentPath === '/notifications') {
    appContainer.appendChild(renderNotifications());
  } else if (currentPath === '/settings') {
    appContainer.appendChild(renderSettings());
  } else if (currentPath === '/created') {
    appContainer.appendChild(renderCreated());
  } else {
    // default fallback
    appContainer.innerHTML = `<div>404: ${currentPath}</div>`;
  }

  // 프로토타입 경로 안내 (모든 화면 공통)
  appContainer.appendChild(renderFlowGuide());
}

// Initial render
renderApp();

// Re-render on state change (especially path)
store.subscribe(() => {
  renderApp();
});
