using System;
using System.Collections.Generic;
using System.Text;
using MediatR;
using ResUpClub.Application.Features.Admin.ManageUser.ReadDataUser.CommandAdminReadDataUser;

namespace ResUpClub.Application.Features.Admin.ManageUser.ReadDataUser.QueriesAdminReadDataUser
{
	public record AdminReadDataQueries : IRequest<AdminReadDataDTO>;

}
