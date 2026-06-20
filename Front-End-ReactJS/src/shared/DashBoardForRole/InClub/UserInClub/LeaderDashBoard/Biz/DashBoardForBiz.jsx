import React from 'react';
import './DashBoardForBiz.css';

const stats = [{"label": "Dự án", "value": "12"}, {"label": "Khách hàng", "value": "24"}, {"label": "Đề xuất", "value": "8"}, {"label": "Hoàn thành", "value": "5"}];
const activities = [{"title": "Gặp khách hàng VIP", "time": "30 phút trước"}, {"title": "Gửi báo giá mới", "time": "1 giờ trước"}, {"title": "Họp kế hoạch Q3", "time": "3 giờ trước"}, {"title": "Đã cập nhật hợp đồng", "time": "1 ngày trước"}];
const metrics = [{"label": "Khách hàng mới", "value": "14"}, {"label": "Tỷ lệ chuyển đổi", "value": "32%"}, {"label": "Doanh thu dự kiến", "value": "98 triệu"}];

export default function DashBoardForBiz() {
  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="badge">Biz Leader</p>
          <h1>Dashboard Kinh doanh</h1>
          <p>Trang tổng quan dành cho bộ phận kinh doanh, tập trung vào dữ liệu triển khai và khách hàng.</p>
        </div>
        <div className="dashboard-actions">
          <button className="btn btn-primary">Tạo chiến dịch</button>
          <button className="btn btn-secondary">Xem báo cáo</button>
        </div>
      </section>

      <section className="overview-grid">
        {stats.map((item) => (
          <article key={item.label} className="overview-card">
            <p>{item.label}</p>
            <strong>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className="analytics-section">
        <div className="analytics-card">
          <h2>Chỉ số chính</h2>
          <div className="analytics-metrics">
            {metrics.map((item) => (
              <div key={item.label} className="analytics-metric">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="recent-section">
        <div className="recent-card">
          <h2>Hoạt động gần đây</h2>
          <div className="recent-list">
            {activities.map((item) => (
              <div key={item.title} className="recent-item">
                <span>{item.title}</span>
                <span>{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
