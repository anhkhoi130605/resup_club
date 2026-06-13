using System.IO;
using System.Threading.Tasks;

namespace ResUpClub.Application.Interfaces.Storage
{
	public interface IStorageService
	{
		Task<string> UploadAsync(Stream fileStream, string fileName);
		Task DeleteAsync(string fileUrl);
	}
}
