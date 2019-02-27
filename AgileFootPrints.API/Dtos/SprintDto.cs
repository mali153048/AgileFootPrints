using System;
using System.ComponentModel.DataAnnotations;

namespace AgileFootPrints.API.Dtos
{
    public class SprintDto
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Sprint Name is required")]
        public string SprintName { get; set; }
        /* [Required(ErrorMessage = "Start date is required")]
        [DisplayFormat(DataFormatString = "{0:dd MMM yyyy HH:mm:ss}")]
        public DateTime StartDate { get; set; }
        [Required(ErrorMessage = "End date is required")]
        [DisplayFormat(DataFormatString = "{0:dd MMM yyyy HH:mm:ss}")]
        public DateTime EndDate { get; set; } */
        [Required]
        public int projectId { get; set; }
        public int StatusId { get; set; }
    }
}