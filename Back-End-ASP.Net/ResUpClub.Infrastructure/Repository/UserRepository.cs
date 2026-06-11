using Microsoft.EntityFrameworkCore;
using ResUpClub.Domain.Entities.AboutUser;
using ResUpClub.Infrastructure.Persistence;
using ResUpClub.Infrastructure.Repository.Abstractions;

namespace ResUpClub.Infrastructure.Repository;

public class UserRepository : GenericRepository<User>, IUserRepository
{
	public UserRepository(AppDbContext context) : base(context)
	{
	}

	public async Task<User?> FindByEmailAsync(string email)
	{
		return await _context.Set<User>().FirstOrDefaultAsync(x => x.Email == email);
	}

	public async Task<bool> ExistsByEmailAsync(string email)
	{
		return await _context.Set<User>().AnyAsync(x => x.Email == email);
	}
}
