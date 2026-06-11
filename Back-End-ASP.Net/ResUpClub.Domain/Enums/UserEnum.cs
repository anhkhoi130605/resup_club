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
			Leader,
			Student,
			Teacher,
			Admin,
			Club_Committee

		}
		public enum MemberInOrOutClubEnum
		{
			InClub,
			OutClub
		}
	}
}
