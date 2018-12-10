using System;
using System.Collections.Generic;

namespace AgileFootPrints.API.Models
{
    public class WorkItem
    {
        public int Id { get; set; }
        public string WorkItemName { get; set; }
        public string WorkItemDescription { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int? SprintId { get; set; }
        public Sprint Sprint { get; set; }
        public int? StatusId { get; set; }
        public Status Status { get; set; }
        public int? UserId { get; set; }
        public User User { get; set; }
        public ICollection<Revision> Revisions { get; set; }
    }
}