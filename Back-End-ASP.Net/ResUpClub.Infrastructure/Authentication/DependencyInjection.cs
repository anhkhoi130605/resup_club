using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ResUpClub.Infrastructure.Persistence.Configurations.AuthenticationConfig;
using ResUpClub.Application.Interfaces.Authentication;
using ResUpClub.Infrastructure.Authentication;
using ResUpClub.Infrastructure.Persistence.Configurations.AuthenticationConfig; // Thư mục chứa JwtTokenGenerator thực tế

namespace ResUpClub.Infrastructure.Authentication;

public static class DependencyInjection
{
	public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
	{
		// Sử dụng đúng hàm để bind cấu hình từ appsettings vào class Options
		var jwtOptions = new JWTConfiguration();
		configuration.GetSection("Jwt").Bind(jwtOptions);
		services.AddSingleton(jwtOptions);
		// Đăng ký Service vào DI Container
		services.AddScoped<IJWTTokenGenerator, JwtTokenGenerator>();

		return services;
	}
}
