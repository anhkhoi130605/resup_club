using System;
using System.Collections.Generic;
using System.Net.Sockets;
using System.Text;
using ResUpClub.Domain.Entities.Config;
using ResUpClub.Domain.Entities.EventIformation;
using ResUpClub.Domain.Entities.FeedBack;
using ResUpClub.Domain.Entities.RoomIformation;
using ResUpClub.Domain.Entities.AboutUser;
namespace ResUpClub.Domain.Entities.Information
{
    //Profile of User
	public class ProfileUser : BaseEntity
	{

		//public string UserId { get; set; } = null!;

		public string? DepartmentId { get; set; }

		public string? CurrentSemester { get; set; }
		public string? Address { get; set; }
		public string? StudentCode { get; set; }
		public string? EmergencyContactName { get; set; }

		public string? EmergencyContactPhone { get; set; }

		//public DateTime? CreatedAt { get; set; }

		//public DateTime? UpdatedAt { get; set; }

		public virtual Department? Department { get; set; }

		public virtual ICollection<EventWaitlist> EventWaitlists { get; set; } = new HashSet<EventWaitlist>();

		public virtual ICollection<Feedback> Feedbacks { get; set; } = new HashSet<Feedback>();

		public virtual ICollection<StudentQuizScore> StudentQuizScores { get; set; } = new HashSet<StudentQuizScore>();

		public virtual ICollection<TeamMember> TeamMembers { get; set; } = new HashSet<TeamMember>();

		public virtual ICollection<EventAgenda> AgendasAsStudentSpeaker { get; set; } = new HashSet<EventAgenda>();

		public virtual ICollection<Ticket> Tickets { get; set; } = new HashSet<Ticket>();

		public virtual User? User { get; set; }
	}
}
