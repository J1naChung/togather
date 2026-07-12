// src/store.js

export const store = {
  state: {
    currentPath: '/login', // initial route
    meetingDraft: {
      title: '주간 프로젝트 회의',
      duration: '1시간',
      attendees: {
        required: [
          { name: '정지나', role: 'Product Designer', host: true },
          { name: '이지은', role: 'Product Designer', host: false },
          { name: '정다은', role: 'Frontend Engineer', host: false },
          { name: '박수현', role: 'Frontend Engineer', host: false }
        ],
        optional: [
          { name: '김민지', role: 'Product Manager', host: false },
          { name: '박현우', role: 'Data Analyst', host: false }
        ]
      },
      range: {
        start: '2026-07-14',
        end: '2026-07-17',
        startTime: '09:00',
        endTime: '18:00'
      },
      method: '하이브리드',
      room: '회의실 A',
      zoomLink: 'zoom.us/j/8241730952',
      selectedRecommendation: null
    },
    flags: {
      includeAfterLunch: false, // For result loop 1
      avoidLunchTextHidden: false, // For result loop 1
      avoidFocusTime: true,
      withoutRoom: false,
      isMinjiWaiting: false, // Exception flow
      isMinjiAnswered: false // Exception flow
    },
    loadingText: {
      title: '가능한 회의 시간을 찾고 있어요',
      subtitle: '필수 참석자 4명, 선택 참석자 2명의 가능 여부와 회의실 현황을 확인하고 있어요.'
    },
    // The results are hardcoded based on the state to match the prompt
    recommendations: [
      { id: 'res2-1', dateTime: '2026년 7월 16일 목요일 · 오후 2:00~3:00', displayTime: '7월 16일 목요일 · 오후 2:00~3:00', availability: '필수 4명 모두 가능 · 선택 2명 가능', room: '회의실 A', conflict: null },
      { id: 'res2-2', dateTime: '2026년 7월 17일 금요일 · 오전 10:30~11:30', displayTime: '7월 17일 금요일 · 오전 10:30~11:30', availability: '필수 4명 모두 가능 · 선택 2명 가능', room: '회의실 B', conflict: null },
      { id: 'res2-3', dateTime: '2026년 7월 16일 목요일 · 오후 2:00~3:00', displayTime: '7월 16일 목요일 · 오후 2:00~3:00', availability: '필수 4명 모두 가능 · 선택 2명 중 1명 가능', room: '회의실 A', conflict: '김민지님 일정 충돌' },
      { id: 'res2-4', dateTime: '2026년 7월 17일 금요일 · 오후 3:00~4:00', displayTime: '7월 17일 금요일 · 오후 3:00~4:00', availability: '필수 4명 모두 가능 · 선택 2명 중 1명 가능', room: '회의실 C', conflict: '김민지님 일정 충돌' }
    ]
  },
  
  listeners: [],
  
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  },
  
  notify() {
    this.listeners.forEach(listener => listener(this.state));
  },
  
  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notify();
  },

  navigate(path) {
    this.setState({ currentPath: path });
  }
};
