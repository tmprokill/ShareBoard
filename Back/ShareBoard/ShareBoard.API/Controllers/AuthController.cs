using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ShareBoard.API.ApiResult;
using ShareBoard.Infrastructure.Common.ResultPattern;

namespace ShareBoard.API.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly IMapper _mapper;

    public AuthController(IMapper mapper)
    {
        _mapper = mapper;
    }

    [HttpPost("login")]
    public async Task<IActionResult> LoginAsync()
    {
        var result = Result<int>.Success(2);

        return result.Match(
            successStatusCode: 200,
            includeBody: false,
            message: "null",
            failure: ApiResults.ToProblemDetails
        );
    }
    
    [HttpPost("register")]
    public async Task<IActionResult> RegisterAsync()
    {
        var result = Result<int>.Success(2);

        return result.Match(
            successStatusCode: 200,
            includeBody: false,
            message: "null",
            failure: ApiResults.ToProblemDetails
        );
    }
}