import React, { useState } from 'react';
import '../Dashboard.css'; // Reuse dashboard styling rules

// SVG Icons
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="dash-search-icon">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const EmptySponsorIcon = () => (
  <svg viewBox="0 0 24 24" width="56" height="56" stroke="#a0aec0" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="empty-icon">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
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

const DocumentTextIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const DollarIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

/*
// ==========================================
// SCHEMAS & MOCK DATA FOR FUTURE API INTEGRATION
// ==========================================
// API Endpoint: GET /api/sponsors
// JSON Response Schema:
// [
//   {
//     "id": 1,
//     "sponsorName": "FPT Software",
//     "industry": "Cong nghe thong tin",
//     "packageTier": "Diamond", // Diamond (Kim cương), Gold (Vàng), Silver (Bạc), Bronze (Đồng)
//     "sponsorAmount": 50000000,
//     "disbursedAmount": 30000000,
//     "benefitProgress": 65, // % of benefits delivered (logo on banner, standee, facebook post)
//     "status": "Signed", // Pending (Đang thương thảo), Signed (Đã ký kết hợp đồng), Expired (Đã hết hạn hợp đồng)
//     "eventTitle": "Vũ trụ Khởi Nghiệp 2026"
//   }
// ]
*/

export default function SponsorManagement() {
  // Empty state by default
  const [sponsors, setSponsors] = useState([]);

  // Search & Filters
  const [searchText, setSearchText] = useState('');
  const [selectedTier, setSelectedTier] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Calculate statistics
  const totalSponsors = sponsors.length;
  const signedSponsors = sponsors.filter(s => s.status === 'Signed').length;
  const totalAmountPledged = sponsors
    .filter(s => s.status === 'Signed')
    .reduce((sum, curr) => sum + curr.sponsorAmount, 0);

  const totalDisbursed = sponsors
    .filter(s => s.status === 'Signed')
    .reduce((sum, curr) => sum + curr.disbursedAmount, 0);

  const filteredSponsors = sponsors.filter(s => {
    const matchesSearch = 
      s.sponsorName.toLowerCase().includes(searchText.toLowerCase()) ||
      s.industry.toLowerCase().includes(searchText.toLowerCase()) ||
      (s.eventTitle && s.eventTitle.toLowerCase().includes(searchText.toLowerCase()));

    const matchesTier = selectedTier === '' || s.packageTier === selectedTier;
    const matchesStatus = selectedStatus === '' || s.status === selectedStatus;

    return matchesSearch && matchesTier && matchesStatus;
  });

  const handleResetFilters = () => {
    setSearchText('');
    setSelectedTier('');
    setSelectedStatus('');
  };

  const getTierBadge = (tier) => {
    switch (tier) {
      case 'Diamond':
        return <span className="metric-badge" style={{ backgroundColor: '#ebf8ff', color: '#2b6cb0', border: '1px solid #bee3f8', fontWeight: 'bold' }}>💎 Kim Cương</span>;
      case 'Gold':
        return <span className="metric-badge" style={{ backgroundColor: '#fef3c7', color: '#d97706', border: '1px solid #fde68a', fontWeight: 'bold' }}>⭐ Vàng</span>;
      case 'Silver':
        return <span className="metric-badge" style={{ backgroundColor: '#edf2f7', color: '#4a5568', border: '1px solid #e2e8f0', fontWeight: 'bold' }}>🥈 Bạc</span>;
      case 'Bronze':
        return <span className="metric-badge" style={{ backgroundColor: '#fffaf0', color: '#dd6b20', border: '1px solid #fbd38d', fontWeight: 'bold' }}>🥉 Đồng</span>;
      default:
        return <span className="metric-badge">{tier}</span>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return <span className="metric-badge purple">Thương thảo</span>;
      case 'Signed':
        return <span className="metric-badge green">Đã ký kết</span>;
      case 'Expired':
        return <span className="metric-badge" style={{ backgroundColor: '#cbd5e0', color: '#4a5568' }}>Hết hạn</span>;
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
            placeholder="Search sponsors..."
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
          <h1>Sponsor Partner Management</h1>
          <p>Quản lý danh sách nhà tài trợ doanh nghiệp, theo dõi tiến trình thực hiện quyền lợi quảng bá đối tác và giải ngân ngân sách sự kiện.</p>
          <div className="dash-hero-date">
            <span>📅 Quan hệ doanh nghiệp • Tiến trình cam kết quyền lợi & Giải ngân</span>
            <span className="dash-banner-dot" style={{ backgroundColor: '#ffffff', boxShadow: '0 0 8px #ffffff' }}></span>
            <span>External Sponsors</span>
          </div>
        </div>
        <div className="dash-hero-right" style={{ alignItems: 'center', gap: '30px' }}>
          <div className="dash-hero-stat">
            <strong>{totalSponsors}</strong>
            <span>ĐỐI TÁC</span>
          </div>
          <div className="dash-hero-stat">
            <strong>{signedSponsors}</strong>
            <span>ĐÃ KÝ HĐ</span>
          </div>
          <div className="dash-hero-stat">
            <strong>{totalAmountPledged.toLocaleString('vi-VN')}đ</strong>
            <span>TỔNG TÀI TRỢ</span>
          </div>
          <div className="dash-hero-stat">
            <strong>{totalDisbursed.toLocaleString('vi-VN')}đ</strong>
            <span>ĐÃ GIẢI NGÂN</span>
          </div>
        </div>
      </section>

      {/* 3. Operational status banner */}
      <div className="dash-banner">
        <div className="dash-banner-dot"></div>
        <span>Theo dõi chặt chẽ tiến trình bàn giao quyền lợi quảng cáo (logo trên Banner, Standee, bài đăng Fanpage) để duy trì mối quan hệ bền vững với nhà tài trợ.</span>
      </div>

      {/* 4. Filters */}
      <section className="dash-section-card" style={{ gap: '12px' }}>
        <div style={{ fontSize: '11px', fontWeight: '800', color: '#718096', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          📍 TÌM KIẾM NHÀ TÀI TRỢ & GÓI HỢP TÁC
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-end' }}>
          
          <div style={{ flex: '3', minWidth: '240px' }}>
            <label style={{ fontSize: '10px', fontWeight: '700', color: '#a0aec0', display: 'block', marginBottom: '6px' }}>TÊN ĐỐI TÁC / LĨNH VỰC HOẠT ĐỘNG / SỰ KIỆN TÀI TRỢ</label>
            <div className="dash-search-container" style={{ maxWidth: '100%' }}>
              <SearchIcon />
              <input
                type="text"
                placeholder="Nhập tên nhà tài trợ, ngành hàng, tên sự kiện được tài trợ..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                className="dash-search-input"
                style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e0' }}
              />
            </div>
          </div>

          <div style={{ flex: '1', minWidth: '150px' }}>
            <label style={{ fontSize: '10px', fontWeight: '700', color: '#a0aec0', display: 'block', marginBottom: '6px' }}>HẠNG MỤC TÀI TRỢ</label>
            <select
              value={selectedTier}
              onChange={e => setSelectedTier(e.target.value)}
              className="sidebar-dev-select"
              style={{ padding: '10px', height: '42px', border: '1px solid #cbd5e0' }}
            >
              <option value="">— Tất cả Gói —</option>
              <option value="Diamond">Kim Cương</option>
              <option value="Gold">Vàng</option>
              <option value="Silver">Bạc</option>
              <option value="Bronze">Đồng</option>
            </select>
          </div>

          <div style={{ flex: '1', minWidth: '150px' }}>
            <label style={{ fontSize: '10px', fontWeight: '700', color: '#a0aec0', display: 'block', marginBottom: '6px' }}>TRẠNG THÁI HỢP ĐỒNG</label>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="sidebar-dev-select"
              style={{ padding: '10px', height: '42px', border: '1px solid #cbd5e0' }}
            >
              <option value="">— Tất cả Trạng thái —</option>
              <option value="Pending">Đang thương thảo</option>
              <option value="Signed">Đã ký kết</option>
              <option value="Expired">Hết hạn hợp đồng</option>
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

      {/* 5. Sponsors Table */}
      <section className="dash-section-card">
        <div className="dash-card-header">
          <div className="dash-card-title-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '18px' }}>🤝</span>
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: '800' }}>Hồ sơ Đối tác & Nhà Tài Trợ</h2>
              <p>Chi tiết các gói tài trợ tài chính, phân kỳ giải ngân và tỷ lệ bàn giao quyền lợi</p>
            </div>
          </div>
          <span className="dash-card-badge">{filteredSponsors.length} đối tác</span>
        </div>

        <div className="table-responsive">
          {filteredSponsors.length === 0 ? (
            <div className="empty-state" style={{ padding: '60px 24px' }}>
              <EmptySponsorIcon />
              <h3>Chưa có dữ liệu nhà tài trợ</h3>
              <p style={{ maxWidth: '500px', margin: '0 auto', fontSize: '12.5px', color: '#a0aec0', lineHeight: 1.6 }}>
                Không tìm thấy thông tin nhà tài trợ nào. Dữ liệu mảng <code>sponsors</code> đang được để rỗng theo thiết lập mặc định. Hãy kết nối với API <code>/api/sponsors</code> để hiển thị thông tin thực tế.
              </p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#718096', textTransform: 'uppercase', fontSize: '11px', fontWeight: '800' }}>
                  <th style={{ padding: '12px 16px' }}>Nhà tài trợ / Lĩnh vực</th>
                  <th style={{ padding: '12px 16px' }}>Gói tài trợ</th>
                  <th style={{ padding: '12px 16px' }}>Giá trị gói</th>
                  <th style={{ padding: '12px 16px' }}>Thực tế giải ngân</th>
                  <th style={{ padding: '12px 16px' }}>Đồng hành sự kiện</th>
                  <th style={{ padding: '12px 16px' }}>Bàn giao quyền lợi (%)</th>
                  <th style={{ padding: '12px 16px' }}>Trạng thái hợp đồng</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Giải ngân / Quyền lợi</th>
                </tr>
              </thead>
              <tbody>
                {filteredSponsors.map((sp) => (
                  <tr key={sp.id} style={{ borderBottom: '1px solid #edf2f7' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontWeight: '700', color: '#2d3748', display: 'block' }}>{sp.sponsorName}</span>
                      <span style={{ fontSize: '11.5px', color: '#a0aec0' }}>Lĩnh vực: {sp.industry}</span>
                    </td>
                    <td style={{ padding: '14px 16px' }}>{getTierBadge(sp.packageTier)}</td>
                    <td style={{ padding: '14px 16px', fontWeight: '700', color: '#2d3748' }}>
                      {sp.sponsorAmount.toLocaleString('vi-VN')} đ
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: '600', color: '#34A853' }}>
                      {sp.disbursedAmount.toLocaleString('vi-VN')} đ
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: '600' }}>{sp.eventTitle || 'N/A'}</td>
                    <td style={{ padding: '14px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ flex: 1, height: '6px', backgroundColor: '#e2e8f0', borderRadius: '3px', minWidth: '60px', overflow: 'hidden' }}>
                          <div style={{ width: `${sp.benefitProgress}%`, height: '100%', backgroundColor: sp.benefitProgress >= 100 ? '#34A853' : '#ff7a00', borderRadius: '3px' }}></div>
                        </div>
                        <span style={{ fontSize: '11.5px', fontWeight: 'bold' }}>{sp.benefitProgress}%</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px' }}>{getStatusBadge(sp.status)}</td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button className="sidebar-dev-select" style={{ height: '32px', padding: '0 8px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px' }} title="Xem chi tiết các điều khoản hợp đồng tài trợ">
                          <DocumentTextIcon /> Hợp đồng
                        </button>
                        {sp.status === 'Signed' && sp.sponsorAmount > sp.disbursedAmount && (
                          <button className="sidebar-promo-btn" style={{ height: '32px', padding: '0 8px', fontSize: '11px', display: 'inline-flex', alignItems: 'center', gap: '4px' }} title="Tiến hành xác nhận giải ngân đợt tiếp theo">
                            <DollarIcon /> Giải ngân đợt tiếp
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
