using System;
using System.ComponentModel.DataAnnotations;

namespace AgileFootPrints.API.Models
{
    public class Meeting
    {
        public int Id { get; set; }
        [Required]
        public string Subject { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public DateTime Date { get; set; }
        [Required]
        public string StartTime { get; set; }
        [Required]
        public string EndTime { get; set; }
        [Required]
        public string Venue { get; set; }
        public DateTime CreateAt { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }
        public int ProjectId { get; set; }
        public Project Project { get; set; }
        public Meeting()
        {
            this.CreateAt = DateTime.Now;
        }
    }
}