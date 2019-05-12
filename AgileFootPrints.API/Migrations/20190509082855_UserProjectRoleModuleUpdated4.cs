using Microsoft.EntityFrameworkCore.Migrations;

namespace AgileFootPrints.API.Migrations
{
    public partial class UserProjectRoleModuleUpdated4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserProjectRole_UserId",
                table: "UserProjectRole");

            migrationBuilder.CreateIndex(
                name: "IX_UserProjectRole_UserId_ProjectId",
                table: "UserProjectRole",
                columns: new[] { "UserId", "ProjectId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserProjectRole_UserId_ProjectId",
                table: "UserProjectRole");

            migrationBuilder.CreateIndex(
                name: "IX_UserProjectRole_UserId",
                table: "UserProjectRole",
                column: "UserId");
        }
    }
}
