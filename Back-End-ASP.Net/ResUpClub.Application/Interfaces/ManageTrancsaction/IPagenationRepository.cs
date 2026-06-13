using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using ResUpClub.Domain.Entities.Config;

namespace ResUpClub.Application.Interfaces.ManageTrancsaction
{
	public interface IPaginationRepository<T> where T : class
	{
		Task<PaginationResult<T>> GetPaginatedAsync(int pageNumber = 1, int pageSize = 10, Expression<Func<T, bool>>? filter = null, Func<IQueryable<T>, IQueryable<T>>? includes = null);
	}
}
