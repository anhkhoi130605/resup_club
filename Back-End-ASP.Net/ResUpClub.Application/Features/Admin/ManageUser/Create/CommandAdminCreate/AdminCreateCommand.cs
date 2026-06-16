using System;
using System.Collections.Generic;
using System.Text;
using MediatR;
using System.Collections.Generic;

namespace ResUpClub.Application.Features.Admin.ManageUser.Create.CommandAdminCreate
{
	// Command to create an admin user. Provide required fields.
	public record AdminCreateCommand(string Email, string FullName, string Password) : IRequest<AdminDTO>;
}
