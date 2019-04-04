namespace AgileFootPrints.API.Dtos
{
    public class NotifcationToSaveDto
    {
        public int ProjectId { get; set; }
        public string Sender { get; set; }
        public string Reciever { get; set; }
        public bool isMail { get; set; }
        public bool isNotification { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
    }
}