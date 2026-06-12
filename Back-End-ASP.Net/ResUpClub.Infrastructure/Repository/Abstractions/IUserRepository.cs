using System;
using System.Collections.Generic;
using System.Text;
using ResUpClub.Domain.Entities.AboutUser;

namespace ResUpClub.Infrastructure.Repository.Abstractions
{
	public interface IUserRepository : IGenericRepository<User>
	{
		Task<User?> FindByEmailAsync(string email);
		Task<bool> ExistsByEmailAsync(string email);
	}
}
