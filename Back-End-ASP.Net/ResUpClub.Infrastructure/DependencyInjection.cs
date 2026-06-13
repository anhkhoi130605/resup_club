using System.Text;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using ResUpClub.Application.Interfaces.Authentication;
using ResUpClub.Application.Interfaces.ManageTrancsaction;
using ResUpClub.Application.Interfaces.Storage;
using ResUpClub.Application.Interfaces; // IEmailService
using ResUpClub.Infrastructure.Services; // SmtpEmailService
using ResUpClub.Domain.ConfigModel;
using ResUpClub.Infrastructure.Authentication;
using ResUpClub.Infrastructure.Persistence.Configurations.AuthenticationConfig;
using ResUpClub.Infrastructure.Persistence.Storage;
using ResUpClub.Infrastructure.Repository;

namespace ResUpClub.Infrastructure.ConfigModel;

namespace ResUpClub.Infrastructure.Extensions;

public static class DependencyInjection
{
	public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
	{
		// 1. Bind configuration sections
		// JWTConfiguration is a POCO used by infrastructure JwtTokenGenerator
		var jwtConfig = configuration.GetSection("Jwt").Get<JWTConfiguration>() ?? new JWTConfiguration();
		services.AddSingleton(jwtConfig);

		// Use Options pattern for other settings consumed via IOptions<T>
		services.Configure<CloudinarySettings>(configuration.GetSection("Cloudinary"));
		services.Configure<StorageSettings>(configuration.GetSection("Storage"));
		services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));
		services.Configure<RedisSettings>(configuration.GetSection("Redis"));

		// 2. Register core services
		services.AddScoped<IUnitOfWork, UnitOfWork>();
		services.AddScoped<IJWTTokenGenerator, JWTTokenGenerator>();
		services.AddScoped<IEmailService, SmtpEmailService>();
		services.AddScoped<IStorageService, CloudinaryStorageService>();

		// 3. Configure Redis Cache
		var redisSettings = configuration.GetSection("Redis").Get<RedisSettings>();
		if (redisSettings != null && !string.IsNullOrEmpty(redisSettings.Configuration))
		{
			services.AddStackExchangeRedisCache(options =>
			{
				options.Configuration = redisSettings.Configuration;
				options.InstanceName = redisSettings.InstanceName;
			});
		}

		// 4. Authentication configuration (Google + JWT for APIs)
		var googleSettings = configuration.GetSection("Authentication:Google");

		services.AddAuthentication(options =>
		{
			options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
			options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
		})
		.AddCookie()
		.AddJwtBearer(options =>
		{
			// Cấu hình JwtBearer bảo mật cho các API thông thường sau này khi React gọi lên
			// (Thêm gói Microsoft.AspNetCore.Authentication.JwtBearer nếu chưa có)
			options.TokenValidationParameters = new TokenValidationParameters
			{
				ValidateIssuer = true,
				ValidateAudience = true,
				ValidateLifetime = true,
				ValidateIssuerSigningKey = true,
				ValidIssuer = jwtConfig.Issuer,
				ValidAudience = jwtConfig.Audience,
				IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfig.Key ?? string.Empty))
			};
		})
		.AddGoogle(options =>
		{
			options.ClientId = googleSettings["ClientId"]!;
			options.ClientSecret = googleSettings["ClientSecret"]!;
			options.CallbackPath = "/signin-google";
		});

		return services;
	}
}