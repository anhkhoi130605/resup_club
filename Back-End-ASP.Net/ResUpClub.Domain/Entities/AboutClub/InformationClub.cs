using System;
using System.Collections.Generic;
using System.Text;
using ResUpClub.Domain.Entities.Config;

namespace ResUpClub.Domain.Entities.AboutClub
{
	public class InformationClub : BaseEntity
	{
		public string ClubName { get; set; } = null!;

		public string? Description { get; set; }

		public string? Logo { get; set; }

		public string? CoverImage { get; set; }

		public string? Email { get; set; }

		public string? Phone { get; set; }

		public string? Address { get; set; }

		public int? MemberCount { get; set; }

		public DateTime? FoundedDate { get; set; }

		public string? Website { get; set; }

		public string? FacebookUrl { get; set; }

		public string? LeaderId { get; set; }

		public virtual ICollection<ProfileClub> Members { get; set; } = new HashSet<ProfileClub>();
	}
}
