using System;
using System.Collections.Generic;
using System.Text;
using ResUpClub.Domain.Entities.Config;
using ResUpClub.Domain.Entities.AboutUser;
using static ResUpClub.Domain.Enums.List;

namespace ResUpClub.Domain.Entities.Information
{
	public class Inclub : BaseEntity
	{
		public string ProfileId { get; set; } = null!;

		public string ClubId { get; set; } = null!;

		public DateTime? JoinedDate { get; set; }

		public string? Role { get; set; }

		public string? Position { get; set; }

		public bool? IsActive { get; set; }

		public string? Department { get; set; }

		public string? Email { get; set; }

		public string? Phone { get; set; }

		public virtual Profile? Profile { get; set; }

		public IsBlackListEnum IsBlackList { get; set; }

		// Optional link to User
		public string? UserId { get; set; }

		public IsActiveClubEnum? IsActiveClub { get; set; }

		public virtual User? User { get; set; }
	}
}
