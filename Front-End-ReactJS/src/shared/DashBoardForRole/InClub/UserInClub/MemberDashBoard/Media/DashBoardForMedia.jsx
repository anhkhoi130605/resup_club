import React from 'react';
import './DashBoardForMedia.css';

const stats = [{"label": "Bài đăng", "value": "52"}, {"label": "Tương tác", "value": "2.6k"}, {"label": "Chiến dịch", "value": "3"}, {"label": "Đề xuất", "value": "7"}];
const activities = [{"title": "Đăng bài mới", "time": "25 phút trước"}, {"title": "Thu thập ý kiến", "time": "1 giờ trước"}, {"title": "Chỉnh sửa hình ảnh", "time": "5 giờ trước"}, {"title": "Lên nội dung tuần", "time": "1 ngày trước"}];
const metrics = [{"label": "Reach", "value": "12.1k"}, {"label": "CTR", "value": "4.1%"}, {"label": "Lead mới", "value": "92"}];

export default function DashBoardForMedia() {
  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="badge">Media Member</p>
          <h1>Dashboard Thành viên Media</h1>
          <p>Giao diện xem nhanh chiến dịch và tương tác cho thành viên truyền thông.</p>
        </div>
        <div className="dashboard-actions">
          <button className="btn btn-primary">Đăng tin</button>
          <button className="btn btn-secondary">Xem thống kê</button>
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
