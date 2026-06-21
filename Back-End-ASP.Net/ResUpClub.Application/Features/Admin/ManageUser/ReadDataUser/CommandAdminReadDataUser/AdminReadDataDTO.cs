using System;
using System.Collections.Generic;
using System.Text;
using ResUpClub.Domain.Entities.AboutUser;
using static ResUpClub.Domain.Enums.UserEnum;

namespace ResUpClub.Application.Features.Admin.ManageUser.ReadDataUser.CommandAdminReadDataUser
{
	public record AdminReadDataDTO
	{
		public required string Email { get; init; }
		public required string FullName { get; init; }
		public string? Phone { get; init; }
		public UserStatusEnum? Status { get; init; }
		public Gender? Gender { get; init; }
		public MemberInOrOutClubEnum MemberInOrOutClub { get; init; }
		public virtual Role Role { get; init; }
		public string? Bio { get; init; }
	}
}
