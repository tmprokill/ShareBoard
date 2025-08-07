using ShareBoard.Infrastructure.Errors;

namespace ShareBoard.Infrastructure.Common.Errors;

public static class ApplicationErrors
{
    public static readonly Error ApplicationError =
        Error.InternalServerError("Application.Error", "Something went wrong");
}