using System;
using System.Collections.Generic;
using System.Text;
using ResUpClub.Domain.Entities.Config;
using ResUpClub.Domain.Entities.AboutUser;
using static ResUpClub.Domain.Enums.List;

namespace ResUpClub.Domain.Entities.Information
{
	public class OutClub : BaseEntity
	{
		public ProfileUser? Profile { get; set; } = null!;

		public string ClubId { get; set; } = null!;

		public DateTime? LeftDate { get; set; }

		public string? ReasonForLeaving { get; set; }

		public string? LastRole { get; set; }

		public string? LastPosition { get; set; }

		public string? Department { get; set; }

		public string? Email { get; set; }

		public string? Phone { get; set; }

		public IsBlackListEnum IsBlackList { get; set; }

		// Link to User (optional)
//		public string? UserId { get; set; }

		public virtual User? User { get; set; }
	}
}
