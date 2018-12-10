using System.Collections.Generic;

namespace AgileFootPrints.API.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string ProjectName { get; set; }
        public string ProjectDescription { get; set; }
        public string ProjectKey { get; set; }

        public int? StatusId { get; set; }
        public Status Status { get; set; }
        public ICollection<Epic> MyProperty { get; set; }

    }
}