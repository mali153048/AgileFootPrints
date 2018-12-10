using System;
using System.Collections.Generic;

namespace AgileFootPrints.API.Models
{
    public class Sprint
    {
        public int Id { get; set; }
        public string SprintName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public ICollection<Story> Stories { get; set; }
        public ICollection<WorkItem> WorkItems { get; set; }
    }
}