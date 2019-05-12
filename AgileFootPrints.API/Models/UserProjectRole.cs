namespace AgileFootPrints.API.Models
{
    public class UserProjectRole
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int ProjectId { get; set; }
        public Project Project { get; set; }
        public int ScrumRolesId { get; set; }
        public ScrumRoles ScrumRole { get; set; }
    }
}