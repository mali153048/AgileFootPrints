using System;

namespace AgileFootPrints.API.Models
{
    public class Notification
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public int SenderId { get; set; }
        public bool isRead { get; set; }
        public User Sender { get; set; }
        public int RecieverId { get; set; }
        public User Reciever { get; set; }
        public DateTime CreatedAt { get; set; }
        public int projectId { get; set; }
        public Project Project { get; set; }
        public bool isMail { get; set; }
        public bool isNotification { get; set; }
        public Notification()
        {
            this.CreatedAt = DateTime.Now;

        }

    }
}