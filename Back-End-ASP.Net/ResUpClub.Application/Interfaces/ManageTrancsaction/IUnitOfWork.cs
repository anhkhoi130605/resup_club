using System.Collections.Generic;
using System.Data;
using Microsoft.EntityFrameworkCore.Storage;
using ResUpClub.Domain.Entities.Config;
using ResUpClub.Domain.Entities.EventIformation;
using ResUpClub.Domain.Entities.FeedBack;
using ResUpClub.Domain.Entities.Information;
using ResUpClub.Domain.Entities.RoomIformation;
using ResUpClub.Domain.Entities.AboutUser;
using ResUpClub.Domain.Entities.Config;

namespace ResUpClub.Application.Interfaces.ManageTrancsaction
{
    public interface IUnitOfWork : IDisposable
	{
		Task<int> SaveChangesAsync();
		Task<IDbContextTransaction> BeginTransactionAsync();
		Task<IDbContextTransaction> BeginTransactionAsync(IsolationLevel isolationLevel);
        IUserRepository User { get; }
		IGenericRepository<Profile> Profile { get; }
		IGenericRepository<Role> Roles { get; }
		IGenericRepository<Notification> Notifications { get; }
		IGenericRepository<Department> Departments { get; }
		IGenericRepository<EventWaitlist> EventWaitlists { get; }
		IGenericRepository<Feedback> Feedbacks { get; }
		IGenericRepository<StudentQuizScore> StudentQuizScores { get; }
		IGenericRepository<TeamMember> TeamMembers { get; }
		IGenericRepository<EventAgenda> EventAgendas { get; }
		IGenericRepository<Ticket> Tickets { get; }
	}
}

