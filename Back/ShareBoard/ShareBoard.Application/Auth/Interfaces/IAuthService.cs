using Microsoft.EntityFrameworkCore;
using ShareBoard.Domain.Models;
using ShareBoard.Domain.Models.Auth;
using ShareBoard.Domain.Models.DTOS.Auth.Models;
using ShareBoard.Infrastructure.Common.Errors.Repository;
using ShareBoard.Infrastructure.Common.Errors.User;
using ShareBoard.Infrastructure.Common.ResultPattern;

namespace ShareBoard.Application.Auth.Interfaces;

public interface IAuthService
{
    public Task<Result<int>> GetIdByEmail(string email);

    public Task<Result<IEnumerable<string>>> GetRolesByEmail(string email);

    public Task<Result<bool>> RegisterAsync(RegisterModel registerModel);
}