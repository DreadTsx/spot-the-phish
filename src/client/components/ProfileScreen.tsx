import AppLayout from './AppLayout';

export default function ProfileScreen() {
  return (
    <AppLayout activeTab="profile">
      <div className="text-label-sm font-mono text-muted uppercase">
        User Profile
      </div>
      <div className="text-code-md font-mono text-text">
        User profile and settings will appear here.
      </div>
    </AppLayout>
  );
}