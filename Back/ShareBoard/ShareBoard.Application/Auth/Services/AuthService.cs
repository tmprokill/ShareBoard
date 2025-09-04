using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ShareBoard.Application.Auth.Interfaces;
using ShareBoard.Domain.Models;
using ShareBoard.Domain.Models.Auth;
using ShareBoard.Domain.Models.DTOS.Auth.Models;
using ShareBoard.Domain.Models.DTOS.Auth.Responses;
using ShareBoard.Infrastructure.Common.Errors.Repository;
using ShareBoard.Infrastructure.Common.Errors.User;
using ShareBoard.Infrastructure.Common.JWT;
using ShareBoard.Infrastructure.Common.ResultPattern;
using ShareBoard.Infrastructure.Data;

namespace ShareBoard.Application.Auth.Services;

public class AuthService : IAuthService
{
    private readonly SignInManager<ApplicationUser> _signInManager;

    private readonly UserManager<ApplicationUser> _userManager;

    private readonly ITokenService _tokenService;

    private readonly IRoleService _roleService;

    private readonly ApplicationDbContext _context;

    public AuthService(
        SignInManager<ApplicationUser> signInManager,
        UserManager<ApplicationUser> userManager,
        ITokenService tokenService,
        IRoleService roleService,
        ApplicationDbContext context
    )
    {
        _signInManager = signInManager;
        _userManager = userManager;
        _tokenService = tokenService;
        _roleService = roleService;
        _context = context;
    }

    private string GenerateToken(ApplicationUser user)
    {
        var token = _tokenService.GenerateToken(user);

        return token;
    }

    public async Task<Result<int>> GetIdByEmail(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user == null)
            return Result<int>.Failure(UserErrors.UserNotFoundError());

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

        return Result<IEnumerable<string>>.Failure(UserErrors.UserNotFoundError());
    }

    public async Task<Result<bool>> RegisterAsync(RegisterModel registerModel)
    {
        await _context.Database.BeginTransactionAsync();
        try
        {
            var appUser = new ApplicationUser
            {
                UserName = registerModel.UserName,
                Email = registerModel.Email,
            };

            var userResult = await _userManager.CreateAsync(appUser, registerModel.Password);

            if (!userResult.Succeeded)
            {
                await _context.Database.RollbackTransactionAsync();
                return Result<bool>.Failure(UserErrors.UserNotCreatedError(userResult.Errors.First().Description));
            }

            var resRolesResult = await _roleService.AddToRolesAsync(appUser, UserRoles.User);


            if (resRolesResult == false)
            {
                await _context.Database.RollbackTransactionAsync();
                return Result<bool>.Failure(UserErrors.UserNotAssignedToRole());
            }

            var emailToken = await _userManager.GenerateEmailConfirmationTokenAsync(appUser);
            //await _emailService.SendConfirmationLinkAsync(user.Email, emailToken);

            await _context.Database.CommitTransactionAsync();
            return Result<bool>.Success(true);
        }
        catch (DbUpdateException ex)
        {
            await _context.Database.RollbackTransactionAsync();
            return Result<bool>.Failure(RepositoryErrorMapper<ApplicationUser>.Map(ex));
        }
    }

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

    public async Task<Result<LoginResponse>> LoginAsync(LoginModel loginModel)
    {
        var user = await _userManager.FindByEmailAsync(loginModel.Login) ??
                   await _userManager.FindByNameAsync(loginModel.Login);
        
        if (user is null)
        {
            return Result<LoginResponse>.Failure(UserErrors.UserNotFoundError());
        }

        if (!await _userManager.IsEmailConfirmedAsync(user))
        {
            return Result<LoginResponse>.Failure(UserErrors.UserEmailNotConfirmed());
        }

        var result = await _userManager.CheckPasswordAsync(user, loginModel.Password);
        if (result)
        {
            return Result<LoginResponse>.Success(new LoginResponse
            {
                UserName = user.UserName,
                Email = user.Email,
                Token = GenerateToken(user)
            });
        }

        if (await _userManager.IsLockedOutAsync(user))
        {
            return Result<LoginResponse>.Failure(UserErrors.UserLockedOut());
        }

        return Result<LoginResponse>.Failure(UserErrors.UserInvalidCredentials());
    }
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