import React from 'react';
import './DashBoardForSponSor.css';

const stats = [{"label": "Tài trợ", "value": "14"}, {"label": "Đối tác", "value": "8"}, {"label": "Gói hợp tác", "value": "5"}, {"label": "Sự kiện", "value": "11"}];
const activities = [{"title": "Đề xuất tài trợ mới", "time": "10 phút trước"}, {"title": "Họp đối tác", "time": "1 giờ trước"}, {"title": "Cập nhật hợp đồng", "time": "4 giờ trước"}, {"title": "Chuẩn bị báo cáo", "time": "1 ngày trước"}];
const metrics = [{"label": "Gói tài trợ", "value": "3"}, {"label": "Giá trị cam kết", "value": "560 triệu"}, {"label": "Trạng thái", "value": "Đang đàm phán"}];

export default function DashBoardForSponSor() {
  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="badge">Sponsor</p>
          <h1>Dashboard Nhà tài trợ</h1>
          <p>Trang tổng quan dành cho nhà tài trợ ngoài câu lạc bộ, ưu tiên thông tin tài chính và quan hệ đối tác.</p>
        </div>
        <div className="dashboard-actions">
          <button className="btn btn-primary">Gửi lời mời</button>
          <button className="btn btn-secondary">Xem hợp đồng</button>
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
