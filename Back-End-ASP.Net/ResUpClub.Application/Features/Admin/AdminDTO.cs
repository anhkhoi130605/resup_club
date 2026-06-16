using System;
using System.Collections.Generic;
using System.Text;
using static ResUpClub.Domain.Enums.UserEnum;

namespace ResUpClub.Application.Features.Admin
{
	public class AdminDTO
	{
		// --- Nhóm Định Danh ---
		public Guid Id { get; init; }
		public string Email { get; init; } = string.Empty;
		public string FullName { get; init; } = string.Empty;
		public string? AvatarUrl { get; init; }
		public RoleEnum Role { get; init; }
		public string? Password { get; init; } // Chỉ dùng khi admin tự tạo bằng email/password, không có khi đăng nhập bằng Google

		// --- Nhóm Phân Quyền ---
		public List<string> Roles { get; init; } = new();

		// --- Nhóm Trạng Thái & Tự Động Kích Hoạt ---
		public UserStatusEnum Status { get; init; } = UserStatusEnum.Inactive;
		public DateTime? ReactivateAt { get; init; }

		// Logic readonly đính kèm phục vụ FE render UI nhanh hơn
		public bool IsSoftDeleted => Status == UserStatusEnum.Inactive;
		public bool HasAutoReactivate => ReactivateAt.HasValue;

		// --- Nhóm Giám Sát & Nhật Ký (Enterprise bắt buộc có) ---
		public string? StatusChangeReason { get; init; } // Lý do bị khóa/mở khóa
		public DateTime CreatedAt { get; init; }         // Ngày tham gia hệ thống
		public DateTime? LastLoginAt { get; init; }      // Quan sát người dùng có active hay không
	}
}
