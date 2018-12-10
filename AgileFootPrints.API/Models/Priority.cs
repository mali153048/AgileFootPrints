using System.Collections.Generic;

namespace AgileFootPrints.API.Models
{
    public class Priority
    {
        public int Id { get; set; }
        public string priority { get; set; }
        public ICollection<Story> Stories { get; set; }
    }
}