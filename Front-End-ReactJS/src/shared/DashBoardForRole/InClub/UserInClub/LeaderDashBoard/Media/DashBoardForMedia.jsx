import React from 'react';
import './DashBoardForMedia.css';

const stats = [{"label": "Bài đăng", "value": "78"}, {"label": "Tương tác", "value": "3.8k"}, {"label": "Chiến dịch", "value": "4"}, {"label": "Báo cáo", "value": "9"}];
const activities = [{"title": "Đăng bài chiến dịch mới", "time": "10 phút trước"}, {"title": "Phân tích hiệu suất", "time": "2 giờ trước"}, {"title": "Chỉnh sửa nội dung quảng cáo", "time": "6 giờ trước"}, {"title": "Họp content team", "time": "1 ngày trước"}];
const metrics = [{"label": "Reach", "value": "18.5k"}, {"label": "Engagement", "value": "5.2%"}, {"label": "Chi phí / chiến dịch", "value": "2.4 triệu"}];

export default function DashBoardForMedia() {
  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="badge">Media Leader</p>
          <h1>Dashboard Truyền thông</h1>
          <p>Bảng điều khiển truyền thông cho lãnh đạo, tập trung vào chiến dịch và tương tác.</p>
        </div>
        <div className="dashboard-actions">
          <button className="btn btn-primary">Tạo chiến dịch</button>
          <button className="btn btn-secondary">Xem lịch</button>
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
