using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;
using System.Collections.Generic;
using System.Threading.Tasks;

public class FirebaseService
{
    private readonly FirebaseAuth _firebaseAuth;

    public FirebaseService(IConfiguration configuration)
    {
        if (FirebaseApp.DefaultInstance == null)
        {
            FirebaseApp.Create(new AppOptions()
            {
                Credential = GoogleCredential.FromFile(configuration["Firebase:CredentialFile"])
            });
        }
        _firebaseAuth = FirebaseAuth.DefaultInstance;
    }

    public async Task<FirebaseToken> VerifyIdTokenAsync(string idToken)
    {
        return await _firebaseAuth.VerifyIdTokenAsync(idToken);
    }

    public async Task<UserRecord> GetUserAsync(string uid)
    {
        return await _firebaseAuth.GetUserAsync(uid);
    }

    public async Task<UserRecord> CreateUserAsync(string email, string password)
    {
        var userArgs = new UserRecordArgs
        {
            Email = email,
            EmailVerified = false,
            Password = password,
            Disabled = false
        };

        return await _firebaseAuth.CreateUserAsync(userArgs);
    }

    public async Task<string> SignInWithEmailAndPasswordAsync(string email, string password)
    {
        var user = await _firebaseAuth.GetUserByEmailAsync(email);
        return await _firebaseAuth.CreateCustomTokenAsync(user.Uid);
    }

    public async Task<FirebaseToken> VerifyGoogleIdToken(string idToken)
    {
        return await _firebaseAuth.VerifyIdTokenAsync(idToken);
    }

    public async Task AddRoleClaimAsync(string uid, string role)
    {
        var claims = new Dictionary<string, object>
        {
            { "role", role }
        };
        await _firebaseAuth.SetCustomUserClaimsAsync(uid, claims);
    }
}