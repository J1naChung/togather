import { htmlToElement } from '../utils.js';

export function renderBreadcrumbs(currentStep) {
  let html = `
    <div class="breadcrumbs">
      <div class="breadcrumb-item ${currentStep >= 1 ? (currentStep === 1 ? 'current' : 'completed') : 'upcoming'}">
        <div class="step-circle">1</div>
        <div class="step-label">회의 정보</div>
      </div>
      <div class="breadcrumb-separator">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4L10 8L6 12" stroke="#D1D6DB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="breadcrumb-item ${currentStep >= 2 ? (currentStep === 2 ? 'current' : 'completed') : 'upcoming'}">
        <div class="step-circle">2</div>
        <div class="step-label">참석자</div>
      </div>
      <div class="breadcrumb-separator">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4L10 8L6 12" stroke="#D1D6DB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="breadcrumb-item ${currentStep >= 3 ? (currentStep === 3 ? 'current' : 'completed') : 'upcoming'}">
        <div class="step-circle">3</div>
        <div class="step-label">날짜·시간</div>
      </div>
      <div class="breadcrumb-separator">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4L10 8L6 12" stroke="#D1D6DB" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <div class="breadcrumb-item ${currentStep >= 4 ? (currentStep === 4 ? 'current' : 'completed') : 'upcoming'}">
        <div class="step-circle">4</div>
        <div class="step-label">회의 방식</div>
      </div>
    </div>
  `;
  
  return htmlToElement(html);
}
