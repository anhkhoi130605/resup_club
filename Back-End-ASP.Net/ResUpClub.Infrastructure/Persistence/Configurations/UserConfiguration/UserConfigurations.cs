using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using ResUpClub.Domain.Entities.Information;
using ResUpClub.Domain.Entities.AboutUser;
using static ResUpClub.Domain.Enums.UserEnum;

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
			builder.Property(d => d.MemberInOrOutClub)
				.HasConversion<string>()
				.IsRequired()
				.HasMaxLength(100)
				.HasDefaultValue(MemberInOrOutClubEnum.OutClub);
			// Notifications
			builder.HasMany(d => d.Notifications)
				.WithOne(p => p.User)
				.HasForeignKey(p => p.UserId)
				.OnDelete(DeleteBehavior.Cascade);
			builder.Property(d=>d.Status)
				.HasConversion<string>()
				.IsRequired()
				.HasDefaultValue(UserStatusEnum.Active);
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
	public class RoleConfiguration : IEntityTypeConfiguration<Role>
	{
		public void Configure(EntityTypeBuilder<Role> builder)
		{
			builder.Property(d => d.RoleName)
				.HasConversion<string>();
		}
	}
}
