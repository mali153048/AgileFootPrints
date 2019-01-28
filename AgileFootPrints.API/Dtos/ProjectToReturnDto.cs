namespace AgileFootPrints.API.Dtos
{
    public class ProjectToReturnDto
    {
        public int id { get; set; }
        public string projectName { get; set; }
        public string projectDescription { get; set; }
        public string projectKey { get; set; }
        public int statusId { get; set; }
    }
}