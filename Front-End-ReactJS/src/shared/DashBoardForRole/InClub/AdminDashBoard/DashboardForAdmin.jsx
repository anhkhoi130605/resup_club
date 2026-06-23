import React from 'react';
import './Dashboard.css';

// SVG Inline Icons
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="dash-search-icon">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const EmptyCalendarIcon = () => (
  <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="empty-icon">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
    <line x1="9" y1="13" x2="15" y2="19" />
    <line x1="15" y1="13" x2="9" y2="19" />
  </svg>
);

const UserGroupIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const LogIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const FeedbackIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" stroke="#34A853" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const metricsData = [
  { key: 'errors', title: 'System Errors Today', value: '0', subtext: 'Click to view system logs', badge: '', trend: 'green', icon: <CheckIcon /> },
  { key: 'users', title: 'Tổng số người dùng', value: '23', subtext: 'Tài khoản đăng ký hệ thống', badge: '+14%', trend: 'purple' },
  { key: 'students', title: 'Trong CLB (InClub)', value: '15', subtext: 'Thành viên chính thức', badge: '+8%', trend: 'green' },
  { key: 'staff', title: 'Ngoài CLB (OutClub)', value: '8', subtext: 'Khách và nhà tài trợ', badge: 'Stable', trend: 'blue' },
];

const activityLogs = [
  { avatar: 'KP', avatarClass: 'kp', user: 'Khôi Phạm', action: 'Đăng xuất thành công.', time: '17:07, 14/06' },
  { avatar: 'SU', avatarClass: 'su', user: 'System User', action: 'Đăng xuất thành công.', time: '17:03, 14/06' },
  { avatar: 'SU', avatarClass: 'su', user: 'System User', action: 'Cập nhật phòng ban thành công.', time: '09:12, 06/06' },
  { avatar: 'SU', avatarClass: 'su', user: 'System User', action: 'Đăng xuất thành công.', time: '00:50, 05/06' },
  { avatar: 'KP', avatarClass: 'kp', user: 'Khôi Phạm', action: 'Đăng xuất thành công.', time: '00:48, 05/06' },
  { avatar: 'AU', avatarClass: 'au', user: 'Approver User', action: 'Đăng xuất thành công.', time: '00:48, 05/06' },
];

const alertsData = [
  { isError: false, title: 'Hệ thống thông báo', body: 'Đăng xuất thành công.', time: '20/04 23:37' },
  { isError: false, title: 'Hệ thống thông báo', body: 'Đăng xuất thành công.', time: '07/04 21:12' },
  { isError: true, title: '[System Error] Exception', body: 'Source: — Email hoặc mật khẩu không chính xác. | Root Cause: Email hoặc mật khẩu không chính xác.', time: '02/05 22:47' },
  { isError: true, title: '[System Error] DbUpdateConcurrencyException', body: 'Source: /Notification/MarkAllAsRead — The database operation was expected to affect 1 row(s), but actually affected 0 row(s); data may have been modified or...', time: '31/05 23:30' },
];

