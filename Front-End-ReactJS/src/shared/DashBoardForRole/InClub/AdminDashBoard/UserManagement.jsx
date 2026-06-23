import React, { useState } from 'react';
import './Dashboard.css'; // Reuse dashboard styling rules

// SVG Icons
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="dash-search-icon">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const UserGroupIcon = () => (
  <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const EmptyUserIcon = () => (
  <svg viewBox="0 0 24 24" width="56" height="56" stroke="#a0aec0" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="empty-icon">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const FilterIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const ResetIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
  </svg>
);

const LockIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

/*
// MẪU DỮ LIỆU ĐỂ BẠN TỰ XỬ LÝ LATER (Uncomment mảng này để gán vào useState nếu muốn dùng thử):
const initialMockUsers = [
  { id: 1, fullName: 'Huy Mạc', email: 'macdogiahuy123@gmail.com', role: 'STUDENT', createdAt: '26/04/2026', status: 'Hoạt động' },
  { id: 2, fullName: 'Khôi Phạm', email: 'anhkhoipham130605@gmail.com', role: 'STUDENT', createdAt: '28/03/2026', status: 'Hoạt động' },
  { id: 3, fullName: 'Hao Truong Dang Nguyen', email: 'haotdn@gmail.com', role: 'STUDENT', createdAt: '29/01/2026', status: 'Đã khóa' },
  { id: 4, fullName: 'Khôi Phạm', email: 'kpham6488@gmail.com', role: 'ORGANIZER', createdAt: '23/01/2026', status: 'Hoạt động' },
  { id: 5, fullName: 'Đặng Thị Minh Thư', email: 'dangthiminhthu1007@gmail.com', role: 'STUDENT', createdAt: '31/03/2026', status: 'Hoạt động' },
  { id: 6, fullName: 'Test Organizer', email: 'testorg@aems.com', role: 'ORGANIZER', createdAt: '23/03/2026', status: 'Hoạt động' },
  { id: 7, fullName: 'Trần Huyền', email: 'tranhuyen11311@gmail.com', role: 'STUDENT', createdAt: '06/03/2026', status: 'Hoạt động' },
  { id: 8, fullName: 'Approver User', email: 'approval@gmail.com', role: 'APPROVER', createdAt: '28/02/2026', status: 'Hoạt động' },
  { id: 9, fullName: 'Dawn Heli (RainPrince)', email: 'quocthuhai0209@gmail.com', role: 'STUDENT', createdAt: '15/03/2026', status: 'Hoạt động' },
  { id: 10, fullName: 'System User', email: 'admin@gmail.com', role: 'ADMIN', createdAt: '22/01/2026', status: 'Hoạt động' },
];
*/

export default function UserManagement() {
  // Để trống mảng mặc định theo yêu cầu của bạn, bạn có thể gán initialMockUsers vào đây để test
  const [users, setUsers] = useState([]);
  
  // Filter states
  const [searchText, setSearchText] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Calculate dynamic stats from user array
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Hoạt động').length;
  const lockedUsers = users.filter(u => u.status === 'Đã khóa').length;
  const inactiveUsers = users.filter(u => u.status === 'Không hoạt động').length;
  
  const activePercentage = totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0;

  // Filter logic
  const filteredUsers = users.filter(u => {
    const matchesSearch = u.fullName.toLowerCase().includes(searchText.toLowerCase()) || 
                          u.email.toLowerCase().includes(searchText.toLowerCase());
    const matchesRole = selectedRole === '' || u.role.toUpperCase() === selectedRole.toUpperCase();
    const matchesStatus = selectedStatus === '' || u.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleResetFilters = () => {
    setSearchText('');
    setSelectedRole('');
    setSelectedStatus('');
  };

  const getRoleBadgeClass = (roleName) => {
    const r = roleName ? roleName.toUpperCase() : '';
    if (r === 'ADMIN') return 'metric-badge blue';
    if (r === 'STUDENT') return 'metric-badge green';
    if (r === 'ORGANIZER') return 'metric-badge purple';
    return 'metric-badge';
  };

  return (
    <div className="admin-dashboard-page">
      
      {/* 1. Subheader (Search & Profile indicator) */}
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

      {/* 2. Hero Card: User Management (Red-Orange Gradient) */}
      <section className="dash-hero-card">
        <div className="dash-hero-left">
          <h1>User Management</h1>
          <p>Quản trị, phân quyền và kiểm soát tài khoản hệ thống.</p>
          <div className="dash-hero-date">
            <span>📅 {new Date().toLocaleDateString('vi-VN')} • {totalUsers} tài khoản trong DB</span>
            <span className="dash-banner-dot" style={{ backgroundColor: '#ffffff', boxShadow: '0 0 8px #ffffff' }}></span>
            <span>Live</span>
          </div>
        </div>
        <div className="dash-hero-right" style={{ alignItems: 'center', gap: '30px' }}>
          <div className="dash-hero-stat">
            <strong>{totalUsers}</strong>
            <span>TỔNG</span>
          </div>
          <div className="dash-hero-stat">
            <strong>{activeUsers}</strong>
            <span>HOẠT ĐỘNG</span>
          </div>
          <div className="dash-hero-stat">
            <strong>{lockedUsers}</strong>
            <span>BỊ KHÓA</span>
          </div>
          
          <button className="dash-hero-pill" style={{ marginLeft: '10px', height: 'fit-content' }}>
            <span style={{ fontSize: '15px' }}>+</span>
            <span>Tạo Tài Khoản Mới</span>
          </button>
        </div>
      </section>

      {/* 3. Metric Summary Cards */}
      <section className="dash-metrics-grid">
        <div className="metric-card users">
          <div className="metric-header">
            <span className="metric-title">TỔNG TÀI KHOẢN</span>
            <span className="metric-badge purple">Total</span>
          </div>
          <div className="metric-body">
            <div>
              <span className="metric-value">{totalUsers}</span>
              <div className="metric-subtext" style={{ marginTop: '8px' }}>Trong toàn hệ thống</div>
            </div>
            <div><UserGroupIcon /></div>
          </div>
        </div>

        <div className="metric-card students">
          <div className="metric-header">
            <span className="metric-title">ĐANG HOẠT ĐỘNG</span>
            <span className="metric-badge green">Active</span>
          </div>
          <div className="metric-body">
            <div>
              <span className="metric-value">{activeUsers}</span>
              <div className="metric-subtext" style={{ marginTop: '8px' }}>{activePercentage}% tổng hệ thống</div>
            </div>
          </div>
        </div>

        <div className="metric-card errors">
          <div className="metric-header">
            <span className="metric-title">BỊ KHÓA</span>
            <span className="metric-badge" style={{ backgroundColor: 'rgba(229, 62, 62, 0.1)', color: '#e53e3e' }}>Locked</span>
          </div>
          <div className="metric-body">
            <div>
              <span className="metric-value" style={{ color: '#e53e3e' }}>{lockedUsers}</span>
              <div className="metric-subtext" style={{ marginTop: '8px' }}>Tài khoản bị hạn chế</div>
            </div>
          </div>
        </div>

        <div className="metric-card staff">
          <div className="metric-header">
            <span className="metric-title">KHÔNG HOẠT ĐỘNG</span>
            <span className="metric-badge" style={{ backgroundColor: 'rgba(203, 213, 224, 0.4)', color: '#718096' }}>Inactive</span>
          </div>
          <div className="metric-body">
            <div>
              <span className="metric-value" style={{ color: '#718096' }}>{inactiveUsers}</span>
              <div className="metric-subtext" style={{ marginTop: '8px' }}>Trên trang hiện tại</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Filter & Search Panel */}
      <section className="dash-section-card" style={{ gap: '12px' }}>
        <div style={{ fontSize: '11px', fontWeight: '800', color: '#718096', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          📍 BỘ LỌC & TÌM KIẾM
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-end' }}>
          
          <div style={{ flex: '2', minWidth: '240px' }}>
            <label style={{ fontSize: '10px', fontWeight: '700', color: '#a0aec0', display: 'block', marginBottom: '6px' }}>TÌM KIẾM</label>
            <div className="dash-search-container" style={{ maxWidth: '100%' }}>
              <SearchIcon />
              <input
                type="text"
                placeholder="Tên hoặc email..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                className="dash-search-input"
                style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e0' }}
              />
            </div>
          </div>

          <div style={{ flex: '1', minWidth: '150px' }}>
            <label style={{ fontSize: '10px', fontWeight: '700', color: '#a0aec0', display: 'block', marginBottom: '6px' }}>VAI TRÒ</label>
            <select
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value)}
              className="sidebar-dev-select"
              style={{ padding: '10px', height: '42px', border: '1px solid #cbd5e0' }}
            >
              <option value="">— Tất cả vai trò —</option>
              <option value="ADMIN">ADMIN</option>
              <option value="STUDENT">STUDENT</option>
              <option value="ORGANIZER">ORGANIZER</option>
              <option value="APPROVER">APPROVER</option>
            </select>
          </div>

          <div style={{ flex: '1', minWidth: '150px' }}>
            <label style={{ fontSize: '10px', fontWeight: '700', color: '#a0aec0', display: 'block', marginBottom: '6px' }}>TRẠNG THÁI</label>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="sidebar-dev-select"
              style={{ padding: '10px', height: '42px', border: '1px solid #cbd5e0' }}
            >
              <option value="">— Tất cả trạng thái —</option>
              <option value="Hoạt động">Hoạt động</option>
              <option value="Đã khóa">Đã khóa</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
            <button className="sidebar-promo-btn" style={{ height: '42px', padding: '0 20px', borderRadius: '8px' }}>
              <FilterIcon />
              <span>Lọc</span>
            </button>
            <button
              onClick={handleResetFilters}
              className="sidebar-dev-select"
              style={{ height: '42px', width: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', border: '1px solid #cbd5e0', padding: 0 }}
              title="Reset Filters"
            >
              <ResetIcon />
            </button>
          </div>

        </div>
      </section>

      {/* 5. User Account List Table */}
      <section className="dash-section-card">
        <div className="dash-card-header">
          <div className="dash-card-title-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '18px' }}>📊</span>
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: '800' }}>Danh sách Tài khoản</h2>
              <p>Trang 1 / 1</p>
            </div>
          </div>
          <span className="dash-card-badge">{filteredUsers.length} tài khoản</span>
        </div>

        <div className="table-responsive">
          {filteredUsers.length === 0 ? (
            <div className="empty-state" style={{ padding: '60px 24px' }}>
              <EmptyUserIcon />
              <h3>Chưa có dữ liệu người dùng</h3>
              <p style={{ maxWidth: '400px', margin: '0 auto', fontSize: '12.5px', color: '#a0aec0', lineHeight: 1.6 }}>
                Không tìm thấy tài khoản nào trong hệ thống hoặc mảng dữ liệu đang trống. Hãy gán mảng dữ liệu của bạn vào state <code>users</code> ở file <code>UserManagement.jsx</code> để hiển thị.
              </p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#718096', textTransform: 'uppercase', fontSize: '11px', fontWeight: '800' }}>
                  <th style={{ padding: '12px 16px' }}>#</th>
                  <th style={{ padding: '12px 16px' }}>NGƯỜI DÙNG</th>
                  <th style={{ padding: '12px 16px' }}>VAI TRÒ</th>
                  <th style={{ padding: '12px 16px' }}>NGÀY TẠO</th>
                  <th style={{ padding: '12px 16px' }}>TRẠNG THÁI</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>HÀNH ĐỘNG</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, idx) => (
                  <tr key={user.id} style={{ borderBottom: '1px solid #edf2f7', transition: 'background-color 0.2s' }} className="activity-item-row">
                    <td style={{ padding: '14px 16px', fontWeight: '600', color: '#718096' }}>{idx + 1}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div className="activity-avatar kp" style={{ width: '36px', height: '36px', fontSize: '13px', fontWeight: '800' }}>
                          {user.fullName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: '700', color: '#2d3748' }}>{user.fullName}</span>
                          <span style={{ fontSize: '11.5px', color: '#a0aec0' }}>{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span className={getRoleBadgeClass(user.role)}>
                        {user.role}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', color: '#4a5568', fontWeight: '650' }}>{user.createdAt}</td>
                    <td style={{ padding: '14px 16px' }}>
                      {user.status === 'Hoạt động' ? (
                        <span style={{ color: '#34A853', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '6px', height: '6px', backgroundColor: '#34A853', borderRadius: '50%' }}></span>
                          • Hoạt động
                        </span>
                      ) : (
                        <span style={{ color: '#e53e3e', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ width: '6px', height: '6px', backgroundColor: '#e53e3e', borderRadius: '50%' }}></span>
                          • Đã khóa
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button className="sidebar-dev-select" style={{ width: '32px', height: '32px', padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', border: '1px solid #e2e8f0' }} title="View User">
                          <EyeIcon />
                        </button>
                        <button className="sidebar-dev-select" style={{ width: '32px', height: '32px', padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', border: '1px solid #e2e8f0' }} title="Lock User">
                          <LockIcon />
                        </button>
                        <button className="sidebar-dev-select" style={{ width: '32px', height: '32px', padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', border: '1px solid #e2e8f0' }} title="Action History">
                          <ClockIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

    </div>
  );
}
