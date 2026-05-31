// 레벨에 따른 게임 설정
export const LEVEL_CONFIG = {
  1: {
    time: 150,
    grid: 2,
    bombProbability: 0.2,
    spawnInterval: 900,
  },
  2: {
    time: 200,
    grid: 3,
    bombProbability: 0.25,
    spawnInterval: 800,
  },
  3: {
    time: 300,
    grid: 4,
    bombProbability: 0.3,
    spawnInterval: 700,
  },
}

export const MOLE_VISIBLE_DURATION = 1000    // 두더지 표시 시간
export const TIMER_TICK_INTERVAL = 100       // 타이머 간격
export const RESULT_DISPLAY_DURATION = 3000  // 결과 모달 표시 시간