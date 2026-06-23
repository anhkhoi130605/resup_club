import React, { useState } from 'react';
import '../Dashboard.css'; // Reuse dashboard styling rules

// SVG Icons
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="dash-search-icon">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const EmptyEventsIcon = () => (
  <svg viewBox="0 0 24 24" width="56" height="56" stroke="#a0aec0" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="empty-icon">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
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

const QrIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const UserCheckIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="17 11 19 13 23 9" />
  </svg>
);

const DocumentTextIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

/*
// ==========================================
// SCHEMAS & MOCK DATA FOR FUTURE API INTEGRATION
// ==========================================
// API Endpoint: GET /api/events
// JSON Response Schema:
// [
//   {
//     "id": 1,
//     "title": "Vũ trụ Khởi Nghiệp ResUp 2026",
//     "description": "Talkshow ve con duong lap nghiep danh cho sinh vien CNTT.",
//     "date": "2026-07-15",
//     "location": "Hội trường Beta, ĐH FPT",
//     "organizer": "Ban Biz",
//     "registeredCount": 140,
//     "checkedInCount": 0,
//     "budget": 15000000,
//     "status": "Upcoming" // Upcoming (Sắp diễn ra), Ongoing (Đang diễn ra), Completed (Đã kết thúc), Cancelled (Đã hủy)
//   }
// ]
*/

