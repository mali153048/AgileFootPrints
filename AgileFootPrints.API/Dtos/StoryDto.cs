using System.ComponentModel.DataAnnotations;

namespace AgileFootPrints.API.Dtos
{
    public class StoryDto
    {
        public int Id { get; set; }
        [Required]
        public string StoryName { get; set; }
        [Required]
        public string StoryDescription { get; set; }
        public string AcceptanceCriteria { get; set; }
        public int UserId { get; set; }
        public int SprintId { get; set; }
        public int EpicId { get; set; }
        [Required]
        public int PriorityId { get; set; }
        public int projectId { get; set; }
        public int StatusId { get; set; }

    }
}