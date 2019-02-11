using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AgileFootPrints.API.Models
{
    public class Sprint
    {
        public int Id { get; set; }
        public string SprintName { get; set; }
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:dd-MM-yyyy hh:mm:ss}", ApplyFormatInEditMode = true)]
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int projectId { get; set; }
        public Project project { get; set; }
        public ICollection<Story> Stories { get; set; }
        public ICollection<WorkItem> WorkItems { get; set; }
    }
}