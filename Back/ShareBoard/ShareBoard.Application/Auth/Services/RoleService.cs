using Microsoft.AspNetCore.Identity;
using ShareBoard.Application.Auth.Interfaces;
using ShareBoard.Domain.Models;
using ShareBoard.Domain.Models.Auth;

namespace ShareBoard.Application.Auth.Services;

public class RoleService : IRoleService
{
    private readonly UserManager<ApplicationUser> _userManager;

    public RoleService(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<bool> AddToRolesAsync(ApplicationUser user, string role)
    {
        var result = true;
        switch (role)
        {
            case UserRoles.Admin:
                var res = await AddToAdminAsync(user);
                result = res.Succeeded;
                break;
            case UserRoles.Moderator:
                res = await AddToModeratorAsync(user);
                result = res.Succeeded;
                break;
            case UserRoles.User:
                res = await AddToUserAsync(user);
                result = res.Succeeded;
                break;
            default:
                result = false;
                break;
        }

        return result;
    }

    private async Task<IdentityResult> AddToAdminAsync(ApplicationUser user)
    {
        var res = await AddToModeratorAsync(user);
        if (!res.Succeeded) return res;
        return await _userManager.AddToRoleAsync(user, UserRoles.Admin);
    }

    private async Task<IdentityResult> AddToModeratorAsync(ApplicationUser user)
    {
        var res = await AddToUserAsync(user);
        if (!res.Succeeded) return res;
        return await _userManager.AddToRoleAsync(user, UserRoles.Moderator);
    }

    private async Task<IdentityResult> AddToUserAsync(ApplicationUser user)
    {
        return await _userManager.AddToRoleAsync(user, UserRoles.User);
    }
}