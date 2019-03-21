using AgileFootPrints.API.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace AgileFootPrints.API.Data
{
    public class DataContext : IdentityDbContext<User, Role, int,
     IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>,
      IdentityRoleClaim<int>, IdentityUserToken<int>>, IDesignTimeDbContextFactory<DataContext>
    {

        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DataContext()
        {

        }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Epic> Epics { get; set; }
        public DbSet<Story> Stories { get; set; }
        public DbSet<Priority> Priorities { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<Sprint> Sprints { get; set; }
        public DbSet<WorkItem> WorkItems { get; set; }
        public DbSet<ProjectContributor> projectContributors { get; set; }
        public DbSet<Revision> Revisions { get; set; }
        public DbSet<CodeFile> CodeFiles { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<CodeFileRevision> CodeFileRevisions { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();

                userRole.HasOne(ur => ur.User)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();
            });
            builder.Entity<ProjectContributor>()
                    .HasKey(pc => new { pc.UserId, pc.ProjectId });
            builder.Entity<ProjectContributor>()
                .HasOne(bc => bc.Project)
                .WithMany(b => b.ProjectContributors)
                .HasForeignKey(bc => bc.ProjectId);
            builder.Entity<ProjectContributor>()
                .HasOne(bc => bc.User)
                .WithMany(c => c.ProjectContributors)
                .HasForeignKey(bc => bc.UserId);
            builder.Entity<Notification>()
                .HasOne<User>(u => u.Sender)
                .WithMany(s => s.NotificationsSent)
                .HasForeignKey(uId => uId.SenderId);
            builder.Entity<Notification>()
                .HasOne<User>(u => u.Reciever)
                .WithMany(s => s.NotificationsRecieved)
                .HasForeignKey(uId => uId.RecieverId);

        }
        public DataContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
            optionsBuilder.UseSqlite("Data Source=AgileFootPrints.db");


            return new DataContext(optionsBuilder.Options);
        }
    }
}