﻿namespace ShareBoard.Infrastructure.Configurations;

public class JWTConfig
{
    public string Audience { get; set; }

    public string Issuer { get; set; }

    public string Key { get; set; }

    public int ExpirationInMinutes { get; set; }
}