export default function EventManagement() {
  // Empty state by default
  const [events, setEvents] = useState([]);
  
  // Search & Filters
  const [searchText, setSearchText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Calculate statistics
  const totalCount = events.length;
  const upcomingCount = events.filter(e => e.status === 'Upcoming').length;
  const ongoingCount = events.filter(e => e.status === 'Ongoing').length;
  const completedCount = events.filter(e => e.status === 'Completed').length;

  const filteredEvents = events.filter(e => {
    const matchesSearch = 
      e.title.toLowerCase().includes(searchText.toLowerCase()) ||
      e.location.toLowerCase().includes(searchText.toLowerCase()) ||
      e.organizer.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus = selectedStatus === '' || e.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleResetFilters = () => {
    setSearchText('');
    setSelectedStatus('');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Upcoming':
        return <span className="metric-badge blue">Sắp diễn ra</span>;
      case 'Ongoing':
        return <span className="metric-badge" style={{ backgroundColor: 'rgba(255, 122, 0, 0.1)', color: '#ff7a00' }}>Đang diễn ra</span>;
      case 'Completed':
        return <span className="metric-badge green">Đã kết thúc</span>;
      case 'Cancelled':
        return <span className="metric-badge" style={{ backgroundColor: '#fed7d7', color: '#c53030' }}>Đã hủy</span>;
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
            placeholder="Search events..."
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
          <h1>Event Lifecycle Management</h1>
          <p>Khởi tạo sự kiện, điều phối nhân lực, quản lý đăng ký vé mời QR Code, Check-in sự kiện và kết xuất báo cáo.</p>
          <div className="dash-hero-date">
            <span>📅 Sự kiện CLB • Tích hợp Check-in Quét mã QR</span>
            <span className="dash-banner-dot" style={{ backgroundColor: '#ffffff', boxShadow: '0 0 8px #ffffff' }}></span>
            <span>Real-time Tracking</span>
          </div>
        </div>
        <div className="dash-hero-right" style={{ alignItems: 'center', gap: '30px' }}>
          <div className="dash-hero-stat">
            <strong>{totalCount}</strong>
            <span>SỰ KIỆN</span>
          </div>
          <div className="dash-hero-stat">
            <strong>{upcomingCount}</strong>
            <span>SẮP DIỄN RA</span>
          </div>
          <div className="dash-hero-stat">
            <strong>{ongoingCount}</strong>
            <span>ĐANG DIỄN RA</span>
          </div>
          <div className="dash-hero-stat">
            <strong>{completedCount}</strong>
            <span>ĐÃ KẾT THÚC</span>
          </div>
        </div>
      </section>

      {/* 3. Event Lifecycle Banner */}
      <section className="dash-health-monitor" style={{ borderLeftColor: '#ff4500' }}>
        <div className="dash-health-info" style={{ flex: '1' }}>
          <h3>EVENT LIFE-CYCLE</h3>
          <p>Tiến trình tổ chức sự kiện chuyên nghiệp</p>
        </div>
        <div style={{ display: 'flex', gap: '15px', flex: '3', justifyContent: 'space-around', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', opacity: 0.9 }}>
            <span style={{ display: 'inline-flex', padding: '6px 12px', borderRadius: '4px', backgroundColor: 'rgba(255, 69, 0, 0.1)', color: '#ff4500', fontSize: '11px', fontWeight: 'bold' }}>1. KHỞI TẠO</span>
          </div>
          <div style={{ color: '#ff4500' }}>➔</div>
          <div style={{ textAlign: 'center', opacity: 0.9 }}>
            <span style={{ display: 'inline-flex', padding: '6px 12px', borderRadius: '4px', backgroundColor: 'rgba(255, 122, 0, 0.1)', color: '#ff7a00', fontSize: '11px', fontWeight: 'bold' }}>2. PHÂN CÔNG TASK</span>
          </div>
          <div style={{ color: '#ff7a00' }}>➔</div>
          <div style={{ textAlign: 'center', opacity: 0.9 }}>
            <span style={{ display: 'inline-flex', padding: '6px 12px', borderRadius: '4px', backgroundColor: 'rgba(255, 215, 0, 0.1)', color: '#b78b00', fontSize: '11px', fontWeight: 'bold' }}>3. VÉ QR CODE</span>
          </div>
          <div style={{ color: '#ffd700' }}>➔</div>
          <div style={{ textAlign: 'center', opacity: 0.9 }}>
            <span style={{ display: 'inline-flex', padding: '6px 12px', borderRadius: '4px', backgroundColor: 'rgba(52, 168, 83, 0.1)', color: '#34A853', fontSize: '11px', fontWeight: 'bold' }}>4. CHECK-IN QUÉT QR</span>
          </div>
          <div style={{ color: '#34A853' }}>➔</div>
          <div style={{ textAlign: 'center', opacity: 0.9 }}>
            <span style={{ display: 'inline-flex', padding: '6px 12px', borderRadius: '4px', backgroundColor: 'rgba(66, 133, 244, 0.1)', color: '#4285F4', fontSize: '11px', fontWeight: 'bold' }}>5. BÁO CÁO</span>
          </div>
        </div>
      </section>

      {/* 4. Filters */}
      <section className="dash-section-card" style={{ gap: '12px' }}>
        <div style={{ fontSize: '11px', fontWeight: '800', color: '#718096', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          📍 TÌM KIẾM & BỘ LỌC SỰ KIỆN
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-end' }}>
          
          <div style={{ flex: '3', minWidth: '240px' }}>
            <label style={{ fontSize: '10px', fontWeight: '700', color: '#a0aec0', display: 'block', marginBottom: '6px' }}>TÊN SỰ KIỆN / ĐỊA ĐIỂM / BAN TỔ CHỨC</label>
            <div className="dash-search-container" style={{ maxWidth: '100%' }}>
              <SearchIcon />
              <input
                type="text"
                placeholder="Nhập tên sự kiện, địa điểm, phòng ban tổ chức..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                className="dash-search-input"
                style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e0' }}
              />
            </div>
          </div>

          <div style={{ flex: '1', minWidth: '150px' }}>
            <label style={{ fontSize: '10px', fontWeight: '700', color: '#a0aec0', display: 'block', marginBottom: '6px' }}>TRẠNG THÁI SỰ KIỆN</label>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="sidebar-dev-select"
              style={{ padding: '10px', height: '42px', border: '1px solid #cbd5e0' }}
            >
              <option value="">— Tất cả Trạng thái —</option>
              <option value="Upcoming">Sắp diễn ra</option>
              <option value="Ongoing">Đang diễn ra</option>
              <option value="Completed">Đã kết thúc</option>
              <option value="Cancelled">Đã hủy</option>
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

      {/* 5. Events List Table */}
      <section className="dash-section-card">
        <div className="dash-card-header">
          <div className="dash-card-title-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '18px' }}>📅</span>
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: '800' }}>Danh sách Sự kiện</h2>
              <p>Khảo sát ngân sách, tiến độ công việc và số lượng vé phát hành</p>
            </div>
          </div>
          <span className="dash-card-badge">{filteredEvents.length} sự kiện</span>
        </div>

        <div className="table-responsive">
          {filteredEvents.length === 0 ? (
            <div className="empty-state" style={{ padding: '60px 24px' }}>
              <EmptyEventsIcon />
              <h3>Chưa có sự kiện nào được tạo</h3>
              <p style={{ maxWidth: '500px', margin: '0 auto', fontSize: '12.5px', color: '#a0aec0', lineHeight: 1.6 }}>
                Không tìm thấy sự kiện nào trong hệ thống. Dữ liệu mảng <code>events</code> đang là rỗng. Hãy liên kết trang này với API <code>/api/events</code> của bạn để hiển thị và quản lý vòng đời sự kiện.
              </p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#718096', textTransform: 'uppercase', fontSize: '11px', fontWeight: '800' }}>
                  <th style={{ padding: '12px 16px' }}>Sự kiện</th>
                  <th style={{ padding: '12px 16px' }}>Thời gian & Địa điểm</th>
                  <th style={{ padding: '12px 16px' }}>Phòng ban tổ chức</th>
                  <th style={{ padding: '12px 16px' }}>Ngân sách dự tính</th>
                  <th style={{ padding: '12px 16px' }}>Đăng ký / Check-in</th>
                  <th style={{ padding: '12px 16px' }}>Trạng thái</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Thao tác sự kiện</th>
                </tr>
              </thead>
              <tbody>
                {filteredEvents.map((evt) => (
                  <tr key={evt.id} style={{ borderBottom: '1px solid #edf2f7' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontWeight: '700', color: '#2d3748', display: 'block' }}>{evt.title}</span>
                      <span style={{ fontSize: '11.5px', color: '#a0aec0' }}>{evt.description}</span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: '600' }}>{evt.date}</span>
                        <span style={{ fontSize: '11.5px', color: '#718096' }}>📍 {evt.location}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span className="metric-badge purple">{evt.organizer}</span>
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: '600', color: '#ff4500' }}>
                      {evt.budget ? evt.budget.toLocaleString('vi-VN') + ' đ' : 'N/A'}
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 'bold' }}>
                      <span style={{ color: '#4285F4' }}>{evt.registeredCount}</span>
                      <span style={{ color: '#a0aec0', fontWeight: 'normal' }}> / </span>
                      <span style={{ color: '#34A853' }}>{evt.checkedInCount} check-in</span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>{getStatusBadge(evt.status)}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button className="sidebar-dev-select" style={{ height: '32px', padding: '0 8px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px' }} title="Phân công nhân sự & task phụ trách">
                          <CalendarIcon /> Giao Task
                        </button>
                        {evt.status === 'Upcoming' && (
                          <button className="sidebar-dev-select" style={{ height: '32px', padding: '0 8px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px' }} title="Sinh vé QR Code gửi email cho người đăng ký">
                            <QrIcon /> Sinh Vé QR
                          </button>
                        )}
                        {evt.status === 'Ongoing' && (
                          <button className="sidebar-dev-select" style={{ height: '32px', padding: '0 8px', fontSize: '11px', backgroundColor: '#34A853', color: '#fff', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }} title="Mở cổng check-in quét mã QR">
                            <UserCheckIcon /> Check-in
                          </button>
                        )}
                        {evt.status === 'Completed' && (
                          <button className="sidebar-promo-btn" style={{ height: '32px', padding: '0 8px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px' }} title="Xuất báo cáo tổng kết chi tiết sự kiện">
                            <DocumentTextIcon /> Báo cáo
                          </button>
                        )}
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
