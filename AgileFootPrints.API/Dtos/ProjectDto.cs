using System.ComponentModel.DataAnnotations;

namespace AgileFootPrints.API.Dtos
{
    public class ProjectDto
    {
        public int Id { get; set; }
        [Required]
        public string projectName { get; set; }
        public string projectKey { get; set; }
        [Required]
        public string projectDescription { get; set; }
        [Required]
        public int statusId { get; set; }
        [Required]
        public int userId { get; set; }
    }
}