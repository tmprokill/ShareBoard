namespace ShareBoard.Infrastructure.ResultPattern;

public enum ErrorType
{
    Problem = 0,
    Validation = 1,
    NotFound = 2,
    Conflict = 3,
    InternalServer = 4,
    None = -1
}

public record Error
{
    private Error(string code, string description, ErrorType type)
    {
        this.Code = code;
        this.Description = description;
        this.Type = type;
    }

    public string Code { get; init; }
    public string Description { get; init; }
    public ErrorType Type { get; init; }

    public static Error InternalServerError = new(string.Empty, string.Empty, ErrorType.InternalServer);
    public static Error NotFound(string code, string description) => new(code, description, ErrorType.NotFound);
    public static Error Validation(string code, string description) => new(code, description, ErrorType.Validation);
    public static Error Problem(string code, string description) => new(code, description, ErrorType.Problem);
    public static Error Conflict(string code, string description) => new(code, description, ErrorType.Conflict);
    public static Error None(string code, string description) => new(code, description, ErrorType.None);
}