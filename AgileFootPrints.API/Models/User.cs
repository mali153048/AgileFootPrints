using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace AgileFootPrints.API.Models
{
    public class User : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public DateTime DateOfBirth { get; set; }
        public ICollection<Project> Projects { get; set; }
        public ICollection<WorkItem> WorkItems { get; set; }
        public ICollection<UserRole> UserRoles { get; set; }
        public ICollection<ProjectContributor> ProjectContributors { get; set; }
        public ICollection<Notification> NotificationsSent { get; set; }
        public ICollection<Notification> NotificationsRecieved { get; set; }

    }
}