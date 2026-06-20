using ResUpClub.Application.Features.SystemModule.Notification;
using ResUpClub.Application.Interfaces.ManageTrancsaction;
using ResUpClub.Application.Interfaces.Notifications;
using NotificationEntity = ResUpClub.Domain.Entities.Config.Notification;

namespace ResUpClub.Infrastructure.Services.Notification
{
    public class NotificationService : INotificationService
    {
        private readonly IUnitOfWork _unitOfWork;

        public NotificationService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task SendNotificationAsync(SendNotificationRequest request)
        {
            var notification = new NotificationEntity
            {
                UserId = request.ReceiverId,
                Title = request.Title,
                Message = request.Message,
                Type = request.Type.ToString(),
                RelatedEntityId = request.RelatedEntityId,
                IsRead = false
            };

            await _unitOfWork.Notifications.CreateAsync(notification);
            await _unitOfWork.SaveChangesAsync();
        }
    }
}
