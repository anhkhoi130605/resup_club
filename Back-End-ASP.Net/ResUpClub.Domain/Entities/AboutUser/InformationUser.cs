using System;
using System.Collections.Generic;
using System.Text;
using ResUpClub.Domain.Entities.Config;

namespace ResUpClub.Domain.Entities.AboutUser
{
	public class InformationUser : BaseEntity
	{
		//public string UserId { get; set; } = null!;

		public DateTime? DateOfBirth { get; set; }

		public string? Gender { get; set; }

		public string? Address { get; set; }

		public string? Bio { get; set; }

		public string? StudentCode { get; set; }

		public string? AvatarUrl { get; set; }

		public string? EmergencyContactName { get; set; }

		public string? EmergencyContactPhone { get; set; }

		public virtual User? User { get; set; }
	}
}
