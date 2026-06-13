// ResUpClub.API/Middlewares/GlobalExceptionMiddleware.cs
using System.Net;
using System.Text.Json;

namespace ResUpClub.API.Middlewares;

public class GlobalExceptionMiddleware
{
	private readonly RequestDelegate _next;
	private readonly ILogger<GlobalExceptionMiddleware> _logger;

	public GlobalExceptionMiddleware(RequestDelegate next, ILogger<GlobalExceptionMiddleware> logger)
	{
		_next = next;
		_logger = logger;
	}

	public async Task InvokeAsync(HttpContext context)
	{
		try
		{
			// Cho request đi tiếp sang các Middleware tiếp theo (hoặc vào Controller)
			await _next(context);
		}
		catch (Exception ex)
		{
			// Nếu có bất kỳ lỗi nào xảy ra ở các tầng dưới (Application, Infrastructure...) 
			// nó sẽ bị "bắt" tại đây
			_logger.LogError(ex, "Một lỗi không mong muốn đã xảy ra: {Message}", ex.Message);

			await HandleExceptionAsync(context, ex);
		}
	}

	private static Task HandleExceptionAsync(HttpContext context, Exception exception)
	{
		context.Response.ContentType = "application/json";

		// Mặc định là lỗi 500 (Internal Server Error)
		context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

		var response = new
		{
			StatusCode = context.Response.StatusCode,
			Message = "Đã có lỗi hệ thống xảy ra. Vui lòng thử lại sau.",
			Detail = exception.Message // Khi chạy production thì nên ẩn dòng này đi để bảo mật
		};

		var jsonResult = JsonSerializer.Serialize(response);
		return context.Response.WriteAsync(jsonResult);
	}
}