using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ShareBoard.API.ApiResult;
using ShareBoard.Application.Auth.Interfaces;
using ShareBoard.Domain.Models.DTOS.Auth.Models;
using ShareBoard.Infrastructure.Common.ResultPattern;

namespace ShareBoard.API.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> LoginAsync([FromBody] LoginModel model)
    {
        var result = await _authService.LoginAsync(model);

        return result.Match(
            successStatusCode: 200,
            includeBody: true,
            message: "null",
            failure: ApiResults.ToProblemDetails
        );
    }
    
    [HttpPost("register")]
    public async Task<IActionResult> RegisterAsync([FromBody] RegisterModel model)
    {
        var result = await _authService.RegisterAsync(model);

        return result.Match(
            successStatusCode: 201,
            includeBody: false,
            message: "null",
            failure: ApiResults.ToProblemDetails
        );
    }
}