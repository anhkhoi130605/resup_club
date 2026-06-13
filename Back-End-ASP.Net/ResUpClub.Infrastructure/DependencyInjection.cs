using MDriven.MDrivenServer;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ResUpClub.Application.Interfaces.Storage;
using ResUpClub.Domain.ConfigModel;
using ResUpClub.Infrastructure.Authentication;
using ResUpClub.Infrastructure.Persistence.Storage;
using ResUpClub.Infrastructure.Repository;


namespace ResUpClub.Infrastructure.Extensions;

public static class DependencyInjection
{
	public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
	{
		// 1. Nạp cấu hình từ appsettings.json vào Options (Options Pattern)
		services.Configure<JwtTokenGenerator>(configuration.GetSection("Jwt"));
		services.Configure<CloudinarySettings>(configuration.GetSection("Cloudinary"));
		services.Configure<StorageSettings>(configuration.GetSection("Storage"));
		services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));
		services.Configure<RedisSettings>(configuration.GetSection("Redis"));

		// 2. Đăng ký các Service xử lý Logic cốt lõi
		services.AddScoped<IUnitOfWork, UnitOfWork>();
		services.AddScoped<IJwtTokenGenerator, JwtTokenGenerator>();
		services.AddScoped<IEmailService, EmailService>();
		services.AddScoped<IStorageService, CloudinaryStorageService>();

		// 3. Cấu hình Redis Cache
		var redisSettings = configuration.GetSection("Redis").Get<RedisSettings>();
		if (redisSettings != null && !string.IsNullOrEmpty(redisSettings.ConnectionString))
		{
			services.AddStackExchangeRedisCache(options =>
			{
				options.Configuration = redisSettings.ConnectionString;
				options.InstanceName = redisSettings.InstanceName;
			});
		}

		// 4. Cấu hình xác thực người dùng (Authentication ngầm cho Google)
		var jwtSettings = configuration.GetSection("Jwt").Get<JwtOptions>();
		var googleSettings = configuration.GetSection("Authentication:Google");

		services.AddAuthentication(options =>
		{
			options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
			options.DefaultChallengeScheme = GoogleDefaults.AuthenticationScheme;
		})
		.AddCookie() // Cookie trung gian giữ phiên của Google trả về
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
				ValidIssuer = jwtSettings.Issuer,
				ValidAudience = jwtSettings.Audience,
				IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret))
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