import React from 'react';
import './DashBoardForHR.css';

const stats = [{"label": "Ứng viên", "value": "35"}, {"label": "Đào tạo", "value": "5"}, {"label": "Hợp đồng", "value": "14"}, {"label": "Phản hồi", "value": "21"}];
const activities = [{"title": "Đã duyệt đơn xin nghỉ", "time": "20 phút trước"}, {"title": "Thiết kế chương trình mới", "time": "2 giờ trước"}, {"title": "Kiểm tra thời gian thực", "time": "5 giờ trước"}, {"title": "Cập nhật sơ yếu lý lịch", "time": "1 ngày trước"}];
const metrics = [{"label": "Chốt tuyển dụng", "value": "9"}, {"label": "Khóa học", "value": "2"}, {"label": "Độ hài lòng", "value": "88%"}];

export default function DashBoardForHR() {
  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <div>
          <p className="badge">HR Member</p>
          <h1>Dashboard Nhân sự</h1>
          <p>Dashboard nhân sự dành cho thành viên, quản lý tuyển dụng và quy trình nội bộ.</p>
        </div>
        <div className="dashboard-actions">
          <button className="btn btn-primary">Theo dõi tuyển dụng</button>
          <button className="btn btn-secondary">Xem đơn</button>
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
