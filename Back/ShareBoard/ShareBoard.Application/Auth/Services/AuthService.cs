using System.Net.Http.Headers;
using Microsoft.AspNetCore.Identity;
using ShareBoard.Application.Auth.Interfaces;
using ShareBoard.Domain.Models.Auth;
using ShareBoard.Infrastructure.Common.Errors.User;
using ShareBoard.Infrastructure.Common.JWT;
using ShareBoard.Infrastructure.Common.ResultPattern;

namespace ShareBoard.Application.Auth.Services;

public class AuthService : IAuthService
{
    private readonly SignInManager<ApplicationUser> _signInManager;

    private readonly UserManager<ApplicationUser> _userManager;

    private readonly ITokenService _tokenService;

    private readonly IRoleService _roleService;

    public AuthService(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager,
        ITokenService tokenService, IRoleService roleService)
    {
        _signInManager = signInManager;
        _userManager = userManager;
        _tokenService = tokenService;
        _roleService = roleService;
    }

    private Result<string> GenerateToken(ApplicationUser user)
    {
        var token = _tokenService.GenerateToken(user);
        
        return Result<string>.Success(token);
    }

    public async Task<Result<int>> GetIdByEmail(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
            return Result<int>.Failure(UserErrors.UserNotFoundError);

        return Result<int>.Success(user.Id);
    }

    public async Task<Result<IEnumerable<string>>> GetRolesByEmail(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user != null)
        {
            var roles = await _userManager.GetRolesAsync(user);
            return Result<IEnumerable<string>>.Success(roles);
        }

        return Result<IEnumerable<string>>.Failure(UserErrors.UserNotFoundError);
    }

    // public async Task<Result<string>> RegisterAsync(RegisterUserDTO user)
    // {
    //     try
    //     {
    //         var appUser = new ApplicationUser()
    //         {
    //             UserName = user.UserName,
    //             Email = user.Email,
    //         };
    //
    //         var result = await _userManager.CreateAsync(appUser, user.Password);
    //
    //         if (!result.Succeeded)
    //         {
    //             return Result<string>.Failure(UserErrors.UserNotCreatedError);
    //         }
    //
    //         var resRoles = await _roleService.AddToRolesAsync(appUser, user.Role);
    //
    //         var emailToken = await _userManager.GenerateEmailConfirmationTokenAsync(appUser);
    //
    //         //await _emailService.SendConfirmationLinkAsync(user.Email, emailToken);
    //
    //         return Result<string>.Success(
    //             $"Your account was created, now go to the {user.Email} and confirm your email address.");
    //     }
    //     catch (Exception e)
    //     {
    //         return Result<string>.Failure(e.Message);
    //     }
    // }
    //
    // public async Task<Result<string>> ConfirmEmailAsync(string email, string token)
    // {
    //     var user = await _userManager.FindByEmailAsync(email);
    //     if (user is null)
    //     {
    //         await _emailService.SendEmailAsync(email, "Account wasn't activated.", "Account NOT activated");
    //         return Result<string>.Failure("User wasn't find after creation");
    //     }
    //
    //     var confirmResult = await _userManager.ConfirmEmailAsync(user, token);
    //     if (!confirmResult.Succeeded)
    //     {
    //         return Result<string>.Failure("Token is invalid");
    //     }
    //
    //     await _emailService.SendEmailAsync(email, "Account Was successfully Activated", "Account Activated");
    //     return Result<string>.Success("Account Activated");
    // }
    //
    // public async Task<Result<LoginResponseDTO>> LoginAsync(string email, string password)
    // {
    //     var user = await _userManager.FindByEmailAsync(email);
    //     if (user is null)
    //     {
    //         return Result<LoginResponseDTO>.Failure("User was not found");
    //     }
    //
    //     if (!await _userManager.IsEmailConfirmedAsync(user))
    //     {
    //         return Result<LoginResponseDTO>.Failure("Email is not confirmed");
    //     }
    //
    //     var result = await _userManager.CheckPasswordAsync(user, password);
    //     if (result)
    //     {
    //         return GenerateToken(user);
    //     }
    //
    //     if (await _userManager.IsLockedOutAsync(user))
    //     {
    //         return Result<LoginResponseDTO>.Failure("Account locked out");
    //     }
    //
    //     return Result<LoginResponseDTO>.Failure("Wrong email or password, Try again.");
    // }
    //
    // public async Task<Result<string>> LogoutAsync()
    // {
    //     await _signInManager.SignOutAsync();
    //
    //     return Result<string>.Success("User Successfully Logged Out");
    // }
    //
    //
    // public async Task<Result<string>> ForgotPassword(string email)
    // {
    //     try
    //     {
    //         var user = await _userManager.FindByEmailAsync(email);
    //
    //         if (user is null)
    //         {
    //             return Result<string>.Failure("User was not found");
    //         }
    //
    //         var passwordToken = await _userManager.GeneratePasswordResetTokenAsync(user);
    //
    //         await _emailService.SendForgotPasswordLinkAsync(email, passwordToken);
    //
    //         return Result<string>.Success("Email change link was sent to {email}, visit it to change the password");
    //     }
    //     catch (Exception ex)
    //     {
    //         return Result<string>.Failure("Couldn't send you the verification email");
    //     }
    // }
    //
    // public async Task<Result<string>> ResetPasswordAsync(string email, string token, string newPassword)
    // {
    //     var user = await _userManager.FindByEmailAsync(email);
    //
    //     if (user is null)
    //     {
    //         return Result<string>.Failure("User was not found");
    //     }
    //
    //     var result = await _userManager.ResetPasswordAsync(user, token, newPassword);
    //
    //     if (result.Succeeded)
    //     {
    //         return Result<string>.Success("Password was successfully changed");
    //     }
    //
    //     return Result<string>.Failure("Failed to reset password");
    // }
    //
    // public async Task<Result<string>> EmailExists(string email)
    // {
    //     var user = await _userManager.FindByEmailAsync(email);
    //     if (user is not null)
    //     {
    //         return Result<string>.Failure("Email is already taken");
    //     }
    //
    //     return Result<string>.Success("Email is free");
    // }
    //
    // public async Task<Result<string>> UserNameExists(string userName)
    // {
    //     var user = await _userManager.FindByNameAsync(userName);
    //     if (user is not null)
    //     {
    //         return Result<string>.Failure("Username is already taken");
    //     }
    //
    //     return Result<string>.Success("Username is free");
    // }
}