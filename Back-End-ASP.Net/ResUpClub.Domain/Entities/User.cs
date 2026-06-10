using System;
using System.Collections.Generic;
using System.Data;
using ResUpClub.Domain.Entities;
using ResUpClub.Domain.Enums;
using static ResUpClub.Domain.Enums.UserEnum;
namespace ResUpClub.Domain.Entities;

public partial class User : BaseEntity
{
	//public string Id { get; set; } = null!;

	public string Email { get; set; } = null!;

	public string FullName { get; set; } = null!;

	public string? PasswordHash { get; set; }

	public string? Phone { get; set; }

	public string? AvatarUrl { get; set; }

	public string RoleId { get; set; } = null!;

	public UserStatusEnum? Status { get; set; }

	public bool? IsBanned { get; set; }

	public DateTime? ReactivateAt { get; set; }

	public string? GoogleId { get; set; }

	//public DateTime? CreatedAt { get; set; }

	//public DateTime? UpdatedAt { get; set; }

	//public DateTime? DeletedAt { get; set; }

	public virtual Profile? StudentProfile { get; set; }

	public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();

	public virtual Role Role { get; set; } = null!;
}
