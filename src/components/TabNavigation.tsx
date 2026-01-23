import type { TabId } from '../types';

interface TabNavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; emoji: string }[] = [
  { id: 'timeline', label: 'Timeline', emoji: '🎵' },
  { id: 'overview', label: 'Overview', emoji: '📊' },
  { id: 'genres', label: 'Genres', emoji: '🎸' },
  { id: 'mood', label: 'Mood', emoji: '💫' },
  { id: 'artists', label: 'Artists', emoji: '🎤' },
];

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <nav className="tab-nav">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.emoji} {tab.label}
        </button>
      ))}
    </nav>
  );
}
