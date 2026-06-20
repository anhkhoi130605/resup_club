using System;
using System.Collections.Generic;
using System.Text;
using AutoMapper;
using ResUpClub.Domain.Entities.AboutUser;

namespace ResUpClub.Application.Features.Admin.ManageUser.Create.CommandAdminCreate
{
	public class AdminCreateProfile : Profile
	{
		public AdminCreateProfile()
		{
			CreateMap<User, AdminCreateDTO>();
		}
	}
}