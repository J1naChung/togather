import { htmlToElement } from '../utils.js';

// 프로토타입 경로 안내 플로팅 버튼 + 팝업 (모든 화면 공통)
export function renderFlowGuide() {
  const html = `
    <div style="display: contents;">
      <button class="flow-guide-btn" id="flow-guide-btn" aria-label="화면 이동 경로 안내">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M4 5.5C4 4.67 4.67 4 5.5 4H18.5C19.33 4 20 4.67 20 5.5V15.5C20 16.33 19.33 17 18.5 17H8L4 20.5V5.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><path d="M8 9H16M8 12.5H13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
      </button>
      <div class="flow-guide-popup" id="flow-guide-popup">
        <div class="flow-guide-head">
          <span>화면 이동 경로 안내</span>
          <span class="flow-guide-close" id="flow-guide-close">✕</span>
        </div>
        <div class="flow-guide-body">
          <div class="flow-guide-section">1. 로그인</div>
          <p>로그인 / SSO로 로그인 → 홈</p>
          <div class="flow-guide-section">2. 홈</div>
          <p>새 회의 만들기 → 회의 정보 입력</p>
          <p>상단 togather 로고 → 홈 (모든 화면 공통)</p>
          <div class="flow-guide-section">3. 회의 생성</div>
          <p>회의 정보 입력 → 참석자 → 날짜·시간 → 회의 방식 → 시간 추천받기</p>
          <p>회의 방식에서 <b>대면</b> 선택 → 결과 화면 1: 조건 선택 → 이 조건으로 다시 찾기 → 결과 화면 2</p>
          <p>회의 방식에서 <b>화상</b> 선택 → 결과 화면 3: 회의 조건 변경 → 결과 화면 1 / 다른 날짜에서 찾기 → 날짜·시간 → 결과 화면 2</p>
          <p>회의 방식에서 <b>하이브리드</b> 선택 → 결과 화면 2</p>
          <div class="flow-guide-section">4. 결과 화면 2 이후</div>
          <p>일정 자세히 보기 → 상세 → 이 시간으로 선택 → 결과 화면 2 복귀</p>
          <p>이 시간으로 선택 → 회의 확정 확인 → 회의 확정하기 → 회의 생성 완료</p>
          <p>3번째 시간(김민지님 일정 충돌) 선택 시 확정 확인에서: 민지님 제외하고 만들기 → 생성 완료 / 참석 가능한지 물어보기 → 답변 기다리는 화면</p>
          <div class="flow-guide-section">5. 회의 생성 완료</div>
          <p>회의 보기 → 주간 프로젝트 회의 상세 / 홈으로 → 홈</p>
          <div class="flow-guide-section">6. 사이드바 탭</div>
          <p>회의 관리 → 주간 프로젝트 회의 → 회의 상세</p>
          <p>진행 중인 조율 → 주간 프로젝트 회의 → 답변 기다리는 화면</p>
          <p>알림함 / 설정 → 각 화면</p>
        </div>
      </div>
    </div>`;

  const element = htmlToElement(html);
  const popup = element.querySelector('#flow-guide-popup');
  element.querySelector('#flow-guide-btn').addEventListener('click', () => {
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
  });
  element.querySelector('#flow-guide-close').addEventListener('click', () => {
    popup.style.display = 'none';
  });
  return element;
}
