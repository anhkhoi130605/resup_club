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
		if (string.IsNullOrWhiteSpace(studentId))
			return false;

		// Compare full student id (case-insensitive)
		var normalized = studentId.Trim().ToUpperInvariant();
		return await _context.Set<User>().AnyAsync(x => x.StudentId.ToUpper() == normalized);
	}
}
