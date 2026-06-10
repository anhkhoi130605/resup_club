using System;
using System.Collections.Generic;
using System.Data;
using System.Text;
using Microsoft.EntityFrameworkCore.Storage;
using ResUpClub.Domain.Entities;

namespace ResUpClub.Infrastructure.Repository.Abstractions
{
	public interface IUnitOfWork
	{
		Task<int> SaveChangesAsync();
		Task<IDbContextTransaction> BeginTransactionAsync();
		Task<IDbContextTransaction> BeginTransactionAsync(IsolationLevel isolationLevel);
		//User
		IUserRepository User{ get; }
		IGenericRepository<Profile> Profile{ get; }
		//Event
		//Plan
	}
}
