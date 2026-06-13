using Microsoft.EntityFrameworkCore;
using ResUpClub.Domain.Entities.AboutUser;
using ResUpClub.Infrastructure.Persistence;
using ResUpClub.Application.Interfaces.ManageTrancsaction;

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

	public async Task<bool> ExistsStudentIdAsync(string studentId)
	{
       // studentId may be full code like DE191038 or DS19001. Our entity stores only the prefix enum
		// (StudentCodeEnum) so extract prefix (first 2 chars) for comparison.
		if (string.IsNullOrWhiteSpace(studentId) || studentId.Length < 2)
			return false;

		var prefix = studentId.Substring(0, 2).ToUpperInvariant();
		return await _context.Set<User>().AnyAsync(x => x.StudentId.ToString() == prefix);
	}
}
