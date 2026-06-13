using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace ResUpClub.Application.DTOs.Authentication.Register
{
	public class RegisterUserRequestDTO
	{
	   public string? FullName { get; set; }
	   public string? Email { get; set; }
	   public string? Password { get; set; }
		[Required]
		[RegularExpression("^(DE|DS)\\d{6}$", ErrorMessage = "Mã sinh viên phải có định dạng DExxxxxx hoặc DSxxxxxx.")]
		public string? StudentId { get; set; }
	}
}
