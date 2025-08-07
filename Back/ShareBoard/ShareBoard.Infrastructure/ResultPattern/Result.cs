using ShareBoard.Infrastructure.Common.Errors;
using ShareBoard.Infrastructure.Errors;

namespace ShareBoard.Infrastructure.ResultPattern;

public class Result
{
    protected Result(bool isSuccess, Error error)
    {
        IsSuccess = isSuccess;
        Error = error;
    }
    
    public bool IsSuccess { get; protected set; }
    
    public Error Error { get; protected set; }
    
    public static Result Failure(Error error)
    {
        return new Result(false, error);
    }
}

public class Result<T> : Result
{
    public T Value { get; private set; }

    private Result(bool isSuccess, T value, Error error)
        : base(isSuccess, error)
    {
        Value = value;
    }

    public static Result<T> Success(T value)
    {
        return new Result<T>(true, value, null);
    }

    public static Result<T> Failure(Error error, T value = default)
    {
        return new Result<T>(false, value, error);
    }
}