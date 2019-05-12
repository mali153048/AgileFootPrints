using Microsoft.EntityFrameworkCore.Migrations;

namespace AgileFootPrints.API.Migrations
{
    public partial class UserProjectRoleModule : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ScrumRoles",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ScrumRoleName = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ScrumRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserProjectRole",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    UserId = table.Column<int>(nullable: false),
                    ProjectId = table.Column<int>(nullable: false),
                    ScrumRolesId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserProjectRole", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserProjectRole_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserProjectRole_ScrumRoles_ScrumRolesId",
                        column: x => x.ScrumRolesId,
                        principalTable: "ScrumRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserProjectRole_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserProjectRole_ProjectId",
                table: "UserProjectRole",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProjectRole_ScrumRolesId",
                table: "UserProjectRole",
                column: "ScrumRolesId");

            migrationBuilder.CreateIndex(
                name: "IX_UserProjectRole_UserId_ProjectId",
                table: "UserProjectRole",
                columns: new[] { "UserId", "ProjectId" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserProjectRole");

            migrationBuilder.DropTable(
                name: "ScrumRoles");
        }
    }
}
