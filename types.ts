export interface Option {
  label: string;
  nextId: string;
}

export interface Scene {
  id: string;
  lines: string[]; // Array of strings to be shown sequentially
  options?: Option[]; // Choices available after all lines are shown
  type: 'story' | 'gameover' | 'victory';
}

export interface GameState {
  currentSceneId: string;
  lineIndex: number; // Current line within the scene
}