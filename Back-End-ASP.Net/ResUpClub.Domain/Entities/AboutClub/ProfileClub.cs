using System;
using System.Collections.Generic;
using System.Text;
using ResUpClub.Domain.Entities.Config;
using ResUpClub.Domain.Entities.Information;

namespace ResUpClub.Domain.Entities.AboutClub
{
	public class ProfileClub : BaseEntity
	{
		public string ProfileId { get; set; } = null!;

		public string ClubId { get; set; } = null!;


		public DateTime? JoinedDate { get; set; }

		public bool? IsActive { get; set; }

		public string? Position { get; set; }

		public virtual Profile? Profile { get; set; }

		public virtual InformationClub? Club { get; set; }
	}
}
