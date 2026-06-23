import React, { useState } from 'react';
import '../Dashboard.css'; // Reuse dashboard styling rules

// SVG Icons
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="dash-search-icon">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const EmptyFinanceIcon = () => (
  <svg viewBox="0 0 24 24" width="56" height="56" stroke="#a0aec0" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" className="empty-icon">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
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

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/*
// ==========================================
// SCHEMAS & MOCK DATA FOR FUTURE API INTEGRATION
// ==========================================
// API Endpoint: GET /api/finance/transactions
// JSON Response Schema:
// [
//   {
//     "id": 1,
//     "title": "Tài trợ Kim cương - FPT Software",
//     "amount": 25000000,
//     "type": "Income", // Income (Thu), Expense (Chi)
//     "category": "Sponsorship", // Sponsorship (Tài trợ), TicketSale (Bán vé), MemberFee (Quỹ CLB), EventExpense (Chi phí sự kiện), OperationExpense (Vận hành)
//     "proposedBy": "Nguyễn Văn A",
//     "eventTitle": "Vũ trụ Khởi Nghiệp 2026",
//     "status": "Approved", // Pending (Chờ duyệt), Approved (Đã duyệt), Rejected (Từ chối)
//     "createdAt": "2026-06-18T10:00:00Z"
//   }
// ]
*/

export default function FinancialManagement() {
  // Empty state by default
  const [transactions, setTransactions] = useState([]);

  // Search & Filters
  const [searchText, setSearchText] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Calculate statistics from the array
  const totalIncome = transactions
    .filter(t => t.type === 'Income' && t.status === 'Approved')
    .reduce((sum, curr) => sum + curr.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === 'Expense' && t.status === 'Approved')
    .reduce((sum, curr) => sum + curr.amount, 0);

  const currentBalance = totalIncome - totalExpense;

  const filteredTrans = transactions.filter(t => {
    const matchesSearch = 
      t.title.toLowerCase().includes(searchText.toLowerCase()) ||
      (t.eventTitle && t.eventTitle.toLowerCase().includes(searchText.toLowerCase())) ||
      t.proposedBy.toLowerCase().includes(searchText.toLowerCase());

    const matchesType = selectedType === '' || t.type === selectedType;
    const matchesCategory = selectedCategory === '' || t.category === selectedCategory;
    const matchesStatus = selectedStatus === '' || t.status === selectedStatus;

    return matchesSearch && matchesType && matchesCategory && matchesStatus;
  });

  const handleResetFilters = () => {
    setSearchText('');
    setSelectedType('');
    setSelectedCategory('');
    setSelectedStatus('');
  };

  return (
    <div className="admin-dashboard-page">
      {/* 1. Subheader */}
      <section className="dash-subheader">
        <div className="dash-search-container">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search financial records..."
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
          <h1>Financial Management</h1>
          <p>Kiểm soát dòng tiền Thu/Chi định kỳ của CLB và quản lý tài chính cho từng Sự kiện riêng biệt.</p>
          <div className="dash-hero-date">
            <span>📅 Ngân quỹ CLB • Đơn đề xuất chi tiêu & Báo cáo doanh số bán vé</span>
            <span className="dash-banner-dot" style={{ backgroundColor: '#ffffff', boxShadow: '0 0 8px #ffffff' }}></span>
            <span>Audit Ready</span>
          </div>
        </div>
        <div className="dash-hero-right" style={{ alignItems: 'center', gap: '30px' }}>
          <div className="dash-hero-stat">
            <strong>{currentBalance.toLocaleString('vi-VN')}đ</strong>
            <span>QUỸ CLB HIỆN TẠI</span>
          </div>
          <div className="dash-hero-stat">
            <strong>{totalIncome.toLocaleString('vi-VN')}đ</strong>
            <span>TỔNG THU</span>
          </div>
          <div className="dash-hero-stat">
            <strong>{totalExpense.toLocaleString('vi-VN')}đ</strong>
            <span>TỔNG CHI</span>
          </div>
        </div>
      </section>

      {/* 3. Metrics Cards & Cash Flow SVG Chart */}
      <section className="dash-row-grid">
        <article className="dash-section-card" style={{ gap: '10px' }}>
          <div className="dash-card-header">
            <div className="dash-card-title-group">
              <h2>Sơ đồ dòng tiền (Cash Flow Summary)</h2>
              <p>Biểu thị mức chênh lệch giữa Thu và Chi</p>
            </div>
            <span className="dash-card-badge">Tháng này</span>
          </div>
          {/* Inline SVG Chart */}
          <div style={{ width: '100%', height: '140px', padding: '10px 0' }}>
            <svg viewBox="0 0 400 120" style={{ width: '100%', height: '100%' }}>
              <line x1="30" y1="20" x2="380" y2="20" stroke="#f0f0f0" strokeWidth="1" />
              <line x1="30" y1="55" x2="380" y2="55" stroke="#f0f0f0" strokeWidth="1" />
              <line x1="30" y1="90" x2="380" y2="90" stroke="#e2e8f0" strokeWidth="1.5" />
              
              {/* Income Line - Green */}
              <path d="M 40 90 L 100 80 L 160 50 L 220 70 L 280 40 L 340 30" fill="none" stroke="#34A853" strokeWidth="3" />
              <circle cx="340" cy="30" r="4" fill="#34A853" />
              
              {/* Expense Line - Red */}
              <path d="M 40 90 L 100 85 L 160 80 L 220 60 L 280 75 L 340 65" fill="none" stroke="#e53e3e" strokeWidth="3" />
              <circle cx="340" cy="65" r="4" fill="#e53e3e" />
              
              <text x="350" y="34" fontSize="9" fill="#34A853" fontWeight="bold">Thu</text>
              <text x="350" y="69" fontSize="9" fill="#e53e3e" fontWeight="bold">Chi</text>
            </svg>
          </div>
        </article>

        {/* 3 Metric cards for Financial targets */}
        <div style={{ display: 'grid', gridTemplateRows: 'repeat(2, 1fr)', gap: '15px' }}>
          <div className="metric-card users" style={{ minHeight: '80px', padding: '15px' }}>
            <div className="metric-header">
              <span className="metric-title" style={{ fontSize: '10px' }}>TÀI TRỢ CHỜ GIẢI NGÂN</span>
              <span className="metric-badge purple">Sponsor Funds</span>
            </div>
            <div className="metric-body" style={{ marginTop: '5px' }}>
              <span className="metric-value" style={{ fontSize: '22px' }}>0đ</span>
              <span className="metric-subtext">Từ các đối tác sự kiện</span>
            </div>
          </div>
          <div className="metric-card errors" style={{ minHeight: '80px', padding: '15px', borderTopColor: '#ff8c42' }}>
            <div className="metric-header">
              <span className="metric-title" style={{ fontSize: '10px' }}>DOANH THU VÉ DỰ TÍNH</span>
              <span className="metric-badge green">Ticket Revenue</span>
            </div>
            <div className="metric-body" style={{ marginTop: '5px' }}>
              <span className="metric-value" style={{ fontSize: '22px', color: '#34A853' }}>0đ</span>
              <span className="metric-subtext">Tổng số vé bán ra thực tế</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Filters */}
      <section className="dash-section-card" style={{ gap: '12px' }}>
        <div style={{ fontSize: '11px', fontWeight: '800', color: '#718096', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          📍 BỘ LỌC GIAO DỊCH VÀ ĐỀ XUẤT CHI TIÊU
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-end' }}>
          
          <div style={{ flex: '2', minWidth: '220px' }}>
            <label style={{ fontSize: '10px', fontWeight: '700', color: '#a0aec0', display: 'block', marginBottom: '6px' }}>NỘI DUNG / NGƯỜI ĐỀ XUẤT / SỰ KIỆN</label>
            <div className="dash-search-container" style={{ maxWidth: '100%' }}>
              <SearchIcon />
              <input
                type="text"
                placeholder="Nội dung, người đề xuất hoặc tên sự kiện..."
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                className="dash-search-input"
                style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e0' }}
              />
            </div>
          </div>

          <div style={{ flex: '1', minWidth: '120px' }}>
            <label style={{ fontSize: '10px', fontWeight: '700', color: '#a0aec0', display: 'block', marginBottom: '6px' }}>LOẠI GIAO DỊCH</label>
            <select
              value={selectedType}
              onChange={e => setSelectedType(e.target.value)}
              className="sidebar-dev-select"
              style={{ padding: '10px', height: '42px', border: '1px solid #cbd5e0' }}
            >
              <option value="">— Tất cả —</option>
              <option value="Income">Khoản Thu (+)</option>
              <option value="Expense">Khoản Chi (-)</option>
            </select>
          </div>

          <div style={{ flex: '1', minWidth: '130px' }}>
            <label style={{ fontSize: '10px', fontWeight: '700', color: '#a0aec0', display: 'block', marginBottom: '6px' }}>PHÂN LOẠI</label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="sidebar-dev-select"
              style={{ padding: '10px', height: '42px', border: '1px solid #cbd5e0' }}
            >
              <option value="">— Tất cả —</option>
              <option value="Sponsorship">Từ Nhà tài trợ</option>
              <option value="TicketSale">Bán vé sự kiện</option>
              <option value="MemberFee">Quỹ CLB đóng góp</option>
              <option value="EventExpense">Chi sự kiện</option>
              <option value="OperationExpense">Chi vận hành</option>
            </select>
          </div>

          <div style={{ flex: '1', minWidth: '130px' }}>
            <label style={{ fontSize: '10px', fontWeight: '700', color: '#a0aec0', display: 'block', marginBottom: '6px' }}>TRẠNG THÁI</label>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="sidebar-dev-select"
              style={{ padding: '10px', height: '42px', border: '1px solid #cbd5e0' }}
            >
              <option value="">— Tất cả —</option>
              <option value="Pending">Chờ duyệt chi</option>
              <option value="Approved">Đã duyệt chi</option>
              <option value="Rejected">Đã từ chối chi</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button className="sidebar-promo-btn" style={{ height: '42px', padding: '0 20px', borderRadius: '8px' }}>
              <FilterIcon />
              <span>Lọc số liệu</span>
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

      {/* 5. Transactions Table */}
      <section className="dash-section-card">
        <div className="dash-card-header">
          <div className="dash-card-title-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '18px' }}>💰</span>
            <div>
              <h2 style={{ fontSize: '15px', fontWeight: '800' }}>Sổ quỹ & Lịch sử Giao dịch</h2>
              <p>Phê duyệt các đơn đề xuất chi ngân sách và cập nhật doanh thu thực tế</p>
            </div>
          </div>
          <span className="dash-card-badge">{filteredTrans.length} giao dịch</span>
        </div>

        <div className="table-responsive">
          {filteredTrans.length === 0 ? (
            <div className="empty-state" style={{ padding: '60px 24px' }}>
              <EmptyFinanceIcon />
              <h3>Chưa phát sinh giao dịch tài chính</h3>
              <p style={{ maxWidth: '500px', margin: '0 auto', fontSize: '12.5px', color: '#a0aec0', lineHeight: 1.6 }}>
                Không tìm thấy chứng từ hoặc đề xuất thu chi nào. Dữ liệu mảng <code>transactions</code> đang được khởi tạo là rỗng. Hãy liên kết với API <code>/api/finance/transactions</code> để truy xuất thông tin tài chính thực.
              </p>
            </div>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0', color: '#718096', textTransform: 'uppercase', fontSize: '11px', fontWeight: '800' }}>
                  <th style={{ padding: '12px 16px' }}>Nội dung / Sự kiện</th>
                  <th style={{ padding: '12px 16px' }}>Phân loại</th>
                  <th style={{ padding: '12px 16px' }}>Số tiền</th>
                  <th style={{ padding: '12px 16px' }}>Đề xuất bởi</th>
                  <th style={{ padding: '12px 16px' }}>Ngày lập đơn</th>
                  <th style={{ padding: '12px 16px' }}>Trạng thái duyệt</th>
                  <th style={{ padding: '12px 16px', textAlign: 'right' }}>Duyệt đề xuất chi</th>
                </tr>
              </thead>
              <tbody>
                {filteredTrans.map((t) => (
                  <tr key={t.id} style={{ borderBottom: '1px solid #edf2f7' }}>
                    <td style={{ padding: '14px 16px' }}>
                      <span style={{ fontWeight: '700', color: '#2d3748', display: 'block' }}>{t.title}</span>
                      {t.eventTitle && <span style={{ fontSize: '11.5px', color: '#718096' }}>Sự kiện: {t.eventTitle}</span>}
                    </td>
                    <td style={{ padding: '14px 16px' }}>
                      <span className="metric-badge purple">{t.category}</span>
                    </td>
                    <td style={{ padding: '14px 16px', fontWeight: 'bold', color: t.type === 'Income' ? '#34A853' : '#e53e3e' }}>
                      {t.type === 'Income' ? '+' : '-'}{t.amount.toLocaleString('vi-VN')} đ
                    </td>
                    <td style={{ padding: '14px 16px' }}>{t.proposedBy}</td>
                    <td style={{ padding: '14px 16px', color: '#718096' }}>{new Date(t.createdAt).toLocaleDateString('vi-VN')}</td>
                    <td style={{ padding: '14px 16px' }}>
                      {t.status === 'Approved' ? (
                        <span style={{ color: '#34A853', fontWeight: '700' }}>● Đã phê duyệt</span>
                      ) : t.status === 'Pending' ? (
                        <span style={{ color: '#ff7a00', fontWeight: '700' }}>● Chờ phê duyệt</span>
                      ) : (
                        <span style={{ color: '#e53e3e', fontWeight: '700' }}>● Đã từ chối</span>
                      )}
                    </td>
                    <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                      {t.status === 'Pending' && t.type === 'Expense' && (
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <button className="sidebar-dev-select" style={{ height: '32px', padding: '0 8px', fontSize: '11px', backgroundColor: '#34A853', color: '#fff', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }} title="Duyệt chi xuất quỹ">
                            <CheckIcon /> Duyệt Chi
                          </button>
                          <button className="sidebar-dev-select" style={{ height: '32px', padding: '0 8px', fontSize: '11px', backgroundColor: '#e53e3e', color: '#fff', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }} title="Từ chối yêu cầu duyệt chi">
                            <XIcon /> Từ Chối
                          </button>
                        </div>
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
