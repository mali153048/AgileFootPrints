using Microsoft.EntityFrameworkCore.Migrations;

namespace AgileFootPrints.API.Migrations
{
    public partial class MeetingModuleVenueAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Venue",
                table: "Meetings",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Venue",
                table: "Meetings");
        }
    }
}
