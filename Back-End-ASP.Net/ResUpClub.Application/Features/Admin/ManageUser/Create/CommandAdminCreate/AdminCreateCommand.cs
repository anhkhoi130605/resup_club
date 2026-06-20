using System;
using System.Collections.Generic;
using System.Text;
using MediatR;
using System.Collections.Generic;
using static ResUpClub.Domain.Enums.UserEnum;

namespace ResUpClub.Application.Features.Admin.ManageUser.Create.CommandAdminCreate
{
	// Command to create an admin user. Provide required fields.
	public record AdminCreateCommand(string Email, string FullName, string Password, Gender Gender,RoleEnum Role) : IRequest<AdminCreateDTO>;
}
