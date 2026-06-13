using System;
using System.Collections.Generic;
using System.Text;
using ResUpClub.Domain.Entities.AboutUser;

namespace ResUpClub.Application.Interfaces.ManageTrancsaction
{
	public interface IUserRepository : IGenericRepository<User>
	{
		Task<User?> FindByEmailAsync(string email);
		Task<bool> ExistsByEmailAsync(string email);
		Task<bool> ExistsStudentIdAsync(string studentId);
	}
}
