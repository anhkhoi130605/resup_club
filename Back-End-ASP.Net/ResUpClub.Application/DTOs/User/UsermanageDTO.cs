using System;
using System.Collections.Generic;
using System.Text;
using static ResUpClub.Domain.Enums.UserEnum;

namespace ResUpClub.Application.DTOs.User
{
	public class UsermanageDTO
	{
	public string Id { get; set; }
	public string? FullName { get; set; }

	public string? Email { get; set; }

	public string? Role { get; set; }
    public MemberInOrOutClubEnum MemberInOrOutClub { get; set; }	
	}
}


