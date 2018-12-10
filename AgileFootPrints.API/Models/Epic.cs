using System.Collections.Generic;

namespace AgileFootPrints.API.Models
{
    public class Epic
    {
        public int Id { get; set; }
        public string EpicName { get; set; }
        public string EpicDescription { get; set; }
        public int? ProjectId { get; set; }
        public Project Project { get; set; }
        public ICollection<Story> Stories { get; set; }

    }
}