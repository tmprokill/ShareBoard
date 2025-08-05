using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ShareBoard.API.ApiResult;
using ShareBoard.Infrastructure.ResultPattern;

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

    [HttpGet("auth")]
    public async Task<IActionResult> Auth()
    {
        var result = Result<int>.Success(2);

        return result.Match(
            success: x => Ok(x),
            failure: ApiResults.ToProblemDetails
        );
    }
}