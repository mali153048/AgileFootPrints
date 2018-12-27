namespace AgileFootPrints.API.Models
{
    public class Story
    {
        public int Id { get; set; }
        public string StoryName { get; set; }
        public string StoryDescription { get; set; }
        public string AcceptanceCriteria { get; set; }
        public int? EpicId { get; set; }
        public Epic Epic { get; set; }
        public int? PriorityId { get; set; }
        public Priority Priority { get; set; }
        public int? SprintId { get; set; }
        public Sprint Sprint { get; set; }
        public int ProjectId { get; set; }
        public Project Project { get; set; }

    }
}