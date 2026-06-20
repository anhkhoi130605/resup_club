using ResUpClub.Application.Features.SystemModule.Notification;
using ResUpClub.Domain.Enums;

namespace ResUpClub.Application.Interfaces.Notifications
{
    /// <summary>
    /// Gửi thông báo persistent vào Database và real-time (SignalR/...) cho người dùng.
    /// </summary>
    public interface INotificationService
    {
        Task SendNotificationAsync(SendNotificationRequest request);
    }
}
