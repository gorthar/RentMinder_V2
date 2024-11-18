using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.DB
{
    public static class DbInitializer
    {
        public static async Task InitDb(PropertyManagementContext context)
        {
            try
            {
                await context.Database.CanConnectAsync();

                if (!await context.Database.EnsureCreatedAsync())
                {
                    // Database already exists
                    if (await context.Properties.AnyAsync())
                    {
                        return;
                    }
                }
                var landlord = new Landlord
                {
                    FirebaseUserId = "W57WJLqgIxURmDHrxUL2o3tq8Zz2",
                    FirstName = "Test LL",
                    LastName = "Test",
                    Email = "test1@test.com",
                    PhoneNumber = "555-555-5555",
                    CreatedAt = DateTime.UtcNow,
                    LastLogin = DateTime.UtcNow,


                };
                await context.Landlords.AddAsync(landlord);
                var tenant = new Tenant
                {
                    FirebaseUserId = "GjVgaObaAbZQKIb9QcFGW86KDWi1",
                    FirstName = "Test",
                    LastName = "TestLN",
                    Email = "test@test.com",
                    PhoneNumber = "555-555-5556",
                    CreatedAt = DateTime.UtcNow,
                    LastLogin = DateTime.UtcNow,
                };
                await context.Tenants.AddAsync(tenant);

                var properties = new Property[]
                {
                new Property
                {
                    Address = "123 Main St",
                    Description = "A nice house",
                    NumberOfBedrooms = 3,
                    NumberOfBathrooms = 2,
                    SquareFootage = 1500,
                    IsOccupied = false,
                    DateAdded = DateTime.UtcNow,
                    LastModified = DateTime.UtcNow,
                    LandlordId = "W57WJLqgIxURmDHrxUL2o3tq8Zz2"
                },
                new Property
                {
                    Address = "456 Elm St",
                    Description = "A nice apartment",
                    NumberOfBedrooms = 2,
                    NumberOfBathrooms = 1,
                    SquareFootage = 1000,
                    IsOccupied = true,
                    DateAdded = DateTime.UtcNow,
                    LastModified = DateTime.UtcNow,
                    LandlordId = "W57WJLqgIxURmDHrxUL2o3tq8Zz2"
                }
                };
                foreach (Property p in properties)
                {
                    context.Properties.Add(p);
                }
                await context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new Exception("Failed to initialize database. See inner exception for details.", ex);
            }
        }

    }
}