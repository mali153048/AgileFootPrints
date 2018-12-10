using System.Collections.Generic;

namespace AgileFootPrints.API.Models
{
    public class Status
    {
        public int Id { get; set; }
        public string status { get; set; }
        public ICollection<User> Users { get; set; }
        public ICollection<WorkItem> WorkItems { get; set; }
    }
}