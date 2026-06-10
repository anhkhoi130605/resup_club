using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ResUpClub.Domain.Entities;

namespace ResUpClub.Infrastructure.Persistence.Configurations.UserConfiguration
{
	public class UserConfiguration : IEntityTypeConfiguration<User>
	{
		public void Configure(EntityTypeBuilder<User> builder)
		{
			// Role relationship
			builder.HasOne(d => d.Role)
				.WithMany(p => p.Users)
				.HasForeignKey(d => d.RoleId)
				.OnDelete(DeleteBehavior.Restrict);

			// Profile one-to-one relationship (Profile owns FK)
			builder.HasOne(d => d.StudentProfile)
				.WithOne(p => p.User)
				.HasForeignKey<Profile>(p => p.UserId)
				.OnDelete(DeleteBehavior.Cascade);

			// Notifications
			builder.HasMany(d => d.Notifications)
				.WithOne(p => p.User)
				.HasForeignKey(p => p.UserId)
				.OnDelete(DeleteBehavior.Cascade);
		}
	}

	public class ProfileConfiguration : IEntityTypeConfiguration<Profile>
	{
		public void Configure(EntityTypeBuilder<Profile> builder)
		{
			builder.HasIndex(d => d.UserId).IsUnique();

			builder.HasOne(d => d.Department)
				.WithMany()
				.HasForeignKey(d => d.DepartmentId)
				.OnDelete(DeleteBehavior.SetNull);
		}
	}
}
