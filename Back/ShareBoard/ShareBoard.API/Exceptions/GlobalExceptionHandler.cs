using Microsoft.AspNetCore.Diagnostics;
using ShareBoard.API.ApiResult;
using ShareBoard.Infrastructure.Common.Errors;
using ShareBoard.Infrastructure.Common.ResultPattern;

namespace ShareBoard.API.Exceptions;

public class GlobalExceptionHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception,
        CancellationToken cancellationToken)
    {
        var result = ApiResults.ToProblemDetails(Result.Failure(ApplicationErrors.ApplicationError));

        httpContext.Response.ContentType = "application/problem+json";
        httpContext.Response.StatusCode = ApiResults.GetStatusCode(ApplicationErrors.ApplicationError.Type);

        await httpContext.Response.WriteAsJsonAsync(result, cancellationToken);

        return true;
    }
}