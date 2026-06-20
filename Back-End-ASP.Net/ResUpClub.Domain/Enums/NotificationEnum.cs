using System;
using System.Collections.Generic;
using System.Text;

namespace ResUpClub.Domain.Enums
{
    public enum NotificationType
    {
        SystemBroadcast,
        ClubActivity,
        EventReminder,
        JoinRequestApproved,
        JoinRequestRejected,
        NewPost,
        MentionInComment,
        AdminAlert,
        Other
    }
}
