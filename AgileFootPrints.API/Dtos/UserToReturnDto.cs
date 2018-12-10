using System;
using System.Collections.Generic;
using AgileFootPrints.API.Models;

namespace AgileFootPrints.API.Dtos
{
    public class UserToReturnDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        public string Gender { get; set; }
        public string PhoneNumber { get; set; }
        public List<WorkItem> WorkItems { get; set; }
    }
}