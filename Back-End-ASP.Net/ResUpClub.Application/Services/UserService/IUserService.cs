using System.Threading.Tasks;
using static ResUpClub.Domain.Enums.UserEnum;
using ResUpClub.Domain.Entities.Config;
using ResUpClub.Application.DTOs.User;
using Microsoft.AspNetCore.Http;

namespace ResUpClub.Application.Services.UserService
{
	public interface IUserService
	{
	    //Phân trang user
		Task<PaginationResult<UsermanageDTO>> GetUsersAsync(int pageNumber, 
		int pageSize, 
		string? searchTerm = null, 
		string? role = null, 
		UserStatusEnum? status = null);
		//get all detail of user
		Task<UserDetailDTO> GetUserDetailAsync(string id);
		Task<UserProfile> GetUserProfileAsync(string id);
		Task<string?> UpdateAvatarAsync(string userId, IFormFile file);

	}
}
