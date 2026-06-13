using Microsoft.AspNetCore.Builder;

namespace ResUpClub.API.Middlewares
{
	public static class MiddlewareExtensions
	{
		public static IApplicationBuilder UseGlobalExceptionMiddleware(this IApplicationBuilder app)
		{
			return app.UseMiddleware<GlobalExceptionMiddleware>();
		}
	}
}