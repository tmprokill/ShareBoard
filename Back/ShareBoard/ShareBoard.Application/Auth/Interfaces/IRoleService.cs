using ShareBoard.Domain.Models.Auth;

namespace ShareBoard.Application.Auth.Interfaces;

public interface IRoleService
{
    public Task<bool> AddToRolesAsync(ApplicationUser user, string role);
}