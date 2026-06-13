using System.Security.Claims;
using MediatR;
using ResUpClub.Domain.Entities.AboutUser;
using ResUpClub.Application.DTOs.Authentication;
using ResUpClub.Application.Interfaces.Authentication;
using ResUpClub.Application.Interfaces.ManageTrancsaction;
using static ResUpClub.Domain.Enums.UserEnum;

namespace ResUpClub.Application.Features.Authentication.Register.Handler;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, LoginResponseDTO>
{
	private readonly IUnitOfWork _unitOfWork;
	private readonly IJWTTokenGenerator _jwtTokenGenerator;

	public RegisterCommandHandler(IUnitOfWork unitOfWork, IJWTTokenGenerator jwtTokenGenerator)
	{
		_unitOfWork = unitOfWork;
		_jwtTokenGenerator = jwtTokenGenerator;
	}

    public async Task<LoginResponseDTO> Handle(RegisterCommand request, CancellationToken cancellationToken)
	{
        // 1. Lấy dữ liệu từ DTO
		var dto = request.Request;
		var email = dto.Email;
		var name = dto.FullName;

		if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(dto.Password))
		{
			throw new Exception("Email hoặc mật khẩu không hợp lệ.");
		}

        // 2. Kiểm tra xem Email hoặc StudentId này đã được ai đăng ký trong DB chưa
		var existingUser = await _unitOfWork.User.FindByEmailAsync(email);
		if (!string.IsNullOrWhiteSpace(dto.StudentId))
		{
			var existsStudent = await _unitOfWork.User.ExistsStudentIdAsync(dto.StudentId);
			if (existsStudent)
				throw new Exception("Mã sinh viên đã tồn tại.");
		}

		if (existingUser != null)
		{
			// Nếu đã có tài khoản, không cho đăng ký trùng, bắt họ quay lại trang Login
			throw new Exception("Tài khoản email này đã tồn tại trên hệ thống. Vui lòng sử dụng tính năng Đăng nhập.");
		}

		// 3. Nếu chưa có -> Tiến hành tạo User mới hoàn toàn (Đăng ký thành công)
		// Lấy role mặc định từ DB (hoặc tạo nếu chưa tồn tại)
        var roleEntity = await _unitOfWork.Roles.GetAsync(r => r.RoleName == RoleEnum.User);
		if (roleEntity == null)
		{
			roleEntity = new Role { RoleName = RoleEnum.User };
			await _unitOfWork.Roles.CreateAsync(roleEntity);
			// Lưu để có Id
			await _unitOfWork.SaveChangesAsync();
		}
        var newUser = new User
		{
			Email = email,
			FullName = name ?? string.Empty,
            PasswordHash = dto.Password, // store raw for now (replace with hash in production)
			RoleId = roleEntity.Id,
			Role = roleEntity,
            // Parse student id prefix to enum if provided
			StudentId = ParseStudentCode(dto.StudentId),
			MemberInOrOutClub = MemberInOrOutClubEnum.OutClub, // Mặc định là chưa tham gia câu lạc bộ
		};

		await _unitOfWork.User.CreateAsync(newUser);
		await _unitOfWork.SaveChangesAsync();

		// 4. Sinh Token JWT lập tức để người dùng đăng ký xong là tự động vào app luôn
		var roleName = roleEntity.RoleName?.ToString() ?? RoleEnum.User.ToString();
		var accessToken = _jwtTokenGenerator.GenerateToken(newUser.Id, newUser.Email, new List<string> { roleName });

		return new LoginResponseDTO
		{
			AccessToken = accessToken,
			User = new LoggedinUserDTO { Email = newUser.Email, FullName = newUser.FullName }
		};
	}

	private static StudentCodeEnum ParseStudentCode(string? studentId)
	{
		if (string.IsNullOrWhiteSpace(studentId) || studentId.Length < 2)
			return StudentCodeEnum.DE;

		var prefix = studentId.Substring(0, 2).ToUpperInvariant();
		return prefix switch
		{
			"DE" => StudentCodeEnum.DE,
			"DS" => StudentCodeEnum.DS,
			_ => StudentCodeEnum.DE
		};
	}
}