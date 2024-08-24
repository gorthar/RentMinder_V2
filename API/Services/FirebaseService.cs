using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FirebaseAdmin;
using FirebaseAdmin.Auth;
using Google.Apis.Auth.OAuth2;

namespace API.Services
{
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

        public async Task AddRoleClaimAsync(string uid, string role)
        {
            var claims = new Dictionary<string, object>
        {
            { "role", role }
        };
            await _firebaseAuth.SetCustomUserClaimsAsync(uid, claims);
        }


    }
}