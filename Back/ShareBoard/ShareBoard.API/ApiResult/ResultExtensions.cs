using ShareBoard.Infrastructure.ResultPattern;

namespace ShareBoard.API.ApiResult;

public static class ResultExtensions
{
    public static TOut Match<TIn, TOut>(
        this Result<TIn> result,
        Func<TIn, TOut> success,
        Func<Result<TIn>, TOut> failure
    )
    {
        return result.IsSuccess ? success(result.Value) : failure(result);
    }
}