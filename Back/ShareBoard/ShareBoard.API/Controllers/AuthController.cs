using Microsoft.AspNetCore.Mvc;
using ShareBoard.API.ApiResult;
using ShareBoard.Infrastructure.ResultPattern;

namespace ShareBoard.API.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly ILogger<AuthController> _logger;

    public AuthController(ILogger<AuthController> logger)
    {
        _logger = logger;
    }

    [HttpGet("auth")]
    public async Task<IActionResult> Auth()
    {
        var result = Result<int>.Success(2);

        return result.Match(
            success: x => Ok(x),
            failure: ApiResults.Problem
        );
    }
}