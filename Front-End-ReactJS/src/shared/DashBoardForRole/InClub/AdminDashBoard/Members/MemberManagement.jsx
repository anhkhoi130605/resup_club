import React, { useState } from 'react';
import '../Dashboard.css'; // Reuse dashboard styling rules

// SVG Icons
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="dash-search-icon">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const EmptyMembersIcon = () => (
  <svg viewBox="0 0 24 24" width="56" height="56" stroke="#a0aec0" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="empty-icon">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const AwardIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

/*
// ==========================================
// SCHEMAS & MOCK DATA FOR FUTURE API INTEGRATION
// ==========================================
// API Endpoint: GET /api/members
// JSON Response Schema:
// [
//   {
//     "id": 1,
//     "fullName": "Nguyen Van B",
//     "studentId": "HE150002",
//     "email": "nvbhe150002@fpt.edu.vn",
//     "phone": "0912345678",
//     "department": "Biz", // Biz, Human_Resource, Media
//     "clubRole": "Member", // Admin, Leader, Member
//     "attendancePoints": 95,
//     "assignedTasks": 12,
//     "rewards": 2,
//     "disciplines": 0,
//     "status": "Active", // Active (Hoạt động), Inactive (Tạm nghỉ), Alumni (Cựu thành viên), Dismissed (Cho thôi việc)
//     "joinedDate": "2025-09-10T00:00:00Z"
//   }
// ]
*/

export default function MemberManagement() {
  // Empty state by default
  const [members, setMembers] = useState([]);
  
  // Search & Filters
  const [searchText, setSearchText] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Calculate statistics
  const totalCount = members.length;
  const activeCount = members.filter(m => m.status === 'Active').length;
  const hrCount = members.filter(m => m.department === 'Human_Resource').length;
  const bizCount = members.filter(m => m.department === 'Biz').length;
  const mediaCount = members.filter(m => m.department === 'Media').length;

  const filteredMembers = members.filter(m => {
    const matchesSearch = 
      m.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
      m.studentId.toLowerCase().includes(searchText.toLowerCase()) ||
      m.email.toLowerCase().includes(searchText.toLowerCase());

    const matchesDept = selectedDept === '' || m.department === selectedDept;
    const matchesRole = selectedRole === '' || m.clubRole === selectedRole;
    const matchesStatus = selectedStatus === '' || m.status === selectedStatus;

    return matchesSearch && matchesDept && matchesRole && matchesStatus;
  });

  const handleResetFilters = () => {
    setSearchText('');
    setSelectedDept('');
    setSelectedRole('');
    setSelectedStatus('');
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case 'Admin':
        return <span className="metric-badge blue">Admin</span>;
      case 'Leader':
        return <span className="metric-badge purple">Leader</span>;
      case 'Member':
        return <span className="metric-badge green">Member</span>;
      default:
        return <span className="metric-badge">{role}</span>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return <span style={{ color: '#34A853', fontWeight: '700' }}>● Hoạt động</span>;
      case 'Inactive':
        return <span style={{ color: '#a0aec0', fontWeight: '700' }}>● Tạm nghỉ</span>;
      case 'Alumni':
        return <span style={{ color: '#4285F4', fontWeight: '700' }}>● Cựu thành viên</span>;
      case 'Dismissed':
        return <span style={{ color: '#e53e3e', fontWeight: '700' }}>● Cho thôi việc</span>;
      default:
        return <span>{status}</span>;
    }
  };

  return (
    <div className="admin-dashboard-page">
      {/* 1. Subheader */}
      <section className="dash-subheader">
        <div className="dash-search-container">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search members..."
            className="dash-search-input"
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
        </div>
        <div className="dash-profile-badge">
          <div className="dash-profile-info" style={{ textAlign: 'right' }}>
            <strong>System User</strong>
            <span>System Admin</span>
          </div>
          <img src="/images/logo_resup.jpg" alt="Profile" className="dash-profile-avatar" />
        </div>
      </section>

      {/* 2. Hero Card */}
      <section className="dash-hero-card">
        <div className="dash-hero-left">
          <h1>Member Profile Management</h1>
          <p>Quản lý danh sách thành viên chính thức, phân công phòng ban, theo dõi chuyên cần và khen thưởng.</p>
          <div className="dash-hero-date">
            <span>📅 Nhân sự CLB • Điểm chuyên cần & Hiệu suất công việc</span>
            <span className="dash-banner-dot" style={{ backgroundColor: '#ffffff', boxShadow: '0 0 8px #ffffff' }}></span>
            <span>Live Sync</span>
          </div>
        </div>
        <div className="dash-hero-right" style={{ alignItems: 'center', gap: '30px' }}>
          <div className="dash-hero-stat">
            <strong>{totalCount}</strong>
            <span>THÀNH VIÊN</span>
          </div>
          <div className="dash-hero-stat">
            <strong>{activeCount}</strong>
            <span>HOẠT ĐỘNG</span>
          </div>
          <div className="dash-hero-stat">
            <strong>{bizCount}</strong>
            <span>BAN BIZ</span>
          </div>
          <div className="dash-hero-stat">
            <strong>{hrCount}</strong>
            <span>BAN HR</span>
          </div>
        </div>
      </section>

      {/* 3. Metric Cards */}
      <section className="dash-metrics-grid">
        <div className="metric-card users">
          <div className="metric-header">
            <span className="metric-title">BAN KINH DOANH</span>
            <span className="metric-badge purple">Biz</span>
          </div>
          <div className="metric-body">
            <div>
              <span className="metric-value">{bizCount}</span>
              <div className="metric-subtext" style={{ marginTop: '8px' }}>Chuyên môn Kinh doanh & Đối ngoại</div>
            </div>
          </div>
        </div>

        <div className="metric-card students">
          <div className="metric-header">
            <span className="metric-title">BAN NHÂN SỰ</span>
            <span className="metric-badge green">HR</span>
          </div>
          <div className="metric-body">
            <div>
              <span className="metric-value">{hrCount}</span>
              <div className="metric-subtext" style={{ marginTop: '8px' }}>Quản trị và hỗ trợ thành viên</div>
            </div>
          </div>
        </div>

        <div className="metric-card staff">
          <div className="metric-header">
            <span className="metric-title">BAN TRUYỀN THÔNG</span>
            <span className="metric-badge blue">Media</span>
          </div>
          <div className="metric-body">
            <div>
              <span className="metric-value">{mediaCount}</span>
              <div className="metric-subtext" style={{ marginTop: '8px' }}>Xây dựng hình ảnh và Fanpage</div>
            </div>
          </div>
        </div>

        <div className="metric-card errors">
          <div className="metric-header">
            <span className="metric-title">CỰU THÀNH VIÊN</span>
            <span className="metric-badge" style={{ backgroundColor: 'rgba(203,213,224,0.4)', color: '#718096' }}>Alumni</span>
          </div>
          <div className="metric-body">
            <div>
              <span className="metric-value" style={{ color: '#718096' }}>
                {members.filter(m => m.status === 'Alumni').length}
              </span>
              <div className="metric-subtext" style={{ marginTop: '8px' }}>Đã hoàn thành nhiệm kỳ</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Filters */}
      <section className="dash-section-card" style={{ gap: '12px' }}>
        <div style={{ fontSize: '11px', fontWeight: '800', color: '#718096', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          📍 TÌM KIẾM & PHÂN LOẠI THÀNH VIÊN
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-end' }}>
          
          <div style={{ flex: '2', minWidth: '240px' }}>
            <label style={{ fontSize: '10px', fontWeight: '700', color: '#a0aec0', display: 'block', marginBottom: '6px' }}>HỌ TÊN, MSSV HOẶC EMAIL</label>
            <div className="dash-search-container" style={{ maxWidth: '100%' }}>
              <SearchIcon />
              <input
                type="text"
                placeholder="Tìm kiếm..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                className="dash-search-input"
                style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e0' }}
              />
            </div>
          </div>

          <div style={{ flex: '1', minWidth: '150px' }}>
            <label style={{ fontSize: '10px', fontWeight: '700', color: '#a0aec0', display: 'block', marginBottom: '6px' }}>PHÒNG BAN</label>
            <select
              value={selectedDept}
              onChange={e => setSelectedDept(e.target.value)}
              className="sidebar-dev-select"
              style={{ padding: '10px', height: '42px', border: '1px solid #cbd5e0' }}
            >
              <option value="">— Tất cả Ban —</option>
              <option value="Biz">Ban Kinh doanh (Biz)</option>
              <option value="Human_Resource">Ban Nhân sự (HR)</option>
              <option value="Media">Ban Truyền thông (Media)</option>
            </select>
          </div>

          <div style={{ flex: '1', minWidth: '150px' }}>
            <label style={{ fontSize: '10px', fontWeight: '700', color: '#a0aec0', display: 'block', marginBottom: '6px' }}>CHỨC VỤ</label>
            <select
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value)}
              className="sidebar-dev-select"
              style={{ padding: '10px', height: '42px', border: '1px solid #cbd5e0' }}
            >
              <option value="">— Tất cả chức vụ —</option>
              <option value="Admin">Admin</option>
              <option value="Leader">Leader</option>
              <option value="Member">Member</option>
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
              <option value="Active">Hoạt động</option>
              <option value="Inactive">Tạm nghỉ</option>
              <option value="Alumni">Cựu thành viên</option>
              <option value="Dismissed">Cho thôi việc</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="sidebar-promo-btn" style={{ height: '42px', padding: '0 20px', borderRadius: '8px' }}>
              <FilterIcon />
              <span>Tìm kiếm</span>
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

      {/* 5. Members List Table */}
      <section className="dash-section-card">
        <div className="dash-card-header">
          <div className="dash-card-title-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '18px' }}>👥</span>
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: '800' }}>Hồ sơ Thành viên CLB</h2>
              <p>Chi tiết điểm chuyên cần, công việc và hành động</p>
            </div>
          </div>
          <span className="dash-card-badge">{filteredMembers.length} thành viên</span>
        </div>

        <div className="table-responsive">
          {filteredMembers.length === 0 ? (
            <div className="empty-state" style={{ padding: '60px 24px' }}>
              <EmptyMembersIcon />
              <h3>Chưa có dữ liệu thành viên</h3>
              <p style={{ maxWidth: '500px', margin: '0 auto', fontSize: '12.5px', color: '#a0aec0', lineHeight: 1.6 }}>
                Chưa có dữ liệu thành viên nào. Hệ thống đã khởi tạo mảng <code>members</code> là rỗng. Bạn hãy liên kết với API <code>/api/members</code> để hiển thị danh sách hồ sơ đầy đủ tại đây.
              </p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#718096', textTransform: 'uppercase', fontSize: '11px', fontWeight: '800' }}>
                  <th style={{ padding: '12px 16px' }}>Thành viên / MSSV</th>
                  <th style={{ padding: '12px 16px' }}>Ban / Chức vụ</th>
                  <th style={{ padding: '12px 16px' }}>Điểm chuyên cần</th>
                  <th style={{ padding: '12px 16px' }}>Số Task đã giao</th>
                  <th style={{ padding: '12px 16px' }}>Khen thưởng / Kỷ luật</th>
                  <th style={{ padding: '12px 16px' }}>Trạng thái</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Hành động nhân sự</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id} style={{ borderBottom: '1px solid #edf2f7' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: '700', color: '#2d3748' }}>{member.fullName}</span>
                        <span style={{ fontSize: '11.5px', color: '#a0aec0' }}>{member.email} | MSSV: {member.studentId}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="metric-badge purple">{member.department}</span>
                        {getRoleBadge(member.clubRole)}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 'bold', color: member.attendancePoints >= 80 ? '#34A853' : '#e53e3e' }}>
                      {member.attendancePoints} / 100
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: '600' }}>{member.assignedTasks}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ color: '#34A853', marginRight: '8px' }}>🏆 {member.rewards}</span>
                      <span style={{ color: '#e53e3e' }}>⚠️ {member.disciplines}</span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>{getStatusBadge(member.status)}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      {member.status === 'Active' && (
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <button className="sidebar-dev-select" style={{ height: '32px', padding: '0 10px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px' }} title="Chuyển thành Cựu thành viên (Alumni)">
                            <AwardIcon /> Cựu TV
                          </button>
                          <button className="sidebar-dev-select" style={{ height: '32px', padding: '0 10px', fontSize: '11px', backgroundColor: '#fff5f5', color: '#e53e3e', borderColor: '#feb2b2', display: 'inline-flex', alignItems: 'center', gap: '4px' }} title="Sa thải / Cho thôi việc">
                            <TrashIcon /> Sa thải
                          </button>
                        </div>
                      )}
                      {member.status !== 'Active' && (
                        <button className="sidebar-dev-select" style={{ height: '32px', padding: '0 10px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px' }} title="Tái kích hoạt hoạt động">
                          <ShieldIcon /> Kích hoạt lại
                        </button>
                      )}
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
