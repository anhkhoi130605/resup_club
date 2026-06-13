using System.Text.RegularExpressions;
using FluentValidation;
using ResUpClub.Application.DTOs.Authentication.Register;

namespace ResUpClub.Application.Features.Authentication.Register.Validattion
{
	public class RegisterUserRequestDTOValidator : AbstractValidator<RegisterUserRequestDTO>
	{
		public RegisterUserRequestDTOValidator()
		{
			RuleFor(x => x.StudentId)
				.NotEmpty().WithMessage("Mã số sinh viên là bắt buộc.")
				.Matches("^(DE|DS)\\d{6}$").WithMessage("Mã sinh viên phải có định dạng DExxxxxx hoặc DSxxxxxx.");
			// các rule khác: Email, Password, etc.
		}
	}
}
