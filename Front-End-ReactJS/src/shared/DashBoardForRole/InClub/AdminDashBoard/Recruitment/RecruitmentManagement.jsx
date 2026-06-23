import React, { useState } from 'react';
import '../Dashboard.css'; // Reuse dashboard styling rules

// SVG Icons
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="dash-search-icon">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const EmptyRecruitIcon = () => (
  <svg viewBox="0 0 24 24" width="56" height="56" stroke="#a0aec0" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="empty-icon">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="16 11 18 13 22 9" />
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

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/*
// ==========================================
// SCHEMAS & MOCK DATA FOR FUTURE API INTEGRATION
// ==========================================
// API Endpoint: GET /api/recruitment/applications
// JSON Response Schema:
// [
//   {
//     "id": 1,
//     "fullName": "Nguyen Van A",
//     "studentId": "HE150001",
//     "email": "anvhe150001@fpt.edu.vn",
//     "phone": "0987654321",
//     "targetDept": "Biz", // Biz, Human_Resource, Media
//     "reason": "Em muon hoc hoi them ve to chuc su kien va phat trien moi quan he.",
//     "status": "Pending", // Pending (Chờ duyệt), CV_Approved (Đạt vòng đơn), CV_Rejected (Từ chối vòng đơn), Interview_Scheduled (Hẹn phỏng vấn), Interview_Approved (Đạt phỏng vấn), Interview_Rejected (Từ chối phỏng vấn), Onboarded (Đã nhận / Đã kích hoạt tài khoản)
//     "createdAt": "2026-06-20T08:30:00Z"
//   }
// ]
*/

export default function RecruitmentManagement() {
  // Empty state for actual usage. Integrators can bind fetched data here
  const [applications, setApplications] = useState([]);
  
  // Search & filter states
  const [searchText, setSearchText] = useState('');
  const [selectedDept, setSelectedDept] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Calculate dynamic metrics
  const totalApps = applications.length;
  const pendingApps = applications.filter(a => a.status === 'Pending').length;
  const interviewApps = applications.filter(a => a.status === 'Interview_Scheduled').length;
  const onboardedApps = applications.filter(a => a.status === 'Onboarded').length;

  const filteredApps = applications.filter(a => {
    const matchesSearch = 
      a.fullName.toLowerCase().includes(searchText.toLowerCase()) ||
      a.studentId.toLowerCase().includes(searchText.toLowerCase()) ||
      a.email.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesDept = selectedDept === '' || a.targetDept === selectedDept;
    const matchesStatus = selectedStatus === '' || a.status === selectedStatus;
    
    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleResetFilters = () => {
    setSearchText('');
    setSelectedDept('');
    setSelectedStatus('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="metric-badge purple">Chờ duyệt</span>;
      case 'CV_Approved':
        return <span className="metric-badge blue">Đạt vòng đơn</span>;
      case 'CV_Rejected':
        return <span className="metric-badge" style={{ backgroundColor: '#fed7d7', color: '#c53030' }}>Từ chối đơn</span>;
      case 'Interview_Scheduled':
        return <span className="metric-badge" style={{ backgroundColor: '#feebc8', color: '#c05621' }}>Hẹn phỏng vấn</span>;
      case 'Interview_Approved':
        return <span className="metric-badge green">Đạt phỏng vấn</span>;
      case 'Interview_Rejected':
        return <span className="metric-badge" style={{ backgroundColor: '#feb2b2', color: '#9b2c2c' }}>Trượt phỏng vấn</span>;
      case 'Onboarded':
        return <span className="metric-badge green" style={{ border: '1px solid #48bb78' }}>Đã nhận</span>;
      default:
        return <span className="metric-badge">{status}</span>;
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
            placeholder="Search recruits..."
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
          <h1>Member Recruitment Flow</h1>
          <p>Sàng lọc hồ sơ ứng viên, đặt lịch phỏng vấn và kích hoạt tài khoản thành viên chính thức.</p>
          <div className="dash-hero-date">
            <span>📅 Tuyển dụng • Vòng đời 4 bước ứng tuyển</span>
            <span className="dash-banner-dot" style={{ backgroundColor: '#ffffff', boxShadow: '0 0 8px #ffffff' }}></span>
            <span>Active Campaign</span>
          </div>
        </div>
        <div className="dash-hero-right" style={{ alignItems: 'center', gap: '30px' }}>
          <div className="dash-hero-stat">
            <strong>{totalApps}</strong>
            <span>TỔNG ĐƠN</span>
          </div>
          <div className="dash-hero-stat">
            <strong>{pendingApps}</strong>
            <span>CHỜ DUYỆT</span>
          </div>
          <div className="dash-hero-stat">
            <strong>{interviewApps}</strong>
            <span>PHỎNG VẤN</span>
          </div>
          <div className="dash-hero-stat">
            <strong>{onboardedApps}</strong>
            <span>ĐÃ NHẬN</span>
          </div>
        </div>
      </section>

      {/* 3. Steps Indicator Panel */}
      <section className="dash-health-monitor" style={{ borderLeftColor: '#ff7a00' }}>
        <div className="dash-health-info" style={{ flex: '1' }}>
          <h3>RECRIUTMENT STEPS</h3>
          <p>Quy trình tuyển chọn thành viên tiềm năng</p>
        </div>
        <div style={{ display: 'flex', gap: '20px', flex: '3', justifyContent: 'space-around', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <span style={{ display: 'inline-flex', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#ff4500', color: 'white', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginBottom: '4px' }}>1</span>
            <div style={{ fontSize: '12px', fontWeight: '700' }}>Đăng ký ứng tuyển</div>
          </div>
          <div style={{ color: '#ff4500', fontWeight: 'bold' }}>➔</div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ display: 'inline-flex', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#ff7a00', color: 'white', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginBottom: '4px' }}>2</span>
            <div style={{ fontSize: '12px', fontWeight: '700' }}>Sàng lọc hồ sơ</div>
          </div>
          <div style={{ color: '#ff7a00', fontWeight: 'bold' }}>➔</div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ display: 'inline-flex', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#ffd700', color: '#333', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginBottom: '4px' }}>3</span>
            <div style={{ fontSize: '12px', fontWeight: '700' }}>Đánh giá phỏng vấn</div>
          </div>
          <div style={{ color: '#ffd700', fontWeight: 'bold' }}>➔</div>
          <div style={{ textAlign: 'center' }}>
            <span style={{ display: 'inline-flex', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#34A853', color: 'white', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginBottom: '4px' }}>4</span>
            <div style={{ fontSize: '12px', fontWeight: '700' }}>Kích hoạt tài khoản</div>
          </div>
        </div>
      </section>

      {/* 4. Filters */}
      <section className="dash-section-card" style={{ gap: '12px' }}>
        <div style={{ fontSize: '11px', fontWeight: '800', color: '#718096', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          📍 BỘ LỌC HỒ SƠ ỨNG VIÊN
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-end' }}>
          <div style={{ flex: '2', minWidth: '240px' }}>
            <label style={{ fontSize: '10px', fontWeight: '700', color: '#a0aec0', display: 'block', marginBottom: '6px' }}>TÌM KIẾM THEO TÊN / MSSV / EMAIL</label>
            <div className="dash-search-container" style={{ maxWidth: '100%' }}>
              <SearchIcon />
              <input
                type="text"
                placeholder="Tên, MSSV hoặc Email..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                className="dash-search-input"
                style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e0' }}
              />
            </div>
          </div>

          <div style={{ flex: '1', minWidth: '150px' }}>
            <label style={{ fontSize: '10px', fontWeight: '700', color: '#a0aec0', display: 'block', marginBottom: '6px' }}>BAN MUỐN VÀO</label>
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
            <label style={{ fontSize: '10px', fontWeight: '700', color: '#a0aec0', display: 'block', marginBottom: '6px' }}>TRẠNG THÁI DUYỆT</label>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="sidebar-dev-select"
              style={{ padding: '10px', height: '42px', border: '1px solid #cbd5e0' }}
            >
              <option value="">— Tất cả Trạng thái —</option>
              <option value="Pending">Chờ duyệt</option>
              <option value="CV_Approved">Đạt vòng đơn</option>
              <option value="CV_Rejected">Từ chối đơn</option>
              <option value="Interview_Scheduled">Hẹn phỏng vấn</option>
              <option value="Interview_Approved">Đạt phỏng vấn</option>
              <option value="Interview_Rejected">Trượt phỏng vấn</option>
              <option value="Onboarded">Đã nhận (Kích hoạt)</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="sidebar-promo-btn" style={{ height: '42px', padding: '0 20px', borderRadius: '8px' }}>
              <FilterIcon />
              <span>Lọc hồ sơ</span>
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

      {/* 5. Applications Table */}
      <section className="dash-section-card">
        <div className="dash-card-header">
          <div className="dash-card-title-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '18px' }}>📋</span>
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: '800' }}>Danh sách Đơn Ứng Tuyển</h2>
              <p>Quy trình sàng lọc & tiếp nhận hồ sơ</p>
            </div>
          </div>
          <span className="dash-card-badge">{filteredApps.length} hồ sơ</span>
        </div>

        <div className="table-responsive">
          {filteredApps.length === 0 ? (
            <div className="empty-state" style={{ padding: '60px 24px' }}>
              <EmptyRecruitIcon />
              <h3>Chưa có hồ sơ ứng tuyển nào</h3>
              <p style={{ maxWidth: '500px', margin: '0 auto', fontSize: '12.5px', color: '#a0aec0', lineHeight: 1.6 }}>
                Không tìm thấy đơn ứng tuyển nào. Hệ thống đã chuẩn bị sẵn mảng rỗng <code>applications</code>. Bạn hãy fetch dữ liệu ứng viên từ API <code>/api/recruitment/applications</code> và bind vào state này để quản lý.
              </p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#718096', textTransform: 'uppercase', fontSize: '11px', fontWeight: '800' }}>
                  <th style={{ padding: '12px 16px' }}>Họ tên / MSSV</th>
                  <th style={{ padding: '12px 16px' }}>Liên hệ</th>
                  <th style={{ padding: '12px 16px' }}>Ban ứng tuyển</th>
                  <th style={{ padding: '12px 16px' }}>Lý do ứng tuyển</th>
                  <th style={{ padding: '12px 16px' }}>Trạng thái</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Duyệt đơn (CV)</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Phỏng vấn / Onboard</th>
                </tr>
              </thead>
              <tbody>
                {filteredApps.map((app) => (
                  <tr key={app.id} style={{ borderBottom: '1px solid #edf2f7' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: '700', color: '#2d3748' }}>{app.fullName}</span>
                        <span style={{ fontSize: '11.5px', color: '#a0aec0' }}>MSSV: {app.studentId}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>{app.email}</span>
                        <span style={{ fontSize: '11.5px', color: '#718096' }}>SĐT: {app.phone}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span className="metric-badge purple">{app.targetDept}</span>
                    </td>
                    <td style={{ padding: '14px 16px', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={app.reason}>
                      {app.reason}
                    </td>
                    <td style={{ padding: '14px 16px' }}>{getStatusBadge(app.status)}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      {app.status === 'Pending' && (
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <button className="sidebar-dev-select" style={{ height: '32px', padding: '0 10px', fontSize: '11px', backgroundColor: '#34A853', color: '#fff', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }} title="Duyệt qua vòng đơn & Gửi email hẹn phỏng vấn">
                            <CheckIcon /> Duyệt đơn
                          </button>
                          <button className="sidebar-dev-select" style={{ height: '32px', padding: '0 10px', fontSize: '11px', backgroundColor: '#e53e3e', color: '#fff', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }} title="Từ chối vòng đơn & Gửi email thông báo">
                            <XIcon /> Từ chối
                          </button>
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      {app.status === 'Interview_Scheduled' && (
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <button className="sidebar-dev-select" style={{ height: '32px', padding: '0 10px', fontSize: '11px', backgroundColor: '#34A853', color: '#fff', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }} title="Đạt phỏng vấn">
                            <CheckIcon /> Đạt PV
                          </button>
                          <button className="sidebar-dev-select" style={{ height: '32px', padding: '0 10px', fontSize: '11px', backgroundColor: '#e53e3e', color: '#fff', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }} title="Không đạt phỏng vấn">
                            <XIcon /> Trượt PV
                          </button>
                        </div>
                      )}
                      {app.status === 'Interview_Approved' && (
                        <button className="sidebar-promo-btn" style={{ height: '32px', padding: '0 12px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px' }} title="Tạo tài khoản và kích hoạt tài khoản thành viên chính thức">
                          <MailIcon /> Kích hoạt TV
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
