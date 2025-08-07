using ShareBoard.Domain.Models.Auth;

namespace ShareBoard.Infrastructure.Common.JWT;

public interface ITokenService
{
    public string GenerateToken(ApplicationUser user);
}