using System.ComponentModel.DataAnnotations;

namespace AgileFootPrints.API.Dtos
{
    public class UserForLoginDto
    {
        [Required(ErrorMessage = "Please enter Username")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Please enter password")]
        public string Password { get; set; }
    }
}