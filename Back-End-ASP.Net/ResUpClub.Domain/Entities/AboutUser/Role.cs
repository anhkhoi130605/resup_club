using System;
using System.Collections.Generic;
using System.Text;
using ResUpClub.Domain.Entities.Config;
using static ResUpClub.Domain.Enums.UserEnum;

namespace ResUpClub.Domain.Entities.AboutUser
{
   public class Role : BaseEntity
	{
		//public string Id { get; set; } = null!;

		public RoleEnum? RoleName { get; set; } = null!;

		//public DateTime? CreatedAt { get; set; }

		public virtual ICollection<User> Users { get; set; } = new List<User>();
	}
}
