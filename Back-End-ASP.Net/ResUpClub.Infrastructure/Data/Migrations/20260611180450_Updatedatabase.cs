using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ResUpClub.Infrastructure.Data.Migrations
{
    /// <inheritdoc />
    public partial class Updatedatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "OutClub",
                type: "varchar(255)",
                nullable: true,
                collation: "utf8mb4_0900_ai_ci")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Inclub",
                type: "varchar(255)",
                nullable: true,
                collation: "utf8mb4_0900_ai_ci")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_OutClub_UserId",
                table: "OutClub",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Inclub_UserId",
                table: "Inclub",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Inclub_Users_UserId",
                table: "Inclub",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_OutClub_Users_UserId",
                table: "OutClub",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Inclub_Users_UserId",
                table: "Inclub");

            migrationBuilder.DropForeignKey(
                name: "FK_OutClub_Users_UserId",
                table: "OutClub");

            migrationBuilder.DropIndex(
                name: "IX_OutClub_UserId",
                table: "OutClub");

            migrationBuilder.DropIndex(
                name: "IX_Inclub_UserId",
                table: "Inclub");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "OutClub");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Inclub");
        }
    }
}
