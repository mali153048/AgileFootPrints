using System;
using System.ComponentModel.DataAnnotations;

namespace AgileFootPrints.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required(ErrorMessage = "First name is required")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "Last name is required")]
        public string LastName { get; set; }
        [Required(ErrorMessage = "Username is required")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress]
        public string Email { get; set; }
        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Address { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required(ErrorMessage = "Phone number is required")]
        [MaxLength(13)]
        public string PhoneNumber { get; set; }

    }
}