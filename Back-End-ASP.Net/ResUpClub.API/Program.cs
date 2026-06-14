using Microsoft.EntityFrameworkCore;
using ResUpClub.Infrastructure.ConfigModel;
using ResUpClub.Infrastructure.Persistence;
using ResUpClub.Infrastructure;
using MediatR;
using ResUpClub.Application.Features.Authentication.Register.Handler;
using ResUpClub.Application.Features.Authentication.Login.Handler;
using ResUpClub.Infrastructure.ConfigModel;
using ResUpClub.Application.Features.Authentication.Login.Handler;
namespace ResUpClub.API
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);

			// 1. Lấy chuỗi kết nối Database
			var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
				?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

			// 2. Đăng ký các dịch vụ hệ thống cơ bản
			builder.Services.AddControllers();
			builder.Services.AddEndpointsApiExplorer();
			builder.Services.AddOpenApi();

			// 3. Cấu hình kết nối MySQL (Sử dụng Pomelo EF Core)
			builder.Services.AddDbContext<AppDbContext>(options =>
				options.UseMySql(
					connectionString,
					ServerVersion.AutoDetect(connectionString),
					mysqlOptions => mysqlOptions.MigrationsAssembly("ResUpClub.Infrastructure")));

			// 4. Cấu hình CORS chặt chẽ để làm việc được với Cookie/Google Auth
			builder.Services.AddCors(options =>
			{
				options.AddPolicy("AllowReactDev", policy =>
				{
					policy.WithOrigins("http://localhost:5173","https://localhost:5173")
						.AllowAnyHeader()
						.AllowAnyMethod()
						.AllowCredentials(); // Bắt buộc phải có thằng này!
				});
			});

		// 5. Nạp toàn bộ cấu hình hạ tầng (JWT, Google Auth, Redis, Mail, Repositories...)
			builder.Services.AddInfrastructureServices(builder.Configuration);

			// 6. Đăng ký MediatR: quét các handlers trong assembly Application
			builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(ResUpClub.Application.Features.Authentication.Register.Handler.RegisterCommandHandler).Assembly));
			builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(ResUpClub.Application.Features.Authentication.Login.Handler.LoginCommandHandler).Assembly));

			var app = builder.Build();

			// =========================================================================
			// THỨ TỰ ĐƯỜNG ỐNG MIDDLEWARE PIPELINE
			// =========================================================================

			// Hứng lỗi toàn cục đầu tiên
			app.UseMiddleware<ResUpClub.API.Middlewares.GlobalExceptionMiddleware>();

			if (app.Environment.IsDevelopment())
			{
				app.MapOpenApi();
			}

			// CORS PHẢI CHẠY SỚM (trước UseHttpsRedirection)
			app.UseCors("AllowReactDev");

			//app.UseHttpsRedirection();

			// Định tuyến và lọc tên miền
			app.UseRouting();

			// Kiểm tra danh tính và phân quyền (Auth luôn chạy sau CORS và trước Map)
			app.UseAuthentication();
			app.UseAuthorization();
			app.MapControllers();
			app.Run();
		}
	}
}