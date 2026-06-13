using System.Security.Claims;
using MediatR;
using ResUpClub.Domain.Entities.AboutUser;
using ResUpClub.Application.DTOs.Authentication;
using ResUpClub.Application.Interfaces.Authentication;
using ResUpClub.Application.Interfaces.ManageTrancsaction;
using static ResUpClub.Domain.Enums.UserEnum;

namespace ResUpClub.Application.Features.Authentication.Register.Handler;

public class GoogleRegisterHandler : IRequestHandler<GoogleRegisterCommand, LoginResponseDTO>
{
	private readonly IUnitOfWork _unitOfWork;
	private readonly IJWTTokenGenerator _jwtTokenGenerator;

	public GoogleRegisterHandler(IUnitOfWork unitOfWork, IJWTTokenGenerator jwtTokenGenerator)
	{
		_unitOfWork = unitOfWork;
		_jwtTokenGenerator = jwtTokenGenerator;
	}

	public async Task<LoginResponseDTO> Handle(GoogleRegisterCommand request, CancellationToken cancellationToken)
	{
     // 1. Trích xuất Email từ tấm thẻ Google cấp qua Claims
		var email = request.Principal.FindFirst(ClaimTypes.Email)?.Value;
		var name = request.Principal.FindFirst(ClaimTypes.Name)?.Value;

		if (string.IsNullOrWhiteSpace(email))
		{
			throw new Exception("Không thể lấy email từ thông tin xác thực của Google.");
		}

		// 2. Kiểm tra xem Email này đã được ai đăng ký trong DB chưa
		var existingUser = await _unitOfWork.User.FindByEmailAsync(email);

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
			PasswordHash = string.Empty, // Đăng ký bằng Google thì không cần mật khẩu truyền thống
			RoleId = roleEntity.Id,
			Role = roleEntity,
          // Google registration does not provide a student code. Set a default enum value.
			StudentId = StudentCodeEnum.DE,
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
}