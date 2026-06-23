import React, { useState } from 'react';
import '../Dashboard.css'; // Reuse dashboard styling rules

// SVG Icons
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="dash-search-icon">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const EmptySpeakerIcon = () => (
  <svg viewBox="0 0 24 24" width="56" height="56" stroke="#a0aec0" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="empty-icon">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <line x1="23" y1="11" x2="17" y2="11" />
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

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

/*
// ==========================================
// SCHEMAS & MOCK DATA FOR FUTURE API INTEGRATION
// ==========================================
// API Endpoint: GET /api/speakers
// JSON Response Schema:
// [
//   {
//     "id": 1,
//     "name": "Dr. Le Truong Tung",
//     "expertise": "Giao duc & Phat trien Cong nghe",
//     "company": "FPT Education",
//     "email": "tunglt@fpt.edu.vn",
//     "phone": "02473005588",
//     "eventsCount": 3,
//     "status": "Confirmed", // Invited (Đã gửi lời mời), Confirmed (Đã xác nhận), Completed (Đã tham gia), Cancelled (Hủy lời mời)
//     "invitedEventTitle": "Vũ trụ Khởi Nghiệp 2026"
//   }
// ]
*/

export default function SpeakerManagement() {
  // Empty state by default
  const [speakers, setSpeakers] = useState([]);

  // Search & Filters
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Calculate statistics
  const totalSpeakers = speakers.length;
  const confirmedSpeakers = speakers.filter(s => s.status === 'Confirmed').length;
  const invitedSpeakers = speakers.filter(s => s.status === 'Invited').length;
  const completedSpeakers = speakers.filter(s => s.status === 'Completed').length;

  const filteredSpeakers = speakers.filter(s => {
    const matchesSearch = 
      s.name.toLowerCase().includes(searchText.toLowerCase()) ||
      s.expertise.toLowerCase().includes(searchText.toLowerCase()) ||
      s.company.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus = selectedStatus === '' || s.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleResetFilters = () => {
    setSearchText('');
    setSelectedStatus('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Invited':
        return <span className="metric-badge purple">Đã gửi thư mời</span>;
      case 'Confirmed':
        return <span className="metric-badge" style={{ backgroundColor: 'rgba(255, 122, 0, 0.1)', color: '#ff7a00' }}>Đã xác nhận</span>;
      case 'Completed':
        return <span className="metric-badge green">Đã tham gia</span>;
      case 'Cancelled':
        return <span className="metric-badge" style={{ backgroundColor: '#fed7d7', color: '#c53030' }}>Đã hủy mời</span>;
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
            placeholder="Search speakers..."
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
          <h1>Guest Speaker Management</h1>
          <p>Quản lý hồ sơ thông tin Diễn giả (Talkshow/Workshop), lưu trữ lịch sử hợp tác và điều phối thư mời sự kiện.</p>
          <div className="dash-hero-date">
            <span>📅 Diễn giả đối ngoại • Thiết lập lịch hẹn & Sự kiện hợp tác</span>
            <span className="dash-banner-dot" style={{ backgroundColor: '#ffffff', boxShadow: '0 0 8px #ffffff' }}></span>
            <span>External Partner</span>
          </div>
        </div>
        <div className="dash-hero-right" style={{ alignItems: 'center', gap: '30px' }}>
          <div className="dash-hero-stat">
            <strong>{totalSpeakers}</strong>
            <span>ĐÃ LIÊN HỆ</span>
          </div>
          <div className="dash-hero-stat">
            <strong>{confirmedSpeakers}</strong>
            <span>ĐÃ XÁC NHẬN</span>
          </div>
          <div className="dash-hero-stat">
            <strong>{invitedSpeakers}</strong>
            <span>CHỜ THƯ PHẢN HỒI</span>
          </div>
          <div className="dash-hero-stat">
            <strong>{completedSpeakers}</strong>
            <span>HỢP TÁC XONG</span>
          </div>
        </div>
      </section>

      {/* 3. Operational status banner */}
      <div className="dash-banner">
        <div className="dash-banner-dot"></div>
        <span>Quản lý hồ sơ diễn giả và phân nhóm lĩnh vực giúp câu lạc bộ dễ dàng chọn lựa khách mời cho các talkshow sắp tới.</span>
      </div>

      {/* 4. Filters */}
      <section className="dash-section-card" style={{ gap: '12px' }}>
        <div style={{ fontSize: '11px', fontWeight: '800', color: '#718096', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          📍 TÌM KIẾM DIỄN GIẢ & CHUYÊN MÔN
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-end' }}>
          
          <div style={{ flex: '3', minWidth: '240px' }}>
            <label style={{ fontSize: '10px', fontWeight: '700', color: '#a0aec0', display: 'block', marginBottom: '6px' }}>HỌ TÊN DIỄN GIẢ / LĨNH VỰC / CÔNG TY CÔNG TÁC</label>
            <div className="dash-search-container" style={{ maxWidth: '100%' }}>
              <SearchIcon />
              <input
                type="text"
                placeholder="Nhập tên diễn giả, lĩnh vực chuyên sâu, công ty hoặc tập đoàn..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                className="dash-search-input"
                style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e0' }}
              />
            </div>
          </div>

          <div style={{ flex: '1', minWidth: '150px' }}>
            <label style={{ fontSize: '10px', fontWeight: '700', color: '#a0aec0', display: 'block', marginBottom: '6px' }}>TRẠNG THÁI LỜI MỜI</label>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="sidebar-dev-select"
              style={{ padding: '10px', height: '42px', border: '1px solid #cbd5e0' }}
            >
              <option value="">— Tất cả Trạng thái —</option>
              <option value="Invited">Đã gửi thư mời</option>
              <option value="Confirmed">Đã xác nhận</option>
              <option value="Completed">Đã tham gia</option>
              <option value="Cancelled">Đã hủy mời</option>
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

      {/* 5. Speakers Table */}
      <section className="dash-section-card">
        <div className="dash-card-header">
          <div className="dash-card-title-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '18px' }}>🎙️</span>
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: '800' }}>Danh sách Diễn Giả Đối Ngoại</h2>
              <p>Hồ sơ diễn giả và các hoạt động hội thảo đã đồng hành cùng câu lạc bộ</p>
            </div>
          </div>
          <span className="dash-card-badge">{filteredSpeakers.length} diễn giả</span>
        </div>

        <div className="table-responsive">
          {filteredSpeakers.length === 0 ? (
            <div className="empty-state" style={{ padding: '60px 24px' }}>
              <EmptySpeakerIcon />
              <h3>Chưa có hồ sơ diễn giả</h3>
              <p style={{ maxWidth: '500px', margin: '0 auto', fontSize: '12.5px', color: '#a0aec0', lineHeight: 1.6 }}>
                Không tìm thấy diễn giả nào trong cơ sở dữ liệu. Mảng state <code>speakers</code> đang để trống mặc định. Bạn hãy liên kết với API <code>/api/speakers</code> để quản lý thông tin các khách mời VIP tại đây.
              </p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#718096', textTransform: 'uppercase', fontSize: '11px', fontWeight: '800' }}>
                  <th style={{ padding: '12px 16px' }}>Họ tên diễn giả</th>
                  <th style={{ padding: '12px 16px' }}>Lĩnh vực chuyên sâu</th>
                  <th style={{ padding: '12px 16px' }}>Đơn vị công tác</th>
                  <th style={{ padding: '12px 16px' }}>Liên hệ</th>
                  <th style={{ padding: '12px 16px' }}>Sự kiện đồng hành</th>
                  <th style={{ padding: '12px 16px' }}>Trạng thái mời</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Hành động đối ngoại</th>
                </tr>
              </thead>
              <tbody>
                {filteredSpeakers.map((speaker) => (
                  <tr key={speaker.id} style={{ borderBottom: '1px solid #edf2f7' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontWeight: '700', color: '#2d3748', display: 'block' }}>{speaker.name}</span>
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: '600' }}>{speaker.expertise}</td>
                    <td style={{ padding: '14px 16px' }}>{speaker.company}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>{speaker.email}</span>
                        <span style={{ fontSize: '11.5px', color: '#a0aec0' }}>{speaker.phone}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 'bold', color: '#ff4500' }}>{speaker.eventsCount} sự kiện</span>
                        {speaker.invitedEventTitle && (
                          <span style={{ fontSize: '11.5px', color: '#718096' }}>Sắp tới: {speaker.invitedEventTitle}</span>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>{getStatusBadge(speaker.status)}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button className="sidebar-dev-select" style={{ height: '32px', padding: '0 10px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px' }} title="Xem hồ sơ năng lực & CV diễn giả">
                          <EyeIcon /> Chi tiết
                        </button>
                        <button className="sidebar-promo-btn" style={{ height: '32px', padding: '0 10px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px' }} title="Gửi email lời mời hoặc cập nhật lịch hẹn">
                          <CalendarIcon /> Mời sự kiện
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
