
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using ResUpClub.API.Middlewares.Extentions;
using ResUpClub.Application.Interfaces.ManageDataSystem;
using ResUpClub.Domain.Enums;
using static ResUpClub.Domain.Enums.UserEnum;

namespace AEMS_Solution.Controllers.Common
{
	/// <summary>
	/// Base Controller providing global access to Logging and Notifications 
	/// without requiring constructor injection in derived classes.
	/// </summary>
	public class BaseController : Controller
	{
		private IUserActivityLog? _userActivityLog;
		private ISystemErrorLog? _systemErrorLog;
		private INotification? _notification;

		protected string? CurrentUserId => User.GetUserId();

		// Lazy properties using Service Locator pattern for convenience in all controllers
		protected IUserActivityLog UserActivityLogService =>
			_userActivityLog ??= HttpContext.RequestServices.GetRequiredService<IUserActivityLog>();

		protected ISystemErrorLog SystemErrorLogService =>
			_systemErrorLog ??= HttpContext.RequestServices.GetRequiredService<ISystemErrorLog>();

		protected INotification NotificationService =>
			_notification ??= HttpContext.RequestServices.GetRequiredService<INotification>();

		#region User Notifications (TempData/Toasts)
		protected void SetNotification(string message, string type = "success")
		{
			TempData["NotificationMessage"] = message;
			TempData["NotificationType"] = type; // success, error, warning, info
		}

		protected void SetSuccess(string message) => SetNotification(message, "success");
		protected void SetError(string message) => SetNotification(message, "error");
		protected void SetWarning(string message) => SetNotification(message, "warning");
		protected void SetInfo(string message) => SetNotification(message, "info");
		#endregion

		#region Global Unified Helpers (Unified Activity + Toast + Notification)
		/// <summary>
		/// Handles a successful operation: logs activity, sends a system notification, and sets UI success message.
		/// </summary>
		protected async Task ExecuteSuccessAsync(string message, UserActionEnum actionType, string? targetId = null, TargetType targetType = TargetType.None, string? notifyRecipient = null)
		{
			SetSuccess(message);
			await LogUserActivity(actionType, targetId, targetType, message);
			var recipient = notifyRecipient ?? CurrentUserId;
			if (!string.IsNullOrEmpty(recipient))
			{
				await SendSystemNotification(recipient, message);
			}
		}

		/// <summary>
		/// Handles an error: logs system exception and sets UI error message.
		/// </summary>
		protected async Task ExecuteErrorAsync(Exception ex, string? uiMessage = null)
		{
			SetError(uiMessage ?? "Đã xảy ra lỗi không mong đợi.");
			await LogSystemError(ex, uiMessage);
		}
		#endregion

		#region Global Logging Helpers (Original)
		/// <summary>
		/// Logs a user activity (e.g., Created Event, Updated Profile).
		/// </summary>
		protected async Task LogUserActivity(UserActionEnum actionType, string? targetId = null, TargetType targetType = TargetType.None, string? description = null)
		{
			if (string.IsNullOrEmpty(CurrentUserId)) return;
			await UserActivityLogService.LogActivityAsync(CurrentUserId, actionType, targetId, targetType, description);
		}

		/// <summary>
		/// Logs a system error with correlation to the current user if available.
		/// </summary>
		protected async Task LogSystemError(Exception ex, string? customMessage = null)
		{
			await SystemErrorLogService.LogErrorAsync(ex, customMessage, CurrentUserId);
		}

		/// <summary>
		/// Sends a persistent system-wide notification (Database + Real-time).
		/// </summary>
		protected async Task SendSystemNotification(string userId, string message, NotificationEnum type = NotificationEnum.SystemBroadcast, string? relatedId = null)
		{
			await NotificationService.SendNotificationAsync(new SendNotificationRequest
			{
				ReceiverId = userId,
				Title = "Hệ thống thông báo",
				Message = message,
				Type = type,
				RelatedEntityId = relatedId
			});
		}
		#endregion
	}
}
