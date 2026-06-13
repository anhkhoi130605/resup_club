using System;
using System.Collections.Generic;
using System.Text;

namespace ResUpClub.Domain.Enums
{
	public class UserEnum
	{
		public enum UserStatusEnum
		{
			Active,
			Inactive,
			Banned
		}
		public enum RoleEnum
		{
			User,
			Admin
		}
		public enum MemberInOrOutClubEnum
		{
			InClub,
			OutClub
		}
		public enum Gender
		{
			Male,
			Female
		}
	}
}
