using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    DisplayName = "User",
                    Email = "user@test.com",
                    UserName = "user@test.com",
                    Address = new Address
                    {
                        FirstName = "Anwer",
                        LastName = "Hedfi",
                        Street = "Semmema",
                        City = "Sbeitla",
                        State = "Kasserine",
                        Zipcode = "1250"
                    }
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}