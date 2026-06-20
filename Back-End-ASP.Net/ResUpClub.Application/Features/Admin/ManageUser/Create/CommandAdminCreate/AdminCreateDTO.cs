using System;
using System.Collections.Generic;
using System.Text;
using static ResUpClub.Domain.Enums.UserEnum;

namespace ResUpClub.Application.Features.Admin.ManageUser.Create.CommandAdminCreate
{
	public class AdminCreateDTO
	{
		public string? Email{ get; set; }
		public string? FullName{ get; set; }
		public RoleEnum Role{ get; set; }
		public UserStatusEnum Status{ get; set; }
		public string PasswordHash { get; set; } // Consider security implications of including password in DTO
		public Gender? Gender { get; set; }

		public MemberInOrOutClubEnum MemberInOrOutClub { get; set; }
	}
}
