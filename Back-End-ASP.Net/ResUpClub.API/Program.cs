using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ResUpClub.Infrastructure.Persistence.Configurations.AuthenticationConfig;
using ResUpClub.Infrastructure.Persistence;
using ResUpClub.Infrastructure.Authentication;
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

            // Register infrastructure services (including JWT service registration)
			builder.Services.AddInfrastructure(builder.Configuration);

			// Configure JWT authentication
			var jwtOptions = builder.Configuration.GetSection("Jwt").Get<JWTConfiguration>() ?? new JWTConfiguration();
			builder.Services.AddAuthentication(options =>
			{
				options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
				options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
			}).AddJwtBearer(options =>
			{
				options.TokenValidationParameters = new TokenValidationParameters
				{
					ValidateIssuer = true,
					ValidIssuer = jwtOptions.Issuer,
					ValidateAudience = true,
					ValidAudience = jwtOptions.Audience,
					ValidateIssuerSigningKey = true,
					IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(jwtOptions.Key ?? string.Empty)),
					ValidateLifetime = true,
					ClockSkew = TimeSpan.Zero
				};
			});

			var app = builder.Build();

			// Configure the HTTP request pipeline.
			if (app.Environment.IsDevelopment())
			{
				app.MapOpenApi();
			}
            app.UseHttpsRedirection();
			app.UseCors("AllowReactDev");

			// Authentication middleware must come before Authorization
			app.UseAuthentication();
			app.UseAuthorization();

			app.MapControllers();
			app.Run();
		}
	}
}
