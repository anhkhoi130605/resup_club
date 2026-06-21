using System;
using System.Collections.Generic;
using System.Text;
using ResUpClub.Domain.Entities.Config;
using ResUpClub.Domain.Entities.Information;
using ResUpClub.Domain.Entities.AboutUser;
using static ResUpClub.Domain.Enums.List;

namespace ResUpClub.Domain.Entities.AboutClub
{
	public class MemberInclub : BaseEntity
	{

		public string ClubId { get; set; } = null!;

		public string? Role { get; set; }

		public string? Position { get; set; }

		public bool? IsActive { get; set; }

		public IsBlackListEnum IsBlackList { get; set; }

		public string? UserId { get; set; }

		public virtual ProfileUser? Profile { get; set; }

		public virtual InformationClub? Club { get; set; }
		public DepartmentOfClubEnum DepartmentOfClub { get; set; }

		// Link to Inclub
		public string? InclubId { get; set; }

		public virtual Inclub? Inclub { get; set; }

		public virtual User? User { get; set; }
	}
}
