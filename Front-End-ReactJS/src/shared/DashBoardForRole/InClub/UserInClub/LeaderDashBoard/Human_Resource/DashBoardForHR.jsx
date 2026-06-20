import React from 'react';
import './DashBoardForHR.css';

const stats = [{"label": "Ứng viên", "value": "42"}, {"label": "Phỏng vấn", "value": "11"}, {"label": "Đào tạo", "value": "6"}, {"label": "Feedback", "value": "18"}];
const activities = [{"title": "Lên lịch phỏng vấn", "time": "15 phút trước"}, {"title": "Cập nhật chính sách mới", "time": "2 giờ trước"}, {"title": "Đã nhận phản hồi nhân sự", "time": "5 giờ trước"}, {"title": "Họp chấm công", "time": "1 ngày trước"}];
const metrics = [{"label": "Nhân sự mới", "value": "7"}, {"label": "Chiến dịch đào tạo", "value": "3"}, {"label": "Đánh giá năm", "value": "82%"}];

export default function DashBoardForHR() {
  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="badge">HR Leader</p>
          <h1>Dashboard Nhân sự</h1>
          <p>Bảng điều khiển nhân sự dành cho lãnh đạo, theo dõi tuyển dụng và hiệu suất đội ngũ.</p>
        </div>
        <div className="dashboard-actions">
          <button className="btn btn-primary">Thêm ứng viên</button>
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
