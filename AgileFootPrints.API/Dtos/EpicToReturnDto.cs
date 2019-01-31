using System.ComponentModel.DataAnnotations;

namespace AgileFootPrints.API.Dtos
{
    public class EpicToReturnDto
    {
        public int Id { get; set; }
        [Required]
        public string epicName { get; set; }
        [Required]
        public string epicDescription { get; set; }
    }
}