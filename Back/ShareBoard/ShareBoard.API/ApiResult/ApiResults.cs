using Microsoft.AspNetCore.Mvc;
using ShareBoard.Infrastructure.ResultPattern;

namespace ShareBoard.API.ApiResult;

public class ApiResults
{
    public static IActionResult Problem(Result result)
    {
        if (result.IsSuccess)
        {
            throw new InvalidOperationException();
        }

        var problemDetails = new ProblemDetails
        {
            Title = result.Error.Code,
            Detail = result.Error.Description,
            Status = GetStatusCode(result.Error.Type),
        };

        return new ObjectResult(problemDetails);

        static int GetStatusCode(ErrorType errorType) =>
            errorType switch
            {
                ErrorType.Validation => StatusCodes.Status400BadRequest,
                ErrorType.Problem => StatusCodes.Status401Unauthorized,
                ErrorType.Conflict => StatusCodes.Status409Conflict,
                ErrorType.NotFound => StatusCodes.Status404NotFound,
                _ => StatusCodes.Status500InternalServerError,
            };
    }
}