export default function DashboardForAdmin() {
  return (
    <div className="admin-dashboard-page">
      
      {/* 1. Subheader: Search Bar & Profile */}
      <section className="dash-subheader">
        <div className="dash-search-container">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search events, users, or logs..."
            className="dash-search-input"
          />
        </div>
        <div className="dash-profile-badge">
          <div className="dash-profile-info" style={{ textAlign: 'right' }}>
            <strong>System User</strong>
            <span>System Admin</span>
          </div>
          <img
            src="/images/logo_resup.jpg"
            alt="System Admin Profile"
            className="dash-profile-avatar"
          />
        </div>
      </section>

      {/* 2. Hero Card: Executive Summary (Red-Orange Gradient) */}
      <section className="dash-hero-card">
        <div className="dash-hero-left">
          <h1>Executive Dashboard</h1>
          <p>Monitor system health and participant engagement.</p>
          <div className="dash-hero-date">
            <CalendarIcon />
            <span>Tuesday, 23 June 2026 • 14:59</span>
          </div>
          <div className="dash-hero-pills">
            <button className="dash-hero-pill">
              <UserGroupIcon />
              <span>Users</span>
            </button>
            <button className="dash-hero-pill">
              <LogIcon />
              <span>Logs</span>
            </button>
            <button className="dash-hero-pill">
              <FeedbackIcon />
              <span>Feedback</span>
            </button>
          </div>
        </div>
        <div className="dash-hero-right">
          <div className="dash-hero-stat">
            <strong>23</strong>
            <span>Tổng số</span>
          </div>
          <div className="dash-hero-stat">
            <strong>15</strong>
            <span>Trong CLB</span>
          </div>
          <div className="dash-hero-stat">
            <strong>8</strong>
            <span>Ngoài CLB</span>
          </div>
          <div className="dash-hero-stat">
            <strong>3</strong>
            <span>Phòng ban</span>
          </div>
        </div>
      </section>

      {/* 3. Operational Status Banner */}
      <div className="dash-banner">
        <div className="dash-banner-dot"></div>
        <span>All systems operational — No errors detected today. Platform is running normally as of 14:59.</span>
      </div>

      {/* 4. Metric Cards (4 columns) */}
      <section className="dash-metrics-grid">
        {metricsData.map((m) => (
          <div key={m.key} className={`metric-card ${m.key}`}>
            <div className="metric-header">
              <span className="metric-title">{m.title}</span>
              {m.badge && (
                <span className={`metric-badge ${m.trend}`}>{m.badge}</span>
              )}
            </div>
            <div className="metric-body">
              <div>
                <span className="metric-value">{m.value}</span>
                <div className="metric-subtext" style={{ marginTop: '8px' }}>
                  {m.subtext}
                </div>
              </div>
              {m.icon && <div>{m.icon}</div>}
            </div>
          </div>
        ))}
      </section>

      {/* 5. System Health Monitor control strip */}
      <section className="dash-health-monitor">
        <div className="dash-health-info">
          <h3>SYSTEM HEALTH MONITOR</h3>
          <p>Platform Real-time Status</p>
        </div>
        <div className="dash-health-pills">
          <button className="dash-health-pill status">All systems operational</button>
          <button className="dash-health-pill">View Logs</button>
          <button className="dash-health-pill">Manage Users</button>
          <button className="dash-health-pill">Feedback</button>
        </div>
        <div className="dash-health-stats">
          <div className="dash-health-stat">
            <strong>23</strong>
            <span>Tổng số</span>
          </div>
          <div className="dash-health-stat">
            <strong>15</strong>
            <span>Trong CLB</span>
          </div>
          <div className="dash-health-stat">
            <strong>8</strong>
            <span>Ngoài CLB</span>
          </div>
          <div className="dash-health-stat">
            <strong>3</strong>
            <span>Phòng ban</span>
          </div>
          <div className="dash-health-stat">
            <strong>3</strong>
            <span>Vai trò</span>
          </div>
        </div>
      </section>

      {/* 6. Dual Row: SVG Charts (Line Chart & Donut Chart) */}
      <section className="dash-row-grid">
        {/* SVG Line Chart: System Activity Trend */}
        <article className="dash-section-card">
          <div className="dash-card-header">
            <div className="dash-card-title-group">
              <h2>System Activity Trend</h2>
              <p>Error events monitored over the last 7 days</p>
            </div>
            <span className="dash-card-badge">7 Days</span>
          </div>

          <div style={{ width: '100%', height: '160px', padding: '10px 0' }}>
            <svg viewBox="0 0 450 140" style={{ width: '100%', height: '100%' }}>
              {/* Horizontal grid lines */}
              <line x1="30" y1="20" x2="420" y2="20" stroke="#f0f0f0" strokeWidth="1" />
              <line x1="30" y1="50" x2="420" y2="50" stroke="#f0f0f0" strokeWidth="1" />
              <line x1="30" y1="80" x2="420" y2="80" stroke="#f0f0f0" strokeWidth="1" />
              <line x1="30" y1="110" x2="420" y2="110" stroke="#e2e8f0" strokeWidth="1.5" />

              {/* Error Trend Path (Flat line at 0 errors, height 110) */}
              <path d="M 35 110 L 95 110 L 155 110 L 215 110 L 275 110 L 335 110 L 395 110" fill="none" stroke="#ff4500" strokeWidth="3" />
              
              {/* Data points */}
              <circle cx="35" cy="110" r="5" fill="#ff4500" stroke="#ffffff" strokeWidth="2" />
              <circle cx="95" cy="110" r="5" fill="#ff4500" stroke="#ffffff" strokeWidth="2" />
              <circle cx="155" cy="110" r="5" fill="#ff4500" stroke="#ffffff" strokeWidth="2" />
              <circle cx="215" cy="110" r="5" fill="#ff4500" stroke="#ffffff" strokeWidth="2" />
              <circle cx="275" cy="110" r="5" fill="#ff4500" stroke="#ffffff" strokeWidth="2" />
              <circle cx="335" cy="110" r="5" fill="#ff4500" stroke="#ffffff" strokeWidth="2" />
              <circle cx="395" cy="110" r="5" fill="#ff4500" stroke="#ffffff" strokeWidth="2" />

              {/* Date Labels */}
              <text x="35" y="130" textAnchor="middle" fontSize="10" fill="#a0aec0" fontWeight="600">17/06</text>
              <text x="95" y="130" textAnchor="middle" fontSize="10" fill="#a0aec0" fontWeight="600">18/06</text>
              <text x="155" y="130" textAnchor="middle" fontSize="10" fill="#a0aec0" fontWeight="600">19/06</text>
              <text x="215" y="130" textAnchor="middle" fontSize="10" fill="#a0aec0" fontWeight="600">20/06</text>
              <text x="275" y="130" textAnchor="middle" fontSize="10" fill="#a0aec0" fontWeight="600">21/06</text>
              <text x="335" y="130" textAnchor="middle" fontSize="10" fill="#a0aec0" fontWeight="600">22/06</text>
              <text x="395" y="130" textAnchor="middle" fontSize="10" fill="#a0aec0" fontWeight="600">23/06</text>
            </svg>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#a0aec0', fontWeight: '600' }}>
            <span>— System errors / activity</span>
            <span className="dash-card-action">Click chart to open logs</span>
          </div>
        </article>

        {/* SVG Donut Chart: User Category Distribution */}
        <article className="dash-section-card">
          <div className="dash-card-header">
            <div className="dash-card-title-group">
              <h2>User Category</h2>
              <p>Distribution by role</p>
            </div>
            <span className="dash-card-badge">23 total</span>
          </div>

          <div className="donut-layout">
            <div className="donut-chart-container">
              <svg width="100%" height="100%" viewBox="0 0 120 120">
                {/* Background base circle */}
                <circle cx="60" cy="60" r="50" fill="none" stroke="#f7fafc" strokeWidth="12" />
                
                {/* Student Segment: 78.3% of 314.16 = 246 (Red-Orange) */}
                <circle cx="60" cy="60" r="50" fill="none" stroke="#ff4500" strokeWidth="12" 
                  strokeDasharray="246 314" 
                  transform="rotate(-90 60 60)" 
                  strokeLinecap="round"
                />
                
                {/* Staff Segment: 17.4% of 314.16 = 55 (Green) */}
                <circle cx="60" cy="60" r="50" fill="none" stroke="#34A853" strokeWidth="12" 
                  strokeDasharray="55 314" 
                  strokeDashoffset="-246"
                  transform="rotate(-90 60 60)" 
                  strokeLinecap="round"
                />

                {/* Admin Segment: 4.3% of 314.16 = 13 (Orange-Amber) */}
                <circle cx="60" cy="60" r="50" fill="none" stroke="#ff8c42" strokeWidth="12" 
                  strokeDasharray="13 314" 
                  strokeDashoffset="-301"
                  transform="rotate(-90 60 60)" 
                  strokeLinecap="round"
                />
              </svg>
              <div className="donut-center-text">
                <strong>23</strong>
                <span>Total</span>
              </div>
            </div>

            <div className="donut-legends">
              <div className="donut-legend-row">
                <span className="donut-legend-label">
                  <span className="donut-dot student"></span>
                  <span>Student</span>
                </span>
                <span className="donut-legend-value">78.3% <span>(18)</span></span>
              </div>
              <div className="donut-legend-row">
                <span className="donut-legend-label">
                  <span className="donut-dot staff"></span>
                  <span>Staff</span>
                </span>
                <span className="donut-legend-value">17.4% <span>(4)</span></span>
              </div>
              <div className="donut-legend-row">
                <span className="donut-legend-label">
                  <span className="donut-dot admin"></span>
                  <span>Admin</span>
                </span>
                <span className="donut-legend-value">4.3% <span>(1)</span></span>
              </div>
            </div>
          </div>
        </article>
      </section>

      {/* 7. Dual Row: Recent System Activity & Broadcast Alerts */}
      <section className="dash-row-grid">
        {/* Recent Activity List */}
        <article className="dash-section-card">
          <div className="dash-card-header">
            <div className="dash-card-title-group">
              <h2>Recent System Activity</h2>
              <p>Latest administrative and user actions</p>
            </div>
            <span className="dash-card-action">Log Center →</span>
          </div>

          <div className="activity-list">
            {activityLogs.map((item, idx) => (
              <div key={idx} className="activity-item">
                <div className="activity-left">
                  <div className={`activity-avatar ${item.avatarClass}`}>
                    {item.avatar}
                  </div>
                  <div className="activity-details">
                    <span className="activity-user">{item.user}</span>
                    <span className="activity-action">{item.action}</span>
                  </div>
                </div>
                <span className="activity-time">{item.time}</span>
              </div>
            ))}
          </div>
        </article>

        {/* Broadcast Alerts List */}
        <article className="dash-section-card">
          <div className="dash-card-header">
            <div className="dash-card-title-group">
              <h2>Broadcast Alerts</h2>
              <p>Live system-wide notifications</p>
            </div>
            <span className="dash-card-action">New Alert</span>
          </div>

          <div className="alerts-list">
            {alertsData.map((alert, idx) => (
              <div key={idx} className={`alert-item ${alert.isError ? 'system-error' : ''}`}>
                <div className="alert-header">
                  <span className="alert-title">{alert.title}</span>
                  <span className="alert-time">{alert.time}</span>
                </div>
                <div className="alert-body">{alert.body}</div>
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* 8. Bottom Full Width Panel: Recent Educational Events Table */}
      <section className="dash-section-card">
        <div className="dash-card-header">
          <div className="dash-card-title-group">
            <h2>Recent Educational Events</h2>
            <p>A comprehensive view of active workshops and seminars</p>
          </div>
          <span className="dash-card-action">View All Events →</span>
        </div>

        <div className="table-responsive">
          <div className="empty-state">
            <EmptyCalendarIcon />
            <h3>Chưa có sự kiện gần đây</h3>
            <p>Team TODO: thêm RecentEvents vào AdminDashboardViewModel để hiển thị tại đây.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
