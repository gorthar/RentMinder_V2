using API.DB;
using API.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);


var isLocalDb = false;

string connectionString = isLocalDb ? builder.Configuration.GetConnectionString("local") : builder.Configuration["SupaConn1"];


// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<PropertyManagementContext>(options =>
{
    options.UseNpgsql(connectionString,
        npgsqlOptionsAction: sqlOptions =>
        {
            sqlOptions.EnableRetryOnFailure(
                maxRetryCount: 3,
                maxRetryDelay: TimeSpan.FromSeconds(30),
                errorCodesToAdd: null);
            sqlOptions.CommandTimeout(30);
            // Add this line for detailed error messages
            sqlOptions.UseQuerySplittingBehavior(QuerySplittingBehavior.SplitQuery);
        }
    );
});

var corsPolicy = "CorsPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: corsPolicy, policy =>
    {
        policy.WithOrigins("https://localhost:3001", "http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});


builder.Services.AddSingleton<FirebaseService>();
builder.Services.AddScoped<IUserService, TenantService>();
builder.Services.AddScoped<IUserService, LandlordService>();
builder.Services.AddScoped<IDashboardService, DashboardService>();
builder.Services.AddScoped<ITenantDashboardService, TenantDashboardService>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Authority = "https://securetoken.google.com/renkira-fa943";
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = "https://securetoken.google.com/renkira-fa943",
            ValidateAudience = true,
            ValidAudience = "renkira-fa943",
            ValidateLifetime = true
        };
    });
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("TenantOnly", policy =>
        policy.RequireClaim("role", "Tenant"));

    options.AddPolicy("LandlordOnly", policy =>
        policy.RequireClaim("role", "Landlord"));
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(opt =>
{
    var securitySchema = new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme.",
        BearerFormat = "JWT",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = JwtBearerDefaults.AuthenticationScheme,
        Reference = new OpenApiReference
        {
            Type = ReferenceType.SecurityScheme,
            Id = JwtBearerDefaults.AuthenticationScheme
        }

    };
    opt.AddSecurityDefinition(securitySchema.Reference.Id, securitySchema);
    opt.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {securitySchema, new string[] { }}
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.ConfigObject.AdditionalItems.Add("persistAuthorization", "true");
    }
    );
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(corsPolicy);
app.UseHttpsRedirection();

app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles();
app.MapFallbackToController("Index", "Fallback");

app.MapControllers();

var scope = app.Services.CreateScope();
var context = scope.ServiceProvider.GetRequiredService<PropertyManagementContext>();
var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
try
{
    logger.LogInformation("Testing database connection...");
    await context.Database.CanConnectAsync();
    logger.LogInformation("Database connection successful");

    // Then proceed with migrations
    logger.LogInformation("Running migrations...");
    await context.Database.MigrateAsync();

    // Finally initialize data
    logger.LogInformation("Initializing database...");
    await DbInitializer.InitDb(context);

    logger.LogInformation("Database initialization completed successfully");
}
catch (Npgsql.NpgsqlException ex)
{
    logger.LogError(ex, "Error connecting to the database. Please check your connection string and ensure the database is accessible.");
    throw;
}
catch (Exception ex)
{
    logger.LogError(ex, "An error occurred while initializing the database");
    throw;
}
app.Run();
