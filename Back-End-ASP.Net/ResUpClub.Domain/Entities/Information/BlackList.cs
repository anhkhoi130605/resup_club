using System;
using System.Collections.Generic;
using System.Text;
using ResUpClub.Domain.Entities.AboutUser;
using ResUpClub.Domain.Entities.Config;

namespace ResUpClub.Domain.Entities.Information
{
	public class BlackList : BaseEntity
	{
		//public string UserId { get; set; } = null!;

		public User? User { get; set; }

		public string Reason { get; set; } = null!;
	}
}
