using System.Collections.Generic;
using AgileFootPrints.API.Models;
using Microsoft.AspNetCore.Identity;

namespace AgileFootPrints.API.Data
{
    public class SeedRoles
    {
        private readonly RoleManager<Role> _roleManager;

        public SeedRoles(RoleManager<Role> roleManager)
        {
            _roleManager = roleManager;
        }
        public void Seed()
        {
            var roles = new List<Role>
            {
                new Role{Name="Member"},
                new Role{Name="Admin"}
            };
            foreach (var role in roles)
            {
                _roleManager.CreateAsync(role).Wait();
            }
        }
    }
}