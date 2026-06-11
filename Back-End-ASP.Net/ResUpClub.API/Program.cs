using Microsoft.EntityFrameworkCore;
using ResUpClub.Infrastructure.Persistence;
namespace ResUpClub.API
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);
			var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
				?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

			// Add services to the container.

          builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseMySql(
					connectionString,
					ServerVersion.AutoDetect(connectionString),
					mysqlOptions => mysqlOptions.MigrationsAssembly("ResUpClub.Infrastructure")));
			builder.Services.AddControllers();
			builder.Services.AddCors(options =>
			{
				options.AddPolicy("AllowReactDev", policy =>
				{
					policy.WithOrigins("http://localhost:5173")
						.AllowAnyHeader()
						.AllowAnyMethod();
				});
			});
			// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
			builder.Services.AddOpenApi();

			var app = builder.Build();

			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.MapOpenApi();
			}

			app.UseHttpsRedirection();
			app.UseCors("AllowReactDev");

			app.UseAuthorization();

			app.MapControllers();
			app.Run();
		}
	}
}
