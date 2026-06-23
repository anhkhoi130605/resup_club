import React, { useState } from 'react';
import './Sidebar.css';

// SVG Icons as React Components
const DashboardIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="9" />
    <rect x="14" y="3" width="7" height="5" />
    <rect x="14" y="12" width="7" height="9" />
    <rect x="3" y="16" width="7" height="5" />
  </svg>
);

const PlusIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
  </svg>
);

const DatabaseIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
);

const SettingsIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const DocumentIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const UpgradeIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
    <path d="M13 10h-3v3H8v-3H5V8h3V5h2v3h3v2z" />
    <polygon points="12 2 2 14 11 14 9 22 22 10 13 10 12 2" />
  </svg>
);

const ChevronDownIcon = ({ isOpen }) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`sidebar-arrow ${isOpen ? 'open' : ''}`}
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function Sidebar({
  role,
  setRole,
  clubStatus,
  setClubStatus,
  inClubRole,
  setInClubRole,
  outClubRole,
  setOutClubRole,
  dept,
  setDept,
  user,
  activeItem,
  setActiveItem,
}) {
  const [openSubmenus, setOpenSubmenus] = useState({});

  // Toggle Submenus
  const toggleSubmenu = (id) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Determine Subtitle/Tag below Logo
  const getRoleDisplay = () => {
    if (role === 'Admin') return 'Executive Admin';
    if (clubStatus === 'InClub') {
      const deptDisplay = dept ? dept.toUpperCase() : 'BIZ';
      return `${inClubRole || 'Member'} • ${deptDisplay}`;
    }
    return outClubRole === 'Sponsor' ? 'Sponsor Partner' : 'Student Guest';
  };

  // Get dynamic menu tree based on roles
  const getMenuItems = () => {
    if (role === 'Admin') {
      return [
        {
          category: 'MAIN',
          items: [
            { id: 'overview', label: 'Overview', icon: <DashboardIcon /> }
          ]
        },
        {
          category: 'NHÂN SỰ',
          items: [
            { id: 'recruitment', label: 'Tuyển thành viên', icon: <PlusIcon /> },
            { id: 'members', label: 'Quản lý thành viên', icon: <UsersIcon /> },
            { id: 'users', label: 'Quản lý tài khoản', icon: <DatabaseIcon /> }
          ]
        },
        {
          category: 'HOẠT ĐỘNG',
          items: [
            { id: 'events', label: 'Quản lý sự kiện', icon: <CalendarIcon /> },
            { id: 'finance', label: 'Quản lý tài chính', icon: <DocumentIcon /> }
          ]
        },
        {
          category: 'ĐỐI NGOẠI',
          items: [
            { id: 'speakers', label: 'Quản lý diễn giả', icon: <UsersIcon /> },
            { id: 'sponsors', label: 'Quản lý nhà tài trợ', icon: <UpgradeIcon /> }
          ]
        },
        {
          category: 'CREATE',
          items: [
            {
              id: 'create_new',
              label: 'Create New',
              icon: <PlusIcon />,
              children: [
                { id: 'create_dept', label: 'Create Department' },
                { id: 'create_topic', label: 'Create Topic' },
                { id: 'create_location', label: 'Create Location' },
                { id: 'broadcast', label: 'Broadcast Notification' }
              ]
            }
          ]
        },
        {
          category: 'MANAGE',
          items: [
            {
              id: 'manage_data',
              label: 'Manage Data',
              icon: <DatabaseIcon />,
              children: [
                { id: 'depts', label: 'Departments' },
                { id: 'topics', label: 'Topics' },
                { id: 'locations', label: 'Locations' },
                { id: 'users', label: 'Users' },
                { id: 'feedback', label: 'Feedback' }
              ]
            }
          ]
        },
        {
          category: 'SYSTEM',
          items: [
            {
              id: 'system_settings',
              label: 'System Settings',
              icon: <SettingsIcon />,
              children: [
                { id: 'system_logs', label: 'System Logs' },
                { id: 'activity_logs', label: 'Activity Logs' },
                { id: 'settings', label: 'Settings' },
                { id: 'security', label: 'Security' }
              ]
            }
          ]
        }
      ];
    }

    if (clubStatus === 'InClub') {
      const deptUpper = dept ? dept.toUpperCase() : 'BIZ';
      if (inClubRole === 'Leader') {
        return [
          {
            category: 'MAIN',
            items: [
              { id: 'overview', label: 'Overview', icon: <DashboardIcon /> }
            ]
          },
          {
            category: `DEPT: ${deptUpper}`,
            items: [
              { id: 'kpi', label: 'Department KPIs', icon: <DocumentIcon /> },
              { id: 'approvals', label: 'Pending Approvals', icon: <PlusIcon /> },
              { id: 'reports', label: 'Settle Reports', icon: <DatabaseIcon /> }
            ]
          },
          {
            category: 'SYSTEM',
            items: [
              { id: 'settings', label: 'Department Settings', icon: <SettingsIcon /> }
            ]
          }
        ];
      } else {
        return [
          {
            category: 'MAIN',
            items: [
              { id: 'overview', label: 'Overview', icon: <DashboardIcon /> }
            ]
          },
          {
            category: `DEPT: ${deptUpper}`,
            items: [
              { id: 'todo', label: 'My Tasks', icon: <DocumentIcon /> },
              { id: 'submit', label: 'Submit Reports', icon: <PlusIcon /> },
              { id: 'feedback', label: 'Department Feedback', icon: <DatabaseIcon /> }
            ]
          }
        ];
      }
    }

    // OutClub Guest / Sponsor / Student
    if (outClubRole === 'Sponsor') {
      return [
        {
          category: 'MAIN',
          items: [
            { id: 'overview', label: 'Overview', icon: <DashboardIcon /> }
          ]
        },
        {
          category: 'SPONSORSHIP',
          items: [
            { id: 'contracts', label: 'Contracts', icon: <DocumentIcon /> },
            { id: 'campaigns', label: 'Sponsor Campaigns', icon: <CalendarIcon /> },
            { id: 'benefits', label: 'My Benefits', icon: <PlusIcon /> }
          ]
        }
      ];
    } else {
      // Default: Student
      return [
        {
          category: 'MAIN',
          items: [
            { id: 'overview', label: 'Overview', icon: <DashboardIcon /> }
          ]
        },
        {
          category: 'STUDENT TOOLS',
          items: [
            { id: 'join', label: 'Join ResUp Club', icon: <PlusIcon /> },
            { id: 'my_events', label: 'My Registered Events', icon: <CalendarIcon /> },
            { id: 'profile', label: 'My Profile', icon: <UsersIcon /> }
          ]
        }
      ];
    }
  };

  const menuGroups = getMenuItems();

  return (
    <div className="sidebar-container">
      <aside className="sidebar-menu">

        {/* Header Title Section */}
        <div className="sidebar-header">
          <img src="/images/logo_resup.jpg" alt="ResUp Logo" className="sidebar-logo" />
          <div className="sidebar-title-info">
            <h2>RESUP</h2>
            <span>{getRoleDisplay()}</span>
            {user && (
              <span style={{ fontSize: '9.5px', textTransform: 'lowercase', color: '#ff6b35', marginTop: '4px' }}>
                {user.email || user.Email}
              </span>
            )}
          </div>
        </div>

        {/* DEV TEST ROLE - Vertical Selectors */}
        <div className="sidebar-dev-tools">
          <div style={{ fontSize: '10px', fontWeight: '800', color: '#ff4500', marginBottom: '2px' }}>
            🛠️ DEV TEST ROLE
          </div>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="sidebar-dev-select"
          >
            <option value="User">Hệ thống: User</option>
            <option value="Admin">Hệ thống: Admin</option>
          </select>

          {role === 'User' && (
            <>
              <select
                value={clubStatus}
                onChange={(e) => setClubStatus(e.target.value)}
                className="sidebar-dev-select"
              >
                <option value="OutClub">Ngoài CLB (OutClub)</option>
                <option value="InClub">Trong CLB (InClub)</option>
              </select>

              {clubStatus === 'InClub' && (
                <>
                  <select
                    value={inClubRole}
                    onChange={(e) => setInClubRole(e.target.value)}
                    className="sidebar-dev-select"
                  >
                    <option value="Member">Thành viên (Member)</option>
                    <option value="Leader">Trưởng ban (Leader)</option>
                  </select>

                  <select
                    value={dept}
                    onChange={(e) => setDept(e.target.value)}
                    className="sidebar-dev-select"
                  >
                    <option value="Biz">Ban: Kinh doanh (Biz)</option>
                    <option value="Human_Resource">Ban: Nhân sự (HR)</option>
                    <option value="Media">Ban: Truyền thông (Media)</option>
                  </select>
                </>
              )}

              {clubStatus === 'OutClub' && (
                <select
                  value={outClubRole}
                  onChange={(e) => setOutClubRole(e.target.value)}
                  className="sidebar-dev-select"
                >
                  <option value="Student">Sinh viên (Student)</option>
                  <option value="Sponsor">Nhà tài trợ (Sponsor)</option>
                </select>
              )}
            </>
          )}
        </div>

        {/* Navigation List */}
        <nav className="sidebar-nav">
          {menuGroups.map((group, groupIdx) => (
            <div key={groupIdx}>
              <div className="sidebar-category">{group.category}</div>
              {group.items.map((item) => {
                const hasChildren = !!item.children;
                const isSubmenuOpen = !!openSubmenus[item.id];
                const isItemActive = activeItem === item.id ||
                  (hasChildren && item.children.some(c => activeItem === c.id));

                return (
                  <div key={item.id}>
                    {hasChildren ? (
                      // Expandable Group header
                      <div
                        onClick={() => toggleSubmenu(item.id)}
                        className={`sidebar-item ${isItemActive ? 'active' : ''}`}
                      >
                        <span className="sidebar-item-icon">{item.icon}</span>
                        <span className="sidebar-item-label">{item.label}</span>
                        <ChevronDownIcon isOpen={isSubmenuOpen} />
                      </div>
                    ) : (
                      // Single Link Item
                      <div
                        onClick={() => setActiveItem(item.id)}
                        className={`sidebar-item ${activeItem === item.id ? 'active' : ''}`}
                      >
                        <span className="sidebar-item-icon">{item.icon}</span>
                        <span className="sidebar-item-label">{item.label}</span>
                      </div>
                    )}

                    {/* Accordion children if present */}
                    {hasChildren && (
                      <div
                        className="sidebar-child-list"
                        style={{
                          maxHeight: isSubmenuOpen ? `${item.children.length * 42}px` : '0px',
                        }}
                      >
                        {item.children.map((child) => (
                          <div
                            key={child.id}
                            onClick={() => setActiveItem(child.id)}
                            className={`sidebar-child-item ${activeItem === child.id ? 'active' : ''}`}
                          >
                            <span>{child.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Footer Section with Upgrade Promo and links */}
        <div className="sidebar-footer">
          <div className="sidebar-promo-card">
            <h4>Pro Analytics</h4>
            <p>Get advanced AI analytics & real-time insights.</p>
            <button className="sidebar-promo-btn">
              <UpgradeIcon />
              <span>Upgrade</span>
            </button>
          </div>

          <div className="sidebar-footer-links">
            <span>SUPPORT</span>
            <span>TERMS</span>
            <span>PRIVACY</span>
          </div>

          <div className="sidebar-copyright">
            © 2026 - ResUp Club
          </div>
        </div>

      </aside>
    </div>
  );
}
